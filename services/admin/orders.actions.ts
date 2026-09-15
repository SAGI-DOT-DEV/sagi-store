import {adminOrdersService,fulfillmentStatus} from './orders.service';
export function updateOrderStatus(id:string,status:string,token:string){return adminOrdersService.update(id,fulfillmentStatus.parse(status),token);}
