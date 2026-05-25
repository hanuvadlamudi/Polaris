
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "./client";

export const demoGenerate = inngest.createFunction(
    { id: "demo-generate", triggers: { event: "app/demo/generate" } },
    async ({ event, step }) => {
        console.log("demo-generate", event);
        await step.run("generate-text", async () => {
            return await generateText({
                model: google('gemini-2.5-flash'),
                prompt: 'Write a vegetarian lasagna recipe for 4 people.',
            });
        });
    }
);