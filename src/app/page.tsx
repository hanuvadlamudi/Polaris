"use client"

import { Button } from "@/components/ui/button"
import * as Sentry from "@sentry/nextjs"

export default function Home() {

    const handleBlocking = async () => {
        await fetch("/api/demo/blocking", { method: "POST" });
    }

    const handleBackground = async () => {
        await fetch("/api/demo/background", { method: "POST" });
    }

    const handleApiError = async () => {
        try {
            const res = await fetch("/api/demo/error", { method: "POST" });
            if (!res.ok) {
                const errorText = await res.text();
                const error = new Error(`API Error: Status ${res.status} - ${errorText}`);
                Sentry.captureException(error);
                alert(`API Error Triggered (Status ${res.status}). Captured by Sentry!`);
            } else {
                alert("API call succeeded unexpectedly!");
            }
        } catch (err: any) {
            Sentry.captureException(err);
            alert(`Network/Client error: ${err.message}`);
        }
    }

    const handleInngestError = async () => {
        try {
            const res = await fetch("/api/demo/background-error", { method: "POST" });
            if (res.ok) {
                alert("Inngest error event dispatched successfully!\nOpen your Inngest dev server dashboard at http://localhost:8288 to view the failed 'demo-error' run.");
            } else {
                alert("Failed to dispatch background error event");
            }
        } catch (err: any) {
            Sentry.captureException(err);
            alert(`Request failed: ${err.message}`);
        }
    }

    const handleClientError = () => {
        const error = new Error("Simulated client-side error");
        Sentry.captureException(error);
        alert("Client-side error triggered and captured by Sentry!");
        throw error;
    }

    return (
        <div className="p-8 flex flex-col gap-4">
            <div className="flex gap-4">
                <Button onClick={handleBlocking}>
                    Blocking
                </Button>
                
                <Button onClick={handleBackground}>
                    Background
                </Button>
            </div>
            
            <div className="flex gap-4">
                <Button onClick={handleApiError} variant="destructive">
                    API Error
                </Button>
                
                <Button onClick={handleInngestError} variant="destructive">
                    Inngest Error
                </Button>

                <Button onClick={handleClientError} variant="destructive">
                    Client Error
                </Button>
            </div>
        </div>
    )
}
