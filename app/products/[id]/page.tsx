import { RouteContent } from "../../../components/RouteContent";
import { StorefrontShell } from "../../../components/StorefrontShell";
import { decodeProductRoute } from '../../../services/product-route';
import { pageMetadata } from '../../../services/seo';
import { seoProduct } from '../../../services/seo-catalog';
import type { Metadata } from 'next';

export async function generateMetadata({params}: {params:Promise<{id:string}>}): Promise<Metadata> {
  const slug = decodeProductRoute((await params).id);
  try {
    const product = await seoProduct(slug);
    if (!product) return {title:'Product not found',robots:{index:false,follow:false}};
    const description = product.description.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim().slice(0,160);
    return pageMetadata(product.name,description || `Shop ${product.name} at SAGI.`,`/products/${encodeURIComponent(product.slug)}`);
  } catch {
    return {title:'SAGI product',robots:{index:false,follow:false}};
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StorefrontShell><RouteContent view="product" productId={decodeProductRoute(id)} /></StorefrontShell>;
}
