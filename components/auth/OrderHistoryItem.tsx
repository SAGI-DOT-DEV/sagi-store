'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import type { OrderHistoryItem as HistoryItem } from '../../services/order-history.service';
import { formatMoney } from '../checkout/ShippingOptions';

export function OrderHistoryItem({ item, currency }: { item: HistoryItem; currency: string }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const image = item.image?.trim();
  const showImage = image && image !== failedImage && item.availableInStore !== false;
  return <li className="flex gap-3 text-sm">
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E4E4E4] bg-[#F4F4F4] sm:h-24 sm:w-24">
      {showImage ? <img src={image} alt={item.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover" onError={() => setFailedImage(image)} />
        : <Package aria-label="Product image unavailable" className="h-6 w-6 text-[#737373]" />}
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-serif text-lg leading-snug text-[#000000] sm:text-xl">{item.name}</p>
      <p className="mt-1 text-xs text-[#535353]">Quantity: {item.quantity} · {formatMoney(Number(item.unitPrice), currency)} each</p>
      {item.availableInStore === false && <p className="mt-1 text-xs text-[#737373]">Unavailable in store</p>}
      <p className="mt-1 font-medium">{formatMoney(Number(item.unitPrice) * item.quantity, currency)}</p>
    </div>
  </li>;
}
