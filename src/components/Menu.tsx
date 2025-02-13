import { MessageCirclePlus, FileClock, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

export default function Menu({ toggleHistory }: { toggleHistory: () => void }) {
    let [mode, setMode] = useState<"light" | "dark">("dark");
    return (
        <Card className="flex flex-col w-[5%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-800">
            <CardContent className="mx-0 flex flex-col items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="mt-3 mb-1 py-6 bg-[#ff8b7c] hover:bg-[#de786a]"><MessageCirclePlus></MessageCirclePlus></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Start New Chat</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={toggleHistory} className="my-1 py-6"><FileClock></FileClock></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Chat History</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="my-1 py-6" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>{mode === 'dark' ? <Moon></Moon> : <Sun></Sun>}</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Change Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}