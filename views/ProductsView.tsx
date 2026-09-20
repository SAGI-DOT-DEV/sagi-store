import { DistributorInvite } from '../components/DistributorInvite';
import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";
import {
  getProductCategories,
  getProducts,
} from "../services/products.service";
import {
  Sparkles,
  Plus,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Layers,
} from "lucide-react";
import { ProductCardSkeleton } from "../components/ui/ProductCardSkeleton";
import { CategoryFilterSkeleton } from "../components/ui/CategoryFilterSkeleton";
import { LoaderCircle } from "lucide-react";

export const ProductsView: React.FC = () => {
  const { cart, navigateToProduct, addToCart, addingToCartKey } = useCart();
  const isOutOfStock = (product: Product) => {
    const variantId = product.backendVariantIds?.[0] ?? product.backendVariantId;
    const inCart = cart.filter(item => variantId ? item.variantId === variantId : item.product.id === product.id && item.selectedWeight === product.availableSizes[0]?.weight).reduce((sum, item) => sum + item.quantity, 0);
    return (product.availableSizes[0]?.stockQuantity ?? 0) <= inCart;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name"
  >("featured");

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([getProducts(), getProductCategories()])
      .then(([liveProducts, liveCategories]) => {
        if (cancelled) return;
        setProducts(liveProducts);
        setCategories(liveCategories);
      })
      .catch(() => {
        if (!cancelled)
          setLoadError(
            "We could not load the live catalog. Please check that the backend is running.",
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryOptions = ["All", ...categories];

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [products, selectedCategory, sortBy]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#737373]">
          {/* <Sparkles className="w-3.5 h-3.5" /> */}
          <span>The Staples Catalog</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#000000] tracking-tight">
          Provisions of the Highest Order
        </h1>
        <p className="text-xs sm:text-sm text-[#535353] leading-relaxed">
          Single-origin grains, slow-fermented cassava, cold-pressed oils, and
          sun-dried flours sourced directly from Nigeria's historic agrarian
          estates.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E4E4E4]">
        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {isLoading ? (
            <CategoryFilterSkeleton />
          ) : (
            categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                    : "bg-[#F4F4F4] text-[#404040] hover:bg-[#E4E4E4] hover:text-[#000000]"
                }`}
              >
                {cat === "All" ? "All Staples" : cat}
              </button>
            ))
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
          <span className="text-[#727272] font-medium">
            Showing{" "}
            <strong className="text-[#000000]">
              {filteredProducts.length}
            </strong>{" "}
            provisions
          </span>

          <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#D4D4D4] px-3 py-1.5 rounded-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#535353]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-[#000000] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid with Bento Newsletter Card */}
      {isLoading && (
        <span role="status" className="sr-only">
          Loading products
        </span>
      )}
      {loadError && (
        <p className="border border-[#D4D4D4] bg-[#F4F4F4] p-4 text-sm text-[#404040]">
          {loadError}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E4E4E4] rounded-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-[#737373]/50 transition-all duration-300"
              >
                {/* Image Box */}
                <div
                  onClick={() => navigateToProduct(product.slug ?? product.id)}
                  className="relative aspect-square bg-[#F4F4F4] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image || "/product-placeholder.svg"}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#000000]/95 text-[#FFFFFF] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-sm backdrop-blur-sm">
                      {product.badge}
                    </span>
                  )}

                  {product.moistureContent && (
                    <span className="absolute top-3 right-3 bg-[#FFFFFF] text-[#404040] text-[10px] font-bold px-2 py-0.5 rounded-sm backdrop-blur-sm">
                      {product.moistureContent} Moisture
                    </span>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {(product.origin || product.category) && <div className="flex items-center justify-between gap-2 text-[10px] uppercase font-semibold text-[#727272] tracking-wider">
                      {product.origin && <span>{product.origin}</span>}
                      {product.category && <span className="text-[#737373] font-bold">{product.category}</span>}
                    </div>}
                    <h3
                      onClick={() =>
                        navigateToProduct(product.slug ?? product.id)
                      }
                      className="font-serif text-xl font-bold text-[#000000] group-hover:text-[#404040] cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#535353] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Optional product highlights */}
                    {Boolean(product.highlights?.length) && <div className="flex flex-wrap gap-1.5 pt-2">
                      {(product.highlights ?? []).slice(0, 2).map((note, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F4F4F4] text-[#404040] px-2 py-0.5 rounded-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-[#E4E4E4] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#727272] block uppercase tracking-wider">
                        {product.availableSizes[0]?.weight || 'Standard'}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#000000]">
                        {product.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigateToProduct(product.slug ?? product.id)
                        }
                        className="text-xs text-[#404040] hover:text-[#000000] font-semibold underline underline-offset-4 px-2"
                      >
                        Specs
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={
                          isOutOfStock(product) ||
                          addingToCartKey ===
                          `${product.id}:${product.availableSizes[0]?.weight || "1 KG Jar"}`
                        }
                        className="bg-[#000000] hover:bg-[#272727] text-[#FFFFFF] px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm disabled:cursor-not-allowed disabled:bg-[#F4F4F4] disabled:text-[#535353] disabled:shadow-none"
                      >
                        {addingToCartKey ===
                        `${product.id}:${product.availableSizes[0]?.weight || "1 KG Jar"}` ? (
                          <LoaderCircle className="w-3.5 h-3.5 animate-spin text-[#737373]" />
                        ) : !isOutOfStock(product) ? (
                          <Plus className="w-3.5 h-3.5 text-[#737373]" />
                        ) : null}
                        <span>{isOutOfStock(product) ? 'Out of stock' : 'Add to Bag'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        <DistributorInvite />
      </div>
    </div>
  );
};
