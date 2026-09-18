const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(consent,hostname='store.example.com'){
 const storage=new Map(consent?[['sagi_analytics_consent',consent]]:[]);const localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)};const window={location:{hostname,origin:'https://store.example.com',pathname:'/checkout/success',search:'?session_id=private'},dispatchEvent:()=>{}};
 const context={exports:{},process:{env:{NEXT_PUBLIC_GA_ENABLED:'true',NEXT_PUBLIC_GA_MEASUREMENT_ID:'G-TEST123'}},window,localStorage,document:{referrer:'https://search.example.com/?q=private',cookie:''},URL,Event,location:window.location};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./analytics.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
 return {api:context.exports,window,storage};
}
test('does not initialize without consent or on localhost/admin',()=>{for(const consent of [undefined,'denied']){const {api,window}=setup(consent);assert.equal(api.trackEvent('page_view'),false);assert.equal(window.dataLayer,undefined);}assert.equal(setup('granted','localhost').api.trackEvent('page_view'),false);const x=setup('granted');x.window.location.pathname='/admin/orders';assert.equal(x.api.trackEvent('page_view'),false);});
test('strips URL queries and referrer paths',()=>{const {api,window}=setup('granted');api.trackEvent('page_view');const commands=window.dataLayer.map(args=>Array.from(args));const config=commands.find(args=>args[0]==='config')[2];assert.equal(config.page_location,'https://store.example.com/checkout/success');assert.equal(config.page_referrer,'https://search.example.com');assert.equal(config.send_page_view,false);assert.equal(config.allow_google_signals,false);});
test('purchase requires paid status and is deduplicated',()=>{const {api,window}=setup('granted');const order={id:'o1',status:'PENDING_PAYMENT',currency:'CAD',subtotal:'20',shippingAmount:'2',items:[{id:'i1',variantId:'v1',name:'Rice',quantity:1,unitPrice:'20'}]};api.trackPurchase(order);assert.equal(window.dataLayer,undefined);order.status='PAID';api.trackPurchase(order);api.trackPurchase(order);const purchases=window.dataLayer.map(args=>Array.from(args)).filter(args=>args[0]==='event'&&args[1]==='purchase');assert.equal(purchases.length,1);assert.equal(purchases[0][2].value,20);assert.equal(purchases[0][2].shipping,2);assert.equal(purchases[0][2].items[0].item_id,'v1');});
test('withdrawal blocks subsequent events',()=>{const {api,window}=setup('granted');api.trackEvent('page_view');api.setAnalyticsConsent('denied');assert.equal(api.trackEvent('add_to_cart'),false);assert.equal(window['ga-disable-G-TEST123'],true);});
test('retains approved campaign labels in config and events only',()=>{
 const {api,window}=setup('granted');
 window.location.search='?utm_source=instagram&utm_medium=social&utm_campaign=pantry_launch&session_id=secret&email=private@example.com&q=private&fbclid=secret';
 window.location.hash='#private';
 api.trackEvent('page_view',{page_location:'https://unsafe.example/?token=secret'});
 const commands=window.dataLayer.map(args=>Array.from(args));
 const expected='https://store.example.com/checkout/success?utm_source=instagram&utm_medium=social&utm_campaign=pantry_launch';
 assert.equal(commands.find(args=>args[0]==='config')[2].page_location,expected);
 assert.equal(commands.find(args=>args[0]==='event')[2].page_location,expected);
});
test('rejects invalid and oversized campaign labels',()=>{
 const {api,window}=setup('granted');
 window.location.search='?utm_source=private%40example.com&utm_medium=&utm_campaign='+ 'a'.repeat(101);
 assert.equal(api.safePageLocation(),'https://store.example.com/checkout/success');
});
test('campaign parameters do not bypass consent',()=>{
 const {api,window}=setup('denied');window.location.search='?utm_source=facebook&utm_medium=social';
 assert.equal(api.trackEvent('page_view'),false);assert.equal(window.dataLayer,undefined);
});
