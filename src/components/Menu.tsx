import { MessageCirclePlus, FileClock, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface MenuProps {
    toggleHistory: () => void;
    startNewChat: () => void;
}

export default function Menu({ toggleHistory, startNewChat }: MenuProps) {
    return (
        <Card className="flex flex-col w-[5%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-800">
            <CardContent className="mx-0 flex flex-col items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={startNewChat}
                                className="mt-3 mb-1 py-6 bg-[#ff8b7c] hover:bg-[#de786a]"
                            >
                                <MessageCirclePlus />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Start New Chat</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={toggleHistory}
                                className="my-1 py-6 hover:bg-neutral-700"
                            >
                                <FileClock />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Chat History</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}