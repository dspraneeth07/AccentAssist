import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { credentialsStore } from '@/data/credentials';
import { Mic, Brain, BarChart3, Volume2, Zap } from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: any) => void;
}

export const LandingPage = ({ onLogin }: LandingPageProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveredCredentials, setRecoveredCredentials] = useState<{username: string; password: string} | null>(null);

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: ''
  });

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
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-lg">
          {/* Logo with Power/Lightning Icon */}
          <div className="mb-8 relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Zap className="w-16 h-16 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QwiXAccent
            </div>
            <div className="text-lg text-gray-600 mt-2 font-medium">
              AI Pronunciation Analyzer
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Master Your Pronunciation
            </h2>
            <p className="text-gray-600 text-lg">
              AI-powered accent coaching for perfect pronunciation
            </p>
          </div>

          {/* Clean Feature List */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl shadow-lg">
              <Mic className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Voice Analysis</h3>
                <p className="text-sm text-gray-600">Real-time pronunciation feedback</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl shadow-lg">
              <Brain className="w-8 h-8 text-indigo-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">AI-Powered</h3>
                <p className="text-sm text-gray-600">Smart accent coaching technology</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            {showRecovery ? (
              <div className="space-y-4">
                {recoveredCredentials ? (
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold text-lg">Your Credentials</h3>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="mb-2"><strong>Username:</strong> {recoveredCredentials.username}</p>
                      <p><strong>Password:</strong> {recoveredCredentials.password}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowRecovery(false);
                        setRecoveredCredentials(null);
                        setRecoveryData({ username: '', phone: '' });
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRecovery} className="space-y-4">
                    <h3 className="font-semibold text-lg text-center">Recover Password</h3>
                    <div>
                      <Label htmlFor="recovery-username">Username</Label>
                      <Input
                        id="recovery-username"
                        type="text"
                        value={recoveryData.username}
                        onChange={(e) => setRecoveryData({...recoveryData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="recovery-phone">Phone Number</Label>
                      <Input
                        id="recovery-phone"
                        type="tel"
                        value={recoveryData.phone}
                        onChange={(e) => setRecoveryData({...recoveryData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowRecovery(false)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? 'Searching...' : 'Recover'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setShowRecovery(true)}
                      className="w-full"
                    >
                      Forgot Password?
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-4">
                  <form onSubmit={handleSignup} className="space-y-3">
                    <div>
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        value={signupData.username}
                        onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
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
