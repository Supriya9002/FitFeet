import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, Phone, Mail, Building2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function VendorAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Vendor Portal</CardTitle>
          <CardDescription>
            अपनी दुकान को ऑनलाइन ले जाएं
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <VendorLoginForm />
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <VendorSignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function VendorLoginForm() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo credentials - In production, use Supabase authentication
    if (contact === "vendor@fitfeet.com" && password === "vendor123") {
      localStorage.setItem("vendorAuthenticated", "true");
      localStorage.setItem("vendorEmail", contact);
      toast({
        title: "Login Successful",
        description: "Welcome to your vendor dashboard!",
      });
      navigate("/vendor-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try vendor@fitfeet.com / vendor123",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          <strong>Demo Credentials:</strong><br />
          Email: vendor@fitfeet.com<br />
          Password: vendor123
        </AlertDescription>
      </Alert>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact">Mobile/Email</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Mobile number या Email"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password डालें"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login करें"}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          नया vendor हैं?{" "}
          <button type="button" className="text-primary hover:underline">
            Signup करें
          </button>
        </div>
      </form>
    </div>
  );
}

function VendorSignupForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="mobile"
            placeholder="Mobile number"
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shopName">Shop Name</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="shopName"
            placeholder="दुकान का नाम"
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword">Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Password बनाएं"
        />
      </div>
      
      <Button className="w-full" size="lg">
        Signup करें
      </Button>
      
      <div className="text-center text-sm text-muted-foreground">
        पहले से account है?{" "}
        <button type="button" className="text-primary hover:underline">
          Login करें
        </button>
      </div>
    </form>
  );
}