import {inventoryService,inventoryAdjustmentSchema,type InventoryAdjustment} from './inventory.service';
export function adjustInventory(id:string,input:InventoryAdjustment,token:string){return inventoryService.adjust(id,inventoryAdjustmentSchema.parse(input),token);}
