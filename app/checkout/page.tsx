import { CheckoutView } from "../../views/CheckoutView";
import { StorefrontShell } from "../../components/StorefrontShell";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ orderId?: string | string[] }> }) {
  const params = await searchParams;
  const orderId = typeof params.orderId === 'string' ? params.orderId : undefined;
  return <StorefrontShell><CheckoutView key={orderId || 'cart'} requestedOrderId={orderId} /></StorefrontShell>;
}
