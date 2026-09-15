import { z } from 'zod';
import { apiRequest } from '../api-client';

const amount = z.coerce.number().finite();
export const salesSchema = z.object({
  revenue: amount, orders: z.number(), averageOrderValue: amount, unitsSold: z.number(),
  currency: z.literal('CAD'),
  series: z.array(z.object({month:z.string().regex(/^\d{4}-\d{2}$/),revenue:amount,orders:z.number()})),
});
const performanceSchema = z.object({products:z.array(z.object({
  variantId:z.string(),sku:z.string(),name:z.string(),unitsSold:z.number(),revenue:amount,
  image:z.string().nullable().optional(),
}))});
const inventorySchema = z.array(z.object({
  variantId:z.string(),sku:z.string(),product:z.string(),name:z.string().nullable(),
  quantity:z.number(),reservedQuantity:z.number(),availableQuantity:z.number(),
}));
const operationsSchema = z.object({awaitingShipment:z.array(z.object({
  id:z.string(),status:z.string(),total:amount,currency:z.string().regex(/^[A-Z]{3}$/),createdAt:z.string(),
}))});
const schemas = {sales:salesSchema,performance:performanceSchema,inventory:inventorySchema,operations:operationsSchema};
const paths = {sales:'sales',performance:'product-performance',inventory:'inventory',operations:'order-operations'};
export type ReportKind = keyof typeof schemas;
export type AdminReports = { [K in ReportKind]: z.infer<typeof schemas[K]> };

export async function getAdminReport<K extends ReportKind>(kind:K,query:string,token:string):Promise<AdminReports[K]> {
  const payload=await apiRequest<unknown>('/api/v1/admin/reports/'+paths[kind]+(query?'?'+query:''),{},token);
  return schemas[kind].parse(payload) as AdminReports[K];
}
