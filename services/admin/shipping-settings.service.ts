import {z} from 'zod';
import {apiRequest} from '../api-client';
const optionalText=(max:number)=>z.string().trim().max(max).nullable().optional();
export const shippingSettingsSchema=z.object({
  shipFromName:z.string().trim().min(1,'Sender name is required.').max(150),
  shipFromCompany:optionalText(150),shipFromPhone:optionalText(30),
  shipFromEmail:z.string().trim().email('Enter a valid sender email.').nullable().optional(),
  shipFromStreet1:z.string().trim().min(1,'Street address is required.').max(200),shipFromStreet2:optionalText(200),
  shipFromCity:z.string().trim().min(1,'City is required.').max(100),shipFromState:optionalText(100),
  shipFromPostalCode:z.string().trim().min(3,'Postal code is required.').max(20),
  shipFromCountry:z.literal('CA'),currency:z.literal('CAD'),
  freeShippingThreshold:z.number().finite().nonnegative().nullable(),
});
export type ShippingSettings=z.infer<typeof shippingSettingsSchema>;
const responseSchema=shippingSettingsSchema.extend({freeShippingThreshold:z.coerce.number().nonnegative().nullable()}).nullable();
export const shippingSettingsService={
  async get(token:string){return responseSchema.parse(await apiRequest('/api/v1/admin/shipping-settings',{cache:'no-store'},token));},
  async save(input:ShippingSettings,token:string){return responseSchema.parse(await apiRequest('/api/v1/admin/shipping-settings',{method:'PUT',body:JSON.stringify(shippingSettingsSchema.parse(input))},token));},
};
