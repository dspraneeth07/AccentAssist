
import { useState, useEffect } from "react";
import { Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import PronunciationChart from "./PronunciationChart";
import { playCorrectPronunciation, stopSpeech, initializeVoices } from "@/utils/textToSpeech";

interface FeedbackDisplayProps {
  analysisResult: any;
}

const FeedbackDisplay = ({ analysisResult }: FeedbackDisplayProps) => {
  const [isPlayingCorrection, setIsPlayingCorrection] = useState(false);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);

  useEffect(() => {
    // Initialize text-to-speech voices when component mounts
    initializeVoices().catch(console.error);
  }, []);

  if (!analysisResult) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">No Analysis Yet</h2>
        <p className="text-muted-foreground">
          Please record some audio first to see your pronunciation feedback.
        </p>
        <div className="text-sm text-muted-foreground mt-4">
          <p>💡 Tips for better results:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Speak clearly and at normal pace</li>
            <li>Use a quiet environment</li>
            <li>Try common phrases or sentences</li>
            <li>Make sure your microphone is working</li>
          </ul>
        </div>
      </div>
    );
  }

  const { transcription, analysis, audioUrl } = analysisResult;

  const playCorrection = async () => {
    if (!transcription) return;
    
    setIsPlayingCorrection(true);
    try {
      console.log('Playing correct pronunciation for:', transcription);
      await playCorrectPronunciation(transcription);
    } catch (error) {
      console.error('Error playing correction:', error);
    } finally {
      setIsPlayingCorrection(false);
    }
  };

  const stopPlayback = () => {
    stopSpeech();
    setIsPlayingCorrection(false);
  };

  const playRecording = () => {
    if (!audioUrl) return;
    
    const audio = new Audio(audioUrl);
    setIsPlayingRecording(true);
    
    audio.onended = () => setIsPlayingRecording(false);
    audio.onerror = () => setIsPlayingRecording(false);
    
    audio.play().catch(error => {
      console.error('Error playing recording:', error);
      setIsPlayingRecording(false);
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Pronunciation Analysis
        </h2>
        <p className="text-muted-foreground">
          Here's how you did with your American English pronunciation
        </p>
      </div>

      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-0">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Pronunciation Accuracy
            </h3>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - (analysis?.accuracy || 0.83))}`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {Math.round((analysis?.accuracy || 0.83) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-0">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Modulation Score
            </h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {(analysis?.modulation || 3.9).toFixed(1)}/5
              </div>
              <Progress 
                value={(analysis?.modulation || 3.9) * 20} 
                className="max-w-32 mx-auto"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Transcription */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">What You Said</h3>
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-lg italic">"{transcription || 'Unable to transcribe'}"</p>
        </div>
        {analysis?.overallFeedback && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              💬 {analysis.overallFeedback}
            </p>
          </div>
        )}
      </Card>

      {/* Word Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Word-by-Word Analysis</h3>
        <div className="space-y-4">
          {analysis?.wordAnalysis?.map((word: any, index: number) => (
            <div key={index} className={`border-l-4 pl-4 space-y-2 ${
              word.isCorrect ? 'border-l-green-500 bg-green-50/30' : 'border-l-red-500 bg-red-50/30'
            }`}>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  word.isCorrect 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {word.word}
                </span>
                {!word.isCorrect && (
                  <span className="text-xs text-muted-foreground">
                    {word.feedback}
                  </span>
                )}
              </div>
              {!word.isCorrect && (
                <div className="text-sm space-y-1">
                  <div>You said: <span className="font-mono text-red-600">{word.userPhonemes}</span></div>
                  <div>Native: <span className="font-mono text-green-600">{word.nativePhonemes}</span></div>
                </div>
              )}
            </div>
          )) || (
            <div className="text-center text-muted-foreground">
              Word analysis will appear here after processing
            </div>
          )}
        </div>
      </Card>

      {/* Audio Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        {audioUrl && (
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={playRecording}
            disabled={isPlayingRecording}
          >
            <Play className={`w-4 h-4 ${isPlayingRecording ? 'animate-pulse' : ''}`} />
            <span>{isPlayingRecording ? 'Playing...' : 'Replay Your Audio'}</span>
          </Button>
        )}
        
        <Button 
          onClick={isPlayingCorrection ? stopPlayback : playCorrection}
          disabled={!transcription}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isPlayingCorrection ? (
            <>
              <VolumeX className="w-4 h-4 mr-2" />
              Stop Playback
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Correct Pronunciation
            </>
          )}
        </Button>
      </div>

      {/* Chart */}
      <PronunciationChart analysisResult={analysisResult} />
    </div>
  );
};

export default FeedbackDisplay;
