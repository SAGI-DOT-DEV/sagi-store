import type { MetadataRoute } from 'next';
import { siteUrl } from '../services/seo';
import { seoCatalog } from '../services/seo-catalog';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = ['', '/products', '/journals'].map(path=>({url:siteUrl+path}));
  // An unavailable catalog returns an error instead of publishing a partial sitemap.
  for(let page=1; ;page++) {
    const result=await seoCatalog(`page=${page}&limit=100&sort=name&order=asc`);
    for(const product of result.items) entries.push({url:`${siteUrl}/products/${encodeURIComponent(product.slug)}`,lastModified:product.updatedAt,images:product.images?.map(image=>image.url)});
    if(page>=result.pagination.totalPages) break;
  }
  return entries;
}
