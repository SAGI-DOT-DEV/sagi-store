import type {AnalyticsReport} from '../../../services/admin/analytics.service';
import {groupTrafficSources} from '../../../services/admin/traffic-sources';

export function TrafficSources({report}: {report?: AnalyticsReport}) {
  if (!report) return null;
  const groups = groupTrafficSources(report.rows);
  const total = groups.reduce((sum, group) => sum + group.sessions, 0);
  return <section className="space-y-5" aria-labelledby="traffic-platforms">
    <header><p className="text-xs uppercase tracking-widest text-admin-on-surface-variant">Acquisition overview</p><h2 id="traffic-platforms" className="font-serif text-3xl mt-2">Where your visitors come from</h2><p className="text-sm text-admin-on-surface-variant mt-3">Sessions by platform for the selected period. Google Ads is identified from paid Google source / medium labels; this is not an ad-spend report.</p></header>
    {report.thresholded && <p role="status" className="text-sm">Google has withheld some data for privacy.</p>}
    {report.truncated && <p role="status" className="text-sm">Only the top 1,000 source / medium rows are included. Counts and shares below are partial.</p>}
    {!total && <p className="text-sm">No attributed sessions recorded for this period yet.</p>}
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{groups.map(group => <article key={group.name} className="border border-admin-outline-variant bg-white p-6">
      <h3 className="font-serif text-xl">{group.name}</h3>
      <div className="flex items-baseline justify-between gap-3 mt-4"><p className="font-serif text-3xl">{group.sessions.toLocaleString()} <span className="font-sans text-xs text-admin-on-surface-variant">sessions</span></p><span className="text-xs">{total ? (group.sessions / total * 100).toFixed(1) : '0'}%</span></div>
      <div className="h-1 bg-admin-surface-container-high mt-4"><div className="h-full bg-admin-primary" style={{width: `${total ? group.sessions / total * 100 : 0}%`}} /></div>
      {group.sources.length ? <details className="mt-4 text-xs"><summary className="cursor-pointer text-admin-on-surface-variant">View source / medium breakdown</summary><ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">{group.sources.map(row => <li key={row.label} className="flex justify-between gap-3"><span className="break-all">{row.label}</span><span>{row.values[0]?.toLocaleString()}</span></li>)}</ul></details> : <p className="mt-4 text-xs text-admin-on-surface-variant">No recorded sessions</p>}
    </article>)}</div>
    <p className="text-xs text-admin-on-surface-variant">Shares use returned sessions, not unique visitors. Other includes unrecognized sources. Use tagged campaign links for reliable attribution; consent and missing referrers affect coverage.</p>
  </section>;
}
