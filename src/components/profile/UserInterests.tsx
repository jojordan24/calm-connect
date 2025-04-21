
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInterestsProps {
  interests?: string[];
  className?: string;
}

export function UserInterests({ interests = [], className }: UserInterestsProps) {
  if (!interests || interests.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} variant="outline" className="bg-thrive-light-purple/10 hover:bg-thrive-light-purple/20 text-thrive-purple border-thrive-purple/20">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
