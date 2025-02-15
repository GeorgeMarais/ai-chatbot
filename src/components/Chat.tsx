import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat({ isHistoryVisible }: { isHistoryVisible: boolean }) {
    const [messages, setMessages] = useState<{ text: string; from: "user" | "agent"; evaluation?: any }[]>([]);
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [evaluationResults, setEvaluationResults] = useState<any[]>([]);

    const evaluateHelpfulness = () => {
        const score = Math.floor(Math.random() * 100);
        const passed = score >= 80;
        return {
            result: passed ? 'Passed' : 'Failed',
            score: `${score}%`,
            explanation: passed
                ? 'The agent’s response was helpful.'
                : 'The agent’s response was not helpful.',
        };
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { text: input, from: "user" }]);

        try {
            const response = await fetch("/_api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            data.evaluation = await evaluateHelpfulness();

            setMessages((prev) => [
                ...prev,
                { text: data.response, from: "agent", evaluation: data.evaluation },
            ]);
            setEvaluationResults((prev) => [...prev, data.evaluation]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { text: "Could not get response from AI", from: "agent" },
            ]);
        }

        setInput("");
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            if (!textarea.value.trim() || !textarea.value) {
                textarea.style.height = '24px';
            } else {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
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
        <Card className={`flex flex-col ${isHistoryVisible ? 'w-[70%]' : 'w-[95%]'} mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10 h-full`}>
            <CardHeader>
                <CardTitle className="text-lg text-white">New Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} min-h-fit`}
                    >
                        <div
                            className={`rounded p-3 max-w-[60%] text-sm ${msg.from === 'user'
                                ? 'bg-[#de786a]/20 text-white'
                                : 'bg-gray-700/40 text-white'
                                }`}
                        >
                            <div className="prose max-w-none">
                                {msg.text}
                            </div>

                            {msg.evaluation && (
                                <div className="mt-2 text-xs space-y-1">
                                    <div className="flex flex-row justify-between text-white/90">
                                        <p className="flex flex-col">Result: {msg.evaluation.result}</p>
                                        <p className="flex flex-col">Score: {msg.evaluation.score}</p>
                                    </div>
                                    <div className="flex flex-row text-white/90">
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
                            placeholder="Ask me a question..."
                            className="w-full p-2 text-white placeholder:text-neutral-400 bg-neutral-800/70 border-0 focus:ring-0 focus:outline-none transition-height duration-200"
                            rows={1}
                            style={{
                                resize: "none"
                            }}
                        />
                    </ScrollArea>
                    <Button onClick={sendMessage} className="w-6 h-8 mr-4 bg-[#ff8b7c] hover:bg-[#de786a] rounded-lg flex-shrink-0">
                        <Send className="text-white" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}