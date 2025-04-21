
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MarbleBackground } from "@/components/ui/marble-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !age || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await register(name, email, age, password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
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
        
        <h1 className="text-3xl font-bold mb-8">Register</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-gray-500">Full Name</label>
            <Input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-6"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-500">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-6"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="age" className="text-sm text-gray-500">Age</label>
            <Input
              id="age"
              type="text"
              placeholder="Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="py-6"
            />
          </div>
          
          <div className="space-y-1">
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
          
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-500">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-6"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-black py-6 text-lg mt-8"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </Button>
        </form>
      </div>
    </MarbleBackground>
  );
}
