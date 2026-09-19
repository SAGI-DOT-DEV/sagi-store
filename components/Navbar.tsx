import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Menu, X, ArrowRight, Sparkles, BookOpen, Layers, Globe } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all duration-200">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#1C1A17] text-[#EDE7DB] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Autumn 2025 Reserve: First Cold-Pressed Palm Oil & Aged Ofada Now Released</span>
        <button
          onClick={() => {
            setActiveView('products');
          }}
          className="hidden md:inline-flex items-center gap-1 text-[#D4AF37] hover:underline font-semibold ml-2 text-xs normal-case tracking-normal"
        >
          View Collection <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile hamburger & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C1A17] hover:text-[#5C5549] transition-colors focus:outline-none"
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
                    ? 'border-[#1C1A17] text-[#1C1A17] font-semibold'
                    : 'border-transparent text-[#6B6457] hover:text-[#1C1A17]'
                }`}
              >
                The Staples
              </button>
              <button
                id="nav-link-journals"
                onClick={() => setActiveView('journals')}
                className={`transition-colors pb-1 border-b-2 ${
                  activeView === 'journals'
                    ? 'border-[#1C1A17] text-[#1C1A17] font-semibold'
                    : 'border-transparent text-[#6B6457] hover:text-[#1C1A17]'
                }`}
              >
                Kitchen Journals & Masterclasses
              </button>
              <button
                id="nav-link-provenance"
                onClick={() => setIsStoryOpen(true)}
                className="transition-colors pb-1 border-b-2 border-transparent text-[#6B6457] hover:text-[#1C1A17]"
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
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#7A7264] font-medium mt-1">
                Culinary Boutique
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block"><AccountButton /></div>
            <button
              id="search-trigger-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden p-2 text-[#4A453C] hover:text-[#1C1A17] transition-colors md:flex items-center gap-1.5"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-xs tracking-wider uppercase font-medium text-[#7A7264]">
                Search
              </span>
            </button>

            {/* Pantry Bag Button */}
            <button
              id="pantry-drawer-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] px-4 py-2.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-wider uppercase">Pantry</span>
              <span className="bg-[#D4AF37] text-[#1C1A17] text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatedPanel open={mobileMenuOpen} mode="dropdown">
        <div className="lg:hidden border-t border-[#E8E2D5] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <button
            onClick={() => {
              setActiveView('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 font-serif text-xl text-[#1C1A17] font-semibold border-b border-[#EFECE4]"
          >
            Home Overview
          </button>
          <button
            onClick={() => {
              setActiveView('products');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#4A453C] border-b border-[#EFECE4]"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" /> The Staples Collection
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>
          <button
            onClick={() => {
              setActiveView('journals');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#4A453C] border-b border-[#EFECE4]"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Masterclasses & Kitchen Journals
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>
          <button
            onClick={() => {
              setIsStoryOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#4A453C] border-b border-[#EFECE4]"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" /> Agricultural Provenance
            </span>
            <ArrowRight className="w-4 h-4 text-[#999]" />
          </button>

          <div className="space-y-3 border-b border-[#EFECE4] py-3">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 py-2 text-left text-sm tracking-wider uppercase font-medium text-[#4A453C]"
            >
              <Search className="h-4 w-4 text-[#D4AF37]" /> Search collection
            </button>
            <div className="py-2"><AccountButton /></div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#7A7264]">
            <span>Canada</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </AnimatedPanel>
    </header>
  );
};
