
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smile, Frown, Meh, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useToast } from "@/hooks/use-toast";

type Mood = "happy" | "neutral" | "sad" | null;

export default function MoodCheckPage() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Select a mood",
        description: "Please select how you're feeling today",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to an API
    console.log("Mood logged:", { mood: selectedMood, note });
    
    toast({
      title: "Mood recorded",
      description: "Your mood has been successfully recorded",
    });
    
    // Navigate back to dashboard
    navigate("/");
  };

  const MoodOption = ({ type, icon, label }: { type: Mood, icon: React.ReactNode, label: string }) => (
    <Button
      variant="outline"
      className={`flex flex-col items-center p-6 ${selectedMood === type ? 'border-thrive-purple bg-thrive-light-purple' : ''}`}
      onClick={() => setSelectedMood(type)}
    >
      {icon}
      <span className="mt-2">{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">How are you feeling today?</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <MoodOption 
            type="happy" 
            icon={<Smile className="h-10 w-10 text-green-500" />} 
            label="Happy" 
          />
          <MoodOption 
            type="neutral" 
            icon={<Meh className="h-10 w-10 text-amber-500" />} 
            label="Neutral" 
          />
          <MoodOption 
            type="sad" 
            icon={<Frown className="h-10 w-10 text-red-500" />} 
            label="Sad" 
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-sm text-gray-500 mb-2">
            Add a note about how you're feeling (optional)
          </label>
          <Textarea
            placeholder="I'm feeling..."
            className="min-h-[150px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        
        <Button 
          className="w-full bg-thrive-purple"
          onClick={handleSubmit}
        >
          Save Mood
        </Button>
      </div>
      
      <BottomNav />
    </div>
  );
}
