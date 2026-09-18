import {categoriesService,categoryInputSchema} from './categories.service';
export function createCategory(input:unknown,token:string){return categoriesService.create(categoryInputSchema.parse(input),token);}
