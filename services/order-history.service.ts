import { apiRequest } from './api-client';
import type { ConfirmedOrder } from './order-confirmation.service';

export type OrderHistoryItem = ConfirmedOrder['items'][number] & { image?: string | null; availableInStore?: boolean };
export type OrderHistoryEntry = Omit<ConfirmedOrder, 'items'> & { createdAt: string; items: OrderHistoryItem[] };

export function getOrderHistory(token: string, signal?: AbortSignal) {
  return apiRequest<OrderHistoryEntry[]>('/api/v1/orders/purchase-history', { signal, cache: 'no-store' }, token);
}
