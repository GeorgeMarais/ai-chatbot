import Menu from "@/components/Menu";
import RecentsCard from "@/components/RecentsCard";
import Chat from "@/components/Chat";
import { useEffect, useState } from "react";
import { StoredChat } from "@/types/chat";

export default function Home() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<StoredChat[]>([]);

  const toggleHistory = () => {
    setIsHistoryVisible((prev) => !prev);
  };

  const startNewChat = () => {
    setSelectedChatId(null);
    setIsHistoryVisible(false);
  };

  const handleChatUpdate = (updatedChats: StoredChat[] | string) => {
    if (typeof updatedChats === 'string') {
      setSelectedChatId(updatedChats);
    } else {
      setChats(updatedChats);

      if (!selectedChatId && updatedChats.length > 0) {
        setSelectedChatId(updatedChats[0].id);
      } else if (updatedChats.length === 0) {
        setSelectedChatId(null);
      }
    }
  };

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats') || '[]');
    setChats(storedChats);

    if (storedChats.length > 0) {
      setSelectedChatId(storedChats[0].id);
    }
  }, []);

  return (
    <section
      className="flex flex-row justify-center items-stretch mx-10 h-[calc(100vh-5rem)]"
    >
      <Menu
        toggleHistory={toggleHistory}
        startNewChat={startNewChat}
      />

      {isHistoryVisible && (
        <RecentsCard
          toggleHistory={toggleHistory}
          chats={chats}
          selectedChatId={selectedChatId}
          onChatsUpdate={handleChatUpdate}
        />
      )}

      <Chat
        isHistoryVisible={isHistoryVisible}
        chats={chats}
        onChatUpdate={handleChatUpdate}
        selectedChatId={selectedChatId}
      />
    </section>
  );
}