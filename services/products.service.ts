import { apiRequest } from './api-client';
import { formatCAD } from './currency';

import type { Product } from '../types';

type BackendVariant = {
  id: string;
  name?: string | null;
  sku: string;
  price: string | number;
  weightGrams?: number | null;
  inventory?: { quantity: number; reservedQuantity: number } | null;
};

type BackendProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  origin?: string | null;
  highlights?: string[];
  category?: { name: string } | null;
  images?: { url: string; alt?: string | null; position?: number }[];
  variants?: BackendVariant[];
};

function formatWeight(grams?: number | null, fallback = 'Standard') {
  if (!grams) return fallback;
  return grams >= 1000 ? `${grams / 1000} KG` : `${grams} g`;
}

export function mapBackendProduct(product: BackendProduct): Product {
  const variants = [...(product.variants ?? [])].sort((a, b) => Number(a.price) - Number(b.price));
  const firstVariant = variants[0];
  const images = [...(product.images ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const price = Number(firstVariant?.price ?? 0);

  return {
    subtitle: '',
    origin: product.origin?.trim() || '',
    highlights: (product.highlights ?? []).filter(value => value.trim()),
    estate: '',
    provenanceStory: '',
    tastingNotes: [],
    culinaryUses: [],
    specifications: [],
    id: product.id,
    slug: product.slug,
    backendVariantId: firstVariant?.id,
    backendVariantIds: variants.map((variant) => variant.id),
    name: product.name,
    category: product.category?.name?.trim() || '',
    description: product.description,
    price,
    priceFormatted: formatCAD(price),
    image: images[0]?.url || '/product-placeholder.svg',
    galleryImages: images.map((image) => image.url),
    availableSizes: variants.length
      ? variants.map((variant) => ({
          weight: formatWeight(variant.weightGrams, variant.name || 'Standard'),
          priceMultiplier: price ? Number(variant.price) / price : 1,
          inStock: (variant.inventory?.quantity ?? 0) - (variant.inventory?.reservedQuantity ?? 0) > 0,
          stockQuantity: Math.max(0, (variant.inventory?.quantity ?? 0) - (variant.inventory?.reservedQuantity ?? 0)),
        }))
      : [{ weight: 'Standard', priceMultiplier: 1, inStock: false, stockQuantity: 0 }],
  };
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const result = await apiRequest<{ items: BackendProduct[] }>(`/api/v1/products?slug=${encodeURIComponent(slug)}&limit=1`);
  const product = result.items?.[0];
  if (!product) throw new Error('Product not found');
  return mapBackendProduct(product);
}

export async function getProducts(limit = 100, query = ''): Promise<Product[]> {
  const result = await apiRequest<{ items: BackendProduct[] }>(`/api/v1/products?limit=${limit}&q=${encodeURIComponent(query)}`);
  return (result.items ?? []).map(mapBackendProduct);
}

export async function getProductCategories(): Promise<string[]> {
  const result = await apiRequest<{ name: string }[]>('/api/v1/categories');
  return [...new Set((result ?? [])
    .map((category) => category.name.trim())
    .filter(Boolean))];
}
