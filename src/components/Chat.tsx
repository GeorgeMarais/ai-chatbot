import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat({ isHistoryVisible }: { isHistoryVisible: boolean }) {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
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
            <CardContent className="flex-1 flex flex-row overflow-y-auto">
                {/* Add chat messages */}
            </CardContent>
            <CardFooter className="mt-auto pb-4">
                <div className="flex items-center w-full min-h-[60px] bg-neutral-800/70 border-0 rounded-lg">
                    <ScrollArea className="w-full max-h-[144px] overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleInput}
                            placeholder="Ask me a question..."
                            className="w-full p-2 text-white placeholder:text-neutral-400 bg-neutral-800/70 border-0 focus:ring-0 focus:outline-none transition-height duration-200"
                            rows={1}
                            style={{
                                resize: "none"
                            }}
                        />
                    </ScrollArea>
                    <Button className="w-6 h-8 mr-4 bg-[#ff8b7c] hover:bg-[#de786a] rounded-lg flex-shrink-0">
                        <Send className="text-white" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}