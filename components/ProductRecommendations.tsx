'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '../services/products.service';
import type { Product } from '../types';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';
import { ProductCard } from './catalog/ProductCard';
import { CatalogFeedback } from './catalog/CatalogFeedback';

export function ProductRecommendations({ productId }: { productId: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setProducts(null); setError(false);
    getProducts(5).then(items => { if (active) setProducts(items); }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [attempt, productId]);
  const related = products?.filter(product => product.id !== productId).slice(0,4);
  if (related && !related.length) return null;
  return <section className="space-y-8 border-t border-neutral-200 pt-14">
    <header className="flex items-end justify-between gap-4"><div><p className="store-eyebrow text-neutral-500">A little more to discover</p><h2 className="store-heading mt-3 text-3xl sm:text-4xl">Complete your pantry</h2></div><Link href="/products" className="shrink-0 text-xs font-semibold underline underline-offset-4">View all</Link></header>
    {error ? <CatalogFeedback message="Unable to load recommendations." onRetry={() => setAttempt(value => value + 1)} /> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{!related ? [0,1,2,3].map(index => <ProductCardSkeleton key={index} />) : related.map(product => <ProductCard key={product.id} product={product} />)}</div>}
  </section>;
}
