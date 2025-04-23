import { MessageCircle, X } from "lucide-react";
import { useState } from "react";


export function ChatbotLauncher() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (message.trim()) {
      alert(`Sending: ${message}`);
      setMessage("");
    }
  };

  return (
    <>
      {/* Chatbot Panel */}
      {open && (
        <div className="fixed top-1/3 right-6 w-96 max-w-sm bg-white text-black rounded-xl shadow-xl z-50 overflow-hidden border border-gray-300">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-semibold">Calmy</h4>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <div className="p-4 text-sm space-y-2 h-64 overflow-y-auto">
            <div className="bg-gray-100 p-2 rounded">
              👋 Hey! I'm here to listen. What's on your mind?
            </div>
          </div>
          <div className="flex border-t p-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button (middle right) */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-1/2 right-6 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Open Chatbot"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </>
  );
}