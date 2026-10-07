const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function setup(me) {
  const storage = new Map([['token', 'old-token']]);
  const effects = [];
  const listeners = new Map();
  const dependencies = {
    react: {
      createContext: () => ({ Provider: 'provider' }), useContext: () => {},
      useState: initial => [initial, () => {}], useRef: current => ({ current }),
      useEffect: effect => effects.push(effect),
    },
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }) },
    '../services/auth.service': { authService: { me } },
    '../services/auth.actions': {}, '../schemas/auth.schema': {},
    '../services/api-client': { TOKEN_KEY: 'token', ApiError: class extends Error {} },
    zod: require('zod'),
  };
  const context = { exports: {}, require: name => {
    if (!(name in dependencies)) throw new Error(name);
    return dependencies[name];
  }, window: {
    localStorage: { getItem: key => storage.get(key) || null, removeItem: key => storage.delete(key) },
    addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: () => {},
  }};
  const source = fs.readFileSync(require.resolve('../context/AuthContext.tsx'), 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  const auth = context.exports.AuthProvider({ children: null }).props.value;
  effects[1](); // Register session-expired listener; do not run startup network restore.
  return { auth, storage, listeners };
}

test('concurrent retries share one request and return the refreshed token', async () => {
  let resolve, calls = 0;
  const { auth, storage } = setup(() => { calls++; return new Promise(done => { resolve = done; }); });
  const first = auth.retrySession();
  const second = auth.retrySession();
  assert.equal(first, second);
  await Promise.resolve();
  storage.set('token', 'fresh-token');
  resolve({ id: 'customer' });
  const result = await first;
  assert.equal(result.token, 'fresh-token');
  assert.equal(result.userId, 'customer');
  assert.equal(calls, 1);
});

test('failed reconnection can be retried', async () => {
  let calls = 0;
  const { auth } = setup(async () => { if (++calls === 1) throw new Error('Offline'); return { id: 'customer' }; });
  assert.equal(await auth.retrySession(), null);
  assert.equal((await auth.retrySession()).userId, 'customer');
});

test('missing token does not leave the retry permanently locked', async () => {
  const { auth, storage } = setup(async () => ({ id: 'customer' }));
  storage.clear();
  assert.equal(await auth.retrySession(), null);
  storage.set('token', 'new-token');
  assert.equal((await auth.retrySession()).token, 'new-token');
});

test('expired session discards an in-flight account response', async () => {
  let resolve;
  const { auth, listeners } = setup(() => new Promise(done => { resolve = done; }));
  const pending = auth.retrySession();
  await Promise.resolve();
  listeners.get('sagi:session-expired')();
  resolve({ id: 'customer' });
  assert.equal(await pending, null);
});
