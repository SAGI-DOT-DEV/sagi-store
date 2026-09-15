const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function compile(file,resolve){
 const context={exports:{},require:resolve};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve(file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
 return context.exports;
}
const schemas=compile('../../schemas/admin-product.schema.ts',()=>require('zod'));
const product={id:'p1',name:'Rice',slug:'rice',description:'Rice description',status:'DRAFT',categoryId:null,category:null,origin:null,highlights:[],images:[],variants:[]};
test('admin product response accepts drafts and empty images/variants',()=>{
 assert.equal(schemas.adminProductSchema.parse(product).status,'DRAFT');
 assert.equal(schemas.adminProductPageSchema.parse({items:[product],pagination:{page:1,limit:12,total:1,totalPages:1}}).items.length,1);
});
test('save validation trims details and supports clearing optional fields',()=>{
 const input=schemas.adminProductUpdateSchema.parse({...product,name:' Rice ',origin:null,highlights:[]});
 assert.equal(input.name,'Rice');assert.equal(input.origin,null);assert.equal(input.highlights.length,0);
 assert.equal('variants' in input,false);
 for(const change of [{name:' '},{status:'UNKNOWN'},{highlights:Array(6).fill('Natural')},{highlights:['x'.repeat(41)]}]){
  assert.equal(schemas.adminProductUpdateSchema.safeParse({...product,...change}).success,false);
 }
});
test('catalog and save requests include token and correct endpoints',async()=>{
 const calls=[];
 const service=compile('./products.service.ts',name=>{
  if(name==='zod')return require('zod');
  if(name.includes('admin-product.schema'))return schemas;
  if(name==='../api-client')return {apiRequest:async(...args)=>{calls.push(args);return args[0].includes('?')?{items:[product],pagination:{page:1,limit:12,total:1,totalPages:1}}:product;}};
  throw Error(name);
 }).adminProductsService;
 await service.list('status=DRAFT','token');
 await service.get('p1','token');
 await service.update('p1',schemas.adminProductUpdateSchema.parse(product),'token');
 assert.equal(calls[0][0],'/api/v1/admin/products?status=DRAFT');
 assert.equal(calls[1][0],'/api/v1/admin/products/p1');
 assert.equal(calls[2][0],'/api/v1/products/p1');
 assert.equal(calls[2][1].method,'PATCH');
 assert.equal(calls[2][2],'token');
});
const createInput={...product,variants:[{name:'Standard',sku:'RICE-1',price:20,inventory:{quantity:4},weightGrams:1000,lengthCm:20,widthCm:10,heightCm:5}],images:[]};
test('create validation enforces stock, shipping and unique SKUs',()=>{
 assert.equal(schemas.adminProductCreateSchema.safeParse(createInput).success,true);
 for(const variant of [{price:0},{inventory:{quantity:-1}},{weightGrams:0},{sku:''}]){
  assert.equal(schemas.adminProductCreateSchema.safeParse({...createInput,variants:[{...createInput.variants[0],...variant}]}).success,false);
 }
 assert.equal(schemas.adminProductCreateSchema.safeParse({...createInput,variants:[]}).success,false);
 assert.equal(schemas.adminProductCreateSchema.safeParse({...createInput,variants:[createInput.variants[0],createInput.variants[0]]}).success,false);
 assert.equal(schemas.adminProductCreateSchema.safeParse({...createInput,images:[{url:'invalid',alt:'Rice',position:0}]}).success,false);
});
test('create sends POST with token and accepts the minimal create response',async()=>{
 const calls=[];
 const service=compile('./products.service.ts',name=>{
  if(name==='zod')return require('zod');
  if(name.includes('admin-product.schema'))return schemas;
  if(name==='../api-client')return {apiRequest:async(...args)=>{calls.push(args);return {id:'new-product'};}};
  throw Error(name);
 }).adminProductsService;
 const result=await service.create(schemas.adminProductCreateSchema.parse(createInput),'admin-token');
 assert.equal(result.id,'new-product');assert.equal(calls[0][0],'/api/v1/products');
 assert.equal(calls[0][1].method,'POST');assert.equal(calls[0][2],'admin-token');
 assert.equal(JSON.parse(calls[0][1].body).variants[0].inventory.quantity,4);
});
