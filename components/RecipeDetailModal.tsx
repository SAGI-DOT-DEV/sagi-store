'use client';

import { CheckCircle, ChefHat, ListOrdered, X } from 'lucide-react';
import { Modal } from './ui/Modal';
import type { Recipe } from '../services/recipes.service';

export function RecipeDetailModal({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  if (!recipe) return null;
  return <Modal open={Boolean(recipe)} onClose={onClose} title={recipe.title} maxWidth="max-w-3xl">
    <div className="space-y-7">
      <div className="overflow-hidden rounded-sm border border-[#E4E4E4] bg-[#F4F4F4]"><img src={recipe.image || '/product-placeholder.svg'} alt={recipe.title} className="h-64 w-full object-cover" /></div>
      <div><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#737373]">Kitchen Journal Recipe</span><h2 className="mt-1 font-serif text-3xl text-[#000000]">{recipe.title}</h2></div>
      <div className="grid gap-8 md:grid-cols-[1fr_220px]">
        <div className="space-y-4"><h3 className="flex items-center gap-2 font-serif text-xl font-bold text-[#000000]"><ListOrdered className="h-5 w-5 text-[#737373]" /> Step-by-step method</h3><ol className="space-y-3">{recipe.procedures.map((step, index) => <li key={`${recipe.id}-${index}`} className="flex gap-3 rounded-sm border border-[#E4E4E4] p-4 text-sm leading-relaxed text-[#404040]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#000000] text-xs font-bold text-[#FFFFFF]">{index + 1}</span><span>{step}</span></li>)}</ol></div>
        <div className="space-y-6"><div><h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#000000]"><ChefHat className="h-4 w-4 text-[#737373]" /> Equipment</h3><ul className="mt-3 space-y-2 text-sm text-[#404040]">{recipe.equipment.map((item) => <li key={item} className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#676767]" />{item}</li>)}</ul></div>{recipe.notes && <div className="border-l-2 border-[#737373] pl-4 text-sm italic leading-relaxed text-[#404040]"><strong className="not-italic text-[#000000]">Chef’s note:</strong> {recipe.notes}</div>}</div>
      </div>
      <div className="flex justify-end border-t border-[#E4E4E4] pt-5"><button onClick={onClose} className="inline-flex items-center gap-2 bg-[#000000] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">Close recipe <X className="h-4 w-4 text-[#737373]" /></button></div>
    </div>
  </Modal>;
}
