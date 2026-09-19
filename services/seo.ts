import type { Metadata } from 'next';

export const siteUrl = new URL(process.env.SITE_URL || 'https://sagi-store.vercel.app').origin;
export const siteDescription = 'Shop Nigerian pantry staples in Canada and explore recipes from the SAGI kitchen. Discover provisions, ingredients and culinary inspiration.';
export const shareImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'SAGI — Nigerian provisions and culinary inspiration' };
export const indexingAllowed = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, siteUrl).href;
  return { title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'SAGI', locale: 'en_CA', type: 'website', images: [shareImage] },
    twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
  };
}

export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
