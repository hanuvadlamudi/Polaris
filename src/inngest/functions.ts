
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "./client";
import { firecrawl } from "@/lib/firecrawl";
import * as Sentry from "@sentry/nextjs";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(

    { id: "demo-generate", triggers: { event: "app/demo/generate" } },

    async ({ event, step }) => {

        const { prompt = "Write a vegetarian lasagna recipe for 4 people." } = event.data as { prompt?: string; };

        const urls = await step.run("crawl", async () => {
            return prompt.match(URL_REGEX) ?? [];
        }) as string[];

        const scrappedContent = await step.run("scrape-urls", async () => {
            const results = await Promise.all(
                urls.map(async (url) => {
                    const result = await firecrawl.scrape(
                        url,
                        { formats: ["markdown"] }
                    );

                    return result.markdown ?? null;
                })
            );

            return results.filter(Boolean).join("\n\n");
        });

        const finalPrompt = scrappedContent ? `Context: \n ${scrappedContent} \n\n Question: ${prompt}` : prompt;

        console.log("crawled data", urls)

        await step.run("generate-text", async () => {
            return await generateText({
                model: google('gemini-2.5-flash'),
                prompt: finalPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                }
            });
        });
    }
);

export const demoError = inngest.createFunction(
    { id: "demo-error", triggers: { event: "app/demo/error" } },
    async ({ event, step }) => {
        await step.run("simulate-failure", async () => {
            const error = new Error("This is a simulated background job failure");
            Sentry.captureException(error);
            throw error;
        });
    }
);