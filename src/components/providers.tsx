"use client";

import { ClerkProvider, useAuth, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, ConvexReactClient, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./themes-provider";
import { dark } from "@clerk/themes";
import { AuthWall } from "@/features/auth/components/auth-wall";
import { AuthLoadingView } from "@/features/auth/components/auth-loading-view";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider
            appearance={{
                theme: dark,
            }}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    <Authenticated>
                        <UserButton />

                        {children}

                    </Authenticated>

                    <Unauthenticated>
                        <AuthWall />
                    </Unauthenticated>

                    <AuthLoading>
                        <AuthLoadingView />
                    </AuthLoading>

                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};

