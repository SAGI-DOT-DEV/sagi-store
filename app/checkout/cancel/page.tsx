import { StorefrontShell } from '../../../components/StorefrontShell';
import { CheckoutView } from '../../../views/CheckoutView';

export default async function CheckoutReturnPage({ searchParams }: { searchParams: Promise<{ orderId?: string | string[] }> }) {
  const params = await searchParams;
  const orderId = typeof params.orderId === 'string' ? params.orderId : undefined;
  return <StorefrontShell><CheckoutView key={orderId || 'cart'} requestedOrderId={orderId} /></StorefrontShell>;
}
