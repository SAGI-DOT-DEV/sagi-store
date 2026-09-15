import type { AdminReports } from './overview.service';
export type OverviewPeriod = '6m' | 'year';

export function overviewRange(period:OverviewPeriod,now=new Date()) {
  const from=new Date(Date.UTC(now.getUTCFullYear(),period==='year'?0:now.getUTCMonth()-5,1));
  const months:string[]=[];
  const cursor=new Date(from);
  while(cursor<=now){months.push(cursor.toISOString().slice(0,7));cursor.setUTCMonth(cursor.getUTCMonth()+1);}
  return {query:new URLSearchParams({from:from.toISOString(),to:now.toISOString(),currency:'CAD',limit:'4'}).toString(),months};
}
export function monthlySeries(months:string[],series:AdminReports['sales']['series']) {
  const values=new Map(series.map(row=>[row.month,row]));
  return months.map(month=>values.get(month)??{month,revenue:0,orders:0});
}
export function lowStockRows(rows:AdminReports['inventory']) {
  return rows.filter(row=>row.availableQuantity<=10).sort((a,b)=>a.availableQuantity-b.availableQuantity||a.product.localeCompare(b.product));
}
export function awaitingShipmentRows(data:AdminReports['operations']) {
  return data.awaitingShipment.filter(order=>order.status==='PAID'||order.status==='PROCESSING');
}
export function exportSalesCsv(sales:AdminReports['sales'],months:string[]) {
  const rows=[['Month (UTC)','Currency','Revenue (order totals)','Orders'],...monthlySeries(months,sales.series).map(row=>[row.month,'CAD',row.revenue.toFixed(2),row.orders])];
  rows.push(['TOTAL','CAD',sales.revenue.toFixed(2),sales.orders]);
  const blob=new Blob([rows.map(row=>row.join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download='sagi-sales-overview.csv';link.click();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
