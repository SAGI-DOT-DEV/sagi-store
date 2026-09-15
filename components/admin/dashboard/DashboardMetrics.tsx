import Icon from '../Icon';
import {formatCAD} from '../../../services/currency';
import type {AdminReports} from '../../../services/admin/overview.service';
export function DashboardMetrics({sales}:{sales:AdminReports['sales']}) {
 const metrics=[{label:'Total revenue',value:formatCAD(sales.revenue),detail:'Order totals, including shipping',icon:'account_balance'},{label:'Average order value',value:formatCAD(sales.averageOrderValue),detail:sales.orders+' paid orders in this period',icon:'receipt_long'},{label:'Units sold',value:sales.unitsSold.toLocaleString('en-CA'),detail:'Items in paid and fulfilled orders',icon:'shopping_basket'}];
 return <section aria-label="Sales metrics" className="grid grid-cols-1 lg:grid-cols-3 gap-6">{metrics.map((metric,index)=><div key={metric.label} className={'p-8 border border-admin-outline-variant '+(index===2?'bg-admin-primary text-white':'bg-admin-surface-bright')}><div className="flex justify-between items-start gap-4 mb-10"><h2 className="text-xs uppercase tracking-widest">{metric.label}</h2><Icon name={metric.icon}/></div><p className="font-serif text-3xl xl:text-4xl break-words">{metric.value}</p><p className={'mt-4 text-sm '+(index===2?'text-admin-inverse-primary':'text-admin-on-surface-variant')}>{metric.detail}</p></div>)}</section>;
}
