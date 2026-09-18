import {z} from 'zod';
import {apiRequest} from '../api-client';
export const paymentStatuses=['PENDING','PROCESSING','SUCCEEDED','FAILED','CANCELED','REFUNDED','REVIEW_REQUIRED'] as const;
const amount=z.coerce.number().finite();
export const transactionSchema=z.object({id:z.string(),orderId:z.string(),transactionReference:z.string(),provider:z.string(),status:z.enum(paymentStatuses),amount,currency:z.string(),createdAt:z.string(),paymentIntentId:z.string().nullable(),checkoutSessionId:z.string().nullable(),failureMessage:z.string().nullable(),order:z.object({status:z.string(),user:z.object({email:z.string()}),items:z.array(z.object({id:z.string(),name:z.string(),quantity:z.number(),variant:z.object({product:z.object({name:z.string()})}).nullable().optional()})).optional()}),attempts:z.array(z.object({id:z.string(),status:z.string(),createdAt:z.string(),failureMessage:z.string().nullable()}))});
const logSchema=z.object({id:z.string(),type:z.string(),status:z.string().nullable(),message:z.string().nullable(),createdAt:z.string()});
const eventSchema=z.object({id:z.string(),type:z.string(),status:z.string(),livemode:z.boolean(),attempts:z.number(),receivedAt:z.string(),processedAt:z.string().nullable(),errorMessage:z.string().nullable()});
export type Transaction=z.infer<typeof transactionSchema>;
export type TransactionLog=z.infer<typeof logSchema>;
export type TransactionEvent=z.infer<typeof eventSchema>;
export const transactionsService={
 list:async(query:string,token:string)=>z.array(transactionSchema).parse(await apiRequest('/api/v1/admin/transactions?'+new URLSearchParams({q:query}),{cache:'no-store'},token)),
 timeline:async(id:string,token:string)=>z.array(logSchema).parse(await apiRequest('/api/v1/admin/transactions/'+encodeURIComponent(id)+'/timeline',{cache:'no-store'},token)),
 events:async(id:string,token:string)=>z.array(eventSchema).parse(await apiRequest('/api/v1/admin/transactions/'+encodeURIComponent(id)+'/stripe-events',{cache:'no-store'},token)),
};
