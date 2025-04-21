
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatar({ name, image, className, size = "md" }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="bg-thrive-light-purple text-thrive-purple">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
