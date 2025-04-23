
import { useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const categories = ["My", "Podcasts", "New", "All"];

const meditationItems = [
  {
    id: 1,
    title: "Happiness Clinic",
    subtitle: "GUIDED MEDITATION PODCAST",
    tag: "DEEP SLEEP",
    author: "ridzjcob",
    authorImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    image: "/lovable-uploads/933a9f35-7ca6-4029-8a2c-772ba716449d.png",
    bgColor: "bg-thrive-light-purple",
  },
  {
    id: 2,
    title: "Mindfulness",
    author: "james_clear",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    image: "/lovable-uploads/082cfb5c-79b1-45ec-9584-defeca6aeada.png",
    bgColor: "bg-thrive-pink",
  },
  {
    id: 3,
    title: "The Flower Brain",
    author: "sam9wait",
    authorImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    image: "/lovable-uploads/7e765b0e-d0ca-4663-a39b-98ad928d11ee.png",
    bgColor: "bg-thrive-soft-blue",
  },
  {
    id: 4,
    title: "#15 Meditation",
    author: "thewizard",
    authorImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    image: "/lovable-uploads/b79cd9dc-79af-424e-b59a-f82caa3cff6b.png",
    bgColor: "bg-thrive-light-purple",
  },
];

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("My");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold mb-6">Discover</h1>
        
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === category 
                  ? "bg-thrive-light-purple text-thrive-purple hover:bg-thrive-light-purple/90" 
                  : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {meditationItems.slice(0, 4).map(item => (
            <div key={item.id} className="rounded-lg overflow-hidden card-hover">
              <div className={`${item.bgColor} p-4 h-40 relative flex flex-col justify-between`}>
                {item.subtitle && (
                  <div className="text-xs">{item.subtitle}</div>
                )}
                {item.tag && (
                  <div className="text-xs font-medium">{item.tag}</div>
                )}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className={`${item.bgColor} p-3 flex items-center gap-2`}>
                <UserAvatar 
                  name={item.author} 
                  image={item.authorImage}
                  size="sm"
                />
                <div className="text-sm">
                  <p className="font-semibold leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-600">@{item.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-xl font-bold mb-4">BROWSE ALL</h2>
      </div>
      
      <BottomNav />
    </div>
  );
}
