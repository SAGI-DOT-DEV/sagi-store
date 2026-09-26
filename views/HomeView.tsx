'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { DEFAULT_HOME_CONTENT, type HomeContent } from '../data/home-content';
import { DEFAULT_HOME_SPOTLIGHTS } from '../data/home-spotlights';
import { useCart } from '../context/CartContext';
import { getProducts, getProductCategories } from '../services/products.service';
import { getRecipes, type Recipe } from '../services/recipes.service';
import type { Product } from '../types';
import { FeaturedShowcase } from '../components/home/FeaturedShowcase';
import { RecipeAtelier } from '../components/home/RecipeAtelier';
import { HomeCollection } from '../components/home/HomeCollection';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { useHomeAnimations } from '../hooks/useHomeAnimations';

export function HomeView({ content = DEFAULT_HOME_CONTENT }: { content?: HomeContent }) {
  const { setIsStoryOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [recipeLoading, setRecipeLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const [recipeError, setRecipeError] = useState(false);
  const [catalogAttempt, setCatalogAttempt] = useState(0);
  const [recipeAttempt, setRecipeAttempt] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const scope = useHomeAnimations(catalogLoading, recipeLoading);
  useEffect(() => {
    let active = true;
    setCatalogLoading(true); setCatalogError(false);
    Promise.all([getProducts(), getProductCategories()]).then(([items,groups]) => {
      if (active) { setProducts(items); setCategories(groups); }
    }).catch(() => { if (active) setCatalogError(true); }).finally(() => { if (active) setCatalogLoading(false); });
    return () => { active = false; };
  }, [catalogAttempt]);
  useEffect(() => {
    let active = true;
    setRecipeLoading(true); setRecipeError(false);
    getRecipes(1,4).then(page => { if (active) setRecipes(page.items); }).catch(() => { if (active) setRecipeError(true); }).finally(() => { if (active) setRecipeLoading(false); });
    return () => { active = false; };
  }, [recipeAttempt]);
  const spotlights = content.spotlights?.length ? content.spotlights : DEFAULT_HOME_SPOTLIGHTS;
  return <div ref={scope}>
    {spotlights.map((spotlight,index) => <FeaturedShowcase key={spotlight._key} content={spotlight} index={index} />)}
    <RecipeAtelier content={content.journals} recipes={recipes} loading={recipeLoading} error={recipeError} onSelect={setSelectedRecipe} onRetry={() => setRecipeAttempt(value => value + 1)} />
    <HomeCollection content={content.staples} products={products} categories={categories} loading={catalogLoading} error={catalogError} onRetry={() => setCatalogAttempt(value => value + 1)} />
    <section id="quality" className="scroll-mt-32 border-y border-neutral-200 bg-white py-16"><div className="store-container">
      <div data-home-reveal className="grid gap-4 md:grid-cols-3">{content.metrics.map((metric,index) => <article key={metric.label + index} className="flex items-center gap-4 rounded-2xl border border-neutral-200 p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white"><Check size={19} /></span><div><p className="text-xl font-semibold">{metric.value}</p><p className="mt-1 text-xs leading-5 text-neutral-600">{metric.label}</p></div></article>)}</div>
      <div data-home-reveal className="mx-auto mt-16 max-w-3xl text-center"><p className="store-eyebrow text-neutral-500">{content.philosophy.eyebrow}</p><blockquote className="store-heading mt-5 text-2xl leading-snug! sm:text-3xl">{content.philosophy.quote}</blockquote><p className="mt-5 text-xs text-neutral-500">{content.philosophy.attribution}</p></div>
    </div></section>
    <section className="store-container py-20"><div data-home-reveal className="flex flex-col justify-between gap-8 rounded-3xl border border-neutral-200 p-8 sm:p-12 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="store-eyebrow text-neutral-500">{content.provenance.eyebrow}</p><h2 className="store-heading mt-4 text-3xl sm:text-4xl">{content.provenance.title}</h2><p className="mt-5 text-sm leading-7 text-neutral-600">{content.provenance.description}</p></div><button onClick={() => setIsStoryOpen(true)} className="store-button store-button-dark shrink-0">{content.provenance.cta}<ArrowRight size={16} /></button></div></section>
    {selectedRecipe && <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
  </div>;
}
