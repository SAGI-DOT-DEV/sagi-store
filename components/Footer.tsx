'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DistributorSignup } from './DistributorSignup';
import { StoreLogo } from './StoreLogo';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/products.service';
import { getRecipes, type Recipe } from '../services/recipes.service';
import type { Product } from '../types';

export function Footer() {
  const { setIsStoryOpen } = useCart();
  const [products,setProducts] = useState<Product[]>([]);
  const [recipes,setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    let active = true;
    getProducts(4).then(items => { if (active) setProducts(items); }).catch(() => {});
    getRecipes(1,4).then(page => { if (active) setRecipes(page.items); }).catch(() => {});
    return () => { active = false; };
  }, []);
  return <footer className="bg-black py-16 text-white">
    <div className="store-container"><div className="grid gap-14 lg:grid-cols-12">
      <DistributorSignup />
      <div className="grid grid-cols-2 gap-8 text-sm lg:col-span-7 sm:grid-cols-3">
        <div><h3 className="store-eyebrow text-white/50">The collection</h3><ul className="mt-5 space-y-4 text-xs leading-6 text-white/70">{products.map(product => <li key={product.id}><Link href={`/products/${encodeURIComponent(product.slug || product.id)}`} className="hover:text-white">{product.name}</Link></li>)}<li><Link href="/products" className="hover:text-white">Explore all products</Link></li></ul></div>
        <div><h3 className="store-eyebrow text-white/50">Recipes</h3><ul className="mt-5 space-y-4 text-xs leading-6 text-white/70">{recipes.map(recipe => <li key={recipe.id}><Link href="/journals" className="hover:text-white">{recipe.title}</Link></li>)}<li><Link href="/journals" className="hover:text-white">Explore the kitchen</Link></li></ul></div>
        <div><h3 className="store-eyebrow text-white/50">Discover SAGI</h3><ul className="mt-5 space-y-4 text-xs leading-6 text-white/70"><li><button onClick={() => setIsStoryOpen(true)} className="hover:text-white">Our story & terroir</button></li><li><Link href="/#quality" className="hover:text-white">Quality standard</Link></li><li><Link href="/purchase-history" className="hover:text-white">Your orders</Link></li><li><a href="#distributor-signup" className="hover:text-white">Become a distributor</a></li></ul></div>
      </div>
    </div><div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/15 pt-7 sm:flex-row sm:items-center"><Link href="/" aria-label="SAGI home"><StoreLogo className="w-20 invert" /></Link><p className="text-[10px] uppercase tracking-widest text-white/50">© {new Date().getFullYear()} SAGI. All rights reserved.</p><p className="text-[10px] uppercase tracking-widest text-white/50">Canada · Est. 2026</p></div></div>
  </footer>;
}
