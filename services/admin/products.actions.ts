import {adminProductUpdateSchema,adminProductCreateSchema,type AdminProductCreate,type AdminProductUpdate} from '../../schemas/admin-product.schema';
import {adminProductsService} from './products.service';
export function createAdminProduct(input:AdminProductCreate,token:string){
 return adminProductsService.create(adminProductCreateSchema.parse(input),token);
}
export function updateAdminProduct(id:string,input:AdminProductUpdate,token:string){
 return adminProductsService.update(id,adminProductUpdateSchema.parse(input),token);
}
