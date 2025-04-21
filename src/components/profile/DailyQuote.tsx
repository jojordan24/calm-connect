
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface DailyQuoteProps {
  className?: string;
}

// Sample quotes for mental wellness
const quotes = [
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    text: "Take a deep breath. It's just a bad day, not a bad life.",
    author: "Unknown"
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia"
  },
  {
    text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
    author: "Rumi"
  },
  {
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James"
  }
];

export function DailyQuote({ className }: DailyQuoteProps) {
  const [quote, setQuote] = useState<typeof quotes[0]>(quotes[0]);
  
  useEffect(() => {
    // Select a random quote from the array
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };
    
    setQuote(getRandomQuote());
  }, []);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="italic">"{quote.text}"</blockquote>
        <p className="text-right mt-2 text-sm">— {quote.author}</p>
      </CardContent>
    </Card>
  );
}
