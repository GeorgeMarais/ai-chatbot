import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoredChat } from "@/types/chat";
import { Trash2, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ChatHistoryProps {
    chats: StoredChat[];
    selectedChatId: string | null;
    toggleHistory: () => void;
    onChatsUpdate: (chatsOrId: StoredChat[] | string) => void;
}

export default function RecentsCard({ toggleHistory, onChatsUpdate, selectedChatId, chats }: ChatHistoryProps) {
    const handleSelectChat = (chatId: string) => {
        onChatsUpdate(chatId);
    };

    const handleClearAll = () => {
        localStorage.setItem("chats", "[]");
        onChatsUpdate([]);
    };

    const handleDeleteChat = (chatId: string) => {
        const existingChats = JSON.parse(localStorage.getItem("chats") || "[]");
        const updatedChats = existingChats.filter((c: StoredChat) => c.id !== chatId);
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        onChatsUpdate(updatedChats);
    }

    return (
        <Card className="flex flex-col w-[25%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10">
            <CardHeader>
                <CardTitle className="flex w-full justify-between text-lg text-white">
                    <span>Recents</span>
                    <X onClick={toggleHistory} className="text-white flex-2 hover:cursor-pointer hover:rotate-90 duration-200" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 overflow-y-auto">
                <p className="text-gray-200 text-xs">Current Chat Overview</p>
                {chats.length === 0 && (
                    <section className="flex flex-row justify-center items-center">
                        <p className="text-white text-sm">No recent chats</p>
                    </section>
                )}

                {chats.length > 0 && (
                    <>
                        <section>
                            {chats.filter((c: StoredChat) => c.id === selectedChatId).map((chat) => (
                                <Card
                                    key={chat.id}
                                    className="p-4 w-full border-none bg-neutral-700/30"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white text-sm font-medium">
                                                {chat.messages[0]?.text.substring(0, 50)}...
                                            </h3>
                                            <p className="text-gray-400 text-xs">
                                                {new Date(chat.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className={`${chat.averageScore > 50 ? "bg-green-400/20" : "bg-[#de786a]/20"} text-white px-2 py-1 rounded`}>
                                                        <span className="text-white text-xs">
                                                            {chat.averageScore}%
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Conversation Quality</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </Card>
                            ))}
                        </section>

                        <section className="flex w-full justify-between items-center">
                            <p className="text-gray-200 text-xs">Chat History</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearAll}
                                className="text-red-400 hover:bg-red-500/20 hover:text-white"
                            >
                                Clear History
                            </Button>
                        </section>
                    </>
                )}

                <section className="flex justify-center items-center w-full">
                    <ScrollArea className="h-[calc(100vh-200px)] w-full">
                        <div className="space-y-4">
                            {chats.filter((c: StoredChat) => c.id !== selectedChatId).map((chat) => (
                                <Card
                                    key={chat.id}
                                    className="p-4 cursor-pointer border-none bg-gray-700/40 text-white hover:bg-neutral-700/30 w-full"
                                    onClick={() => handleSelectChat(chat.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white text-sm font-medium">
                                                {chat.messages[0]?.text.substring(0, 50)}...
                                            </h3>
                                            <p className="text-gray-400 text-xs">
                                                {new Date(chat.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-red-400/20 px-3 py-1 rounded"
                                            onClick={() => { handleDeleteChat(chat.id) }}
                                        >
                                            <Trash2 className="h-5 w-5 text-white" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </section>
            </CardContent>
        </Card>
    );
}