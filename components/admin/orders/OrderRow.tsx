import {type AdminOrder,statusLabel} from '../../../services/admin/orders.service';
import {OrderProducts} from './OrderProducts';
export function orderMoney(amount:number,currency:string){return new Intl.NumberFormat('en-CA',{style:'currency',currency,currencyDisplay:'code'}).format(amount);}
export function OrderRow({order,onOpen}:{order:AdminOrder;onOpen:()=>void}){
 const profile=order.user.profile;
 return <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 md:items-center py-6 border-b border-admin-outline-variant text-sm">
 <div className="min-w-0"><span title={order.id} className="block truncate font-medium">{order.id}</span><span className="text-xs text-admin-on-surface-variant">{order._count.items} line items</span><OrderProducts items={order.items}/></div>
 <div className="min-w-0"><p>{profile?[profile.firstName,profile.lastName].join(' '):'Customer'}</p><p className="text-xs break-all text-admin-on-surface-variant">{order.user.email}</p></div>
 <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString('en-CA')}</time><p>{orderMoney(order.total,order.currency)}</p>
 <span className="text-[10px] uppercase tracking-widest border border-admin-outline-variant rounded-sm px-2 py-2">{statusLabel(order.status)}</span>
 <button onClick={onOpen} className="bg-admin-primary text-white px-4 py-3 text-xs uppercase">View order</button>
 </div>;
}
