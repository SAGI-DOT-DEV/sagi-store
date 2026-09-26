'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../services/products.service';
import type { Product } from '../types';
import { ProductGallery } from '../components/catalog/ProductGallery';
import { ProductPurchase } from '../components/catalog/ProductPurchase';
import { CatalogFeedback } from '../components/catalog/CatalogFeedback';
import { ProductRecommendations } from '../components/ProductRecommendations';
import { ProductDetailSkeleton } from '../components/ui/ProductDetailSkeleton';
import { ProductAnalytics } from '../components/analytics/ProductAnalytics';

export function ProductDetailView({ productSlug }: { productSlug?: string }) {
  const { selectedProduct, showToast } = useCart();
  const [result, setResult] = useState<{ slug: string; product?: Product; error?: string } | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!productSlug) return;
    let active = true;
    setResult(null);
    getProductBySlug(productSlug).then(product => { if (active) setResult({slug:productSlug,product}); }).catch(() => { if (active) setResult({slug:productSlug,error:'This product could not be loaded. Please try again.'}); });
    return () => { active = false; };
  }, [productSlug,attempt]);
  if (productSlug && (!result || result.slug !== productSlug)) return <ProductDetailSkeleton />;
  if (result?.error) return <div className="store-container py-20"><CatalogFeedback message={result.error} onRetry={() => setAttempt(value => value + 1)} /><Link href="/products" className="store-button store-button-outline mt-5">Back to products</Link></div>;
  const product = result?.product ?? selectedProduct;
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); showToast('Product link copied.'); }
    catch { showToast('Unable to copy the link. You can copy it from your address bar.',undefined,'error'); }
  };
  return <div className="store-container space-y-14 py-8 sm:py-12">
    <ProductAnalytics id={product.backendVariantId ?? product.id} name={product.name} price={product.price} />
    <div className="flex items-center justify-between gap-4 text-xs text-neutral-600"><Link href="/products" className="flex items-center gap-2"><ArrowLeft size={14} />Back to collection</Link><button onClick={share} className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2"><Share2 size={14} />Share</button></div>
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"><ProductGallery key={product.id} product={product} /><ProductPurchase key={product.id} product={product} /></div>
    <ProductRecommendations productId={product.id} />
  </div>;
}
