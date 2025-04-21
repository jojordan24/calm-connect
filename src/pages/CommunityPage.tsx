
import { useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/navigation/BottomNav";
import { MessageSquare, Heart, Send } from "lucide-react";

// Mock community posts
const mockPosts = [
  {
    id: 1,
    author: "Sophie Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    time: "2 hours ago",
    content: "Just finished a 20-minute meditation session. Feeling refreshed and ready to tackle my finals! Anyone else find meditation helps with exam stress?",
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    author: "Marcus Williams",
    authorImage: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    time: "Yesterday",
    content: "I've been trying the campus counseling services and I'm really impressed. If anyone's hesitant about reaching out for help, just know they're super supportive and it's completely confidential.",
    likes: 47,
    comments: 15,
    liked: true,
  },
  {
    id: 3,
    author: "Aisha Johnson",
    authorImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    time: "3 days ago",
    content: "Does anyone have recommendations for managing anxiety during midterms? I've been trying breathing exercises but could use some additional strategies.",
    likes: 36,
    comments: 22,
    liked: false,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return {
          ...post,
          liked: newLiked,
          likes: newLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the post to an API
    console.log("New post:", newPostContent);
    setNewPostContent("");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Community</h1>
        
        <div className="mb-6">
          <form onSubmit={handlePostSubmit} className="flex items-center gap-2">
            <Input
              placeholder="Share something with the community..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon" className="bg-thrive-purple">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <UserAvatar 
                  name={post.author} 
                  image={post.authorImage}
                  size="sm"
                />
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              
              <p className="mb-4">{post.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button 
                  className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
