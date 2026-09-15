import React from 'react';
import { AnimatedPanel } from './ui/AnimatedPanel';
import { formatCAD } from '../services/currency';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

export const PantryDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    cartItemCount,
    updateQuantity,
    removeFromCart,
    setActiveView,
    navigateToProduct
  } = useCart();


  const FREE_SHIPPING_THRESHOLD = 35000;
  const progressToFreeShipping = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  return (
    <AnimatedPanel open={isCartOpen} mode="drawer" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        data-slide-backdrop
        className="absolute inset-0 bg-[#141311]/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div data-slide-panel className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl border-l border-[#E8E2D5] flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EAE4D7] flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1C1A17]" />
              <h2 className="font-serif text-2xl font-bold text-[#1C1A17]">Your Pantry</h2>
              <span className="bg-[#EFECE4] text-[#5C5549] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              id="close-pantry-drawer"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#7A7264] hover:text-[#1C1A17] rounded-full hover:bg-[#EFECE4] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="hidden bg-[#F3EFE6] px-6 py-3 border-b border-[#E8E2D5] text-xs">
            <div className="flex items-center justify-between font-medium text-[#4A453C] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                {remainingForFreeShipping === 0
                  ? 'Complimentary Climate-Controlled Delivery Unlocked'
                  : `Add ${formatCAD(remainingForFreeShipping)} for Complimentary Courier`}
              </span>
              <span className="font-bold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-[#E5DFC9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1C1A17] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-[#EAE4D7]">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFECE4] flex items-center justify-center mx-auto text-[#7A7264]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#1C1A17]">Your pantry is empty</h3>
                  <p className="text-xs text-[#7A7264] max-w-xs mx-auto">
                    Discover our reserve collection of single-estate grains, cold-pressed oils, and sun-dried flours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('products');
                  }}
                  className="mt-4 bg-[#1C1A17] text-[#FAF9F5] px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#36322A] transition-colors inline-flex items-center gap-2"
                >
                  Explore The Staples <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedWeight}-${idx}`} className="pt-5 first:pt-0 flex gap-4">
                  {/* Product Image Thumbnail */}
                  <div
                    onClick={() => navigateToProduct(item.product.slug ?? item.product.id)}
                    className="w-20 h-20 bg-[#EFECE4] rounded-sm overflow-hidden shrink-0 border border-[#E8E2D5] cursor-pointer group"
                  >
                    <img
                      src={item.product.image || '/product-placeholder.svg'}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => navigateToProduct(item.product.slug ?? item.product.id)}
                          className="font-serif text-base font-bold text-[#1C1A17] hover:text-[#5C5549] cursor-pointer leading-tight"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-[#A39B8E] hover:text-[#C53030] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-[#7A7264] block mt-0.5">{item.selectedWeight}</span>
                      <span className="text-xs font-bold text-[#1C1A17] mt-1 block">
                        {formatCAD(item.unitPrice * item.quantity)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-[#D9D2C5] rounded-sm bg-[#FAF9F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                          className="p-1.5 text-[#5C5549] hover:text-[#1C1A17] hover:bg-[#EFECE4] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1C1A17]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                          className="p-1.5 text-[#5C5549] hover:text-[#1C1A17] hover:bg-[#EFECE4] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#8C8475]">{formatCAD(item.unitPrice)} / unit</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE4D7] bg-[#FAF9F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5C5549]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1C1A17] text-sm">{formatCAD(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Climate-Controlled Packaging</span>
                  <span className="text-[#2E7D32] font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Courier Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EAE4D7] flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-[#1C1A17]">Pantry Total</span>
                <span className="font-serif text-2xl font-bold text-[#1C1A17]">{formatCAD(cartTotal)}</span>
              </div>

              <button
                id="drawer-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('checkout');
                }}
                className="w-full bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7264] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Single-origin guarantee • Direct farm fair trade</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedPanel>
  );
};
