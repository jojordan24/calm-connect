
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Calendar, Home, Dumbbell, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuth } from "@/contexts/auth-context";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

// Mock mood data
const moodData = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 1 },
  { day: "Fri", value: 2 },
  { day: "Sat", value: 3 },
  { day: "Sun", value: 2.5 },
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
  const moodMap = {
    1: "😔",
    2: "🙂",
    3: "😄",
  };

  const handleCrisisResources = () => {
    navigate("/crisis-resources");
  };
  
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
      <div className="p-7">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4 p-4 bg-muted rounded-lg border border-muted-foreground/10">
            <div className="flex items-center gap-4">
              <UserAvatar name={user.name} image={user.avatar} size="lg" />
              <div>
                <h2 className="text-xl font-semibold">
                  {greeting}, {user.name.split(' ')[0]}. It's {currentTime}
                </h2>
                <p className="text-gray-500">
                  The weather today is {weather.temp} and {weather.condition}
                </p>
              </div>
            </div>
            <div className="ml-auto cursor-pointer">
              <Button
                variant="default"
                className="bg-green-500 text-white px-6 py-3 rounded-md text-sm font-semibold shadow-md transition-all"
                onClick={handleCrisisResources}
              >
                ☎️ My Resources
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          {/* Title and motivation */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-semibold text-gray-800">Your Mood Over Time</h3>
          </div>
          <p className="text-sm text-gray-500 mb-5 italic">
            "It's okay to have ups and downs — awareness is the first step to understanding yourself better."
          </p>
          {/* Mood Graph Card */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-emerald-500">Mood: Fluctuating like the stock market 😶‍🌫️</span>
                <span className="text-sm text-gray-400">Last 7 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={[1, 3]}
                      ticks={[1, 2, 3]}
                      tickFormatter={(val) => moodMap[val]}
                      tick={{ fontSize: 16 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 4 }}
                    />
                    <Tooltip
                      formatter={(value: any) => moodMap[value] || value}
                      labelFormatter={(label) => `Day: ${label}`}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mb-4 border p-3 rounded-sm border-blue-300">
          <h3 className="text-lg font-medium mb-2">Upcoming:</h3>
          <div className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center bg-white/10 rounded- p-2 w-14 h-14 border border-white/20">
              <span className="text-xs text-gray-400">APR</span>
              <span className="text-lg font-semibold text-gray-500">25</span>
            </div>
            <div className="flex flex-col text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">11:00 AM</span>
              </div>
              <span className="underline text-gray-600">Therapy session with Dr. Smith</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Self care tips</h3>
          <div className="grid grid-cols-2 gap-4">
            {selfCareItems.map(item => (
              <Link to={item.link} key={item.id} className="block">
                <div className="card-hover cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
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
