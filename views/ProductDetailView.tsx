import React, { useState } from 'react';
import {ProductAnalytics} from '../components/analytics/ProductAnalytics';
import { formatCAD } from '../services/currency';
import { useCart } from '../context/CartContext';
import { ProductRecommendations } from '../components/ProductRecommendations';
import { getProductBySlug } from '../services/products.service';
import type { Product } from '../types';
import { ProductDetailSkeleton } from '../components/ui/ProductDetailSkeleton';
import {
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  Droplets,
  Flame,
  Award,
  Clock,
  MapPin,
  LoaderCircle,
} from 'lucide-react';

export const ProductDetailView: React.FC<{ productSlug?: string }> = ({ productSlug }) => {
  const { cart, selectedProduct, addToCart, setActiveView, navigateToProduct, addingToCartKey } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(productSlug));
  const [loadError, setLoadError] = useState<string | null>(null);
  const displayProduct = product ?? selectedProduct;
  const [selectedImage, setSelectedImage] = useState<string>(displayProduct.image);
  const [selectedWeight, setSelectedWeight] = useState<string>(
    displayProduct.availableSizes[0]?.weight || '1 KG Jar'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Load the live product by its public slug. The static product remains as a safe fallback.
  React.useEffect(() => {
    if (!productSlug) return;
    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);
    getProductBySlug(productSlug)
      .then((liveProduct) => {
        if (!cancelled) setProduct(liveProduct);
      })
      .catch(() => {
        if (!cancelled) setLoadError('This product could not be loaded from the catalog.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [productSlug]);

  React.useEffect(() => {
    setSelectedImage(displayProduct.image);
    setSelectedWeight(displayProduct.availableSizes[0]?.weight || '1 KG Jar');
    setQuantity(1);
  }, [displayProduct]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (loadError && !product) return <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-[#535353]">{loadError}</div>;

  const sizeConfig =
    displayProduct.availableSizes.find((s) => s.weight === selectedWeight) ||
    displayProduct.availableSizes[0];

  const basePrice = Math.round(displayProduct.price * (sizeConfig ? sizeConfig.priceMultiplier : 1) * 100) / 100;
  const variantIndex = displayProduct.availableSizes.indexOf(sizeConfig);
  const variantId = displayProduct.backendVariantIds?.[variantIndex] ?? displayProduct.backendVariantId;
  const inCart = cart.filter(item => variantId ? item.variantId === variantId : item.product.id === displayProduct.id && item.selectedWeight === selectedWeight).reduce((sum, item) => sum + item.quantity, 0);
  const remaining = Math.max(0, (sizeConfig?.stockQuantity ?? 0) - inCart);
  const outOfStock = remaining === 0;
  const selectedQuantity = Math.min(quantity, Math.max(1, remaining));
  const finalUnitPrice = basePrice;
  const totalPrice = finalUnitPrice * selectedQuantity;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {product&&<ProductAnalytics id={product.backendVariantId??product.id} name={product.name} price={product.price}/>}
      {/* Breadcrumbs & Navigation Back */}
      <div className="flex items-center justify-between text-xs text-[#535353] border-b border-[#E4E4E4] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('products')}
            className="hover:text-[#000000] flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to The Staples
          </button>
          <span>/</span>
          <span>{displayProduct.category}</span>
          <span>/</span>
          <span className="text-[#000000] font-semibold">{displayProduct.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-1.5 hover:text-[#000000] transition-colors flex items-center gap-1"
            title="Share this product"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-1.5 transition-colors ${
              isFavorited ? 'text-[#505050]' : 'hover:text-[#000000]'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-sm overflow-hidden bg-[#F4F4F4] border border-[#E4E4E4] shadow-sm">
            <img
                src={selectedImage || '/product-placeholder.svg'}
              alt={displayProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            {displayProduct.badge && (
              <span className="absolute top-4 left-4 bg-[#000000]/95 text-[#FFFFFF] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-sm shadow-md backdrop-blur-sm">
                {displayProduct.badge}
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {displayProduct.galleryImages && displayProduct.galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {displayProduct.galleryImages.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 bg-[#F4F4F4] transition-all ${
                    selectedImage === imgUrl
                      ? 'border-[#000000] ring-1 ring-[#000000]'
                      : 'border-[#E4E4E4] hover:border-[#A2A2A2] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Purchase Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#737373]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{displayProduct.origin}</span>
              <span>•</span>
              <span>{displayProduct.estate}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#000000] leading-tight">
              {displayProduct.name}
            </h1>

            <p className="text-sm text-[#535353] font-medium leading-relaxed">
              {displayProduct.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#404040] leading-relaxed pt-1">
              {displayProduct.description}
            </p>
          </div>

          {/* Pricing & Size Selector */}
          <div className="space-y-4 pt-4 border-t border-[#E4E4E4]">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-[#000000]">
                  {formatCAD(finalUnitPrice)}
                </span>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${outOfStock ? 'text-[#535353] bg-[#F4F4F4]' : 'text-[#676767] bg-[#F1F1F1]'}`}>
                {outOfStock ? 'Out of stock' : `${remaining} in stock • Premium shipping rates`}
              </span>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#000000]">
                Select Reserve Packaging
              </label>
              <div className="grid grid-cols-3 gap-2">
                {displayProduct.availableSizes.map((size) => (
                  <button
                    key={size.weight}
                    onClick={() => setSelectedWeight(size.weight)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-sm border transition-all text-center ${
                      selectedWeight === size.weight
                        ? 'border-[#000000] bg-[#000000] text-[#FFFFFF] shadow-sm'
                        : 'border-[#D4D4D4] bg-[#FFFFFF] text-[#404040] hover:border-[#000000] hover:text-[#000000]'
                    }`}
                  >
                    {size.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-[#D4D4D4] rounded-sm bg-[#FFFFFF] h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, selectedQuantity - 1))}
                  disabled={outOfStock || selectedQuantity <= 1}
                  className="px-3 h-full text-[#404040] hover:text-[#000000] hover:bg-[#F4F4F4] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-[#000000]">{selectedQuantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(remaining, selectedQuantity + 1))}
                  disabled={outOfStock || selectedQuantity >= remaining}
                  className="px-3 h-full text-[#404040] hover:text-[#000000] hover:bg-[#F4F4F4] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                id="product-add-to-bag-btn"
                onClick={() => addToCart(displayProduct, selectedWeight, selectedQuantity)}
                disabled={outOfStock || addingToCartKey === `${displayProduct.id}:${selectedWeight}`}
                className="flex-1 bg-[#000000] hover:bg-[#272727] text-[#FFFFFF] h-12 px-6 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-md group"
              >
                <span>{outOfStock ? 'Out of stock' : `Add to Bag • ${formatCAD(totalPrice)}`}</span>
                {addingToCartKey === `${displayProduct.id}:${selectedWeight}` && <LoaderCircle className="w-4 h-4 animate-spin text-[#737373]" />}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#737373]" />
              </button>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="pt-4 border-t border-[#E4E4E4] space-y-2 text-xs text-[#535353]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#676767]" />
              <span>100% Optic Laser-Sorted: Guaranteed zero sand, pebbles, or chaff</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#737373]" />
              <span>Premium shipping rates calculated at checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive: The Heritage Process & Provenance */}
      <div className="bg-[#FFFFFF] border border-[#E4E4E4] rounded-sm p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#737373]">
            Artisan Production & Science
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#000000]">
            The Heritage Process
          </h2>
          <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
            {displayProduct.provenanceStory}
          </p>
        </div>

        {/* 3 Pillars for this product */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#DADADA]">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#737373]" /> Single Estate Origin
            </span>
            <p className="text-xs text-[#535353] leading-relaxed">
              Grown and harvested exclusively at {displayProduct.estate}, ensuring pure genetic strain integrity.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#737373]" /> Traditional Roast & Curing
            </span>
            <p className="text-xs text-[#535353] leading-relaxed">
              Processed using ancestral hardwood fire-roasting and controlled microbial aging chambers.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#737373]" /> Controlled Moisture (8.4%)
            </span>
            <p className="text-xs text-[#535353] leading-relaxed">
              Maintains optimal starch crystallinity for maximum liquid swell and crisp crunch.
            </p>
          </div>
        </div>
      </div>

      <ProductRecommendations productId={displayProduct.id} />
    </div>
  );
};
