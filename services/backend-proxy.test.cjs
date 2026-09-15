const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript');
const vm=require('node:vm');
const fs=require('node:fs');
function setup(fetch, env={BACKEND_API_URL:'https://backend.test',NODE_ENV:'production'}) {
  const context={exports:{},process:{env},fetch,Request,Response,Headers,URL,AbortSignal};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve('./backend-proxy.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
  return context.exports.proxyBackend;
}
test('forwards credentials and cookies without caching or unrelated headers',async()=>{
  const proxy=setup(async(url,options)=>{
    assert.equal(url.href,'https://backend.test/api/v1/auth/refresh?q=1');
    assert.equal(options.headers.get('cookie'),'refreshToken=old');
    assert.equal(options.headers.get('authorization'),'Bearer access');
    assert.equal(options.headers.get('idempotency-key'),'request-1');
    assert.equal(options.headers.get('x-forwarded-for'),null);
    assert.equal(options.cache,'no-store');
    assert.equal(options.redirect,'manual');
    return new Response('{}',{headers:{'Set-Cookie':'refreshToken=new; Domain=backend.test; Path=/api/v1/auth; HttpOnly; Secure; SameSite=Lax'}});
  });
  const response=await proxy(new Request('https://store.test/api/v1/auth/refresh?q=1',{method:'POST',headers:{origin:'https://store.test',cookie:'_ga=private; refreshToken=old',authorization:'Bearer access','idempotency-key':'request-1','x-forwarded-for':'spoofed'}}),['auth','refresh']);
  assert.equal(response.status,200);
  assert.equal(response.headers.get('cache-control'),'no-store');
  assert.match(response.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Lax/);
  assert.doesNotMatch(response.headers.get('set-cookie'),/Domain=/);
});
test('rejects cross-origin mutations, missing origins, traversal and webhooks',async()=>{
  const proxy=setup(()=>assert.fail('must not call upstream'));
  for(const origin of ['https://evil.test','null','']) {
    assert.equal((await proxy(new Request('https://store.test/api/v1/auth/login',{method:'POST',headers:origin?{origin}:{}}),['auth','login'])).status,403);
  }
  for(const path of [['..'],['%2f'],['webhooks','stripe']])assert.equal((await proxy(new Request('https://store.test/api/v1/test'),path)).status,404);
});
test('preserves 401 and deletion cookies, handles redirects and network failure safely',async()=>{
  const req=()=>new Request('https://store.test/api/v1/auth/refresh',{method:'POST',headers:{origin:'https://store.test'}});
  const expired=await setup(async()=>new Response('{}',{status:401,headers:{'Set-Cookie':'refreshToken=; Path=/api/v1/auth; Max-Age=0'}}))(req(),['auth','refresh']);
  assert.equal(expired.status,401);
  assert.match(expired.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal((await setup(async()=>Response.redirect('https://evil.test'))(req(),['auth','refresh'])).status,502);
  assert.equal((await setup(async()=>{throw new Error('secret');})(req(),['auth','refresh'])).status,502);
  assert.equal((await setup(()=>assert.fail(),{NODE_ENV:'production'})(req(),['auth','refresh'])).status,503);
});
