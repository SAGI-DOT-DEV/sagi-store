const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const context={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./traffic-sources.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const {sourcePlatform,groupTrafficSources}=context.exports;
test('classifies platforms without confusing organic Google with ads',()=>{
 for(const [label,expected] of [['google / cpc','Google Ads'],['google / organic','Google Search'],['l.instagram.com / referral','Instagram'],['m.facebook.com / referral','Facebook'],['tiktok / paid_social','TikTok'],['snapchat / social','Snapchat'],['t.co / referral','X / Twitter'],['notinstagram.com / referral','Other'],['(direct) / (none)','Direct']]) assert.equal(sourcePlatform(label),expected);
});
test('aggregates sessions across platform aliases and keeps zero platforms',()=>{
 const result=groupTrafficSources([{label:'instagram / social',values:[10,8]},{label:'l.instagram.com / referral',values:[5,4]},{label:'unknown / referral',values:[2,1]}]);
 assert.equal(result.find(x=>x.name==='Instagram').sessions,15);
 assert.equal(result.find(x=>x.name==='Other').sessions,2);
 assert.equal(result.find(x=>x.name==='Snapchat').sessions,0);
 assert.equal(result.reduce((sum,x)=>sum+x.sessions,0),17);
});
