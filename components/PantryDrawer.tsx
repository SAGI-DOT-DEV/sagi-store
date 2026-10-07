'use client';
import { ArrowRight, ShoppingBag, X, LockKeyhole } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCAD } from '../services/currency';
import { SideDrawer } from './ui/SideDrawer';
import { CartLineItem } from './cart/CartLineItem';

export function PantryDrawer() {
  const { isCartOpen, setIsCartOpen, cart, cartTotal, cartItemCount, setActiveView } = useCart();
  const close = () => setIsCartOpen(false);
  return <SideDrawer open={isCartOpen} onClose={close} title="Shopping cart">
    <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-6 sm:px-8"><div><p className="store-eyebrow text-neutral-500">Your selection</p><h2 className="store-heading mt-2 flex items-center gap-3 text-3xl">Cart<span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-[10px] tracking-normal text-white">{cartItemCount}</span></h2></div><button onClick={close} className="store-icon border border-neutral-200" aria-label="Close cart"><X size={19} /></button></header>
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6 sm:px-8">
      {cart.length ? cart.map(item => <CartLineItem key={item.variantId || item.product.id + ':' + item.selectedWeight} item={item} />) : <div className="flex min-h-72 flex-col items-center justify-center py-12 text-center"><span className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-200"><ShoppingBag size={28} /></span><h3 className="store-heading mt-7 text-2xl">Your cart is empty</h3><p className="mt-3 max-w-xs text-sm leading-6 text-neutral-500">A taste of home is waiting. Discover the collection and make it yours.</p><button onClick={() => { close(); setActiveView('products'); }} className="store-button store-button-dark mt-7">Explore products<ArrowRight size={15} /></button></div>}
    </div>
    {!!cart.length && <footer className="shrink-0 space-y-5 border-t border-neutral-200 px-6 py-6 sm:px-8"><div className="flex items-center justify-between"><span className="text-sm">Subtotal</span><strong className="text-xl tracking-tight">{formatCAD(cartTotal)}</strong></div><p className="text-xs leading-5 text-neutral-500">Shipping is calculated at checkout using your delivery address.</p><button id="drawer-checkout-btn" onClick={() => { close(); setActiveView('checkout'); }} className="store-button store-button-dark w-full">Continue to checkout<ArrowRight size={16} /></button><button type="button" onClick={() => { close(); setActiveView('products'); }} className="store-button store-button-outline w-full">Continue shopping</button><p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500"><LockKeyhole size={13} />Secure checkout</p></footer>}
  </SideDrawer>;
}
