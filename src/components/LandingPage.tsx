
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { credentialsStore } from '@/data/credentials';
import { Mic, Brain, BarChart3, Users, Volume2, BookOpen } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex">
      {/* Left Side - Logo & Features */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-secondary/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* Logo with 3D effect */}
          <div className="mb-8 relative">
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transform rotate-3 hover:rotate-0 transition-transform duration-300">
              QwiX
            </div>
            <div className="text-2xl font-semibold text-muted-foreground -mt-2">
              Accent
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-background/50 backdrop-blur rounded-lg hover:bg-background/70 transition-colors">
              <Mic className="w-8 h-8 text-primary animate-pulse" />
              <div className="text-left">
                <h3 className="font-semibold">Voice Analysis</h3>
                <p className="text-sm text-muted-foreground">Real-time pronunciation feedback</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-background/50 backdrop-blur rounded-lg hover:bg-background/70 transition-colors">
              <Brain className="w-8 h-8 text-secondary animate-bounce" />
              <div className="text-left">
                <h3 className="font-semibold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Smart accent coaching</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-background/50 backdrop-blur rounded-lg hover:bg-background/70 transition-colors">
              <BarChart3 className="w-8 h-8 text-accent animate-pulse" />
              <div className="text-left">
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor your improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to QwiXAccent</CardTitle>
            <p className="text-muted-foreground">Master your pronunciation with AI</p>
          </CardHeader>
          <CardContent>
            {showRecovery ? (
              <div className="space-y-4">
                {recoveredCredentials ? (
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold text-lg">Your Credentials</h3>
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <p><strong>Username:</strong> {recoveredCredentials.username}</p>
                      <p><strong>Password:</strong> {recoveredCredentials.password}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowRecovery(false);
                        setRecoveredCredentials(null);
                        setRecoveryData({ username: '', phone: '' });
                      }}
                      className="w-full"
                    >
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRecovery} className="space-y-4">
                    <h3 className="font-semibold text-lg text-center">Recover Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="recovery-username">Username</Label>
                      <Input
                        id="recovery-username"
                        type="text"
                        value={recoveryData.username}
                        onChange={(e) => setRecoveryData({...recoveryData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
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
                      <Button type="submit" disabled={isLoading} className="flex-1">
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

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
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

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        value={signupData.username}
                        onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
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
