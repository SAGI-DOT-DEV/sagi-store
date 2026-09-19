const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const context={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./address-form.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const {addressFormValues}=context.exports;
const address={id:'a',line1:'123 Main Street',city:'Toronto',country:'CA',postalCode:'M5V 2T6',isDefault:false};
test('prefills both saved address phones without replacing them with profile phone',()=>{
 const values=addressFormValues({...address,phone:'+14165551234',phone2:'+14165555678'},{phone:'+2348031234567'});
 assert.equal(values.phone,'+14165551234');assert.equal(values.phone2,'+14165555678');
});
test('uses existing profile phone for legacy addresses without a phone',()=>{
 for(const phone of [undefined,null,'','  ']) assert.equal(addressFormValues({...address,phone},{phone:'+2348031234567'}).phone,'+2348031234567');
});
test('does not invent a phone when neither address nor profile has one',()=>{
 assert.equal(addressFormValues(address,null).phone,'');assert.equal(addressFormValues(address).phone2,'');
});
