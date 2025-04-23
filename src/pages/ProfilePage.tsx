
import { UserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";
import { DailyQuote } from "@/components/profile/DailyQuote";
import { UserInterests } from "@/components/profile/UserInterests";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const handleCrisisResources = () => {
    navigate("/crisis-resources");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6 flex flex-col items-center">
        <UserAvatar 
          name={user?.name || "Jojo Jordan"} 
          image={user?.avatar || "/lovable-uploads/5cc1789e-4978-46a1-b53d-5d67b8b668ea.png"}
          size="xl"
          className="mb-4"
        />
        
        <h1 className="text-2xl font-bold mb-1">{user?.name || "Jojo Jordan"}</h1>
        <p className="text-gray-500 mb-4">{user?.location || "New York, NY"}</p>
        
        <DailyQuote className="w-full mb-6" />

        <UserInterests 
          interests={user?.interests || ["Yoga for stress relief", "Reading"]} 
          className="w-full mb-6" 
        />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full py-6 mb-4"
              onClick={() => setIsEditing(true)}
            >
              EDIT PROFILE
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="py-6">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <p className="text-gray-500 mb-6">This feature is coming soon!</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(false)}
              >
                Close
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <Button 
          variant="outline" 
          className="w-full py-6 mb-8"
          onClick={handleCrisisResources}
        >
          CRISIS RESOURCES
        </Button>
        
        <div className="w-full mt-auto">
          <Button 
            variant="outline" 
            className="w-full border-red-300 text-red-500 hover:bg-red-50"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
