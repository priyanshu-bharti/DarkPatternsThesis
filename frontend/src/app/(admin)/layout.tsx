import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import "remixicon/fonts/remixicon.css";
import NavigationBar from "@/components/navbar/navbar";

const sansFont = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mr. Keeper - Detect Dark patterns on the web.",
    description: "Mr. Keeper - Detect Dark patterns on the web.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={sansFont.className}>
                <div className="min-h-screen">
                    <NavigationBar />
                    <div className="container mx-auto px-4">{children}</div>
                </div>
            </body>
        </html>
    );
}
