
import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import { Button } from "@/components/ui/button";
import { LogOut, User, Zap } from "lucide-react";

interface IndexProps {
  user: any;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleRecordingUpdate = (recording: boolean, analyzing: boolean, url: string | null) => {
    setIsRecording(recording);
    setIsAnalyzing(analyzing);
    setAudioUrl(url);
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
      {/* Attractive Header */}
      <header className="bg-white shadow-lg border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap className="w-10 h-10 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    QwiXAccent
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">AI Pronunciation Analyzer</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Welcome, {user.name}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Master Your Pronunciation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Use AI-powered analysis to improve your accent and pronunciation. 
            Get real-time feedback and track your progress with advanced speech recognition.
          </p>
        </div>

        {/* Centered Main Content */}
        <div className="max-w-3xl mx-auto space-y-12">
          <VoiceRecorder 
            onRecordingUpdate={handleRecordingUpdate}
            onAnalysisComplete={handleAnalysisComplete}
          />
          
          <div className="w-full">
            <FeedbackDisplay analysisResult={analysisResult} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
