'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { readCartCache, writeCartCache, clearCartCache } from '../services/cart-cache';
import {trackEvent} from '../services/analytics';
import { useRouter } from 'next/navigation';
import { Product, CartItem, JournalArticle } from '../types';
import { PRODUCTS } from '../data/products';
import { useAuth } from './AuthContext';
import { addCartItem, getCart, mapCartItem, removeCartItem, updateCartItem } from '../services/cart.service';

interface ToastNotification {
  status?: 'loading' | 'success' | 'error';
  id: string;
  message: string;
  productName?: string;
}

interface CartContextType {
  activeView: 'home' | 'products' | 'journals' | 'product-detail' | 'checkout';
  setActiveView: (view: 'home' | 'products' | 'journals' | 'product-detail' | 'checkout') => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedProduct: Product;
  selectedJournal: JournalArticle | null;
  setSelectedJournal: (journal: JournalArticle | null) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStoryOpen: boolean;
  setIsStoryOpen: (open: boolean) => void;
  addToCart: (product: Product, weight?: string, quantity?: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  addingToCartKey: string | null;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (message: string, productName?: string, status?: 'loading' | 'success' | 'error') => string;
  navigateToProduct: (productId: string) => void;
  navigateToJournal: (journal: JournalArticle) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { accessToken, user, isLoading, sessionError, setAuthModalOpen } = useAuth();
  const [activeView, setActiveViewState] = useState<'home' | 'products' | 'journals' | 'product-detail' | 'checkout'>('home');
  const setActiveView = (view: 'home' | 'products' | 'journals' | 'product-detail' | 'checkout') => {
    setActiveViewState(view);
    const paths = { home: '/', products: '/products', journals: '/journals', 'product-detail': '/products/ijebu-gold-garri', checkout: '/checkout' } as const;
    router.push(paths[view]);
  };
  const [selectedProductId, setSelectedProductId] = useState<string>('ijebu-gold-garri');
  const [selectedJournal, setSelectedJournal] = useState<JournalArticle | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const [cartState, setCartState] = useState<{ owner: string; items: CartItem[] }>({ owner: '', items: [] });
  const cart = user?.id === cartState.owner ? cartState.items : [];
  const setCart = (update: React.SetStateAction<CartItem[]>) => {
    const owner = user?.id || '';
    setCartState(current => ({ owner, items: typeof update === 'function' ? update(current.owner === owner ? current.items : []) : update }));
  };
  const cacheOwner = useRef<string | null>(null);
  useEffect(() => {
    if (isLoading) return;
    if (cacheOwner.current && cacheOwner.current !== user?.id) clearCartCache(cacheOwner.current);
    cacheOwner.current = user?.id || null;
    setCartState({ owner: user?.id || '', items: user ? readCartCache(user.id) : [] });
  }, [user?.id, isLoading]);
  useEffect(() => {
    if (user?.id && cartState.owner === user.id) writeCartCache(user.id, cartState.items);
  }, [cartState, user?.id]);
  const [cartRefresh, setCartRefresh] = useState(0);
  useEffect(() => {
    const refresh = () => setCartRefresh(value => value + 1);
    window.addEventListener('sagi:cart-refresh', refresh);
    return () => window.removeEventListener('sagi:cart-refresh', refresh);
  }, []);
  const [addingToCartKey, setAddingToCartKey] = useState<string | null>(null);
  const mutationVersions = useRef(new Map<string, number>());
  const editRevision = useRef(0);
  const currentUserId = useRef(user?.id);
  currentUserId.current = user?.id;
  const nextMutation = (key: string) => {
    editRevision.current += 1;
    const version = (mutationVersions.current.get(key) || 0) + 1;
    mutationVersions.current.set(key, version);
    return version;
  };
  const isLatestMutation = (key: string, version: number) => Boolean(user) && currentUserId.current === user?.id && mutationVersions.current.get(key) === version;

  useEffect(() => {
    if (isLoading) return;
    if (!accessToken || !user) { setCart([]); return; }
    let active = true;
    const revision = editRevision.current;
    void getCart(accessToken).then(result => { if (active && revision === editRevision.current) setCart(result.items.map(mapCartItem)); }).catch(() => {});
    return () => { active = false; };
  }, [accessToken, user?.id, isLoading, cartRefresh]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProductId]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const showToast = (message: string, productName?: string, status: 'loading' | 'success' | 'error' = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, productName, status }]);
    if (status !== 'loading') setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = async (product: Product, weight?: string, quantity: number = 1) => {
    if (isLoading || sessionError) { showToast('Please wait for your account to load, or retry your account connection.'); return; }
    if (!accessToken) {
      showToast('Please sign in to add items to your Pantry Bag');
      setAuthModalOpen(true);
      return;
    }
    const targetWeight = weight || product.availableSizes[0]?.weight || '1 KG Jar';
    const sizeConfig = product.availableSizes.find((s) => s.weight === targetWeight) || product.availableSizes[0];
    const variantIndex = product.availableSizes.findIndex((s) => s.weight === targetWeight);
    const variantId = product.backendVariantIds?.[variantIndex] ?? product.backendVariantId;
    if (!variantId) { showToast('This product is not available for purchase yet'); return; }
    window.dispatchEvent(new CustomEvent('sagi:cart-edited'));
    const mutationKey = `cart:${variantId}`;
    const version = nextMutation(mutationKey);
    const previousCart = cart;
    const cartKey = `${product.id}:${targetWeight}`;
    setAddingToCartKey(cartKey);
    const existing = cart.find((entry) => entry.variantId === variantId);
    if (existing) {
      setCart((current) => current.map((entry) => entry.variantId === variantId ? { ...entry, quantity: entry.quantity + quantity } : entry));
    } else {
      setCart((current) => [...current, { product, selectedWeight: targetWeight, quantity, unitPrice: product.price * (sizeConfig?.priceMultiplier ?? 1), variantId }]);
    }
    showToast('Added to your Pantry Bag', `${product.name} (${targetWeight})`);
    setIsCartOpen(true);
    try {
      // Keep the optimistic item rendered. Replacing the whole cart with a
      // slower/stale response here causes items to disappear and re-appear.
      // The next cart refresh still reconciles state with the server.
      await addCartItem(accessToken, variantId, quantity);
      const price=product.price*(sizeConfig?.priceMultiplier??1);
      trackEvent('add_to_cart',{currency:'CAD',value:price*quantity,items:[{item_id:variantId,item_name:product.name,price,quantity}]});
    } catch (error) {
      if (isLatestMutation(mutationKey, version)) setCart(previousCart);
      showToast(error instanceof Error ? error.message : 'Could not update your Pantry Bag');
    } finally {
      if (isLatestMutation(mutationKey, version)) setAddingToCartKey(null);
    }
  };

  const removeFromCart = async (productId: string, weight: string) => {
    if (!accessToken) return;
    const item = cart.find((entry) => entry.product.id === productId && entry.selectedWeight === weight);
    if (!item?.variantId) return;
    window.dispatchEvent(new CustomEvent('sagi:cart-edited'));
    const mutationKey = `cart:${item.variantId}`;
    const version = nextMutation(mutationKey);
    const previousCart = cart;
    setCart((current) => current.filter((entry) => entry.variantId !== item.variantId));
    showToast('Removed from your Pantry Bag', item.product.name);
    try { const result = await removeCartItem(accessToken, item.variantId); if (isLatestMutation(mutationKey, version)) setCart(result.items.map(mapCartItem)); } catch (error) { if (isLatestMutation(mutationKey, version)) setCart(previousCart); showToast(error instanceof Error ? error.message : 'Could not remove item'); }
  };

  const updateQuantity = async (productId: string, weight: string, quantity: number) => {
    if (!accessToken) return;
    const item = cart.find((entry) => entry.product.id === productId && entry.selectedWeight === weight);
    if (!item?.variantId) return;
    if (quantity <= 0) { await removeFromCart(productId, weight); return; }
    window.dispatchEvent(new CustomEvent('sagi:cart-edited'));
    const mutationKey = `cart:${item.variantId}`;
    const version = nextMutation(mutationKey);
    const previousCart = cart;
    setCart((current) => current.map((entry) => entry.variantId === item.variantId ? { ...entry, quantity } : entry));
    try { const result = await updateCartItem(accessToken, item.variantId, quantity); if (isLatestMutation(mutationKey, version)) setCart(result.items.map(mapCartItem)); } catch (error) { if (isLatestMutation(mutationKey, version)) setCart(previousCart); showToast(error instanceof Error ? error.message : 'Could not update quantity'); }
  };

  const clearCart = () => { setCart([]); };

  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveViewState('product-detail');
    router.push(`/products/${encodeURIComponent(productId)}`);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const navigateToJournal = (journal: JournalArticle) => {
    setSelectedJournal(journal);
    setActiveViewState('journals');
    router.push('/journals');
    setIsSearchOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        selectedJournal,
        setSelectedJournal,
        cart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isStoryOpen,
        setIsStoryOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        addingToCartKey,
        toasts,
        dismissToast,
        showToast,
        navigateToProduct,
        navigateToJournal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
