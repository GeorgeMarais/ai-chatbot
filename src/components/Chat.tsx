import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage, StoredChat } from "@/types/chat";

interface ChatProps {
    isHistoryVisible: boolean;
    chats: StoredChat[];
    onChatUpdate: (chatsOrId: StoredChat[] | string) => void;
    selectedChatId: string | null;
}

export default function Chat({ isHistoryVisible, chats, onChatUpdate, selectedChatId }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const saveChat = (id: string, chatMessages: ChatMessage[]) => {
        const existingChats = JSON.parse(localStorage.getItem("chats") || "[]");
        const averageScore = calculateAverageScore(chatMessages);

        const chatData: StoredChat = {
            id,
            messages: chatMessages,
            averageScore,
            createdAt: existingChats.find((c: StoredChat) => c.id === id)?.createdAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const updatedChats = [
            ...existingChats.filter((c: StoredChat) => c.id !== id),
            chatData
        ].sort((a: StoredChat, b: StoredChat) =>
            new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );

        localStorage.setItem("chats", JSON.stringify(updatedChats));
        onChatUpdate?.(updatedChats);
    };

    useEffect(() => {
        if (selectedChatId) {
            const storedChats = JSON.parse(localStorage.getItem("chats") || "[]");
            const selectedChat = storedChats.find((chat: StoredChat) => chat.id === selectedChatId);
            if (selectedChat) {
                setMessages(selectedChat.messages);
            }
        } else {
            setMessages([]);
        }
    }, [selectedChatId]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    // Calculate average score of all messages to determine conversation quality
    const calculateAverageScore = (messages: ChatMessage[]): number => {
        const scoresWithEval = messages
            .filter(msg => msg.evaluation?.score)
            .map(msg => parseInt(msg.evaluation!.score.replace("%", "")));

        if (scoresWithEval.length === 0) return 0;
        return Math.round(scoresWithEval.reduce((a, b) => a + b, 0) / scoresWithEval.length);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const currentChatId = selectedChatId || `chat_${Date.now()}`;
        if (!selectedChatId) {
            onChatUpdate(currentChatId);
            saveChat(currentChatId, messages);
        }

        const newUserMessage: ChatMessage = { text: input, from: "user" };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);

        try {
            const response = await fetch("/api/chatAPI", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const newAgentMessage: ChatMessage = {
                text: data.response,
                from: "agent",
                evaluation: data.evaluation
            };

            const finalMessages = [...updatedMessages, newAgentMessage];
            setMessages(finalMessages);

            const storedChats = chats || [];
            const updatedChats = [
                ...storedChats.filter((c: StoredChat) => c.id !== currentChatId),
                {
                    id: currentChatId,
                    messages: finalMessages,
                    averageScore: calculateAverageScore(finalMessages),
                    createdAt: storedChats.find((c: StoredChat) => c.id === currentChatId)?.createdAt || new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                }
            ].sort((a: StoredChat, b: StoredChat) =>
                new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
            );

            onChatUpdate(updatedChats);
            saveChat(currentChatId, finalMessages);

        } catch (error) {
            const errorMessage: ChatMessage = {
                text: "Could not get response from AI due to this error: " + error,
                from: "agent"
            };
            const finalMessages = [...updatedMessages, errorMessage];
            setMessages(finalMessages);
        }

        setInput("");
        adjustHeight();
        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "24px";
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = scrollHeight > 144 ? "144px" : `${scrollHeight}px`;
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        adjustHeight();
    };

    useEffect(() => {
        adjustHeight();
    }, []);

    return (
        <Card className={`flex flex-col ${isHistoryVisible ? "w-[70%]" : "w-[95%]"} mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10 h-full`}>
            <CardHeader>
                <CardTitle className="text-lg text-white">
                    {selectedChatId ? "Continue Chat" : "New Chat"}
                </CardTitle>
            </CardHeader>
            <CardContent
                className="flex flex-col space-y-4 h-[calc(100vh-16rem)] overflow-y-auto"
                ref={scrollAreaRef}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} min-h-fit`}
                    >
                        <div
                            className={`rounded p-3 max-w-[60%] text-sm ${msg.from === "user"
                                ? "bg-[#de786a]/20 text-white"
                                : "bg-gray-700/40 text-white"
                                }`}
                        >
                            <div className="prose max-w-none whitespace-pre-wrap">
                                {msg.text}
                            </div>
                            {msg.from === "agent" && (<hr className="my-4 border-neutral-600" />)}
                            {msg.evaluation && (
                                <div className="mt-2 text-xs space-y-1">
                                    <div className="flex flex-row justify-between text-neutral-300">
                                        <p className={`flex flex-col ${msg.evaluation.result === "Failed" ? "text-red-400" : "text-green-400"}`}>Result: {msg.evaluation.result}</p>
                                        <p className="flex flex-col">Score: {msg.evaluation.score}</p>
                                    </div>
                                    <div className="flex flex-row text-neutral-300">
                                        <p>Explanation: {msg.evaluation.explanation}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="mt-auto pb-4">
                <div className="flex items-center w-full min-h-[60px] bg-neutral-800/70 border-0 rounded-lg">
                    <ScrollArea className="w-full max-h-[144px] overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask me a question..."
                            className="w-full p-2 text-white placeholder:text-neutral-400 bg-neutral-800/70 border-0 focus:ring-0 focus:outline-none transition-height duration-200"
                            rows={1}
                            style={{
                                resize: "none"
                            }}
                        />
                    </ScrollArea>
                    {loading && (
                        <Button disabled>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button>
                    )}
                    {!loading && (
                        <Button
                            onClick={sendMessage}
                            className="w-6 h-8 mr-4 bg-[#ff8b7c] hover:bg-[#de786a] rounded-lg flex-shrink-0"
                        >
                            <Send className="text-white" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}