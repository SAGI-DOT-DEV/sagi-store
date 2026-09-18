import {shippingSettingsSchema,shippingSettingsService} from './shipping-settings.service';
export function saveShippingSettings(input:unknown,token:string){
  return shippingSettingsService.save(shippingSettingsSchema.parse(input),token);
}
