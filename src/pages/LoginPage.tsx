
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MarbleBackground } from "@/components/ui/marble-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarbleBackground>
      <div className="p-6 flex flex-col min-h-screen">
        <Link to="/welcome" className="text-gray-500 mb-6">
          ← Back
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Log In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-500">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-6"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-500">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-6"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-black py-6 text-lg mt-8"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOG IN"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Don't have an account? 
            <Link to="/register" className="text-thrive-purple ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </MarbleBackground>
  );
}
