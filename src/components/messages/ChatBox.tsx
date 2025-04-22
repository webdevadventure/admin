
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { conversations } from "@/lib/mockData";

interface ChatBoxProps {
  conversationId: number;
}

const ChatBox = ({ conversationId }: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversation = conversations.find((c) => c.id === conversationId);
  
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      // Ở đây sẽ xử lý gửi tin nhắn đến API
      // Hiện tại chỉ xóa nội dung trong ô input
      setNewMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Đầu hội thoại */}
      <div className="p-4 border-b flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.landlordAvatar} />
            <AvatarFallback>{conversation.landlordName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.landlordName}</h3>
            <p className="text-xs text-gray-500">
              {conversation.isOnline ? "Đang trực tuyến" : "Ngoại tuyến"}
            </p>
          </div>
        </div>
      </div>

      {/* Nội dung tin nhắn */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {conversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === "admin" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.senderId === "admin" 
                    ? "bg-blue-500 text-white rounded-tr-none" 
                    : "bg-white border rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 text-right ${
                  message.senderId === "admin" ? "text-blue-100" : "text-gray-400"
                }`}>
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Ô nhập tin nhắn */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="icon">
            <Paperclip size={18} />
          </Button>
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..." 
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
