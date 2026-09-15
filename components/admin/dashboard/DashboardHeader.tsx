import Icon from '../Icon';
import type {OverviewPeriod} from '../../../services/admin/overview.utils';
export function DashboardHeader({period,onPeriod,onRefresh,onExport,canExport}:{period:OverviewPeriod;onPeriod:(value:OverviewPeriod)=>void;onRefresh:()=>void;onExport:()=>void;canExport:boolean}) {
 return <header className="flex flex-wrap justify-between items-end gap-6 border-b border-admin-outline-variant pb-8">
 <div><h1 className="font-serif text-admin-headline-lg-mobile md:text-admin-headline-lg">Performance Overview</h1><p className="mt-2 text-admin-on-surface-variant">Live CAD sales reports and current operations.</p></div>
 <div className="flex flex-wrap items-end gap-3">
 <label className="text-xs uppercase tracking-widest">Sales period<select value={period} onChange={event=>onPeriod(event.target.value as OverviewPeriod)} className="block mt-2 border border-admin-outline-variant bg-transparent px-3 py-3 text-sm"><option value="6m">Last 6 months</option><option value="year">Year to date</option></select></label>
 <button onClick={onRefresh} className="border border-admin-outline-variant px-4 py-3 text-xs uppercase">Refresh</button>
 <button onClick={onExport} disabled={!canExport} className="flex items-center gap-2 border border-admin-outline-variant px-4 py-3 text-xs uppercase"><Icon name="download" />Export CSV</button>
 </div></header>;
}
