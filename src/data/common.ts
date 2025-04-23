import { Calendar, Dumbbell, BookOpen } from "lucide-react";
// Mock mood data
export const moodData = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 1 },
  { day: "Fri", value: 2 },
  { day: "Sat", value: 3 },
  { day: "Sun", value: 2.5 },
];

// Self care suggestions with proper links
export const selfCareItems = [
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