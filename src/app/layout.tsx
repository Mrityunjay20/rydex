import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css"; 
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RydeX - Premium Car Rentals in Delhi NCR",
    template: "%s | RydeX",
  },
  description:
    "Premium self-drive car rental service in Delhi NCR. Choose from SUVs, Sedans, Hatchbacks & Luxury cars at affordable prices.",
  keywords: [
    "car rental Delhi",
    "self drive car Delhi NCR",
    "car hire Gurugram",
    "rent a car Noida",
    "RydeX",
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
        {/* Razorpay Checkout */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* Google Ads / gtag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17287035496"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17287035496');
          `}
        </Script>

        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}