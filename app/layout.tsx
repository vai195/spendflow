import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Punk Tracker",
  description:
    "Crypto Punk Tracker is a web app that allows you to search for crypto coins based on their market cap and price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main className='p-4 max-w-7xl m-auto'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
