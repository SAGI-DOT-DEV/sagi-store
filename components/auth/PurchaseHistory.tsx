'use client';

import { useEffect, useState } from 'react';
import { getOrderHistory, type OrderHistoryEntry } from '../../services/order-history.service';
import { OrderHistoryCard } from './OrderHistoryCard';
import { RefreshCw, ShoppingBag } from 'lucide-react';
import Link from 'next/link';


export function PurchaseHistory({ token }: { token: string }) {
  const [attempt, setAttempt] = useState(0);
  const [page, setPage] = useState(0);
  const [result, setResult] = useState<{ key: string; orders: OrderHistoryEntry[]; error: string } | null>(null);
  const key = JSON.stringify([token, attempt]);
  const current = result?.key === key ? result : null;
  useEffect(() => {
    let active = true;
    // Token refresh and Strict Mode can dispose this effect while the read is
    // running. Let it settle, but never publish results from an old effect.
    getOrderHistory(token).then(orders => {
      if (active) setResult({ key, orders, error: '' });
    }).catch(error => {
      if (active) setResult({ key, orders: [], error: error instanceof Error ? error.message : 'Unable to load your orders.' });
    });
    return () => { active = false; };
  }, [key, token]);

  return <div className="space-y-6">
    <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D5] pb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C7B5A]">Your orders {current && !current.error && <span className="ml-2 rounded-full bg-[#EFECE4] px-2 py-1">{current.orders.length}</span>}</p>
      <button type="button" disabled={!current} onClick={() => { setPage(0); setAttempt(value => value + 1); }} className="inline-flex items-center gap-2 rounded-full border border-[#E1D9CA] px-4 py-2 text-xs text-[#6B6457] transition-colors hover:bg-[#EFECE4] disabled:opacity-50"><RefreshCw className="h-3 w-3" />Refresh</button>
    </div>
    {!current ? <div role="status" aria-label="Loading purchase history" className="space-y-3">{[0, 1, 2].map(index => <div key={index} className="h-24 rounded-lg bg-[#EFECE4] motion-safe:animate-pulse" />)}</div>
      : current.error ? <p role="alert" className="text-sm text-[#9B3930]">{current.error} Use Refresh history to try again.</p>
      : !current.orders.length ? <div className="rounded-2xl border border-dashed border-[#D8CEBB] bg-[#F5F1E8] px-6 py-16 text-center"><ShoppingBag className="mx-auto h-9 w-9 text-[#8C7B5A]" /><h2 className="mt-5 font-serif text-3xl">Your pantry story starts here.</h2><p className="mt-3 text-sm text-[#7A7264]">Your orders will find their home here after checkout.</p><Link href="/products" className="mt-6 inline-block rounded-full bg-[#1C1A17] px-6 py-3 text-xs uppercase tracking-widest text-[#FAF9F5]">Explore the provisions</Link></div>
      : <>
        {current.orders.slice(page * 5, page * 5 + 5).map(order => <OrderHistoryCard key={order.id} order={order} />)}
        {current.orders.length > 5 && <div className="flex items-center justify-between gap-3 text-xs">
          <button type="button" disabled={page === 0} onClick={() => setPage(value => value - 1)} className="rounded-lg border border-[#E1D9CA] px-3 py-2 disabled:opacity-40">Previous</button>
          <span>Page {page + 1} of {Math.ceil(current.orders.length / 5)}</span>
          <button type="button" disabled={(page + 1) * 5 >= current.orders.length} onClick={() => setPage(value => value + 1)} className="rounded-lg border border-[#E1D9CA] px-3 py-2 disabled:opacity-40">Next</button>
        </div>}
      </>}
  </div>;
}
