
import { cn } from "@/lib/utils";

interface MarbleBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const MarbleBackground = ({
  children,
  className,
}: MarbleBackgroundProps) => {
  return (
    <div className={cn("marble-background min-h-screen w-full", className)}>
      {children}
    </div>
  );
};
