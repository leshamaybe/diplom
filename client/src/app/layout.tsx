import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    applicationName: "LMessenger",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    roboto.className,
                    "w-full h-full overflow-hidden"
                )}
                suppressHydrationWarning
            >
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
