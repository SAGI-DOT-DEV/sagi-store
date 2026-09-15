import { apiRequest } from './api-client';
import { mapBackendProduct } from './products.service';
import type { Product } from '../types';

export type BackendCartItem = {
  id: string;
  quantity: number;
  variantId: string;
  variant: {
    id: string;
    name?: string | null;
    sku: string;
    price: string | number;
    weightGrams?: number | null;
    inventory?: { quantity: number; reservedQuantity: number } | null;
    product: {
      id: string;
      slug: string;
      name: string;
      description: string;
      images?: { url: string; alt?: string | null; position?: number }[];
    };
  };
};

export type BackendCart = { id: string; items: BackendCartItem[] };

export function mapCartItem(item: BackendCartItem) {
  const product = mapBackendProduct({
    ...item.variant.product,
    variants: [item.variant],
    images: item.variant.product.images || [],
  });
  const unitPrice = Number(item.variant.price);
  return {
    product,
    selectedWeight: product.availableSizes[0]?.weight || item.variant.name || 'Standard',
    quantity: item.quantity,
    unitPrice,
    variantId: item.variantId,
  };
}

export async function getCart(accessToken: string) {
  return apiRequest<BackendCart>('/api/v1/cart', {}, accessToken);
}

export async function addCartItem(accessToken: string, variantId: string, quantity: number) {
  return apiRequest<BackendCart>('/api/v1/cart/items', { method: 'POST', body: JSON.stringify({ variantId, quantity }) }, accessToken);
}

export async function updateCartItem(accessToken: string, variantId: string, quantity: number) {
  return apiRequest<BackendCart>(`/api/v1/cart/items/${variantId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }, accessToken);
}

export async function removeCartItem(accessToken: string, variantId: string) {
  return apiRequest<BackendCart>(`/api/v1/cart/items/${variantId}`, { method: 'DELETE' }, accessToken);
}
