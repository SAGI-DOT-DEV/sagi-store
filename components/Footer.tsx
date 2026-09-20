import { DistributorSignup } from './DistributorSignup';
import { StoreLogo } from './StoreLogo';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';
import { getProducts } from '../services/products.service';
import { getRecipes, type Recipe } from '../services/recipes.service';

export const Footer: React.FC = () => {
  const { setActiveView, navigateToProduct, setIsStoryOpen } = useCart();
  const [products, setProducts] = useState<Array<{ id: string; slug?: string; name: string }>>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([getProducts(), getRecipes(1, 5)]).then(([productItems, recipePage]) => {
      if (!cancelled) {
        setProducts(productItems.slice(0, 6));
        setRecipes(recipePage.items.slice(0, 5));
      }
    }).catch(() => {
      if (!cancelled) { setProducts([]); setRecipes([]); }
    });
    return () => { cancelled = true; };
  }, []);


  return (
    <footer className="bg-[#000000] text-[#F4F4F4] pt-20 pb-12 border-t border-[#272727]">
      {/* Upper Trust & Values Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#272727]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center shrink-0 text-[#BEBEBE]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FFFFFF]">Single Estate Terroir</h4>
              <p className="text-xs text-[#A2A2A2] mt-1 leading-relaxed">
                Direct partnerships with master growers across Ogun, Edo, and Ebonyi grain belts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center shrink-0 text-[#BEBEBE]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FFFFFF]">Optic Sorting & Purity</h4>
              <p className="text-xs text-[#A2A2A2] mt-1 leading-relaxed">
                Zero debris, laser stone-removal, and controlled micro-climate moisture retention.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center shrink-0 text-[#BEBEBE]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FFFFFF]">Climate-Shield Logistics</h4>
              <p className="text-xs text-[#A2A2A2] mt-1 leading-relaxed">
                Vacuum-sealed, UV-protected packaging delivered across Nigeria and internationally.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center shrink-0 text-[#BEBEBE]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FFFFFF]">Culinary Masterclasses</h4>
              <p className="text-xs text-[#A2A2A2] mt-1 leading-relaxed">
                Scientific techniques, temperature indices, and traditional heirloom recipes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Newsletter & Link Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <DistributorSignup />

          {/* Right Columns: Navigation */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#FFFFFF] mb-4">
                The Staples
              </h4>
              <ul className="space-y-2.5 text-xs text-[#A2A2A2]">{products.length ? products.map((product) => <li key={product.id}><button onClick={() => navigateToProduct(product.slug || product.id)} className="hover:text-[#FFFFFF] transition-colors text-left">{product.name}</button></li>) : <li className="text-[#727272]">Loading products…</li>}</ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#FFFFFF] mb-4">
                Kitchen Journals
              </h4>
              <ul className="space-y-2.5 text-xs text-[#A2A2A2]">{recipes.length ? recipes.map((recipe) => <li key={recipe.id}><button onClick={() => setActiveView('journals')} className="hover:text-[#FFFFFF] transition-colors text-left">{recipe.title}</button></li>) : <li className="text-[#727272]">Loading recipes…</li>}</ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#FFFFFF] mb-4">
                Provenance & Guild
              </h4>
              <ul className="space-y-2.5 text-xs text-[#A2A2A2]">
                <li>
                  <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#FFFFFF] transition-colors">
                    Agricultural Belts of Nigeria
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#FFFFFF] transition-colors">
                    Adesanya Heritage Groves
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#FFFFFF] transition-colors">
                    Purity & Optic Sorting
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('checkout')} className="hover:text-[#FFFFFF] transition-colors">
                    Boutique Client Services
                  </button>
                </li>
                <li>
                  <span className="text-[#727272]">Canada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#272727] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#535353]">
        <div className="flex items-center gap-2">
          <StoreLogo className="w-16 invert" />
          <span>© {new Date().getFullYear()} Sagi Culinary Boutique. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Preserving Nigerian Gastronomic Heritage</span>
          <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#FFFFFF] underline underline-offset-4">
            Terroir Map
          </button>
        </div>
      </div>
    </footer>
  );
};
