import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export default function RecentsCard({ isHistoryVisible, toggleHistory }: { isHistoryVisible: boolean; toggleHistory: () => void; }) {
    if (!isHistoryVisible) return null;
    return (
        <Card className="flex flex-col w-[25%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10">
            <CardHeader>
                <CardTitle className="flex w-full justify-between text-lg text-white">
                    <span>Recents</span>
                    <X onClick={toggleHistory} className="text-white flex-2 hover:cursor-pointer hover:rotate-90 duration-200" />
                </CardTitle>
            </CardHeader>
        </Card>
    );
}