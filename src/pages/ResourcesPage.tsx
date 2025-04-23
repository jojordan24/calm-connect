import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";

const campusResources = [
  {
    id: 1,
    title: "University Counseling Center",
    description: "Free confidential counseling services for all enrolled students.",
    contact: "555-123-4567",
    location: "Student Center, Room 302",
    hours: "Mon–Fri: 9am–5pm",
  },
  {
    id: 2,
    title: "Peer Support Network",
    description: "Trained student volunteers offering peer support and guidance.",
    contact: "555-987-6543",
    location: "Library, 2nd Floor",
    hours: "Mon–Thu: 10am–8pm, Fri: 10am–5pm",
  },
];

const emergencyResources = [
  {
    id: 1,
    title: "National Suicide & Crisis Lifeline",
    description: "24/7 free and confidential support for anyone in distress.",
    contact: "📞 988 or 1-800-273-8255",
  },
  {
    id: 2,
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a trained crisis counselor.",
    contact: "📱 Text HOME to 741741",
  },
  {
    id: 3,
    title: "Emergency Services",
    description: "For immediate life-threatening emergencies.",
    contact: "🚨 911",
  },
];

export default function CrisisResourcesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="p-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-2 text-primary">Support Resources</h1>
        <p className="text-muted-foreground mb-6">
          You’re not alone — here are people and places ready to support you.
        </p>

        {/* On-Campus Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-foreground">On-Campus Support</h2>
          <div className="space-y-4">
            {campusResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p><strong>Contact:</strong> {resource.contact}</p>
                    <p><strong>Location:</strong> {resource.location}</p>
                    <p><strong>Hours:</strong> {resource.hours}</p>
                  </div>
                  <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
                    📞 Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-600">Emergency Resources</h2>
          <div className="space-y-4">
            {emergencyResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p><strong>Contact:</strong> {resource.contact}</p>
                  </div>
                  <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
                    📞 Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
