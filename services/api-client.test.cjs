const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function setup(fetch) {
  const storage = new Map([['sagi_access_token', 'old']]);
  const events = [];
  const context = { exports: {}, process: { env: {} }, fetch,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
    window: { localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) }, dispatchEvent: event => events.push(event.type) },
  };
  const source = fs.readFileSync(require.resolve('./api-client.ts'), 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  return { api: context.exports, storage, events };
}
const response = (status, data) => ({ status, ok: status === 200, json: async () => ({ success: status === 200, data }) });

test('concurrent expired requests share refresh and retry with the new token', async () => {
  let refreshes = 0;
  const { api, events } = setup(async (url, options) => {
    if (url.endsWith('/refresh')) { refreshes++; await new Promise(resolve => setTimeout(resolve, 10)); return response(200, { accessToken: 'new' }); }
    return options.headers.Authorization === 'Bearer new' ? response(200, 'ok') : response(401);
  });
  assert.deepEqual(await Promise.all([api.apiRequest('/cart', {}, 'old'), api.apiRequest('/orders', {}, 'old')]), ['ok', 'ok']);
  assert.equal(refreshes, 1);
  assert.deepEqual(events, ['sagi:session-refreshed']);
});
test('invalid refresh expires the session', async () => {
  const { api, storage, events } = setup(async () => response(401));
  await assert.rejects(api.apiRequest('/cart', {}, 'old'));
  assert.equal(storage.size, 0);
  assert.deepEqual(events, ['sagi:session-expired']);
});
test('login rejection does not trigger global session expiration', async () => {
  const { api, events } = setup(async () => response(401));
  await assert.rejects(api.apiRequest('/api/v1/auth/login', { method: 'POST' }));
  assert.deepEqual(events, []);
});
test('temporary refresh failure preserves the saved session', async () => {
  const { api, storage, events } = setup(async url => url.endsWith('/refresh') ? response(503) : response(401));
  await assert.rejects(api.apiRequest('/cart', {}, 'old'));
  assert.equal(storage.get('sagi_access_token'), 'old');
  assert.deepEqual(events, []);
});
test('logout during refresh prevents late session resurrection', async () => {
  let finish;
  const { api, storage, events } = setup(async url => url.endsWith('/refresh') ? new Promise(resolve => { finish = resolve; }) : response(401));
  const request = api.apiRequest('/cart', {}, 'old');
  await new Promise(resolve => setImmediate(resolve));
  api.saveSessionToken(null);
  finish(response(200, { accessToken: 'new' }));
  await assert.rejects(request);
  assert.equal(storage.size, 0);
  assert.deepEqual(events, []);
});
