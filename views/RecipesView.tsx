'use client';
import { useEffect, useState } from 'react';
import { getRecipes, type Recipe } from '../services/recipes.service';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { ProductCardSkeleton } from '../components/ui/ProductCardSkeleton';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { CatalogFeedback } from '../components/catalog/CatalogFeedback';

export function RecipesView() {
  const [recipes,setRecipes] = useState<Recipe[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [total,setTotal] = useState(0);
  const [attempt,setAttempt] = useState(0);
  const [selected,setSelected] = useState<Recipe | null>(null);
  useEffect(() => {
    let active = true; setLoading(true); setError(false);
    getRecipes(page,6).then(result => { if (active) { setRecipes(result.items); setTotalPages(result.pagination.totalPages); setTotal(result.pagination.total); } }).catch(() => { if (active) setError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page,attempt]);
  return <div className="store-container py-14 sm:py-20">
    <header className="max-w-2xl"><p className="store-eyebrow text-neutral-500">The culinary atelier</p><h1 className="store-heading mt-4 text-4xl sm:text-6xl">The Kitchen Journals</h1><p className="mt-5 text-sm leading-7 text-neutral-600">Nigerian recipes with clear methods, essential equipment, and practical notes. A little inspiration for your next meal.</p></header>
    <section className="mt-12" aria-busy={loading}>{!loading && !error && <p className="mb-5 text-xs text-neutral-500">{total} recipes</p>}{loading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><span role="status" className="sr-only">Loading recipes</span>{[0,1,2,3,4,5].map(index => <ProductCardSkeleton key={index} />)}</div> : error ? <CatalogFeedback message="Recipes could not be loaded." onRetry={() => setAttempt(value => value + 1)} /> : recipes.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onSelect={setSelected} />)}</div> : <CatalogFeedback message="Our next recipes are on their way." />}</section>
    {!loading && !error && totalPages > 1 && <nav aria-label="Recipe pages" className="mt-10 flex items-center justify-center gap-4"><button disabled={page === 1} onClick={() => setPage(value => value - 1)} className="store-button store-button-outline">Previous</button><span className="text-xs text-neutral-600">{page} / {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage(value => value + 1)} className="store-button store-button-dark">Next</button></nav>}
    <RecipeDetailModal recipe={selected} onClose={() => setSelected(null)} />
  </div>;
}
