# Same-origin sessions

Vercel: set server-only `BACKEND_API_URL=https://sagi-store-backend.onrender.com`. Locally use `http://localhost:3000`. Browser services now use `/api/v1` on the frontend host; `NEXT_PUBLIC_API_URL` is no longer used.

Render: keep `NODE_ENV=production`, `APP_URL=https://sagi-store-kjhz.vercel.app`, `CORS_ORIGIN=https://sagi-store-kjhz.vercel.app`. Preview origins are not implicitly trusted. The existing global CORS setting still requires a single origin.

Deploy backend then frontend, and sign in again. Existing Render cookies cannot migrate to Vercel. New cookies are host-only, HttpOnly, Secure in production, SameSite=Lax, scoped to `/api/v1/auth`, with the configured refresh lifetime. Logout clears the same cookie. Missing tokens return 401, not 500. API responses are not cached. The proxy validates mutation origins and refuses upstream redirects.

Stripe webhooks remain pointed directly at Render. Checkout's existing sign-in modal preserves the `session_id` in the URL and resumes confirmation after login. Never pay again merely to check status.

Verify login, expiry/refresh, logout/reload, missing-cookie 401, and return from a Stripe test checkout on the hosted app. Check browser Network requests use the frontend origin and the refresh cookie belongs to that host. Live browser verification is still required.

Operational limits: proxy timeout 90 seconds, subject to Vercel limits. Backend IP rate limits see proxy traffic, not individual browser IPs; use a trusted gateway/identity-aware limiter before higher traffic. Do not trust arbitrary forwarded-IP headers. Long-running synchronous backups may need a separate job workflow. This change does not fix SMTP timeouts.
