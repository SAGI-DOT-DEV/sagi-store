import {z} from 'zod';
import {apiRequest} from '../api-client';
export const orderStatus=z.enum(['PENDING_PAYMENT','PAYMENT_PROCESSING','PAID','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','REFUNDED','PAYMENT_REVIEW_REQUIRED']);
export const statusLabel=(status:string)=>status.toLowerCase().replaceAll('_',' ').replace(/^./,c=>c.toUpperCase());
export const fulfillmentStatus=z.enum(['PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED']);
export function nextFulfillment(status:string):z.infer<typeof fulfillmentStatus>|undefined{
 return ({PAID:'PROCESSING',PROCESSING:'SHIPPED',SHIPPED:'OUT_FOR_DELIVERY',OUT_FOR_DELIVERY:'DELIVERED'} as const)[status as 'PAID'];
}
const amount=z.coerce.number().finite();
export const adminOrderSchema=z.object({id:z.string(),status:orderStatus,currency:z.string(),total:amount,createdAt:z.string(),user:z.object({email:z.string(),profile:z.object({firstName:z.string(),lastName:z.string(),phone:z.string().nullable()}).nullable()}),_count:z.object({items:z.number()})});
export const adminOrderPageSchema=z.object({items:z.array(adminOrderSchema),pagination:z.object({page:z.number(),limit:z.number(),total:z.number(),totalPages:z.number()})});
export const adminOrderDetailSchema=adminOrderSchema.extend({subtotal:amount,shippingAmount:amount,shippingCarrier:z.string().nullable(),shippingService:z.string().nullable(),address:z.object({line1:z.string(),line2:z.string().nullable(),city:z.string(),state:z.string().nullable(),country:z.string(),postalCode:z.string().nullable()}).nullable(),
 items:z.array(z.object({id:z.string(),name:z.string(),sku:z.string(),quantity:z.number(),unitPrice:amount,variant:z.object({product:z.object({images:z.array(z.object({url:z.string()}))})}).nullable()})),
 histories:z.array(z.object({id:z.string(),previousStatus:orderStatus.nullable(),newStatus:orderStatus,createdAt:z.string()})),
 payments:z.array(z.object({id:z.string(),status:z.string(),amount,currency:z.string(),provider:z.string(),transactionReference:z.string(),createdAt:z.string()})),
});
export type AdminOrder=z.infer<typeof adminOrderSchema>;
export type AdminOrderDetail=z.infer<typeof adminOrderDetailSchema>;
export const adminOrdersService={
 list:async(query:string,token:string)=>adminOrderPageSchema.parse(await apiRequest('/api/v1/admin/orders?'+query,{cache:'no-store'},token)),
 get:async(id:string,token:string)=>adminOrderDetailSchema.parse(await apiRequest('/api/v1/admin/orders/'+encodeURIComponent(id),{cache:'no-store'},token)),
 update:async(id:string,status:z.infer<typeof fulfillmentStatus>,token:string)=>z.object({id:z.string(),status:orderStatus}).parse(await apiRequest('/api/v1/orders/'+encodeURIComponent(id)+'/status',{method:'PATCH',body:JSON.stringify({status})},token)),
};
