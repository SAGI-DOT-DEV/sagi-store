import { Check, Clock3, Package, Truck } from 'lucide-react';
import type { OrderHistoryEntry } from '../../services/order-history.service';
import { formatMoney } from '../checkout/ShippingOptions';
import { OrderHistoryItem } from './OrderHistoryItem';
import Link from 'next/link';

export function OrderHistoryCard({ order }: { order: OrderHistoryEntry }) {
  const delivered = order.status === 'DELIVERED';
  const transit = ['SHIPPED', 'OUT_FOR_DELIVERY'].includes(order.status);
  const pending = ['PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes(order.status);
  const Icon = delivered ? Check : transit ? Truck : pending ? Clock3 : Package;
  const count = order.items.reduce((sum, item) => sum + item.quantity, 0);
  return <article className="overflow-hidden rounded-2xl border border-[#E8E2D5] bg-[#FFFDF8] shadow-[0_6px_30px_-20px_rgba(28,26,23,0.22)]">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D5] px-5 py-5 sm:px-8">
      <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C7B5A]">Order placed</p>
        <h2 className="mt-1 font-serif text-xl sm:text-2xl">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</h2></div>
      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-wider ${delivered ? 'border-[#CED9C8] bg-[#EDF2E9] text-[#486044]' : 'border-[#E5DBC5] bg-[#F3EEE2] text-[#786442]'}`}>
        <Icon className="h-3.5 w-3.5" />{order.status.replaceAll('_', ' ')}
      </span>
    </header>
    <div className="grid md:grid-cols-[minmax(0,1fr)_250px]">
      <div className="p-5 sm:p-8">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C7B5A]">Your provisions <span className="ml-2 text-[#AAA08B]">/ {String(count).padStart(2, '0')} {count === 1 ? 'item' : 'items'}</span></p>
        <ul className="space-y-6">{order.items.map(item => <OrderHistoryItem key={item.id} item={item} currency={order.currency} />)}</ul>
      </div>
      <aside aria-label="Order summary" className="border-t border-[#E8E2D5] bg-[#F5F1E8] p-5 sm:p-8 md:border-l md:border-t-0">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C7B5A]">Order summary</p>
        <dl className="space-y-3 text-xs text-[#6B6457]">
          <div className="flex justify-between gap-2"><dt>Subtotal</dt><dd>{formatMoney(Number(order.subtotal), order.currency)}</dd></div>
          <div className="flex justify-between gap-2"><dt>Shipping</dt><dd>{formatMoney(Number(order.shippingAmount), order.currency)}</dd></div>
          <div className="border-t border-dashed border-[#D8CEBB] pt-4"><dt className="text-[10px] uppercase tracking-widest">Order total</dt><dd className="mt-1 font-serif text-2xl text-[#1C1A17]">{formatMoney(Number(order.total), order.currency)}</dd></div>
        </dl>
        {pending && <Link href={`/checkout?orderId=${encodeURIComponent(order.id)}`} className="mt-5 flex items-center justify-center rounded-full bg-[#1C1A17] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#FAF9F5] transition-colors hover:bg-[#33302B]">Continue payment</Link>}
        <p className="mt-6 text-[9px] uppercase tracking-widest text-[#8C7B5A]">Reference</p><p className="mt-1 break-all font-mono text-[10px] leading-relaxed text-[#8C8270]">{order.id}</p>
      </aside>
    </div>
  </article>;
}
