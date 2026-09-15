import { proxyBackend } from '../../../../services/backend-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

async function handler(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyBackend(request, (await context.params).path);
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE, handler as HEAD };
