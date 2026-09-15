import {z} from 'zod';
import {apiRequest} from '../api-client';
import {adminProductSchema,adminProductPageSchema,categorySchema,type AdminProductUpdate,type AdminProductCreate} from '../../schemas/admin-product.schema';
export const adminProductsService={
 create:async(input:AdminProductCreate,token:string)=>z.object({id:z.string().min(1)}).parse(await apiRequest('/api/v1/products',{method:'POST',body:JSON.stringify(input)},token)),
 list:async(query:string,token:string)=>adminProductPageSchema.parse(await apiRequest('/api/v1/admin/products?'+query,{},token)),
 get:async(id:string,token:string)=>adminProductSchema.parse(await apiRequest('/api/v1/admin/products/'+encodeURIComponent(id),{},token)),
 categories:async()=>z.array(categorySchema).parse(await apiRequest('/api/v1/categories')),
 update:async(id:string,input:AdminProductUpdate,token:string)=>adminProductSchema.parse(await apiRequest('/api/v1/products/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify(input)},token)),
};
