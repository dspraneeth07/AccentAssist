import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Loader2, VolumeX, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WaveformDisplay from "./WaveformDisplay";
import { transcribeAudio, analyzePronounciation } from "@/utils/speechAnalysis";
import { playCorrectPronunciation, stopSpeech } from "@/utils/textToSpeech";

interface VoiceRecorderProps {
  onRecordingUpdate: (isRecording: boolean, isAnalyzing: boolean, audioUrl: string | null) => void;
  onAnalysisComplete: (result: any) => void;
}

const VoiceRecorder = ({ onRecordingUpdate, onAnalysisComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isPlayingCorrection, setIsPlayingCorrection] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [canRecord, setCanRecord] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    onRecordingUpdate(isRecording, isAnalyzing, audioUrl);
  }, [isRecording, isAnalyzing, audioUrl, onRecordingUpdate]);

  useEffect(() => {
    checkMicrophonePermissions();
    return () => cleanup();
  }, []);

  const checkMicrophonePermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setCanRecord(true);
      toast({
        title: "Microphone ready",
        description: "You can now start recording"
      });
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setCanRecord(false);
      toast({
        title: "Microphone access needed",
        description: "Please allow microphone access to record audio",
        variant: "destructive"
      });
    }
  };

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    if (!canRecord) {
      await checkMicrophonePermissions();
      return;
    }

    try {
      console.log('Starting recording...');
      setAudioBlob(null);
      setAudioUrl(null);
      setTranscription("");
      chunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          channelCount: 1,
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : MediaRecorder.isTypeSupported('audio/mp4') 
        ? 'audio/mp4' 
        : 'audio/webm';
      
      console.log('Using MIME type:', mimeType);
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType
      });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available:', event.data.size);
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log('Recording stopped, chunks:', chunksRef.current.length);
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: mimeType });
          console.log('Created blob:', blob.size, 'bytes');
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          
          setTimeout(() => analyzeAudio(blob), 500);
        } else {
          toast({
            title: "No audio recorded",
            description: "Please try recording again",
            variant: "destructive"
          });
        }
        cleanup();
      };
      
      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      updateWaveform();
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone. Click stop when finished."
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      toast({
        title: "Recording failed",
        description: "Please allow microphone access and try again",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    console.log('Stop recording button clicked, current state:', isRecording);
    
    if (!isRecording) {
      console.log('Not recording, returning');
      return;
    }
    
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('Stopping MediaRecorder');
      mediaRecorderRef.current.stop();
    }

    toast({
      title: "Recording stopped",
      description: "Processing your audio for analysis..."
    });
  };

  const updateWaveform = () => {
    if (!analyserRef.current || !isRecording) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const normalized = Array.from(dataArray).map(value => value / 255);
    setWaveformData(normalized.slice(0, 32));
    
    if (isRecording) {
      animationRef.current = requestAnimationFrame(updateWaveform);
    }
  };

  const analyzeAudio = async (blob?: Blob) => {
    const audioToAnalyze = blob || audioBlob;
    if (!audioToAnalyze) {
      toast({
        title: "No audio to analyze",
        description: "Please record some audio first",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Starting analysis of blob:', audioToAnalyze.size, 'bytes');
    setIsAnalyzing(true);
    
    try {
      toast({
        title: "Analyzing speech...",
        description: "Using Gemini AI to process your pronunciation"
      });

      const arrayBuffer = await audioToAnalyze.arrayBuffer();
      console.log('Audio buffer created:', arrayBuffer.byteLength, 'bytes');
      
      const transcriptionResult = await transcribeAudio(arrayBuffer);
      console.log('Transcription result:', transcriptionResult);
      setTranscription(transcriptionResult);
      
      if (!transcriptionResult || transcriptionResult.trim().length === 0) {
        throw new Error('No speech detected in the recording');
      }
      
      const analysisResult = await analyzePronounciation(transcriptionResult, arrayBuffer);
      console.log('Analysis result:', analysisResult);
      
      const result = {
        transcription: transcriptionResult,
        analysis: analysisResult,
        audioUrl
      };
      
      onAnalysisComplete(result);
      
      toast({
        title: "Analysis complete!",
        description: `Transcribed: "${transcriptionResult}"`
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = "Please try recording again";
      if (error instanceof Error) {
        if (error.message.includes('No speech detected')) {
          errorMessage = "No clear speech detected. Please speak louder and clearer.";
        } else if (error.message.includes('network')) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.message.includes('quota')) {
          errorMessage = "API quota exceeded. Please try again later.";
        }
      }
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playCorrection = async (text?: string) => {
    const textToPlay = text || transcription;
    if (!textToPlay) {
      toast({
        title: "No text to play",
        description: "Please record and analyze audio first",
        variant: "destructive"
      });
      return;
    }
    
    setIsPlayingCorrection(true);
    try {
      console.log('Playing correction for:', textToPlay);
      await playCorrectPronunciation(textToPlay);
      toast({
        title: "Playback complete",
        description: "Listen and compare with your pronunciation"
      });
    } catch (error) {
      console.error('Error playing correction:', error);
      toast({
        title: "Playback failed",
        description: "Unable to play correct pronunciation",
        variant: "destructive"
      });
    } finally {
      setIsPlayingCorrection(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-6 sm:space-y-8 text-white px-4 sm:px-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-poppins">
          Speak & Analyze Your Pronunciation
        </h2>
        <p className="text-white/90 text-base sm:text-lg font-medium font-poppins">
          Press record, speak clearly, then stop to get instant feedback
        </p>
      </div>
      
      {/* Recording Controls - Mobile Responsive */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center">
          {/* Start Recording Button - Responsive Size */}
          {!isRecording && (
            <Button
              size="lg"
              onClick={startRecording}
              disabled={isAnalyzing || !canRecord}
              className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full text-white transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                !canRecord 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Mic className="w-12 h-12 sm:w-16 sm:h-16" />
                <span className="text-base sm:text-lg font-bold font-poppins">START</span>
              </div>
            </Button>
          )}
          
          {/* Stop Recording Button - Responsive Size */}
          {isRecording && (
            <Button
              size="lg"
              onClick={stopRecording}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full text-white bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm border-2 border-red-300/50 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Square className="w-12 h-12 sm:w-16 sm:h-16" />
                <span className="text-base sm:text-lg font-bold font-poppins">STOP</span>
              </div>
            </Button>
          )}
        </div>
        
        <div className="text-base sm:text-lg font-semibold text-white/90 font-poppins text-center">
          {isRecording 
            ? `🔴 Recording: ${formatTime(recordingTime)} - Click STOP when done`
            : isAnalyzing 
            ? '🔄 Analyzing your speech...'
            : !canRecord
            ? '❌ Allow microphone access to start'
            : '🎙️ Click START to begin recording'
          }
        </div>
      </div>
      
      {/* Waveform Display - Mobile Responsive */}
      <div className="w-full max-w-xs sm:max-w-lg mx-auto">
        <WaveformDisplay 
          data={waveformData} 
          isRecording={isRecording}
          className="w-full"
        />
      </div>
      
      {/* Current Transcription - Mobile Responsive */}
      {transcription && (
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          <h3 className="text-lg sm:text-xl font-bold font-poppins">What You Said</h3>
          <p className="text-base sm:text-lg italic font-poppins break-words">"{transcription}"</p>
          <Button
            onClick={() => playCorrection()}
            disabled={isPlayingCorrection}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 font-poppins text-sm sm:text-base"
          >
            {isPlayingCorrection ? (
              <>
                <VolumeX className="w-4 h-4 mr-2" />
                Playing...
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                Hear Correct Pronunciation
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Audio Playback - Mobile Responsive */}
      {audioUrl && !isAnalyzing && (
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          <h3 className="text-lg sm:text-xl font-bold font-poppins">Your Recording</h3>
          <audio controls className="mx-auto rounded-lg shadow-lg w-full max-w-sm">
            <source src={audioUrl} type="audio/webm" />
            Your browser does not support audio playback.
          </audio>
          {!transcription && (
            <Button 
              onClick={() => analyzeAudio()}
              disabled={isAnalyzing}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 font-poppins text-sm sm:text-base"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze This Recording'
              )}
            </Button>
          )}
        </div>
      )}

      {/* Analysis Status - Mobile Responsive */}
      {isAnalyzing && (
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 animate-spin" />
            <h3 className="text-lg sm:text-xl font-bold font-poppins">Processing with Gemini AI</h3>
          </div>
          <p className="font-poppins text-sm sm:text-base">
            Transcribing speech and analyzing your American English pronunciation...
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
