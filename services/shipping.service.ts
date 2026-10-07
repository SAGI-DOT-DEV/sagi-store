import { apiRequest } from './api-client';

export type ShippingPolicy = { freeShippingThreshold: number | null; currency: string };

export function getShippingPolicy() {
  return apiRequest<ShippingPolicy>('/api/v1/shipping/policy');
}

export type ShippingRate = {
  id: string;
  carrier: string;
  service: string;
  amount: string;
  currency: string;
  estimatedDays?: number | null;
  durationTerms?: string | null;
};

export type ShippingQuote = {
  subtotal: number;
  currency: string;
  freeShippingEligible: boolean;
  rates: ShippingRate[];
};

export function getShippingQuote(addressId: string, token: string, signal?: AbortSignal) {
  return apiRequest<ShippingQuote>('/api/v1/shipping/rates', {
    method: 'POST', body: JSON.stringify({ addressId }), signal,
  }, token);
}
