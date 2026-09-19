const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const context={exports:{},require};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./auth.schema.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const {addressSchema}=context.exports;
const address={line1:'123 Main Street',city:'Toronto',country:'CA',postalCode:'M5V 2T6',phone:'+1 (416) 555-1234'};
test('primary phone is required; secondary is optional',()=>{
 assert.equal(addressSchema.safeParse(address).success,true);
 assert.equal(addressSchema.safeParse({...address,phone:''}).success,false);
 assert.equal(addressSchema.safeParse({...address,phone2:''}).success,true);
 assert.equal(addressSchema.safeParse({...address,phone2:'+234 803 123 4567'}).success,true);
});
test('both phone fields reject invalid numbers',()=>{
 for(const field of ['phone','phone2']) for(const value of ['abc','123','+1234567890123456']) assert.equal(addressSchema.safeParse({...address,[field]:value}).success,false);
});
test('desktop and mobile buttons do not mount duplicate dialogs',()=>{
 const source=fs.readFileSync(require.resolve('../components/auth/AuthModal.tsx'),'utf8');
 const button=source.split('export function AccountButton()')[1].split('export function AccountModalHost()')[0];
 assert.doesNotMatch(button,/<(?:AuthModal|ProfileModal)\b/);
 const layout=fs.readFileSync(require.resolve('../app/layout.tsx'),'utf8');
 assert.equal((layout.match(/<AccountModalHost\s*\/>/g)||[]).length,1);
});
