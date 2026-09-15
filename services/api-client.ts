// Browsers always use the same-origin proxy. Server reads use the private upstream.
const API_URL = typeof window === 'undefined'
  ? (process.env.BACKEND_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  : '';
export const TOKEN_KEY = 'sagi_access_token';
let sessionVersion = 0;
let refreshPromise: Promise<string> | null = null;

export function saveSessionToken(token: string | null) {
  sessionVersion += 1;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

function expireSession() {
  saveSessionToken(null);
  window.dispatchEvent(new CustomEvent('sagi:session-expired'));
}

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;
  const version = sessionVersion;
  refreshPromise = (async () => {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, { method: 'POST', credentials: 'include' });
    const payload = await response.json().catch(() => null);
    if (version !== sessionVersion) throw new Error('Session changed while refreshing.');
    if (!response.ok || !payload?.data?.accessToken) {
      if (response.status === 401) expireSession();
      throw new ApiError(payload?.error?.message || 'Unable to refresh your session. Please try again.', response.status);
    }
    const token: string = payload.data.accessToken;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new CustomEvent('sagi:session-refreshed', { detail: token }));
    return token;
  })().finally(() => { refreshPromise = null; });
  return refreshPromise;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}, accessToken?: string): Promise<T> {
  const version = sessionVersion;
  const send = (token?: string) => fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  let response = await send(accessToken);
  if (response.status === 401 && accessToken && typeof window !== 'undefined') {
    if (version !== sessionVersion) throw new Error('Session changed.');
    const saved = window.localStorage.getItem(TOKEN_KEY);
    const token = saved && saved !== accessToken ? saved : await refreshAccessToken();
    if (version !== sessionVersion) throw new Error('Session changed.');
    options.signal?.throwIfAborted();
    response = await send(token);
    if (response.status === 401 && version === sessionVersion) expireSession();
  }
  const payload = await response.json().catch(() => null);
  if (accessToken && version !== sessionVersion && response.status !== 401) throw new Error('Session changed.');
  if (!response.ok || payload?.success === false) {
    throw new ApiError(payload?.error?.message || 'Something went wrong. Please try again.', response.status, payload?.error?.code);
  }
  return payload?.data as T;
}
