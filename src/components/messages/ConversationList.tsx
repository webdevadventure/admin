
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { conversations } from "@/lib/mockData";

interface ConversationListProps {
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
}

const ConversationList = ({ activeConversationId, onSelectConversation }: ConversationListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.landlordName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Tìm kiếm..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "p-4 border-b cursor-pointer hover:bg-gray-50",
              activeConversationId === conversation.id && "bg-blue-50"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.landlordAvatar} />
                  <AvatarFallback>{conversation.landlordName.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate">{conversation.landlordName}</span>
                  <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
              </div>
              
              {conversation.unread > 0 && (
                <Badge className="bg-blue-500 text-white">{conversation.unread}</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
