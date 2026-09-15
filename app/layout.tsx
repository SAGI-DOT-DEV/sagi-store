import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import {GoogleAnalytics} from '../components/analytics/GoogleAnalytics';

export const metadata: Metadata = {
  title: "SAGI Culinary Boutique",
  description: "Single-estate Nigerian provisions and culinary journals.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><GoogleAnalytics/><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></body>
    </html>
  );
}
