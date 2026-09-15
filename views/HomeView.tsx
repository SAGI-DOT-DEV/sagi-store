import React from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Layers,
  Plus,
  Star,
  LoaderCircle,
} from "lucide-react";
import { DEFAULT_HOME_CONTENT, type HomeContent } from "../data/home-content";
import { getProducts } from "../services/products.service";
import { getRecipes, type Recipe } from "../services/recipes.service";
import { ProductCardSkeleton } from "../components/ui/ProductCardSkeleton";
import { RecipeCardSkeleton } from "../components/ui/RecipeCardSkeleton";
import { RecipeDetailModal } from "../components/RecipeDetailModal";
import { useHomeAnimations } from '../hooks/useHomeAnimations';

export const HomeView: React.FC<{ content?: HomeContent }> = ({
  content = DEFAULT_HOME_CONTENT,
}) => {
  const {
    setActiveView,
    navigateToProduct,
    addToCart,
    setIsStoryOpen,
    addingToCartKey,
  } = useCart();

  const [catalogProducts, setCatalogProducts] = React.useState<typeof PRODUCTS>([]);
  const [isCatalogLoading, setIsCatalogLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    getProducts().then((products) => {
      if (!cancelled && products.length) setCatalogProducts(products);
    }).catch(() => {
      if (!cancelled) setCatalogProducts(PRODUCTS);
    }).finally(() => {
      if (!cancelled) setIsCatalogLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const featuredStaples = catalogProducts.slice(0, 4);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [isRecipesLoading, setIsRecipesLoading] = React.useState(true);
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);
  const animationScope = useHomeAnimations(isCatalogLoading, isRecipesLoading);

  React.useEffect(() => {
    let cancelled = false;
    getRecipes()
      .then((items) => {
        if (!cancelled) setRecipes(items.items.slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setRecipes([]);
      })
      .finally(() => {
        if (!cancelled) setIsRecipesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={animationScope} className="space-y-20 sm:space-y-28 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Typography */}
          <div data-home-hero-copy className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE4] rounded-full text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              {/*  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> */}
              <span>{content.hero.eyebrow}</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-tight leading-[1.1]">
                {content.hero.title}{" "}
                <span className="italic font-normal">
                  {content.hero.emphasis}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#6B6457] leading-relaxed max-w-lg">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => setActiveView("products")}
                className="bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-sm group"
              >
                <span>{content.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
              </button>

              <button
                id="hero-masterclasses-btn"
                onClick={() => setActiveView("journals")}
                className="bg-[#EFECE4] hover:bg-[#E5DFC9] text-[#1C1A17] px-6 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#D9D2C5]"
              >
                <BookOpen className="w-4 h-4 text-[#7A7264]" />
                <span>{content.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-[#E8E2D5] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
                  {content.metrics[0]?.value}
                </div>
                <div className="text-[11px] text-[#7A7264] uppercase tracking-wider mt-0.5 font-medium">
                  {content.metrics[0]?.label}
                </div>
              </div>
              <div className="border-l border-[#E8E2D5] pl-4">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
                  {content.metrics[1]?.value}
                </div>
                <div className="text-[11px] text-[#7A7264] uppercase tracking-wider mt-0.5 font-medium">
                  {content.metrics[1]?.label}
                </div>
              </div>
              <div className="border-l border-[#E8E2D5] pl-4">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
                  {content.metrics[2]?.value}
                </div>
                <div className="text-[11px] text-[#7A7264] uppercase tracking-wider mt-0.5 font-medium">
                  {content.metrics[2]?.label}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Presentation */}
          <div data-home-hero-image className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden bg-[#E8E2D5] border border-[#D9D2C5] shadow-lg group">
              <img
                src={content.hero.image}
                alt={content.hero.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-[#FAF9F5] flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block">
                    Estate Reserve Batch
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-white">
                    Aged Ofada & Ijebu Gold
                  </span>
                </div>
                <button
                  onClick={() => navigateToProduct("ijebu-gold-garri")}
                  className="bg-white/90 hover:bg-white text-[#1C1A17] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophical Quote Strip */}
      <section className="bg-[#1C1A17] text-[#FAF9F5] py-16 px-4 sm:px-6 lg:px-8">
        <div data-home-reveal className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
            {content.philosophy.eyebrow}
          </span>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed text-[#EDE7DB]">
            {content.philosophy.quote}
          </p>
          <div className="text-xs text-[#9E978A] tracking-widest uppercase font-medium pt-2">
            {content.philosophy.attribution}
          </div>
        </div>
      </section>

      {/* Flagship Staples Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-home-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D5]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
              {content.staples.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1A17] mt-1">
              {content.staples.title}
            </h2>
          </div>
          <button
            onClick={() => setActiveView("products")}
            className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C5549] flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>
              {content.staples.catalogCta} ({catalogProducts.length})
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isCatalogLoading
            ? Array.from({ length: 4 }, (_, index) => <ProductCardSkeleton key={index} />)
            : featuredStaples.map((product) => (
            <div
              key={product.id}
              data-home-card="product"
              className="bg-[#FAF9F5] border border-[#E8E2D5] rounded-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              {/* Product Thumbnail */}
              <div
                onClick={() => navigateToProduct(product.slug ?? product.id)}
                className="relative aspect-square bg-[#EFECE4] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image || '/product-placeholder.svg'}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#1C1A17] text-[#FAF9F5] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-semibold text-[#8C8475] tracking-wider">
                    {product.origin}
                  </div>
                  <h3
                    onClick={() => navigateToProduct(product.slug ?? product.id)}
                    className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#5C5549] cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7A7264] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE4D7] flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#1C1A17]">
                    {product.priceFormatted}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={addingToCartKey === `${product.id}:${product.availableSizes[0]?.weight || '1 KG Jar'}`}
                    className="bg-[#1C1A17] hover:bg-[#36322A] text-[#FAF9F5] p-2 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                    title="Add to Pantry Bag"
                  >
                    {addingToCartKey === `${product.id}:${product.availableSizes[0]?.weight || '1 KG Jar'}` ? <LoaderCircle className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" /> : <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    <span className="hidden sm:inline text-[11px]">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen Journals & Masterclasses Preview */}
      <section className="bg-[#F3EFE6] py-20 border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div data-home-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
                {content.journals.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1A17] mt-1">
                {content.journals.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6457] mt-1 max-w-xl">
                {content.journals.description}
              </p>
            </div>
            <button
              onClick={() => setActiveView("journals")}
              className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C5549] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{content.journals.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isRecipesLoading
              ? Array.from({ length: 3 }, (_, index) => <RecipeCardSkeleton key={index} />)
              : recipes.length ? recipes.map((recipe) => (
              <div
                key={recipe.id}
                data-home-card="recipe"
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-[#FAF9F5] border border-[#E8E2D5] rounded-sm overflow-hidden flex flex-col cursor-pointer group hover:shadow-lg transition-all duration-300"
              >
                <div className="h-56 bg-[#EFECE4] overflow-hidden relative">
                  <img
                    src={recipe.image || "/product-placeholder.svg"}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1C1A17]/90 text-[#FAF9F5] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
                    Recipe · {recipe.procedures.length} steps
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">
                      Nigerian Kitchen Recipe
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1C1A17] group-hover:text-[#5C5549] leading-snug">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-[#7A7264] line-clamp-3 leading-relaxed">
                      {recipe.notes || "A carefully documented Nigerian kitchen recipe."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE4D7] flex items-center justify-between text-xs text-[#1C1A17] font-semibold">
                    <span>Read Recipe</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              )) : <p className="md:col-span-3 text-sm text-[#7A7264]">Recipes coming soon.</p>}
          </div>
        </div>
      </section>

      <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />

      {/* Terroir & Origin Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-home-reveal className="relative rounded-sm overflow-hidden bg-[#1C1A17] text-[#FAF9F5] p-8 sm:p-14">
          <div className="max-w-2xl space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
              {content.provenance.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
              {content.provenance.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#D1C9BC] leading-relaxed">
              {content.provenance.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsStoryOpen(true)}
                className="bg-[#D4AF37] hover:bg-[#C29D2C] text-[#141311] px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>{content.provenance.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
