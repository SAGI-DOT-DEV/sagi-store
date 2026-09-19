import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { AccountModalHost } from '../components/auth/AuthModal';
import { CartProvider } from '../context/CartContext';
import {GoogleAnalytics} from '../components/analytics/GoogleAnalytics';
import { indexingAllowed, siteDescription, siteUrl, shareImage, jsonLd } from '../services/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SAGI | Nigerian Pantry Staples in Canada', template: '%s | SAGI' },
  description: siteDescription,
  applicationName: 'SAGI',
  robots: { index: indexingAllowed, follow: indexingAllowed },
  openGraph: { type:'website', siteName:'SAGI', locale:'en_CA', title:'SAGI Culinary Boutique', description:siteDescription, images:[shareImage] },
  twitter: {card:'summary_large_image', title:'SAGI Culinary Boutique', description:siteDescription, images:[shareImage]},
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'Organization',name:'SAGI',url:siteUrl,logo:`${siteUrl}/Asset%201%20(1).png`})}} /><GoogleAnalytics/><AuthProvider><CartProvider>{children}<AccountModalHost /></CartProvider></AuthProvider></body>
    </html>
  );
}
