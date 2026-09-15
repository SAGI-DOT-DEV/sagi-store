import { apiRequest } from './api-client';

export type ConfirmedOrder = {
  id: string; status: string; currency: string;
  subtotal: string; shippingAmount: string; total: string;
  items: { id: string; variantId?:string; name: string; quantity: number; unitPrice: string }[];
  payments: { checkoutSessionId?: string | null }[];
};

export async function findCheckoutOrder(sessionId: string, token: string, signal: AbortSignal) {
  const orders = await apiRequest<ConfirmedOrder[]>('/api/v1/orders', { signal, cache: 'no-store' }, token);
  return orders.find((order) => order.payments.some((payment) => payment.checkoutSessionId === sessionId)) || null;
}
