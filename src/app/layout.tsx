import type {Metadata} from "next";
import {Montserrat as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Navbar from "@/components/common/Navbar";
import {CartProvider} from "@/lib/context/CartContext";
import {Toaster} from "@/components/ui/sonner";

const fontSans = FontSans({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Luxury Extra Premium Shop",
    description: "Добро пожаловатб",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn(
                "h-dvh  ",
                fontSans.variable
            )}
        >
        <div className={'max-w-screen-2xl mx-auto p-3 space-y-7'}>
            <CartProvider>
                <Navbar/>
                {children}
                <Toaster richColors position={"bottom-right"} />
            </CartProvider>
        </div>
        </body>
        </html>
    );
}
