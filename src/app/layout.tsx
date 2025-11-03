import type { Metadata } from "next";
import { Public_Sans } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "@/features/auth/Providers";
import { Toaster } from "@/components/ui/sonner";


const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: "ElectroBuz",
  description: "A platform to buy and sell electronics with ease and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} antialiased  min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          <main className="flex-1">
            {children}
          </main>
          <div>
            <Footer />
          </div>
        </Providers>
        <Toaster duration={2000} position="top-left" />
      </body>
    </html>
  );
}
