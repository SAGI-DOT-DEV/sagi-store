import {z} from 'zod';
export const productStatus=z.enum(['ACTIVE','DRAFT','ARCHIVED']);
const number=z.coerce.number().finite();
export const categorySchema=z.object({id:z.string(),name:z.string()});
export const adminProductSchema=z.object({
 id:z.string(),name:z.string(),slug:z.string(),description:z.string(),status:productStatus,
 origin:z.string().nullable().optional(),highlights:z.array(z.string()).default([]),
 categoryId:z.string().nullable(),category:categorySchema.nullable(),
 images:z.array(z.object({id:z.string(),url:z.string(),alt:z.string().nullable()})),
 variants:z.array(z.object({
  id:z.string(),sku:z.string(),name:z.string().nullable(),price:number,
  weightGrams:number.nullable().optional(),lengthCm:number.nullable().optional(),widthCm:number.nullable().optional(),heightCm:number.nullable().optional(),
  inventory:z.object({quantity:z.number(),reservedQuantity:z.number()}).nullable(),
 })),
});
export const adminProductPageSchema=z.object({items:z.array(adminProductSchema),pagination:z.object({page:z.number(),limit:z.number(),total:z.number(),totalPages:z.number()})});
export const adminProductUpdateSchema=z.object({
 name:z.string().trim().min(1,'Enter a product name.').max(200),
 slug:z.string().trim().min(1,'Enter a slug.').max(200),
 description:z.string().trim().min(1,'Enter a description.').max(10000),
 origin:z.string().trim().max(150).nullable(),
 highlights:z.array(z.string().trim().min(1).max(40)).max(5),
 categoryId:z.string().cuid().nullable(),status:productStatus,
});
export type AdminProduct=z.infer<typeof adminProductSchema>;
export type AdminProductUpdate=z.infer<typeof adminProductUpdateSchema>;
export type AdminProductPage=z.infer<typeof adminProductPageSchema>;
export type AdminCategory=z.infer<typeof categorySchema>;
export const adminProductCreateSchema=adminProductUpdateSchema.extend({
 variants:z.array(z.object({
  sku:z.string().trim().min(1).max(100),name:z.string().trim().min(1).max(200),
  price:z.coerce.number().positive().max(100000000),
  inventory:z.object({quantity:z.coerce.number().int().min(0).max(100000000)}),
  weightGrams:z.coerce.number().int().positive().max(1000000),
  lengthCm:z.coerce.number().positive().max(10000),widthCm:z.coerce.number().positive().max(10000),heightCm:z.coerce.number().positive().max(10000),
 })).min(1).max(100).refine(items=>new Set(items.map(item=>item.sku)).size===items.length,'Each variant must have a unique SKU.'),
 images:z.array(z.object({url:z.string().url().max(2000).refine(value=>/^https?:\/\//i.test(value),'Use an HTTP or HTTPS image URL.'),alt:z.string().max(500),position:z.number().int().nonnegative()})).max(50),
});
export type AdminProductCreate=z.infer<typeof adminProductCreateSchema>;
