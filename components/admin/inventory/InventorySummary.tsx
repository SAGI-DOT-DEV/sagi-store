import type {InventoryItem} from '../../../services/admin/inventory.service';
export function InventorySummary({items}:{items:InventoryItem[]}){
 const stats=[['On hand',items.reduce((n,item)=>n+item.quantity,0)],['Reserved',items.reduce((n,item)=>n+item.reservedQuantity,0)],['Available',items.reduce((n,item)=>n+item.availableQuantity,0)],['Low / out of stock',items.filter(item=>item.availableQuantity<=10).length]];
 return <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 my-8">{stats.map(([label,value])=><div key={label} className="border border-admin-outline-variant bg-white p-5"><p className="text-[10px] uppercase tracking-widest text-admin-on-surface-variant">{label}</p><p className="font-serif text-3xl mt-3">{value}</p></div>)}</div>;
}
