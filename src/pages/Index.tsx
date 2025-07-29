
import { useState } from "react";
import { Mic, Volume2, Zap, Play, Square, Loader2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import VoiceRecorder from "@/components/VoiceRecorder";
import FeedbackDisplay from "@/components/FeedbackDisplay";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleRecordingUpdate = (recording: boolean, analyzing: boolean, audioUrl: string | null) => {
    setIsRecording(recording);
    setIsAnalyzing(analyzing);
    setAudioUrl(audioUrl);
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-poppins">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-border/30 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  QwiXAccent
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Master American English Pronunciation
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Voice Recording Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
            <VoiceRecorder 
              onRecordingUpdate={handleRecordingUpdate}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </Card>

          {/* Analysis Results */}
          {(analysisResult || isAnalyzing) && (
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              {isAnalyzing ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Analyzing Your Pronunciation
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI is processing your speech with advanced acoustic analysis...
                    </p>
                  </div>
                  <Progress value={66} className="max-w-md mx-auto h-2" />
                </div>
              ) : (
                <FeedbackDisplay analysisResult={analysisResult} />
              )}
            </Card>
          )}

          {/* Instructions */}
          {!isRecording && !isAnalyzing && !analysisResult && (
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-2xl">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  How to Use QwiXAccent
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium">1. Tap & Speak</p>
                    <p className="text-muted-foreground">Press the microphone button and speak clearly</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Volume2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium">2. Get Analysis</p>
                    <p className="text-muted-foreground">See your pronunciation accuracy and mistakes</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium">3. Learn & Improve</p>
                    <p className="text-muted-foreground">Listen to correct American pronunciation</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
