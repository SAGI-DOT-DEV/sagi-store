import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomeContent } from '../../data/home-content';
import type { Product } from '../../types';
import { ProductCard } from '../catalog/ProductCard';
import { CategoryPills } from '../catalog/CategoryPills';
import { CatalogFeedback } from '../catalog/CatalogFeedback';
import { ProductCardSkeleton } from '../ui/ProductCardSkeleton';

export function HomeCollection({ content, products, categories, loading, error, onRetry }: { content: HomeContent['staples']; products: Product[]; categories: string[]; loading: boolean; error: boolean; onRetry: () => void }) {
  const [selected, setSelected] = useState('All');
  const visible = products.filter(product => selected === 'All' || product.category === selected).slice(0,4);
  return <section id="collection" className="store-container py-20"><header data-home-reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="store-eyebrow text-neutral-500">{content.eyebrow}</p><h2 className="store-heading mt-4 text-4xl sm:text-5xl">{content.title}</h2></div><Link href="/products" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest">{content.catalogCta}{!loading && !error ? ` (${products.length})` : ''}<ArrowRight size={15} /></Link></header>
    <div className="mt-8"><CategoryPills categories={categories} selected={selected} onSelect={setSelected} loading={loading} /></div>
    <div className="mt-8" aria-busy={loading}>{loading ? <><span className="sr-only" role="status">Loading products</span><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[0,1,2,3].map(i => <ProductCardSkeleton key={i} />)}</div></> : error ? <CatalogFeedback message="The collection is temporarily unavailable." onRetry={onRetry} /> : visible.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div> : <CatalogFeedback message="No products are available in this collection yet." />}</div>
  </section>;
}
