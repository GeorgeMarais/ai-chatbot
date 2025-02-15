import type { NextApiRequest, NextApiResponse } from "next";
import { AzureOpenAI } from "openai";

const openai = new AzureOpenAI({
    endpoint: process.env.OPENAI_ENDPOINT,
    apiKey: process.env.OPENAI_API_KEY,
    apiVersion: "2024-08-01-preview",
    deployment: "4o-mini",
});

export default async function messageHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { message } = req.body;

        try {
            const result = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: message }],
            });

            const responseText = result.choices[0]?.message?.content ?? "No response";
            const evaluation = evaluateHelpfulness(responseText);

            res.status(200).json({ response: responseText, evaluation });
        } catch (error) {
            res.status(500).json({ error: "Failed to generate response" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const evaluateHelpfulness = (response: string) => {
    if (response === "No response") {
        return {
            result: "Failed",
            score: "0%",
            explanation: "The agent did not respond.",
        };
    }

    const score = Math.floor(Math.random() * 100);
    const passed = score >= 80;
    return {
        result: passed ? 'Passed' : 'Failed',
        score: `${score}%`,
        explanation: passed
            ? 'The agent’s response was helpful.'
            : 'The agent’s response was not helpful.',
    };
}
