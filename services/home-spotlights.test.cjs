const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(path, dependencies = {}) {
  const context = { exports: {}, require: name => {
    if (dependencies[name]) return dependencies[name];
    throw new Error('Unexpected import: ' + name);
  }};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve(path), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  return context.exports;
}
const defaults = load('../data/home-spotlights.ts');
const { normalizeSpotlights, safeStorePath } = load('./home-spotlights.ts', { '../data/home-spotlights': defaults });
test('shows the reference showcases when Sanity has no content', () => {
  const sections = normalizeSpotlights(null);
  assert.equal(sections.length, 3);
  assert.equal(sections[0].title, 'Farine de Plantain');
  assert.ok(sections.every(section => section.image && section._key));
});
test('published showcase text, image, order and destination override defaults', () => {
  const sections = normalizeSpotlights([{ _key: 'custom', title: 'My product', image: 'https://cdn.sanity.io/custom.png', href: '/products/my-product', badges: ['Custom note'] }]);
  assert.equal(sections.length, 1);
  assert.equal(sections[0]._key, 'custom');
  assert.equal(sections[0].title, 'My product');
  assert.equal(sections[0].image, 'https://cdn.sanity.io/custom.png');
  assert.equal(sections[0].href, '/products/my-product');
  assert.equal(sections[0].badges[0], 'Custom note');
});
test('cleared fields get defaults and empty badges remain empty', () => {
  const [section] = normalizeSpotlights([{ title: ' ', image: null, badges: [] }]);
  assert.equal(section.title, defaults.DEFAULT_HOME_SPOTLIGHTS[0].title);
  assert.equal(section.image, defaults.DEFAULT_HOME_SPOTLIGHTS[0].image);
  assert.equal(section.badges.length, 0);
});
test('retains existing hero editing until showcase content is added', () => {
  const sections = normalizeSpotlights(undefined, { title: 'Published hero', image: 'https://cdn.sanity.io/hero.png' });
  assert.equal(sections[0].title, 'Published hero');
  assert.equal(sections[0].image, 'https://cdn.sanity.io/hero.png');
  assert.equal(sections.length, 3);
});
test('only permits relative store destinations', () => {
  for (const value of ['javascript:alert(1)', '//example.com', '/\\example.com', 'https://example.com', ' /products']) assert.equal(safeStorePath(value), '/products');
  assert.equal(safeStorePath('/products/new%20slug'), '/products/new%20slug');
});
