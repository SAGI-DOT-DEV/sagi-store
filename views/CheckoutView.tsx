'use client';

import { useEffect, useRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { checkoutService, pendingCheckoutKey, type CheckoutOrder } from '../services/checkout.service';
import {trackEvent} from '../services/analytics';
import { SavedOrderSummary } from '../components/checkout/SavedOrderSummary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ProfileModal } from '../components/auth/ProfileModal';
import { AuthSelect } from '../components/auth/AuthSelect';
import { ShippingOptions, formatMoney } from '../components/checkout/ShippingOptions';
import { getShippingQuote, type ShippingQuote } from '../services/shipping.service';

export const CheckoutView = ({ requestedOrderId }: { requestedOrderId?: string } = {}) => {
  const router = useRouter();
  const cartEditVersion = useRef(0);
  const [restoreDismissed, setRestoreDismissed] = useState(false);
  const { cart, addingToCartKey, setActiveView } = useCart();
  const { user, accessToken, isLoading: authLoading, setAuthModalOpen } = useAuth();
  const [addressId, setAddressId] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [result, setResult] = useState<{ key: string; quote?: ShippingQuote; error?: string } | null>(null);
  const [rateId, setRateId] = useState('');
  const [retry, setRetry] = useState(0);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [pendingOrder, setPendingOrder] = useState<{ id: string; userId: string; order: CheckoutOrder } | null>(null);
  const [restoredKey, setRestoredKey] = useState('');
  const [restoreError, setRestoreError] = useState('');
  const [restoreAttempt, setRestoreAttempt] = useState(0);
  const restoreKey = JSON.stringify([user?.id, restoreAttempt, requestedOrderId, restoreDismissed]);
  const restoring = Boolean(user && accessToken && restoredKey !== restoreKey);
  const resumeOrder = pendingOrder?.userId === user?.id ? pendingOrder : null;
  const canResume = resumeOrder && ['PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes(resumeOrder.order.status);
  useEffect(() => {
    const edited = () => {
      cartEditVersion.current += 1;
      setRestoreDismissed(true);
      setPendingOrder(null);
      setRestoreError('');
      setCheckoutError('');
      if (user?.id) window.sessionStorage.removeItem(pendingCheckoutKey(user.id));
      if (requestedOrderId) router.replace('/checkout', { scroll: false });
    };
    window.addEventListener('sagi:cart-edited', edited);
    return () => window.removeEventListener('sagi:cart-edited', edited);
  }, [user?.id, requestedOrderId, router]);
  useEffect(() => {
    if (!user || !accessToken || restoredKey === restoreKey) return;
    let active = true;
    const editVersion = cartEditVersion.current;
    const restore = async () => {
      try {
        const id = restoreDismissed ? undefined : requestedOrderId;
        if (!id) {
          window.sessionStorage.removeItem(pendingCheckoutKey(user.id));
          if (active) setRestoreError('');
          return;
        }
        const order = id ? await checkoutService.getOrder(id, accessToken) : null;
        if (!active || editVersion !== cartEditVersion.current) return;
        if (order) window.sessionStorage.setItem(pendingCheckoutKey(user.id), order.id);
        setPendingOrder(order ? { id: order.id, userId: user.id, order } : null);
        setRestoreError('');
      } catch {
        if (active && editVersion === cartEditVersion.current) setRestoreError('We could not restore your checkout. Retry before starting another order.');
      } finally { if (active && editVersion === cartEditVersion.current) setRestoredKey(restoreKey); }
    };
    void restore();
    return () => { active = false; };
  }, [user?.id, accessToken, restoreKey, requestedOrderId, restoreDismissed, restoredKey]);
  const checkoutLock = useRef(false);
  const addresses = user?.addresses || [];
  const address = addresses.find((item) => item.id === addressId)
    || addresses.find((item) => item.isDefault) || addresses[0];
  const cartKey = JSON.stringify(cart.map((item) => [item.variantId, item.quantity, item.unitPrice]).sort());
  const addressKey = JSON.stringify(address || null);
  const key = JSON.stringify([accessToken, addressKey, cartKey, addingToCartKey, retry]);
  const ready = Boolean(user && accessToken && address && cart.length && !addingToCartKey && !restoring && !restoreError && !resumeOrder);
  const current = result?.key === key ? result : null;
  const loading = ready && !current;
  const quote = ready ? current?.quote : undefined;
  // Product prices use the store currency. Do not add a foreign-currency rate
  // to that subtotal without a currency conversion supplied by the backend.
  const rates = quote?.rates.filter((rate) =>
    rate.currency.toUpperCase() === quote.currency.toUpperCase()
    && Number.isFinite(Number(rate.amount)) && Number(rate.amount) >= 0) || [];
  const rate = rates.find((item) => item.id === rateId);
  const money = (amount: number) => quote ? formatMoney(amount, quote.currency) : '—';

  useEffect(() => {
    if (!ready || !accessToken || !address) return;
    let active = true;
    setRateId('');
    const timer = window.setTimeout(() => {
      getShippingQuote(address.id, accessToken).then((quote) => {
        if (!active) return;
        setResult({ key, quote });
        const first = quote.rates.find((item) => item.currency.toUpperCase() === quote.currency.toUpperCase()
          && Number.isFinite(Number(item.amount)) && Number(item.amount) >= 0);
        setRateId(first?.id || '');
      }).catch((error: unknown) => {
        if (active) setResult({
          key, error: error instanceof Error ? error.message : 'Unable to calculate shipping.',
        });
      });
    }, 350);
    // Cart/address changes invalidate this quote. Let an in-flight request
    // settle without publishing its result or surfacing a cleanup AbortError.
    return () => { active = false; window.clearTimeout(timer); };
  }, [key, ready, accessToken, address]);

  const startCheckout = async () => {
    if (checkoutLock.current || restoring || restoreError || !accessToken || !user || (resumeOrder && !canResume) || (!resumeOrder && (!rate || !address || !ready))) return;
    checkoutLock.current = true;
    const editVersion = cartEditVersion.current;
    setCheckoutBusy(true);
    setCheckoutError('');
    try {
      // Reuse the saved order when Stripe is retried; cart removal happens only
      // after confirmed payment.
      const order = resumeOrder ? await checkoutService.getOrder(resumeOrder.id, accessToken) : await checkoutService.createOrder(address!.id, rate!.id, accessToken);
      if (editVersion !== cartEditVersion.current) return;
      setPendingOrder({ id: order.id, userId: user.id, order });
      window.sessionStorage.setItem(pendingCheckoutKey(user.id), order.id);
      if (!['PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes(order.status)) throw new Error('This order is no longer awaiting payment. See your purchase history for its status.');
      const session = await checkoutService.startPayment(order.id, accessToken);
      if (editVersion !== cartEditVersion.current) return;
      if (!session.url) throw new Error('Payment link is unavailable. Please retry checkout.');
      const url = new URL(session.url);
      if (url.protocol !== 'https:') throw new Error('Invalid payment link.');
      trackEvent('begin_checkout',{currency:order.currency,value:Number(order.subtotal),items:order.items.map(item=>({item_id:item.variantId??item.id,item_name:item.name,price:Number(item.unitPrice),quantity:item.quantity}))});
      window.location.assign(url.href);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout. Please retry.');
    } finally {
      checkoutLock.current = false;
      setCheckoutBusy(false);
    }
  };

  return <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
    <button type="button" onClick={() => setActiveView('products')} className="text-sm text-[#7A7264]">← Continue shopping</button>
    <h1 className="font-serif text-3xl text-[#1C1A17]">Checkout</h1>
    <div className="grid items-start gap-10 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-7">
        {authLoading ? <p role="status">Loading your account…</p> : !user ? (
          <button type="button" onClick={() => setAuthModalOpen(true)} className="rounded bg-[#1C1A17] px-6 py-3 text-[#FAF9F5]">Sign in to select a delivery address</button>
        ) : <>
          <section className="space-y-3 rounded-lg border border-[#E8E2D5] p-5">
            <h2 className="font-serif text-xl">Contact information</h2>
            <p className="text-sm">{user.profile?.firstName} {user.profile?.lastName}</p>
            <p className="text-sm text-[#6B6457]">{user.email}</p>
          </section>
          {!resumeOrder && !restoring && <section className="space-y-4">
            <h2 className="font-serif text-xl">Shipping destination</h2>
            {address ? <>
              <AuthSelect label="Saved delivery address" disabled={checkoutBusy || Boolean(resumeOrder)} value={address.id} onChange={(event) => setAddressId(event.target.value)}>
                {addresses.map((item) => <option key={item.id} value={item.id}>
                  {item.label || 'Address'}{item.isDefault ? ' (Default)' : ''} — {item.line1}, {item.city}, {item.country}
                </option>)}
              </AuthSelect>
              <address className="rounded-lg bg-[#F3EFE6] p-4 text-sm not-italic leading-6 text-[#6B6457]">
                {address.line1}<br />{address.line2 && <>{address.line2}<br /></>}
                {address.city}, {address.state} {address.postalCode}<br />{address.country}
              </address>
            </> : <p className="text-sm text-[#7A7264]">Save a delivery address to see available shipping rates.</p>}
            <button type="button" disabled={checkoutBusy || Boolean(resumeOrder)} onClick={() => setProfileOpen(true)} className="text-sm font-semibold underline underline-offset-4">
              {address ? 'Add or edit addresses' : 'Add delivery address'}
            </button>
          </section>}
        </>}
        {restoring && <p role="status" className="text-sm text-[#7A7264]">Restoring your order...</p>}
        {restoreError && <div role="alert" className="text-sm text-red-700"><p>{restoreError}</p><button onClick={() => setRestoreAttempt(value => value + 1)} className="mt-2 underline">Retry restoring order</button></div>}
        {resumeOrder && !restoring && !restoreError && <div className="space-y-3 rounded-lg border border-[#E8E2D5] bg-[#F3EFE6] p-5">
          <h2 className="font-serif text-xl">{canResume ? 'Your order is saved' : 'Order status updated'}</h2>
          <p className="text-sm text-[#7A7264]">{canResume ? 'Continue payment for this order. Your selected shipping service and order total have been preserved.' : 'This order is no longer awaiting payment. You do not need to pay for it again here.'}</p>
          <Link href="/purchase-history" className="inline-block text-sm underline">View purchase history</Link>
          <Link href="/checkout" className="block text-sm underline" onClick={() => { window.sessionStorage.removeItem(pendingCheckoutKey(user!.id)); setPendingOrder(null); }}>Checkout current cart instead</Link>
        </div>}
        {!cart.length && !resumeOrder && !restoring && !restoreError && <p className="text-sm text-[#7A7264]">Your cart is empty. Add products to calculate shipping.</p>}
        {addingToCartKey && <p role="status" className="text-sm">Updating your cart before calculating shipping…</p>}
        {loading && <div role="status" className="space-y-3"><p className="text-sm">Calculating shipping rates…</p>{[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-[#EFECE4]" />)}</div>}
        {current?.error && <div role="alert" className="space-y-3 text-sm text-red-700"><p>{current.error}</p><button type="button" onClick={() => setRetry((value) => value + 1)} className="underline">Retry shipping rates</button></div>}
        {quote && !rates.length && <div className="space-y-2 text-sm text-[#7A7264]">
          <p>{quote.rates.length ? 'No shipping rates are available in the store currency for this address.' : 'No shipping services are available for this address. Try another saved address.'}</p>
          <button type="button" onClick={() => setRetry((value) => value + 1)} className="underline">Refresh rates</button>
        </div>}
        {rates.length > 0 && <fieldset disabled={checkoutBusy || Boolean(resumeOrder)} className="space-y-4"><ShippingOptions rates={rates} selectedId={rateId} onSelect={setRateId} />
          <button type="button" onClick={() => setRetry((value) => value + 1)} className="text-xs underline">Refresh shipping rates</button></fieldset>}
        {!restoring && !restoreError && (rate || canResume) && <div className="space-y-3">
          <button type="button" onClick={() => void startCheckout()} disabled={checkoutBusy || !accessToken || (!resumeOrder && !ready)}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1C1A17] px-6 py-4 text-sm font-semibold text-[#FAF9F5] disabled:opacity-60"
            aria-busy={checkoutBusy}>
            {checkoutBusy && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {checkoutBusy ? 'Opening secure checkout…' : resumeOrder ? 'Continue payment' : 'Continue to secure checkout'}
          </button>
          {resumeOrder && <p className="text-xs text-[#7A7264]">Your order has been created. Retry to pay for this same order.</p>}
        </div>}
        {checkoutError && <p role="alert" className="text-sm text-red-700">{checkoutError}</p>}
      </div>
      <aside className="space-y-5 rounded-lg border border-[#E8E2D5] bg-[#FAF9F5] p-6 lg:col-span-5">
        <h2 className="font-serif text-xl">Order summary</h2>
        {restoring ? <p role="status">Loading saved order...</p> : restoreError ? <p className="text-sm text-[#7A7264]">Order details temporarily unavailable.</p> : resumeOrder ? <SavedOrderSummary order={resumeOrder.order} /> : <>
        <div className="max-h-80 space-y-4 overflow-y-auto">
          {cart.map((item) => <div key={item.variantId || item.product.id} className="flex items-center gap-3">
            <img src={item.product.image || '/product-placeholder.svg'} alt={item.product.name} className="h-14 w-14 rounded object-cover" />
            <div className="flex-1 text-sm"><p>{item.product.name}</p><p className="text-xs text-[#7A7264]">{item.selectedWeight} × {item.quantity}</p></div>
            <span className="text-xs">{money(item.unitPrice * item.quantity)}</span>
          </div>)}
        </div>
        <dl className="space-y-3 border-t border-[#E8E2D5] pt-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{quote ? money(quote.subtotal) : '—'}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{rate ? money(Number(rate.amount)) : 'Select an address and rate'}</dd></div>
          <div className="flex justify-between border-t border-[#E8E2D5] pt-4 font-semibold"><dt>Estimated total</dt><dd>{quote && rate ? money((Math.round(quote.subtotal * 100) + Math.round(Number(rate.amount) * 100)) / 100) : '—'}</dd></div>
        </dl>
        <p className="text-xs text-[#7A7264]">This is a shipping estimate. No payment has been taken.</p>
        </>}
      </aside>
    </div>
    <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
  </div>;
};
