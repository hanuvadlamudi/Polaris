import { Spinner } from "@/components/ui/spinner";

export const AuthLoadingView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-6 animate-in fade-in duration-700">
            <div className="relative flex items-center justify-center">
                {/* Premium pulse effect background */}
                <div className="absolute inset-0 size-16 bg-primary/10 rounded-full animate-pulse blur-xl" />
                <div className="absolute inset-0 size-12 bg-primary/20 rounded-full animate-ping opacity-75" />
                
                <div className="relative flex items-center justify-center size-12 rounded-full border border-primary/20 bg-background shadow-sm">
                    <Spinner className="size-6 text-primary" />
                </div>
            </div>
            
            <div className="flex flex-col gap-2 text-center">
                <h3 className="text-base font-medium tracking-tight text-foreground">
                    Verifying Identity
                </h3>
                <div className="flex items-center justify-center gap-1.5">
                    <span className="flex size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="flex size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="flex size-1.5 rounded-full bg-primary/40 animate-bounce" />
                </div>
                <p className="text-xs text-muted-foreground/80 max-w-[240px] mx-auto mt-1">
                    Please wait while we establish a secure session with Polaris.
                </p>
            </div>
        </div>
    );
};