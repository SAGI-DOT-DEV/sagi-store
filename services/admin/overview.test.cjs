const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function load(file,request){
 const context={exports:{},URLSearchParams,require:name=>{
   if(name==='zod')return require('zod');
   if(name==='../api-client')return {apiRequest:request};
   throw Error('Unexpected dependency '+name);
 }};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve(file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
 return context.exports;
}
const utils=load('./overview.utils.ts');
test('six month range crosses year boundary in UTC',()=>{
 const range=utils.overviewRange('6m',new Date('2026-02-15T12:00:00Z'));
 assert.equal(range.months.join(','),'2025-09,2025-10,2025-11,2025-12,2026-01,2026-02');
 const query=new URLSearchParams(range.query);
 assert.equal(query.get('currency'),'CAD');
 assert.equal(query.get('from'),'2025-09-01T00:00:00.000Z');
 assert.equal(query.get('to'),'2026-02-15T12:00:00.000Z');
});
test('year to date begins in January',()=>{
 assert.equal(utils.overviewRange('year',new Date('2026-02-15T00:00:00Z')).months.join(','),'2026-01,2026-02');
});
test('missing months show zero, not sample values',()=>{
 const rows=utils.monthlySeries(['2026-01','2026-02'],[{month:'2026-02',revenue:20,orders:1}]);
 assert.equal(rows[0].revenue,0);assert.equal(rows[1].revenue,20);
});
test('low stock includes reserved and zero availability; threshold is inclusive',()=>{
 const rows=utils.lowStockRows([{product:'A',availableQuantity:11},{product:'B',availableQuantity:10},{product:'C',availableQuantity:0}]);
 assert.equal(rows.map(row=>row.product).join(','),'C,B');
});
test('already shipped and unpaid orders are not awaiting shipment',()=>{
 const rows=utils.awaitingShipmentRows({awaitingShipment:['PAID','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','PENDING_PAYMENT'].map(status=>({status}))});
 assert.equal(rows.map(row=>row.status).join(','),'PAID,PROCESSING');
});
test('report request uses existing authenticated API client and validates response',async()=>{
 let captured;
 const service=load('./overview.service.ts',async(...args)=>{
   captured=args;return {revenue:10,orders:1,averageOrderValue:10,unitsSold:2,currency:'CAD',series:[{month:'2026-01',revenue:10,orders:1}]};
 });
 const sales=await service.getAdminReport('sales','currency=CAD','test-token');
 assert.equal(captured[0],'/api/v1/admin/reports/sales?currency=CAD');
 assert.equal(captured[2],'test-token');assert.equal(sales.revenue,10);
 const invalid=load('./overview.service.ts',async()=>({}));
 await assert.rejects(invalid.getAdminReport('sales','','test-token'));
});
