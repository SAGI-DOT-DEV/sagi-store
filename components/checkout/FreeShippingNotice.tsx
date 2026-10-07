'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { getShippingPolicy, type ShippingPolicy } from '../../services/shipping.service';
import { formatMoney } from './ShippingOptions';

export function FreeShippingNotice({ subtotal, confirmed = false }: { subtotal: number; confirmed?: boolean }) {
  const [policy, setPolicy] = useState<ShippingPolicy | null>(null);
  useEffect(() => {
    let active = true;
    getShippingPolicy().then(value => { if (active) setPolicy(value); }).catch(() => {});
    return () => { active = false; };
  }, []);
  const threshold = policy?.freeShippingThreshold;
  // No invented offer if the setting is disabled, unavailable, or not CAD.
  if (threshold == null || !Number.isFinite(threshold) || threshold < 0 || policy?.currency !== 'CAD') return null;
  const remaining = Math.max(0, Math.round(threshold * 100) - Math.round(subtotal * 100)) / 100;
  return <div className="flex gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4" role="status">
    <Truck size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
    <div className="text-sm">
      <p className="font-semibold">{threshold === 0 ? 'Free shipping on all orders' : `Free shipping on orders of ${formatMoney(threshold, policy.currency)} or more`}</p>
      <p className="mt-1 text-xs leading-5 text-neutral-600">{confirmed ? 'Free shipping has been applied to your shipping quote.' : remaining > 0 ? `Add ${formatMoney(remaining, policy.currency)} more to your cart to reach the free-shipping threshold.` : 'Your cart meets the threshold. Confirm your delivery address to apply free shipping.'}</p>
    </div>
  </div>;
}
