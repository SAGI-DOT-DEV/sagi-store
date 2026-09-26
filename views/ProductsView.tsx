'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { getProducts, getProductCategories } from '../services/products.service';
import type { Product } from '../types';
import { ProductCard } from '../components/catalog/ProductCard';
import { CategoryPills } from '../components/catalog/CategoryPills';
import { CatalogFeedback } from '../components/catalog/CatalogFeedback';
import { ProductCardSkeleton } from '../components/ui/ProductCardSkeleton';
import { DistributorInvite } from '../components/DistributorInvite';

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setError(false);
    Promise.all([getProducts(), getProductCategories()]).then(([items, groups]) => {
      if (active) { setProducts(items); setCategories(groups); }
    }).catch(() => { if (active) setError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [attempt]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const items = products.filter(product => (selected === 'All' || product.category === selected) && (!query || (product.name + ' ' + product.description).toLowerCase().includes(query)));
    if (sort === 'price-asc') items.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') items.sort((a,b) => b.price - a.price);
    if (sort === 'name') items.sort((a,b) => a.name.localeCompare(b.name));
    return items;
  }, [products, selected, search, sort]);
  return <div className="store-container py-14 sm:py-20">
    <header className="max-w-2xl"><p className="store-eyebrow text-neutral-500">Curated collection</p><h1 className="store-heading mt-4 text-4xl sm:text-6xl">Explore the Collection</h1><p className="mt-5 text-sm leading-7 text-neutral-600">West African pantry staples, thoughtfully selected for your everyday table. Discover the collection and find your next favourite.</p></header>
    <div className="mt-10 space-y-5 border-b border-neutral-200 pb-6">
      <CategoryPills categories={categories} selected={selected} onSelect={setSelected} loading={loading} />
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label className="flex max-w-md flex-1 items-center gap-3 rounded-full border border-neutral-200 px-5 py-3"><Search size={16} /><span className="sr-only">Search products</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find something for your pantry" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
        <label className="flex items-center gap-3 text-xs text-neutral-600">Sort by<select value={sort} onChange={event => setSort(event.target.value)} className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-black"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
      </div>
    </div>
    <div className="mt-8" aria-busy={loading}>
      {loading ? <><span className="sr-only" role="status">Loading products</span><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({length:8},(_,i) => <ProductCardSkeleton key={i} />)}</div></> : error ? <CatalogFeedback message="The collection could not be loaded. Please try again." onRetry={() => setAttempt(value => value + 1)} /> : <>
        <p className="mb-5 text-xs text-neutral-500">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p>
        {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <CatalogFeedback message="No products match your selection." onRetry={() => { setSelected('All'); setSearch(''); }} />}
      </>}
    </div>
    <div className="mt-16 max-w-xl"><DistributorInvite /></div>
  </div>;
}
