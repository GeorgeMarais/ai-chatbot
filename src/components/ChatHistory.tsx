import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatHistory({ isHistoryVisible }: { isHistoryVisible: boolean }) {
    if (!isHistoryVisible) return null;
    return (
        <Card className="flex flex-col w-[25%] mx-2 border-1 border-neutral-900 backdrop-blur-sm bg-neutral-400/10">
            <CardHeader>
                <CardTitle className="text-lg text-white">Recents</CardTitle>
            </CardHeader>
        </Card>
    );
}