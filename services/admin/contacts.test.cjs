const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function load(file,apiRequest){const context={exports:{},require:name=>name==='zod'?require('zod'):{apiRequest}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve(file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);return context.exports;}
test('users request is authenticated and excludes private fields',async()=>{
 const calls=[];const {listContacts}=load('./contacts.service.ts',async(...args)=>{calls.push(args);return [{id:'u',email:'a@example.com',createdAt:'2026-09-17',role:'CUSTOMER',emailVerifiedAt:null,profile:null,passwordHash:'secret',sessions:['secret']}];});
 const rows=await listContacts('users','token');assert.equal(calls[0][0],'/api/v1/admin/users');assert.equal(calls[0][1].cache,'no-store');assert.equal(calls[0][2],'token');assert.equal(rows[0].firstName,'');assert.equal(rows[0].passwordHash,undefined);assert.equal(rows[0].sessions,undefined);
});
test('distributors use existing protected endpoint',async()=>{const {listContacts}=load('./contacts.service.ts',async(path,options,token)=>{assert.equal(path,'/api/v1/admin/distributors');assert.equal(token,'token');return [{id:'d',email:'d@example.com',firstName:'Ada',lastName:'Okoye',createdAt:'2026-09-17'}];});assert.equal((await listContacts('distributors','token'))[0].firstName,'Ada');});
test('CSV quotes commas, quotes, newlines and neutralizes formulas',()=>{
 const {contactsCsv}=load('./contacts-export.ts');const csv=contactsCsv([{firstName:'Ada, "A"',lastName:'Line\nTwo',email:'a@example.com'},{firstName:' =1+1',lastName:'@SUM(A1)',email:'b@example.com'}]);
 assert.ok(csv.startsWith('\uFEFF"First name","Last name","Email"\r\n'));assert.ok(csv.includes('"Ada, ""A"""'));assert.ok(csv.includes('"Line\nTwo"'));assert.ok(csv.includes('"\' =1+1"'));assert.ok(csv.includes('"\'@SUM(A1)"'));
});
test('CSV includes all rows rather than just a display page',()=>{const {contactsCsv}=load('./contacts-export.ts');const rows=Array.from({length:45},(_,i)=>({firstName:'User '+i,lastName:'Test',email:`u${i}@example.com`}));assert.ok(contactsCsv(rows).includes('u44@example.com'));});
