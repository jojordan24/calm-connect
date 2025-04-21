
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";

const campusResources = [
  {
    id: 1,
    title: "University Counseling Center",
    description: "Free confidential counseling services for all enrolled students",
    contact: "555-123-4567",
    location: "Student Center, Room 302",
    hours: "Mon-Fri: 9am-5pm",
  },
  {
    id: 2,
    title: "Peer Support Network",
    description: "Trained student volunteers providing peer support and resources",
    contact: "555-987-6543",
    location: "Library, 2nd Floor",
    hours: "Mon-Thu: 10am-8pm, Fri: 10am-5pm",
  },
];

const emergencyResources = [
  {
    id: 1,
    title: "National Suicide Prevention Lifeline",
    description: "24/7 support for people in distress",
    contact: "988 or 1-800-273-8255",
  },
  {
    id: 2,
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor",
    contact: "Text HOME to 741741",
  },
  {
    id: 3,
    title: "Emergency Services",
    description: "For immediate life-threatening situations",
    contact: "911",
  },
];

export default function CrisisResourcesPage() {
  const navigate = useNavigate();

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
        
        <h1 className="text-2xl font-bold mb-6">Crisis Resources</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">On-Campus Resources</h2>
          <div className="space-y-4">
            {campusResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Contact:</span> {resource.contact}</p>
                    <p><span className="font-medium">Location:</span> {resource.location}</p>
                    <p><span className="font-medium">Hours:</span> {resource.hours}</p>
                  </div>
                  <Button className="w-full mt-4 bg-thrive-purple">Call Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Emergency Resources</h2>
          <div className="space-y-4">
            {emergencyResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Contact:</span> {resource.contact}</p>
                  </div>
                  <Button className="w-full mt-4 bg-thrive-purple">Contact Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
