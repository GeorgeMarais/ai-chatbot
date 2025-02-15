export interface ChatMessage {
    text: string;
    from: "user" | "agent";
    evaluation?: {
        result: string;
        score: string;
        explanation: string;
    };
}

export interface StoredChat {
    id: string;
    messages: ChatMessage[];
    averageScore: number;
    createdAt: string;
    lastUpdated: string;
}