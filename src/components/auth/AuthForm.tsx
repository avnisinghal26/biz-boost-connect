
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<"personal" | "business">("personal");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, type: "login" | "register") => {
    e.preventDefault();
    setIsLoading(true);
    
    // Normally, this would connect to an authentication backend
    // For now, we'll simulate success for demo purposes
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: type === "login" ? "Logged in successfully!" : "Account created successfully!",
        description: "Welcome to BizConnect",
      });
      
      // Store some fake auth data for UI testing
      localStorage.setItem("bizconnect-auth", JSON.stringify({
        isLoggedIn: true,
        accountType,
        username: "demo_user",
        avatar: "https://i.pravatar.cc/150?img=32"
      }));
      
      // Redirect based on account type
      if (accountType === "business") {
        navigate("/business-dashboard");
      } else {
        navigate("/feed");
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-bizconnect-orange hover:bg-bizconnect-orange/90" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-username">Username</Label>
              <Input id="reg-username" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input id="reg-password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="flex space-x-4">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="accountType" 
                    checked={accountType === "personal"}
                    onChange={() => setAccountType("personal")} 
                    className="w-4 h-4 text-bizconnect-orange"
                  />
                  <span>Personal</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="accountType" 
                    checked={accountType === "business"}
                    onChange={() => setAccountType("business")} 
                    className="w-4 h-4 text-bizconnect-orange"
                  />
                  <span>Business</span>
                </Label>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-bizconnect-orange hover:bg-bizconnect-orange/90" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
