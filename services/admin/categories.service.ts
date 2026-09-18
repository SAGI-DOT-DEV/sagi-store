import {z} from 'zod';
import {apiRequest} from '../api-client';
export const categoryInputSchema=z.object({name:z.string().trim().min(1,'Category name is required.').max(100),slug:z.string().trim().min(1,'Slug is required.').max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Use lowercase letters, numbers and single hyphens for the slug.'),description:z.string().trim().max(1000).nullable().optional()});
const categorySchema=z.object({id:z.string(),name:z.string(),slug:z.string(),description:z.string().nullable().optional(),_count:z.object({products:z.number()}).optional()});
export type Category=z.infer<typeof categorySchema>;
export type CategoryInput=z.infer<typeof categoryInputSchema>;
export function categorySlug(name:string){return name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100).replace(/-$/,'');}
export const categoriesService={
 list:async()=>z.array(categorySchema).parse(await apiRequest('/api/v1/categories',{cache:'no-store'})),
 create:async(input:CategoryInput,token:string)=>categorySchema.parse(await apiRequest('/api/v1/categories',{method:'POST',body:JSON.stringify(input)},token)),
};
