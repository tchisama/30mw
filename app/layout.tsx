import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextuiProvider from "@/components/30mw components/providers/nextuiProvider";
import LanguageProvider from "@/components/30mw components/providers/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  test
}: Readonly<{
  children: React.ReactNode;
  test:React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
        />
      </head>
      <body className={inter.className + "  "}>
        <LanguageProvider>
          <NextuiProvider>
            <div className="border rounded-xl m-1 bg-red-100">{test}</div>
            {children}
          </NextuiProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
