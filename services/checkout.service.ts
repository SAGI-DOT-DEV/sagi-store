import { apiRequest } from './api-client';
import type { ConfirmedOrder } from './order-confirmation.service';

export type CheckoutOrder = Omit<ConfirmedOrder, 'payments'> & { addressId: string | null; shippingCarrier?: string | null; shippingService?: string | null };
export const pendingCheckoutKey = (userId: string) => `sagi_pending_checkout:${userId}`;

export const checkoutService = {
  getOrder: (id: string, token: string) => apiRequest<CheckoutOrder>(`/api/v1/orders/${encodeURIComponent(id)}`, { cache: 'no-store' }, token),
  createOrder: (addressId: string, shippingRateId: string, token: string) =>
    apiRequest<CheckoutOrder>('/api/v1/orders', {
      method: 'POST', body: JSON.stringify({ addressId, shippingRateId }),
    }, token),
  startPayment: (orderId: string, token: string) =>
    apiRequest<{ url: string | null }>('/api/v1/payments/checkout', {
      method: 'POST',
      headers: { 'Idempotency-Key': `checkout-${orderId}` },
      body: JSON.stringify({ orderId }),
    }, token),
};
