import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import "remixicon/fonts/remixicon.css";
import NavigationBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

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
                <div className="min-h-screen flex flex-col">
                    <NavigationBar />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
