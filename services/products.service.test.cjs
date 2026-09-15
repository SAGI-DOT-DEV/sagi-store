const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const context = { exports: {}, require: (name) => {
  if (name === './currency') return { formatCAD: value => 'CAD ' + value.toFixed(2) };
  if (name === './api-client') return { apiRequest: async () => [] };
  throw new Error('Unexpected dependency: ' + name);
}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./products.service.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, context);
const map = context.exports.mapBackendProduct;
const base = {id:'test',slug:'ijebu-garri',name:'Test product',description:'Actual description'};

test('missing optional details never inherit demo characteristics', () => {
  const product = map(base);
  for (const key of ['origin','category','subtitle','estate']) assert.equal(product[key], '');
  for (const key of ['highlights','tastingNotes','culinaryUses']) assert.equal(product[key].length, 0);
  assert.equal(product.badge, undefined);
  assert.equal(product.image, '/product-placeholder.svg');
  assert.equal(product.availableSizes[0].inStock, false);
});
test('keeps real origin, custom category, highlights and inventory', () => {
  const product = map({...base,origin:'Ogun State',category:{name:'Flours'},highlights:['Stone-ground','Unpolished'],
    variants:[{id:'v1',sku:'TEST',price:'19.99',inventory:{quantity:4,reservedQuantity:1}}]});
  assert.equal(product.origin, 'Ogun State');
  assert.equal(product.category, 'Flours');
  assert.equal(product.highlights.join(','), 'Stone-ground,Unpolished');
  assert.equal(product.priceFormatted, 'CAD 19.99');
  assert.equal(product.availableSizes[0].stockQuantity, 3);
});
