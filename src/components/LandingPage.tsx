
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { credentialsStore } from '@/data/credentials';
import { Mic, Brain, BarChart3, Volume2, Sparkles, Zap } from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: any) => void;
}

export const LandingPage = ({ onLogin }: LandingPageProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveredCredentials, setRecoveredCredentials] = useState<{username: string; password: string} | null>(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: ''
  });

  // Recovery form state
  const [recoveryData, setRecoveryData] = useState({
    username: '',
    phone: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = credentialsStore.login(loginData.username, loginData.password);
    
    if (result.success && result.user) {
      toast({
        title: "Login Successful",
        description: "Welcome back to QwiXAccent!",
      });
      onLogin(result.user);
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = credentialsStore.signup(
      signupData.name,
      signupData.email,
      signupData.username,
      signupData.password,
      signupData.phone
    );

    if (result.success) {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
      // Reset form
      setSignupData({
        name: '',
        email: '',
        username: '',
        password: '',
        phone: ''
      });
    } else {
      toast({
        title: "Signup Failed",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = credentialsStore.recoverPassword(recoveryData.username, recoveryData.phone);
    
    if (result.success && result.credentials) {
      setRecoveredCredentials(result.credentials);
      toast({
        title: "Credentials Found",
        description: "Your credentials have been recovered!",
      });
    } else {
      toast({
        title: "Recovery Failed",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins flex">
      {/* Left Side - Logo & Features */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-indigo-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-300/20 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          {/* Logo with 3D effect */}
          <div className="mb-12 relative">
            <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 drop-shadow-lg">
              QwiX
            </div>
            <div className="text-3xl font-semibold text-gray-700 -mt-3 tracking-wide">
              Accent
            </div>
            <div className="absolute -top-3 -right-3 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>

          {/* Tagline */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Master Your Pronunciation
            </h2>
            <p className="text-gray-600 text-lg">
              AI-powered accent coaching for perfect pronunciation
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative">
                <Mic className="w-10 h-10 text-blue-600 animate-pulse" />
                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Voice Analysis</h3>
                <p className="text-sm text-gray-600">Real-time pronunciation feedback with AI</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative">
                <Brain className="w-10 h-10 text-indigo-600 animate-bounce" />
                <Zap className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-ping" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">AI-Powered</h3>
                <p className="text-sm text-gray-600">Smart accent coaching technology</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative">
                <BarChart3 className="w-10 h-10 text-purple-600 animate-pulse" />
                <div className="w-2 h-2 bg-green-500 rounded-full absolute -top-1 -right-1 animate-ping"></div>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your improvement over time</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="relative">
                <Volume2 className="w-10 h-10 text-blue-500 animate-pulse" />
                <div className="w-2 h-2 bg-blue-500 rounded-full absolute -top-1 -right-1 animate-bounce"></div>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Audio Playback</h3>
                <p className="text-sm text-gray-600">Hear correct pronunciation examples</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Welcome to QwiXAccent</CardTitle>
            <p className="text-gray-600 text-lg">Master your pronunciation with AI</p>
          </CardHeader>
          <CardContent className="pt-4">
            {showRecovery ? (
              <div className="space-y-6">
                {recoveredCredentials ? (
                  <div className="text-center space-y-6">
                    <h3 className="font-semibold text-xl text-gray-800">Your Credentials</h3>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <p className="text-gray-700 mb-2"><strong>Username:</strong> {recoveredCredentials.username}</p>
                      <p className="text-gray-700"><strong>Password:</strong> {recoveredCredentials.password}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowRecovery(false);
                        setRecoveredCredentials(null);
                        setRecoveryData({ username: '', phone: '' });
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRecovery} className="space-y-6">
                    <h3 className="font-semibold text-xl text-center text-gray-800">Recover Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="recovery-username" className="text-gray-700 font-medium">Username</Label>
                      <Input
                        id="recovery-username"
                        type="text"
                        value={recoveryData.username}
                        onChange={(e) => setRecoveryData({...recoveryData, username: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recovery-phone" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="recovery-phone"
                        type="tel"
                        value={recoveryData.phone}
                        onChange={(e) => setRecoveryData({...recoveryData, phone: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowRecovery(false)}
                        className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        {isLoading ? 'Searching...' : 'Recover'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-gray-800 rounded-md py-2 font-medium">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-gray-800 rounded-md py-2 font-medium">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-username" className="text-gray-700 font-medium">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setShowRecovery(true)}
                      className="w-full text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot Password?
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-username" className="text-gray-700 font-medium">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        value={signupData.username}
                        onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                        className="py-3 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
