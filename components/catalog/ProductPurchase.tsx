import { useState } from 'react';
import { LoaderCircle, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCAD } from '../../services/currency';
import { QuantityControl } from './QuantityControl';

export function ProductPurchase({ product }: { product: Product }) {
  const { cart, addToCart, addingToCartKey } = useCart();
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const size = product.availableSizes[variantIndex];
  const variantId = product.backendVariantIds?.[variantIndex] ?? product.backendVariantId;
  const inCart = cart.filter(item => variantId ? item.variantId === variantId : item.product.id === product.id && item.selectedWeight === size?.weight).reduce((sum,item) => sum + item.quantity,0);
  const remaining = Math.max(0,(size?.stockQuantity ?? 0) - inCart);
  const unavailable = !size?.inStock || remaining === 0;
  const amount = Math.round(product.price * (size?.priceMultiplier ?? 1) * 100) / 100;
  const count = Math.min(quantity, Math.max(1, remaining));
  const pending = addingToCartKey === `${product.id}:${size?.weight}`;
  return <div className="space-y-7">
    <div><p className="store-eyebrow text-neutral-500">{product.category || 'The collection'}</p><h1 className="store-heading mt-4 text-4xl sm:text-5xl">{product.name}</h1>{product.origin && <p className="mt-3 text-xs text-neutral-500">{product.origin}</p>}<p className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-600">{product.description}</p></div>
    {!!product.highlights?.length && <div className="flex flex-wrap gap-2">{product.highlights.map(highlight => <span key={highlight} className="rounded-full border border-neutral-200 px-3 py-2 text-[11px] text-neutral-600">{highlight}</span>)}</div>}
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-6"><p className="text-3xl font-semibold tracking-tight">{formatCAD(amount)}</p><span className="rounded-full border border-neutral-200 px-3 py-2 text-[11px] font-medium">{unavailable ? 'Out of stock' : `${remaining} available`}</span></div>
    <fieldset><legend className="store-eyebrow mb-3">Select size</legend><div className="flex flex-wrap gap-2">{product.availableSizes.map((option,index) => <button key={`${option.weight}-${index}`} aria-pressed={index === variantIndex} onClick={() => { setVariantIndex(index); setQuantity(1); }} className={`rounded-full border px-5 py-3 text-xs font-semibold ${index === variantIndex ? 'border-black bg-black text-white' : 'border-neutral-200 bg-white text-black hover:border-black'}`}>{option.weight}{!option.inStock ? ' · Sold out' : ''}</button>)}</div></fieldset>
    <div className="flex flex-wrap gap-3"><QuantityControl value={count} max={remaining} disabled={unavailable || pending} onChange={setQuantity} label={product.name} /><button id="product-add-to-bag-btn" onClick={() => addToCart(product,size?.weight,count)} disabled={unavailable || pending} className="store-button store-button-dark flex-1" aria-busy={pending}>{pending ? <LoaderCircle size={16} className="animate-spin" /> : <ShoppingBag size={16} />}{unavailable ? 'Out of stock' : pending ? 'Adding…' : `Add to bag · ${formatCAD(amount * count)}`}</button></div>
    <div className="space-y-3 border-t border-neutral-200 pt-6 text-xs text-neutral-600"><p className="flex items-center gap-3"><Truck size={17} />Shipping options calculated at checkout</p><p className="flex items-center gap-3"><ShieldCheck size={17} />Secure payment with Stripe</p></div>
  </div>;
}
