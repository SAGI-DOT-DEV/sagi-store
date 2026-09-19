import { cache } from 'react';

export type SeoProduct = { name: string; slug: string; description: string; updatedAt: string; images?: {url:string}[] };
type CatalogPage = { items: SeoProduct[]; pagination: {totalPages:number} };
export async function seoCatalog(query: string): Promise<CatalogPage> {
  const base = process.env.BACKEND_API_URL || 'http://localhost:3000';
  const response = await fetch(new URL(`/api/v1/products?${query}`, base), { next: {revalidate: 300}, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Catalog unavailable for SEO');
  const payload = await response.json();
  if (!payload.success || !Array.isArray(payload.data?.items)) throw new Error('Invalid SEO catalog response');
  return payload.data;
}
export const seoProduct = cache(async (slug: string) => (await seoCatalog(`slug=${encodeURIComponent(slug)}&limit=1`)).items[0] ?? null);
