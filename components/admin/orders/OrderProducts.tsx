import type {AdminOrder} from '../../../services/admin/orders.service';
export function OrderProducts({items}: {items:AdminOrder['items']}){
 if(!items?.length)return <p className="mt-2 text-xs text-admin-on-surface-variant">Open order for item details.</p>;
 return <ul aria-label="Ordered products" className="mt-3 space-y-2">{items.map(item=><li key={item.id} className="flex items-start gap-2 text-xs"><span className="min-w-0 break-words">{item.variant?.product.name||item.name||'Unavailable product'}</span><span className="shrink-0 text-admin-on-surface-variant">× {item.quantity}</span></li>)}</ul>;
}
