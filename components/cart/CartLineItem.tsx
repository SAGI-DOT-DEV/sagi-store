import { Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCAD } from '../../services/currency';
import { QuantityControl } from '../catalog/QuantityControl';

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart, navigateToProduct, setIsCartOpen } = useCart();
  const openProduct = () => { setIsCartOpen(false); navigateToProduct(item.product.slug || item.product.id); };
  return <article className="rounded-2xl border border-neutral-200 p-4">
    <div className="flex gap-4"><button onClick={openProduct} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-2" aria-label={`View ${item.product.name}`}><img src={item.product.image || '/product-placeholder.svg'} alt={item.product.name} referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="h-full w-full object-contain" /></button>
      <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><button onClick={openProduct} className="text-left text-sm font-semibold leading-6">{item.product.name}</button><button onClick={() => removeFromCart(item.product.id,item.selectedWeight)} aria-label={`Remove ${item.product.name} from cart`} className="store-icon -mr-2 -mt-2 h-9! w-9! text-neutral-500"><Trash2 size={15} /></button></div><p className="mt-1 text-xs text-neutral-500">{item.selectedWeight}</p><p className="mt-3 text-sm font-semibold">{formatCAD(item.unitPrice * item.quantity)}</p></div>
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><QuantityControl value={item.quantity} min={0} onChange={quantity => updateQuantity(item.product.id,item.selectedWeight,quantity)} label={item.product.name} /><span className="text-[11px] text-neutral-500">{formatCAD(item.unitPrice)} / unit</span></div>
  </article>;
}
