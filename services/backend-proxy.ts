const fail = (status: number, message: string) => Response.json(
  { success: false, error: { code: 'API_PROXY_ERROR', message } },
  { status, headers: { 'Cache-Control': 'no-store' } },
);

export async function proxyBackend(request: Request, path: string[]) {
  const incoming = new URL(request.url);
  const mutation = !['GET', 'HEAD', 'OPTIONS'].includes(request.method);
  // Never accept cookie-authenticated cross-site mutations, including HTML forms.
  if (mutation && (request.headers.get('origin') !== incoming.origin ||
    request.headers.get('sec-fetch-site') === 'cross-site')) return fail(403, 'Request origin is not allowed.');
  if (!path.length || path[0] === 'webhooks' || path.some(part => !/^[a-zA-Z0-9_-]+$/.test(part))) {
    return fail(404, 'API route not found.');
  }
  let base: URL;
  try {
    base = new URL(process.env.BACKEND_API_URL || (process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : ''));
    if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password ||
      base.pathname !== '/' || base.search || base.hash || base.origin === incoming.origin ||
      (process.env.NODE_ENV === 'production' && base.protocol !== 'https:')) throw new Error();
  } catch { return fail(503, 'The backend connection is not configured.'); }
  const target = new URL(`/api/v1/${path.join('/')}${incoming.search}`, base);
  const headers = new Headers();
  for (const name of ['authorization', 'content-type', 'accept', 'idempotency-key', 'origin']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  // Do not forward analytics, Vercel, or other unrelated cookies upstream.
  if (path[0] === 'auth') {
    const cookie = request.headers.get('cookie')?.split(';').map(value => value.trim()).find(value => value.startsWith('refreshToken='));
    if (cookie) headers.set('cookie', cookie);
  }
  try {
    const upstream = await fetch(target, {
      method: request.method, headers, cache: 'no-store', redirect: 'manual',
      body: mutation ? await request.arrayBuffer() : undefined,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(90000)]),
    });
    // Never follow redirects carrying credentials or forward upstream redirects to browsers.
    if (upstream.status >= 300 && upstream.status < 400) return fail(502, 'Unexpected backend redirect.');
    const outgoing = new Headers({ 'Cache-Control': 'no-store' });
    for (const name of ['content-type', 'x-request-id', 'retry-after']) {
      const value = upstream.headers.get(name);
      if (value) outgoing.set(name, value);
    }
    if (path[0] === 'auth') {
      for (const cookie of upstream.headers.getSetCookie()) {
        if (cookie.startsWith('refreshToken=')) {
          outgoing.append('Set-Cookie', cookie.replace(/;\s*Domain=[^;]*/gi, ''));
        }
      }
    }
    return new Response(upstream.body, { status: upstream.status, headers: outgoing });
  } catch { return fail(502, 'Unable to reach the backend. Please try again shortly.'); }
}
