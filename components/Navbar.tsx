'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StoreLogo } from './StoreLogo';
import { AccountButton } from './auth/AuthModal';
import { AnimatedPanel } from './ui/AnimatedPanel';

export function Navbar() {
  const { cartItemCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="sticky inset-x-0 top-0 z-40 border-b border-neutral-200 bg-white">
    <div className="store-container flex h-16 items-center justify-between gap-3">
      <Link href="/" aria-label="SAGI home" className="shrink-0">
        <span className="flex h-11 items-center md:hidden"><StoreLogo className="h-10" /></span>
        <span className="hidden h-11 items-center md:flex"><StoreLogo className="h-11" /></span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[10px] font-semibold uppercase tracking-[.16em] xl:flex">
        <Link href="/products" aria-current={pathname.startsWith('/products') ? 'page' : undefined} className="hover:underline underline-offset-8">Products</Link>
        <Link href="/journals" className="text-neutral-500 hover:text-black">Recipes</Link>
      </nav>
      <div className="flex items-center gap-1 sm:gap-2">
        <button aria-label="Search collection" onClick={() => { setOpen(false); setIsSearchOpen(true); }} className="store-icon"><Search size={18} /></button>
        <button aria-label={`Open cart, ${cartItemCount} items`} onClick={() => { setOpen(false); setIsCartOpen(true); }} className="store-icon relative"><ShoppingBag size={19} /><span aria-hidden="true" className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">{cartItemCount > 99 ? '99+' : cartItemCount}</span></button>
        <div className="hidden md:block"><AccountButton /></div>
        <Link href="/products" className="store-button store-button-dark hidden min-h-10! px-5! sm:inline-flex">Order now</Link>
        <button onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" className="store-icon xl:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    <AnimatedPanel open={open} mode="dropdown">
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="store-container max-h-[75dvh] space-y-1 overflow-auto border-t border-neutral-200 py-5 xl:hidden">
        {[['Home','/'],['Products','/products'],['Recipes','/journals']].map(([label,href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-semibold hover:bg-neutral-100">{label}<ArrowRight size={16} /></Link>)}
        <div className="border-t border-neutral-200 px-4 pt-5 md:hidden"><AccountButton /></div>
        <p className="px-4 pt-5 text-[10px] uppercase tracking-widest text-neutral-500">Canada · Est. 2026</p>
      </nav>
    </AnimatedPanel>
  </header>;
}
