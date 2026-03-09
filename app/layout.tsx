import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "IDEAFORGE AI — Validate Your Startup Idea in Seconds",
    description:
        "AI-powered startup validation using real market signals, competitor intelligence, and demand insights. Turn your idea into a startup blueprint.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
