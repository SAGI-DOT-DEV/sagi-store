import type { CheckoutOrder } from '../../services/checkout.service';
import { formatMoney } from './ShippingOptions';

export function SavedOrderSummary({ order }: { order: CheckoutOrder }) {
  return <div className="space-y-5">
    <p className="text-xs capitalize text-[#8C7B5A]">{order.status.toLowerCase().replaceAll('_', ' ')}</p>
    <ul className="space-y-4">{order.items.map(item => <li key={item.id} className="flex justify-between gap-4 text-sm">
      <div><p>{item.name}</p><p className="mt-1 text-xs text-[#7A7264]">Quantity: {item.quantity}</p></div>
      <span>{formatMoney(Number(item.unitPrice) * item.quantity, order.currency)}</span>
    </li>)}</ul>
    <dl className="space-y-3 border-t border-[#E8E2D5] pt-4 text-sm">
      <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(Number(order.subtotal), order.currency)}</dd></div>
      <div className="flex justify-between"><dt>Shipping</dt><dd>{formatMoney(Number(order.shippingAmount), order.currency)}</dd></div>
      <div className="flex justify-between font-semibold"><dt>Order total</dt><dd>{formatMoney(Number(order.total), order.currency)}</dd></div>
    </dl>
    <p className="text-xs text-[#7A7264]">{[order.shippingCarrier, order.shippingService].filter(Boolean).join(' — ')}</p>
    <p className="break-all text-xs text-[#7A7264]">Order reference: {order.id}</p>
  </div>;
}
