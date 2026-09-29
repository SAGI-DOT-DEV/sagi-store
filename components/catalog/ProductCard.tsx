'use client';

import Link from 'next/link';
import { LoaderCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { formatCAD } from '../../services/currency';

export function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, addingToCartKey } = useCart();
  const size = product.availableSizes[0];
  const variantId = product.backendVariantIds?.[0] ?? product.backendVariantId;
  const inCart = cart.filter(item => variantId ? item.variantId === variantId : item.product.id === product.id && item.selectedWeight === size?.weight).reduce((sum, item) => sum + item.quantity, 0);
  const unavailable = !size?.inStock || (size.stockQuantity ?? 0) <= inCart;
  const pending = addingToCartKey === `${product.id}:${size?.weight}`;
  const href = `/products/${encodeURIComponent(product.slug || product.id)}`;
  return <article data-home-card="product" className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <Link href={href} className="relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-white p-4" aria-label={`View ${product.name}`}>
      <img src={product.image || '/product-placeholder.svg'} alt={product.name} loading="lazy" referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
      {unavailable && <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold text-white">Out of stock</span>}
    </Link>
    <div className="flex flex-1 flex-col pt-5">
      {product.category && <p className="store-eyebrow mb-2 text-neutral-500">{product.category}</p>}
      <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="min-w-0 flex-1 text-base font-semibold leading-snug"><Link href={href}>{product.name}</Link></h3><span className="text-xs font-bold">{formatCAD(product.price)}</span></div>
      <p className="mt-2 text-xs leading-5 text-neutral-600">{[size?.weight, product.origin].filter(Boolean).join(' · ')}</p>
      {!!product.highlights?.length && <div className="mt-3 flex flex-wrap gap-1.5">{product.highlights.slice(0, 2).map(highlight => <span key={highlight} className="rounded-full border border-neutral-200 px-2 py-1 text-[10px] text-neutral-600">{highlight}</span>)}</div>}
      <div className="mt-auto pt-5">
      <button onClick={() => addToCart(product, size?.weight)} disabled={unavailable || pending} aria-label={unavailable ? `${product.name} is out of stock` : `Add ${product.name} to bag`} className="store-button store-button-dark w-full">
        {pending ? <LoaderCircle size={15} className="animate-spin" /> : <ShoppingBag size={15} />}{unavailable ? 'Out of stock' : pending ? 'Adding…' : 'Add to bag'}
      </button>
      </div>
    </div>
  </article>;
}
