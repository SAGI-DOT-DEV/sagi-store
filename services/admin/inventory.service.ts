import {z} from 'zod';
import {apiRequest} from '../api-client';
import {getAdminReport,type AdminReports} from './overview.service';
export type InventoryItem=AdminReports['inventory'][number];
export const inventoryAdjustmentSchema=z.object({change:z.number().int().min(-1000000).max(1000000).refine(value=>value!==0,'Enter a non-zero adjustment.'),reason:z.string().trim().min(1,'Enter a reason.').max(500)});
export type InventoryAdjustment=z.infer<typeof inventoryAdjustmentSchema>;
export const inventoryService={
 list:(token:string)=>getAdminReport('inventory','',token),
 adjust:async(variantId:string,input:InventoryAdjustment,token:string)=>z.object({id:z.string(),quantity:z.number(),reservedQuantity:z.number()}).parse(await apiRequest('/api/v1/admin/inventory/'+encodeURIComponent(variantId)+'/adjust',{method:'POST',body:JSON.stringify(input)},token)),
};
export function stockLabel(available:number){return available<=0?'Out of stock':available<=10?'Low stock':'In stock';}
export function filterInventory(items:InventoryItem[],search:string,status:string){
 const query=search.trim().toLowerCase();
 return items.filter(item=>(!query||[item.product,item.name,item.sku].join(' ').toLowerCase().includes(query))&&(!status||stockLabel(item.availableQuantity)===status)).sort((a,b)=>a.product.localeCompare(b.product)||a.sku.localeCompare(b.sku));
}
