
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  interests?: string[];
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, age: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("thrive_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function - simulated for frontend only
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    // For now, we'll simulate a successful login with a mock user
    const mockUser = {
      id: "user-123",
      name: "Jojo Jordan",
      email: email,
      avatar: "/jojo_profile.jpeg",
      location: "New York, NY",
      interests: ["Yoga for stress relief", "Reading"]
    };
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("thrive_user", JSON.stringify(mockUser));
  };

  // Register function - simulated for frontend only
  const register = async (name: string, email: string, age: string, password: string) => {
    // In a real app, this would call an API
    // For now, we'll simulate a successful registration with a mock user
    const mockUser = {
      id: "user-" + Math.floor(Math.random() * 1000),
      name: name || "Jojo Jordan",
      email: email,
      avatar: "/jojo_profile.jpeg",
      location: "SAN FRANCISCO, CA",
      interests: ["Yoga for stress relief", "Reading"]
    };
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("thrive_user", JSON.stringify(mockUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("thrive_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
