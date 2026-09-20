'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '../services/products.service';
import type { Product } from '../types';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';
import { formatCAD } from '../services/currency';

export function ProductRecommendations({ productId }: { productId: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    getProducts(4).then(items => { if (active) setProducts(items); }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [attempt]);
  const related = products?.filter(product => product.id !== productId).slice(0, 3);
  if (related && !related.length) return null;
  return <section className="space-y-8 border-t border-[#E4E4E4] pt-8" aria-label="Complete your pantry">
    <div className="flex items-center justify-between gap-4"><h3 className="font-serif text-2xl font-bold text-[#000000]">Complete Your Pantry</h3><Link href="/products" className="text-xs font-bold uppercase tracking-wider hover:underline">View All</Link></div>
    {error ? <div className="text-sm text-[#535353]">Unable to load recommendations. <button onClick={() => { setError(false); setAttempt(value => value + 1); }} className="underline">Try again</button></div>
      : <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {!related ? <><span role="status" className="sr-only">Loading products</span>{[0, 1, 2].map(index => <ProductCardSkeleton key={index} />)}</>
          : related.map(product => <Link key={product.id} href={`/products/${encodeURIComponent(product.slug || product.id)}`} className="group rounded-sm border border-[#E4E4E4] bg-[#FFFFFF] p-4 transition-all hover:border-[#737373] hover:shadow-md">
            <div className="mb-3 aspect-square overflow-hidden rounded-sm bg-[#F4F4F4]"><img src={product.image || '/product-placeholder.svg'} alt={product.name} loading="lazy" referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
            <h4 className="font-serif text-base font-bold text-[#000000]">{product.name}</h4>
            <span className="mt-2 block text-xs font-bold">{formatCAD(product.price)}</span>
          </Link>)}
      </div>}
  </section>;
}
