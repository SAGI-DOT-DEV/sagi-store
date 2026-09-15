'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, LoaderCircle, Package, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { findCheckoutOrder, type ConfirmedOrder } from '../../services/order-confirmation.service';
import { formatMoney } from './ShippingOptions';
import { Confetti } from '../ui/Confetti';
import { pendingCheckoutKey } from '../../services/checkout.service';
import {trackPurchase} from '../../services/analytics';

const paidStatuses = ['PAID', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export function CheckoutSuccess({ sessionId }: { sessionId: string }) {
  const { user, accessToken, isLoading, setAuthModalOpen } = useAuth();
  const [result, setResult] = useState<{ key: string; order: ConfirmedOrder | null; checking: boolean; error: string } | null>(null);
  const [retry, setRetry] = useState(0);
  const key = JSON.stringify([sessionId, user?.id, accessToken, retry]);
  const current = result?.key === key ? result : null;
  const order = current?.order;
  const confirmed = Boolean(order && paidStatuses.includes(order.status));
  useEffect(()=>{function send(){if(order&&confirmed)trackPurchase(order);}send();window.addEventListener('sagi:analytics-consent',send);return()=>window.removeEventListener('sagi:analytics-consent',send);},[order,confirmed]);
  const checking = Boolean(sessionId && user && accessToken && (!current || current.checking));

  useEffect(() => {
    if (!confirmed || !user?.id || !order?.id) return;
    const storageKey = pendingCheckoutKey(user.id);
    if (window.sessionStorage.getItem(storageKey) === order.id) window.sessionStorage.removeItem(storageKey);
    window.dispatchEvent(new CustomEvent('sagi:cart-refresh'));
  }, [confirmed, user?.id, order?.id]);

  useEffect(() => {
    if (!sessionId || !user || !accessToken) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    const check = async () => {
      try {
        const order = await findCheckoutOrder(sessionId, accessToken, controller.signal);
        if (controller.signal.aborted) return;
        attempts += 1;
        const pending = !order || ['PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes(order.status);
        const checking = pending && attempts < 10;
        setResult({ key, order, checking, error: '' });
        if (checking) timer = setTimeout(check, 3000);
      } catch (error) {
        if (!controller.signal.aborted) setResult({
          key, order: null, checking: false,
          error: error instanceof Error ? error.message : 'Unable to check your payment right now.',
        });
      }
    };
    void check();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [key, sessionId, user, accessToken]);

  const title = !sessionId ? 'Checkout link unavailable'
    : confirmed ? 'Thank you for your order'
    : checking || isLoading ? 'Confirming your payment'
    : !user ? 'Welcome back'
    : 'Your payment status';

  return <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
    {confirmed && <Confetti key={order?.id} />}
    <div className="space-y-5 text-center" aria-live="polite">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#EFECE4] text-[#1C1A17]">
        {checking || isLoading ? <LoaderCircle className="h-8 w-8 animate-spin" /> : confirmed ? <Check className="h-9 w-9" /> : <Package className="h-8 w-8" />}
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8C7B5A]">SAGI · Your pantry, thoughtfully provisioned</p>
      <h1 className="font-serif text-3xl text-[#1C1A17] sm:text-5xl">{title}</h1>
      <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#6B6457]">
        {!sessionId ? 'This link is missing a valid checkout reference.'
          : confirmed ? 'Your payment is confirmed. Thank you for making SAGI part of your kitchen.'
          : !user && !isLoading ? 'Sign in to securely view your order and payment confirmation.'
          : checking || isLoading ? 'We are waiting for payment confirmation. This may take a few moments.'
          : current?.error || (order && order.status !== 'PENDING_PAYMENT'
            ? 'This order is currently ' + order.status.toLowerCase().replaceAll('_', ' ') + '.'
            : 'Payment has not yet been confirmed here. Please check again shortly before making another payment.')}
      </p>
    </div>

    {order && <section className="mt-10 space-y-5 rounded-lg border border-[#E8E2D5] bg-[#FAF9F5] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D5] pb-4">
        <h2 className="font-serif text-xl">Order details</h2>
        <span className="rounded-full bg-[#EFECE4] px-3 py-1 text-xs">{order.status.replaceAll('_', ' ')}</span>
      </div>
      <p className="break-all text-xs text-[#7A7264]">Order reference: {order.id}</p>
      <ul className="space-y-4">{order.items.map((item) => <li key={item.id} className="flex justify-between gap-4 text-sm">
        <div><p className="font-medium">{item.name}</p><p className="text-xs text-[#7A7264]">Quantity: {item.quantity}</p></div>
        <span>{formatMoney(Number(item.unitPrice) * item.quantity, order.currency)}</span>
      </li>)}</ul>
      <dl className="space-y-3 border-t border-[#E8E2D5] pt-4 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(Number(order.subtotal), order.currency)}</dd></div>
        <div className="flex justify-between"><dt>Shipping</dt><dd>{formatMoney(Number(order.shippingAmount), order.currency)}</dd></div>
        <div className="flex justify-between font-semibold"><dt>{confirmed ? 'Total paid' : 'Order total'}</dt><dd>{formatMoney(Number(order.total), order.currency)}</dd></div>
      </dl>
    </section>}
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {sessionId && !user && !isLoading && <button onClick={() => setAuthModalOpen(true)} className="rounded-lg bg-[#1C1A17] px-6 py-3 text-sm text-[#FAF9F5]">Sign in to view order</button>}
      {sessionId && user && !checking && !confirmed && <button onClick={() => setRetry((value) => value + 1)} className="rounded-lg border border-[#D9D2C5] px-6 py-3 text-sm">Check payment status</button>}
      <Link href="/products" className="inline-flex items-center gap-2 rounded-lg bg-[#1C1A17] px-6 py-3 text-sm text-[#FAF9F5]">Continue shopping <ArrowRight className="h-4 w-4 text-[#D4AF37]" /></Link>
      <Link href="/journals" className="rounded-lg border border-[#D9D2C5] px-6 py-3 text-sm text-[#5C5549]">Explore recipes</Link>
    </div>
  </div>;
}
