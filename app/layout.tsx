// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnimatedNotes from "@/components/AnimatedNotes";
import NotePop from "@/components/ NotePop";

export const metadata: Metadata = {
    title: "Big Band Arrangements",
    description: "Buy professional big band charts online",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-neutral-950 text-neutral-100">
            <body>
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-blue-950/30 to-purple-900/10 z-0 blur-2xl pointer-events-none" />
                <NotePop />
                <AnimatedNotes />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
