
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ConversationList from "@/components/messages/ConversationList";
import ChatBox from "@/components/messages/ChatBox";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { conversations } from "@/lib/mockData";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const landlordId = searchParams.get("landlord");
    if (landlordId) {
      const conversation = conversations.find(c => c.landlordId === parseInt(landlordId));
      if (conversation) {
        setActiveConversationId(conversation.id);
        if (isMobile) {
          setShowChat(true);
        }
      }
    } else if (conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [searchParams, isMobile]);

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <DashboardLayout className="p-0">
      <div className="h-[calc(100vh-64px)] bg-white flex">
        {/* Danh sách hội thoại */}
        {(!isMobile || !showChat) && (
          <div className="w-full md:w-80 h-full">
            <ConversationList 
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        )}
        
        {/* Hộp chat */}
        {(!isMobile || showChat) && (
          <div className="flex-1 h-full relative">
            {isMobile && showChat && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 left-4 z-10"
                onClick={handleBackToList}
              >
                <ArrowLeft size={18} />
              </Button>
            )}
            {activeConversationId ? (
              <ChatBox conversationId={activeConversationId} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Messages;
