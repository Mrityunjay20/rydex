import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RyderX - Premium Car Rentals in Delhi NCR",
    template: "%s | RyderX",
  },
  description:
    "Premium self-drive car rental service in Delhi NCR. Choose from SUVs, Sedans, Hatchbacks & Luxury cars at affordable prices.",
  keywords: [
    "car rental Delhi",
    "self drive car Delhi NCR",
    "car hire Gurugram",
    "rent a car Noida",
    "RyderX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
