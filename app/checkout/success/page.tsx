import { StorefrontShell } from '../../../components/StorefrontShell';
import { CheckoutSuccess } from '../../../components/checkout/CheckoutSuccess';

export default async function CheckoutSuccessPage({ searchParams }: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' && /^cs_[a-zA-Z0-9_]{1,240}$/.test(params.session_id)
    ? params.session_id : '';
  return <StorefrontShell><CheckoutSuccess sessionId={sessionId} /></StorefrontShell>;
}
