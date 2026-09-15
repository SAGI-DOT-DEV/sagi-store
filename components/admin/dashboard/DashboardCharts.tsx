import {AdminImage} from '../AdminImage';
import {formatCAD} from '../../../services/currency';
import {monthlySeries} from '../../../services/admin/overview.utils';
import type {AdminReports} from '../../../services/admin/overview.service';
import {ReportState} from './ReportState';
type Report<T>={loading:boolean;error?:string;data?:T};
export function DashboardCharts({sales,products,months,retry}:{sales:Report<AdminReports['sales']>;products:Report<AdminReports['performance']>;months:string[];retry:()=>void}) {
 const series=monthlySeries(months,sales.data?.series??[]);
 const maximum=Math.max(1,...series.map(row=>row.revenue));
 return <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
 <div className="xl:col-span-2 border border-admin-outline-variant p-6 sm:p-8 min-w-0">
 <h2 className="text-xs uppercase tracking-widest">Monthly revenue</h2><p className="mt-2 text-xs text-admin-on-surface-variant">Paid orders grouped by order placement month (UTC). Current month is partial.</p>
 <ReportState {...sales} retry={retry}>
 {sales.data?.orders===0?<p className="py-20 text-center text-admin-on-surface-variant">No paid CAD orders in this period.</p>:<div className="overflow-x-auto"><div className="flex items-end gap-3 h-72 border-b border-admin-outline-variant mt-8 min-w-[360px]">{series.map(row=><div key={row.month} className="flex-1 flex flex-col justify-end items-center h-full min-w-0"><span className="text-[9px] mb-2 whitespace-nowrap">{formatCAD(row.revenue)}</span><div title={row.month+': '+formatCAD(row.revenue)+' / '+row.orders+' orders'} className="w-2/3 bg-admin-primary" style={{height:(row.revenue/maximum)*190}}/><span className="text-[10px] py-3">{new Date(row.month+'-01T00:00:00Z').toLocaleDateString('en-CA',{month:'short',year:'2-digit',timeZone:'UTC'})}</span></div>)}</div></div>}
 <details className="mt-4 text-xs"><summary className="cursor-pointer">View chart data</summary><table className="w-full mt-3 text-left"><caption className="sr-only">Monthly CAD revenue and order counts</caption><thead><tr><th>Month (UTC)</th><th>Revenue</th><th>Orders</th></tr></thead><tbody>{series.map(row=><tr key={row.month}><td className="py-2">{row.month}</td><td>{formatCAD(row.revenue)}</td><td>{row.orders}</td></tr>)}</tbody></table></details>
 </ReportState></div>
 <div className="border border-admin-outline-variant p-6 sm:p-8 min-w-0"><h2 className="text-xs uppercase tracking-widest mb-6">Top selling variants</h2><p className="text-xs mb-6 text-admin-on-surface-variant">Ranked by units sold in the selected period. Item revenue excludes shipping.</p>
 <ReportState {...products} retry={retry}>{products.data?.products.length?products.data.products.map(product=><div key={product.variantId} className="flex flex-wrap gap-3 py-5 border-b border-admin-outline-variant last:border-0"><AdminImage src={product.image||'/product-placeholder.svg'} alt={product.name} className="w-14 h-14 object-cover"/><div className="min-w-0 flex-1"><h3 className="font-serif text-lg">{product.name}</h3><p className="text-[10px] break-all text-admin-on-surface-variant">{product.sku}</p><p className="mt-2 text-sm">{formatCAD(product.revenue)} · {product.unitsSold} units</p></div></div>):<p className="py-8 text-sm text-admin-on-surface-variant">No product sales in this period.</p>}</ReportState>
 </div></section>;
}
