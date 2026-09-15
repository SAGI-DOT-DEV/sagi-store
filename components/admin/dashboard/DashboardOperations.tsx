import type {AdminReports} from '../../../services/admin/overview.service';
import {lowStockRows,awaitingShipmentRows} from '../../../services/admin/overview.utils';
import {ReportState} from './ReportState';
type Report<T>={loading:boolean;error?:string;data?:T};
export function DashboardOperations({inventory,operations,retry}:{inventory:Report<AdminReports['inventory']>;operations:Report<AdminReports['operations']>;retry:()=>void}){
 const lowStock=lowStockRows(inventory.data??[]);
 const awaiting=operations.data?awaitingShipmentRows(operations.data):[];
 return <section><h2 className="font-serif text-3xl mb-3">Operations Snapshot</h2><p className="text-sm text-admin-on-surface-variant mb-8">Current status across all dates, independent of the sales period.</p><div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
 <div className="border border-admin-outline-variant p-6 sm:p-8"><h3 className="text-xs uppercase tracking-widest border-b border-admin-outline-variant pb-4 mb-4">Awaiting shipment {operations.data&&'('+awaiting.length+')'}</h3>
 <ReportState {...operations} retry={retry}>{awaiting.length?<div className="max-h-96 overflow-y-auto">{awaiting.map(order=><div key={order.id} className="py-4 border-b border-admin-outline-variant flex flex-wrap justify-between gap-3"><div className="min-w-0"><p className="text-xs break-all">Order {order.id}</p><p className="text-xs text-admin-on-surface-variant mt-2">{order.status==='PAID'?'Paid':'Processing'} · {new Date(order.createdAt).toLocaleDateString('en-CA',{timeZone:'UTC'})}</p></div><p className="text-sm">{new Intl.NumberFormat('en-CA',{style:'currency',currency:order.currency,currencyDisplay:'code'}).format(order.total)}</p></div>)}</div>:<p className="py-8 text-sm text-admin-on-surface-variant">No paid or processing orders awaiting shipment.</p>}</ReportState>
 </div>
 <div className="border border-admin-outline-variant p-6 sm:p-8"><h3 className="text-xs uppercase tracking-widest border-b border-admin-outline-variant pb-4 mb-3">Low stock alerts {inventory.data&&'('+lowStock.length+')'}</h3><p className="text-xs text-admin-on-surface-variant mb-4">10 or fewer available units, after reservations.</p>
 <ReportState {...inventory} retry={retry}>{lowStock.length?<div className="max-h-96 overflow-y-auto">{lowStock.map(row=><div key={row.variantId} className="flex justify-between items-start gap-4 py-4 border-b border-admin-outline-variant"><div className="min-w-0"><h4 className="font-serif text-lg">{row.product}</h4><p className="text-xs text-admin-on-surface-variant">{row.name}</p><p className="text-[10px] break-all mt-1">{row.sku}</p></div><span className="text-xs text-right shrink-0">{row.availableQuantity<=0?'Out of stock':row.availableQuantity+' available'}</span></div>)}</div>:<p className="py-8 text-sm text-admin-on-surface-variant">No low-stock variants.</p>}</ReportState>
 </div></div></section>;
}
