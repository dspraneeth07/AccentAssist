
import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import UserCredentialsViewer from "@/components/UserCredentialsViewer";
import { Button } from "@/components/ui/button";
import { LogOut, User, Zap, Database } from "lucide-react";

interface IndexProps {
  user: any;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);

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
      {/* Header */}
      <header className="bg-white shadow-lg border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QwiXAccent
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">AI Pronunciation Analyzer</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base font-semibold">Welcome, {user.name}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowCredentials(!showCredentials)}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Database className="w-3 sm:w-4 h-3 sm:h-4" />
                  {showCredentials ? 'Hide' : 'Show'} Users
                </Button>
                <Button 
                  onClick={onLogout}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 text-xs sm:text-sm"
                >
                  <LogOut className="w-3 sm:w-4 h-3 sm:h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-4xl">
        {showCredentials ? (
          <UserCredentialsViewer />
        ) : (
          <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <VoiceRecorder 
                onRecordingUpdate={handleRecordingUpdate}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
            
            <div className="w-full">
              <FeedbackDisplay analysisResult={analysisResult} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
