import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Menu, X, ArrowRight, BookOpen, Layers, Globe } from 'lucide-react';
import { AnnouncementTicker } from './AnnouncementTicker';
import { AccountButton } from './auth/AuthModal';
import { StoreLogo } from './StoreLogo';
import { AnimatedPanel } from './ui/AnimatedPanel';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsStoryOpen
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] backdrop-blur-md border-b border-[#E4E4E4] transition-all duration-200">
      {/* Top Announcement Ribbon */}
      <AnnouncementTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile hamburger & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#000000] hover:text-[#404040] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium">
              <button
                id="nav-link-staples"
                onClick={() => setActiveView('products')}
                className={`transition-colors pb-1 border-b-2 ${
                  activeView === 'products'
                    ? 'border-[#000000] text-[#000000] font-semibold'
                    : 'border-transparent text-[#535353] hover:text-[#000000]'
                }`}
              >
                The Staples
              </button>
              <button
                id="nav-link-journals"
                onClick={() => setActiveView('journals')}
                className={`transition-colors pb-1 border-b-2 ${
                  activeView === 'journals'
                    ? 'border-[#000000] text-[#000000] font-semibold'
                    : 'border-transparent text-[#535353] hover:text-[#000000]'
                }`}
              >
                Kitchen Journals & Masterclasses
              </button>
              <button
                id="nav-link-provenance"
                onClick={() => setIsStoryOpen(true)}
                className="transition-colors pb-1 border-b-2 border-transparent text-[#535353] hover:text-[#000000]"
              >
                Provenance
              </button>
            </nav>
          </div>

          {/* Center: Brand Wordmark */}
          <div className="flex-1 flex justify-center lg:flex-initial text-center">
            <button
              id="brand-home-logo"
              onClick={() => setActiveView('home')}
              className="group flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02]"
            >
              <StoreLogo className="w-28 sm:w-36" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#535353] font-medium mt-1">
                Culinary Boutique
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
            <div className="hidden md:block"><AccountButton /></div>
            <button
              id="search-trigger-btn"
              onClick={() => { setMobileMenuOpen(false); setIsSearchOpen(true); }}
              className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors hover:bg-neutral-50 hover:text-neutral-600"
              aria-label="Search collection"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Pantry Bag Button */}
            <button
              id="pantry-drawer-btn"
              onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}
              aria-label={`Open cart, ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors hover:bg-neutral-50 hover:text-neutral-600"
            >
              <ShoppingBag className="h-6 w-6" />
              <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatedPanel open={mobileMenuOpen} mode="dropdown">
        <div className="lg:hidden border-t border-[#E4E4E4] bg-[#FFFFFF] px-6 py-6 space-y-4">
          <button
            onClick={() => {
              setActiveView('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 font-serif text-xl text-[#000000] font-semibold border-b border-[#F4F4F4]"
          >
            Home Overview
          </button>
          <button
            onClick={() => {
              setActiveView('products');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#404040] border-b border-[#F4F4F4]"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#737373]" /> The Staples Collection
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>
          <button
            onClick={() => {
              setActiveView('journals');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#404040] border-b border-[#F4F4F4]"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#737373]" /> Masterclasses & Kitchen Journals
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>
          <button
            onClick={() => {
              setIsStoryOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#404040] border-b border-[#F4F4F4]"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#737373]" /> Agricultural Provenance
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>

          <div className="space-y-3 border-b border-[#F4F4F4] py-3">
            <div className="py-2"><AccountButton /></div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#535353]">
            <span>Canada</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </AnimatedPanel>
    </header>
  );
};
