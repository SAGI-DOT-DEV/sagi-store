'use client';

import { CheckCircle, ChefHat, ListOrdered, X } from 'lucide-react';
import { Modal } from './ui/Modal';
import type { Recipe } from '../services/recipes.service';

export function RecipeDetailModal({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  if (!recipe) return null;
  return <Modal open={Boolean(recipe)} onClose={onClose} title={recipe.title} maxWidth="max-w-3xl">
    <div className="space-y-7">
      <div className="overflow-hidden rounded-sm border border-[#E8E2D5] bg-[#EFECE4]"><img src={recipe.image || '/product-placeholder.svg'} alt={recipe.title} className="h-64 w-full object-cover" /></div>
      <div><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Kitchen Journal Recipe</span><h2 className="mt-1 font-serif text-3xl text-[#1C1A17]">{recipe.title}</h2></div>
      <div className="grid gap-8 md:grid-cols-[1fr_220px]">
        <div className="space-y-4"><h3 className="flex items-center gap-2 font-serif text-xl font-bold text-[#1C1A17]"><ListOrdered className="h-5 w-5 text-[#D4AF37]" /> Step-by-step method</h3><ol className="space-y-3">{recipe.procedures.map((step, index) => <li key={`${recipe.id}-${index}`} className="flex gap-3 rounded-sm border border-[#EAE4D7] p-4 text-sm leading-relaxed text-[#4A453C]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1C1A17] text-xs font-bold text-[#FAF9F5]">{index + 1}</span><span>{step}</span></li>)}</ol></div>
        <div className="space-y-6"><div><h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1C1A17]"><ChefHat className="h-4 w-4 text-[#D4AF37]" /> Equipment</h3><ul className="mt-3 space-y-2 text-sm text-[#5C5549]">{recipe.equipment.map((item) => <li key={item} className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D32]" />{item}</li>)}</ul></div>{recipe.notes && <div className="border-l-2 border-[#D4AF37] pl-4 text-sm italic leading-relaxed text-[#5C5549]"><strong className="not-italic text-[#1C1A17]">Chef’s note:</strong> {recipe.notes}</div>}</div>
      </div>
      <div className="flex justify-end border-t border-[#EAE4D7] pt-5"><button onClick={onClose} className="inline-flex items-center gap-2 bg-[#1C1A17] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FAF9F5]">Close recipe <X className="h-4 w-4 text-[#D4AF37]" /></button></div>
    </div>
  </Modal>;
}
