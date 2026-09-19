const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
const context={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./product-route.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const {decodeProductRoute}=context.exports;
test('decodes spaced slug before API query encoding',()=>{assert.equal(decodeProductRoute('new%20slug'),'new slug');assert.equal(encodeURIComponent(decodeProductRoute('new%20slug')),'new%20slug');});
test('keeps ordinary slugs and handles malformed escaping without crashing',()=>{for(const slug of ['yam-flour','new slug','100%'])assert.equal(decodeProductRoute(slug),slug);});
test('decodes only once and preserves escaped path characters',()=>{assert.equal(decodeProductRoute('new%2520slug'),'new%20slug');assert.equal(decodeProductRoute(encodeURIComponent('rice & beans')),'rice & beans');});
