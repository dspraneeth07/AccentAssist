
import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import LearningSection from "@/components/LearningSection";
import PronunciationChart from "@/components/PronunciationChart";
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
      {/* Header with user info and logout */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Zap className="w-8 h-8 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">QwiXAccent</h1>
              </div>
              <span className="text-sm text-gray-500">AI Pronunciation Analyzer</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome, {user.name}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master Your Pronunciation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use AI-powered analysis to improve your accent and pronunciation. 
            Get real-time feedback and track your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <VoiceRecorder 
              onRecordingUpdate={handleRecordingUpdate}
              onAnalysisComplete={handleAnalysisComplete}
            />
            <FeedbackDisplay analysisResult={analysisResult} />
          </div>
          
          <div className="space-y-8">
            <PronunciationChart analysisResult={analysisResult} />
            <LearningSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
