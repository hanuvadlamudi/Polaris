import * as Sentry from "@sentry/nextjs";

export async function POST() {
    const error = new Error("Simulated Server-side API Failure");
    Sentry.captureException(error);
    throw error;
}
