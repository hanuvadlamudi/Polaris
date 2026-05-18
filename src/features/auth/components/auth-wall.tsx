import { ShieldAlert } from "lucide-react"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from "@/components/ui/item"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const AuthWall = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-in fade-in zoom-in duration-500">
            <Item variant="outline" className="max-w-md bg-card/50 backdrop-blur-sm border-dashed">
                <ItemMedia variant="icon" className="bg-amber-500/10 text-amber-500">
                    <ShieldAlert className="size-6" />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="text-lg">Authentication Required</ItemTitle>
                    <ItemDescription>
                        You need to be signed in to access this section of Polaris. Please sign in or create an account to continue.
                    </ItemDescription>
                </ItemContent>
                <ItemActions className="mt-6 flex flex-wrap justify-center gap-4">
                    <SignInButton mode="modal">
                        <span className={cn(buttonVariants({ variant: "default" }), "min-w-[120px] font-semibold tracking-tight shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer")}>
                            Sign In
                        </span>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <span className={cn(buttonVariants({ variant: "outline" }), "min-w-[120px] font-semibold tracking-tight transition-all hover:bg-accent/80 hover:scale-105 active:scale-95 cursor-pointer")}>
                            Create Account
                        </span>
                    </SignUpButton>
                </ItemActions>
            </Item>
        </div>
    )
}