import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomeContent } from '../../data/home-content';
import type { Recipe } from '../../services/recipes.service';

export function RecipeAtelier({ content, recipes, loading, error, onSelect, onRetry }: { content: HomeContent['journals']; recipes: Recipe[]; loading: boolean; error: boolean; onSelect: (recipe: Recipe) => void; onRetry: () => void }) {
  return <section id="atelier" className="bg-black py-20 text-white">
    <div className="store-container"><div data-home-reveal className="max-w-xl"><p className="store-eyebrow text-white/60">{content.eyebrow}</p><h2 className="store-heading mt-4 text-4xl sm:text-6xl">{content.title}</h2><p className="mt-5 text-sm leading-7 text-white/70">{content.description}</p><Link href="/journals" className="store-button store-button-light mt-8">{content.cta}<ArrowRight size={15} /></Link></div>
      <div className="mt-12 grid gap-4 md:grid-cols-2" aria-busy={loading}>
        {loading ? <><span className="sr-only" role="status">Loading recipes</span>{[0,1,2,3].map(index => <div key={index} aria-hidden="true" className="flex gap-4 rounded-2xl border border-white/15 p-5 motion-safe:animate-pulse"><div className="h-28 w-24 rounded-xl bg-white/15" /><div className="flex-1 space-y-4"><div className="h-3 w-1/3 rounded bg-white/20" /><div className="h-5 rounded bg-white/20" /><div className="h-3 w-2/3 rounded bg-white/10" /></div></div>)}</> : error ? <div role="status"><p className="text-sm text-white/70">Recipes could not be loaded.</p><button onClick={onRetry} className="mt-4 underline">Try again</button></div> : recipes.length ? recipes.map(recipe => <button key={recipe.id} data-home-card="recipe" onClick={() => onSelect(recipe)} className="group flex items-start gap-5 rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:bg-white/10">
          <img src={recipe.image || '/product-placeholder.svg'} alt={recipe.title} loading="lazy" referrerPolicy="no-referrer" className="h-28 w-24 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0"><p className="store-eyebrow text-white/50">{recipe.procedures.length} steps</p><h3 className="mt-3 text-lg font-semibold leading-snug">{recipe.title}</h3>{recipe.notes && <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/60">{recipe.notes}</p>}<span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest">Get recipe<ArrowRight size={14} /></span></div>
        </button>) : <p className="text-sm text-white/70">Our next recipes are on their way.</p>}
      </div>
    </div>
  </section>;
}
