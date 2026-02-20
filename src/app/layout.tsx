import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rei da Verdade | Auto de Páscoa 2026 - Igreja Batista Capital",
  description: "Uma experiência cinematográfica que vai tocar sua alma. Auto de Páscoa 2026 em Brasília. De 30 de março a 03 de abril. Garanta seu ingresso!",
  keywords: ["Auto de Páscoa", "Rei da Verdade", "Igreja Batista Capital", "Brasília", "Páscoa 2026", "Teatro Cristão"],
  authors: [{ name: "Igreja Batista Capital" }],
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    title: "Rei da Verdade | Auto de Páscoa 2026",
    description: "Uma experiência cinematográfica que vai tocar sua alma. De 30 de março a 03 de abril em Brasília.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
