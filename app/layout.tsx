import type { Metadata } from "next";

import { DM_Sans, Inter, Poppins } from "next/font/google";

import "./globals.css";

import AuthProvider from "@/components/shared/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = DM_Sans({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "whispra",
  description: "Whisphra is a web app to chat with your friends",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <AuthProvider>
          <body
            className={`${poppins.className} ${inter.variable} ${geistSans.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </AuthProvider>
      </html>
    </TRPCReactProvider>
  );
}
