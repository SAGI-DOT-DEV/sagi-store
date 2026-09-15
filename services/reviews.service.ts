import {z} from 'zod';
import {apiRequest} from './api-client';
import {reviewSchema,type ReviewInput} from '../schemas/review.schema';
const reviewOrderSchema=z.object({id:z.string(),status:z.string(),items:z.array(z.object({id:z.string(),name:z.string(),quantity:z.number()}))});
export const reviewsService={
 get:async(orderId:string,token:string)=>reviewSchema.nullable().parse(await apiRequest('/api/v1/reviews/experience?'+new URLSearchParams({orderId}),{cache:'no-store'},token)),
 order:async(orderId:string,token:string)=>reviewOrderSchema.parse(await apiRequest('/api/v1/orders/'+encodeURIComponent(orderId),{cache:'no-store'},token)),
 create:async(input:ReviewInput,token:string)=>reviewSchema.parse(await apiRequest('/api/v1/reviews/experience',{method:'POST',body:JSON.stringify(input)},token)),
};
