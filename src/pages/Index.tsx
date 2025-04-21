
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { Calendar, Home, Dumbbell, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuth } from "@/contexts/auth-context";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

// Mock mood data
const moodData = [
  { day: 'Aug 1', value: 70 },
  { day: 'Aug 2', value: 65 },
  { day: 'Aug 3', value: 80 },
  { day: 'Aug 4', value: 75 },
  { day: 'Aug 5', value: 60 },
  { day: 'Aug 6', value: 85 },
  { day: 'Aug 7', value: 73 },
];

// Self care suggestions with proper links
const selfCareItems = [
  {
    id: 1,
    title: "Yoga for stress relief",
    description: "15 minute guided session",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    link: "/discover?activity=yoga"
  },
  {
    id: 2,
    title: "Reading list",
    description: "Recommended wellness books",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/discover?activity=reading"
  }
];

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Good day");
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState({ temp: "65°F", condition: "clear" });
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/welcome");
    }
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    // Set current time
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(time);
    
    // Mock weather data could be fetched from API in real implementation
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <div className="flex items-center gap-4 mb-4">
            <UserAvatar 
              name={user.name} 
              image={user.avatar}
              size="lg"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {greeting}, {user.name.split(' ')[0]}. It's {currentTime}
              </h2>
              <p className="text-gray-500">The weather today is {weather.temp} and {weather.condition}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-medium">Recent Mood</h3>
            <Button variant="ghost" size="sm" className="text-thrive-purple">
              →
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-2">You recorded your mood 2 days ago</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-700">Mood over time</CardTitle>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Stable</span>
              <span className="text-sm text-red-500">Last 7 days -5%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Upcoming</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <Calendar className="h-4 w-4" />
            <span>Therapy session with Dr. Smith on Aug 10 at 11am</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Self care tips</h3>
          <div className="grid grid-cols-2 gap-4">
            {selfCareItems.map(item => (
              <Link to={item.link} key={item.id} className="block">
                <div className="card-hover rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="relative h-40">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <div className="text-white">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <p className="font-medium">{item.title}</p>
                        </div>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
