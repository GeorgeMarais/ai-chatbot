import Menu from "@/components/Menu";
import ChatHistory from "@/components/ChatHistory";
import Chat from "@/components/Chat";
import { useState } from "react";

export default function Home() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);

  const toggleHistory = () => {
    setIsHistoryVisible((prev) => !prev);
  };

  return (
    <>
      <section className="flex flex-row justify-center items-stretch mx-10 h-full" style={{ height: "calc(100vh - 5rem)" }}>
        <Menu toggleHistory={toggleHistory} />
        <ChatHistory isHistoryVisible={isHistoryVisible} />
        <Chat isHistoryVisible={isHistoryVisible} />
      </section>
    </>
  );
}
