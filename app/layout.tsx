import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextuiProvider from "@/components/providers/nextuiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextuiProvider>
        {children}
        </NextuiProvider>
      </body>
    </html>
  );
}
