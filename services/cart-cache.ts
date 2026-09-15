import { z } from 'zod';
import type { CartItem } from '../types';

const product = z.object({
  id: z.string(), name: z.string(), image: z.string(), price: z.number(), priceFormatted: z.string(),
  subtitle: z.string(), category: z.string(), origin: z.string(), estate: z.string(), description: z.string(), provenanceStory: z.string(),
  galleryImages: z.array(z.string()), tastingNotes: z.array(z.string()), culinaryUses: z.array(z.string()),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  availableSizes: z.array(z.object({ weight: z.string(), priceMultiplier: z.number(), inStock: z.boolean(), stockQuantity: z.number().optional() })),
}).passthrough();
const cacheSchema = z.array(z.object({ product, selectedWeight: z.string(), quantity: z.number().int().positive(), unitPrice: z.number().nonnegative(), variantId: z.string().optional() }).passthrough());
const key = (userId: string) => `sagi_cart:${userId}`;

export function readCartCache(userId: string): CartItem[] {
  try {
    const parsed = cacheSchema.safeParse(JSON.parse(localStorage.getItem(key(userId)) || '[]'));
    return parsed.success ? parsed.data as CartItem[] : [];
  } catch { return []; }
}
export function writeCartCache(userId: string, items: CartItem[]) {
  try { localStorage.setItem(key(userId), JSON.stringify(items)); } catch { /* Optional display cache. */ }
}
export function clearCartCache(userId: string) {
  try { localStorage.removeItem(key(userId)); } catch { /* Storage may be disabled. */ }
}
