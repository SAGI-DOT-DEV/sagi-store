'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { searchStore } from '../services/search.service';
import {trackEvent} from '../services/analytics';
import type { Recipe } from '../services/recipes.service';
import { Modal } from './ui/Modal';
import { SearchResult } from './search/SearchResult';
import { RecipeDetailModal } from './RecipeDetailModal';

type Results = Awaited<ReturnType<typeof searchStore>>;

export function QuickSearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct } = useCart();
  const [query, setQuery] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [result, setResult] = useState<{ key: string; data?: Results; error?: string }>();
  const term = query.trim();
  const key = JSON.stringify([term, attempt]);

  useEffect(() => {
    if (!isSearchOpen) return;
    let active = true;
    const timer = window.setTimeout(() => {
      searchStore(term).then((data) => {
        if (active) {setResult({ key, data });if(term)trackEvent('search');}
      }).catch(() => {
        if (active) setResult({ key, error: 'We could not load search results. Please try again.' });
      });
    }, 300);
    return () => { active = false; window.clearTimeout(timer); };
  }, [isSearchOpen, term, key]);

  const current = result?.key === key ? result : undefined;
  return <>
    <Modal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search SAGI" maxWidth="max-w-3xl">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#737373]">Discover SAGI</p>
      <h2 className="mt-2 pr-8 font-serif text-2xl text-[#000000]">Find your next favourite.</h2>
      <label htmlFor="main-search-input" className="sr-only">Search products and recipes</label>
      <div className="my-6 flex items-center gap-3 rounded-lg border border-[#E4E4E4] bg-[#F4F4F4] px-4">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#737373]" />
        <input id="main-search-input" type="search" autoFocus autoComplete="off" maxLength={200} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products and recipes..." className="w-full bg-transparent py-4 text-sm outline-none" />
      </div>
      {!current ? <div role="status" className="space-y-4">
        <span className="sr-only">Searching products and recipes</span>
        {Array.from({ length: 4 }, (_, index) => <div key={index} aria-hidden="true" className="flex gap-3 motion-safe:animate-pulse"><div className="h-16 w-16 rounded-md bg-[#E4E4E4]" /><div className="flex-1 space-y-3 py-2"><div className="h-4 w-2/3 rounded bg-[#E4E4E4]" /><div className="h-3 w-1/3 rounded bg-[#E4E4E4]" /></div></div>)}
      </div> : current.error ? <div role="alert" className="py-6 text-center text-sm text-[#535353]">
        <p>{current.error}</p><button type="button" onClick={() => setAttempt((value) => value + 1)} className="mt-4 rounded bg-[#000000] px-5 py-2 text-white">Try again</button>
      </div> : current.data && <div className="space-y-6">
        <section aria-labelledby="search-products">
          <h3 id="search-products" className="border-b border-[#E4E4E4] pb-3 text-xs font-semibold uppercase tracking-widest">{term ? 'Products' : 'Latest products'}</h3>
          {current.data.products.length ? current.data.products.map((product) => <SearchResult key={product.id} title={product.name} image={product.image} detail={product.priceFormatted} onSelect={() => { setIsSearchOpen(false); navigateToProduct(product.slug || product.id); }} />) : <p className="py-4 text-sm text-[#535353]">No products found. Try a different name.</p>}
        </section>
        <section aria-labelledby="search-recipes">
          <h3 id="search-recipes" className="border-b border-[#E4E4E4] pb-3 text-xs font-semibold uppercase tracking-widest">The Kitchen Journals</h3>
          {current.data.recipes.length ? current.data.recipes.map((recipe) => <SearchResult key={recipe.id} title={recipe.title} image={recipe.image} detail="View recipe" onSelect={() => { setIsSearchOpen(false); setSelectedRecipe(recipe); }} />) : <p className="py-4 text-sm text-[#535353]">No recipes found. Try a different title.</p>}
        </section>
        <p className="text-xs text-[#727272]">Showing up to six matches per section. Refine your search for more specific results.</p>
      </div>}
    </Modal>
    <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
  </>;
}
