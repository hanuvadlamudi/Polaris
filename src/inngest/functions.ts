
import { inngest } from "./client";

export const processTask = inngest.createFunction(
    { id: "hello-world", triggers: { event: "app/hello.world" } },
    async ({ event, step }) => {
        console.log("hello-world", event);
        await step.sleep("pause", "1s");

        return { message: `Hello ${event.data.email}` };
    }
);