"use client";

import { useEffect } from 'react';
import { HomeView } from '../views/HomeView';
import { ProductsView } from '../views/ProductsView';
import { RecipesView } from '../views/RecipesView';
import { ProductDetailView } from '../views/ProductDetailView';
import { CheckoutView } from '../views/CheckoutView';
import { useCart } from '../context/CartContext';
import type { HomeContent } from '../data/home-content';

type RouteContentProps = { view: 'home' | 'products' | 'journals' | 'checkout' | 'product'; productId?: string; content?: HomeContent };

export function RouteContent({ view, productId, content }: RouteContentProps) {
  const { setSelectedProductId } = useCart();
  useEffect(() => {
    if (view === 'product' && productId) setSelectedProductId(productId);
  }, [view, productId, setSelectedProductId]);

  if (view === 'products') return <ProductsView />;
  if (view === 'journals') return <RecipesView />;
  if (view === 'checkout') return <CheckoutView />;
  if (view === 'product') return <ProductDetailView productSlug={productId} />;
  return <HomeView content={content} />;
}
