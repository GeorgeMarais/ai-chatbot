import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoredChat } from "@/types/chat";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function RecentsCard({ isHistoryVisible, toggleHistory, onSelectChat }: { isHistoryVisible: boolean; toggleHistory: () => void; onSelectChat: (chatId: string) => void; }) {
    if (!isHistoryVisible) return null;
    const [chats, setChats] = useState<StoredChat[]>([]);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats') || '[]');
        setChats(storedChats);
    }, []);

    return (
        <Card className="flex flex-col w-[25%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10">
            <CardHeader>
                <CardTitle className="flex w-full justify-between text-lg text-white">
                    <span>Recents</span>
                    <X onClick={toggleHistory} className="text-white flex-2 hover:cursor-pointer hover:rotate-90 duration-200" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
                <p className="text-gray-200 text-xs">Current Chat Overview</p>
                <section className="flex flex-row justify-center items-center">
                    {chats.length == 0 && (< p className="text-white text-sm">No recent chats</p>)}
                </section>
                <p className="text-gray-200 text-xs">Chat History</p>
                <section className="flex justify-center items-center">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-4">
                            {chats.map((chat) => (
                                <Card
                                    key={chat.id}
                                    className="p-4 cursor-pointer hover:bg-neutral-700/30"
                                    onClick={() => onSelectChat(chat.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white text-sm font-medium">
                                                {new Date(chat.createdAt).toLocaleDateString()}
                                            </h3>
                                            <p className="text-gray-400 text-xs">
                                                {chat.messages[0]?.text.substring(0, 50)}...
                                            </p>
                                        </div>
                                        <div className="bg-blue-500/20 px-2 py-1 rounded">
                                            <span className="text-white text-xs">
                                                {chat.averageScore}%
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </section>
            </CardContent>
        </Card >
    );
}