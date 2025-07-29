import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, TrendingUp, Globe, Zap, X, Headphones } from "lucide-react";
import { credentialsStore } from "@/data/credentials";
import { useToast } from "@/hooks/use-toast";

interface LandingPageProps {
  onLogin: (user: any) => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [showAuth, setShowAuth] = useState<string | null>(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [recoverUsername, setRecoverUsername] = useState("");
  const [recoverPhone, setRecoverPhone] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    const result = credentialsStore.login(loginUsername, loginPassword);
    if (result.success) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      onLogin(result.user);
      setShowAuth(null);
    } else {
      toast({
        title: "Login failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleSignup = () => {
    const result = credentialsStore.signup(signupName, signupEmail, signupUsername, signupPassword, signupPhone);
    if (result.success) {
      toast({
        title: "Signup successful",
        description: "Account created successfully!",
      });
      setShowAuth('login');
    } else {
      toast({
        title: "Signup failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleRecoverPassword = () => {
    const result = credentialsStore.recoverPassword(recoverUsername, recoverPhone);
    if (result.success) {
      toast({
        title: "Credentials Found",
        description: `Username: ${result.credentials?.username}, Password: ${result.credentials?.password}`,
      });
    } else {
      toast({
        title: "Recovery Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <Zap className="w-12 sm:w-16 h-12 sm:h-16 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AccentAssist
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-medium">AI Pronunciation Analyzer</p>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Master Your American English Accent
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your pronunciation with AI-powered speech analysis. 
              Get instant feedback, track your progress, and speak with confidence.
            </p>

            {/* Added Master Your Pronunciation Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Headphones className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Master Your Pronunciation
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Use AI-powered analysis to improve your accent and pronunciation. 
                Get real-time feedback and track your progress with advanced speech recognition.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                onClick={() => setShowAuth('login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowAuth('signup')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-200"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Why Choose AccentAssist?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology meets intuitive design for the ultimate pronunciation learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Mic className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Real-Time Analysis</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Get instant feedback on your pronunciation with advanced AI speech recognition technology.
              </p>
            </div>
            
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Progress Tracking</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor your improvement with detailed analytics and personalized feedback reports.
              </p>
            </div>
            
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">American English Focus</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Specifically designed to help you master the American English accent and pronunciation patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAuth(null)}
              className="absolute top-4 right-4 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AccentAssist
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {showAuth === 'login' ? 'Welcome back!' : 
                 showAuth === 'signup' ? 'Join thousands improving their accent' : 
                 'Recover your account'}
              </p>
            </div>

            {showAuth === 'login' && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={handleLogin}>
                  Login
                </Button>
                <Button type="button" variant="link" onClick={() => setShowAuth('recover')}>
                  Forgot password?
                </Button>
              </div>
            )}

            {showAuth === 'signup' && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="signupName">Name</Label>
                  <Input
                    id="signupName"
                    placeholder="Enter your name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    placeholder="Enter your email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signupUsername">Username</Label>
                  <Input
                    id="signupUsername"
                    placeholder="Choose a username"
                    type="text"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    placeholder="Enter a password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signupPhone">Phone</Label>
                  <Input
                    id="signupPhone"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={handleSignup}>
                  Create Account
                </Button>
                <Button type="button" variant="link" onClick={() => setShowAuth('login')}>
                  Already have an account?
                </Button>
              </div>
            )}

            {showAuth === 'recover' && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="recoverUsername">Username</Label>
                  <Input
                    id="recoverUsername"
                    placeholder="Enter your username"
                    type="text"
                    value={recoverUsername}
                    onChange={(e) => setRecoverUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recoverPhone">Phone</Label>
                  <Input
                    id="recoverPhone"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={recoverPhone}
                    onChange={(e) => setRecoverPhone(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={handleRecoverPassword}>
                  Recover Password
                </Button>
                <Button type="button" variant="link" onClick={() => setShowAuth('login')}>
                  Back to login
                </Button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
