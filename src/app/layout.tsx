import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'KlasAfrica - Learn, Teach, Grow',
  description: 'Empowering Africa through accessible education and AI-driven learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/*
        The 'dark' class is applied to the html tag.
        Ensuring no whitespace or comments are direct children of <html> before <body>
        to prevent hydration errors. Next.js handles the <head> automatically.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster /> {/* Toaster component correctly placed inside body */}
      </body>
    </html>
  );
}
