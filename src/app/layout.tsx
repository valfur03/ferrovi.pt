import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    title: "Ferrovipathe : Le jeu",
    description: "Testez tous les jours vos connaissances du métro parisien en reliant deux stations par le plus petit nombre d'arrêts !"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
