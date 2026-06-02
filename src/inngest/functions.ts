
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "./client";
import { firecrawl } from "@/lib/firecrawl";

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
            });
        });
    }
);