import { RouteContent } from "../../../components/RouteContent";
import { StorefrontShell } from "../../../components/StorefrontShell";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StorefrontShell><RouteContent view="product" productId={id} /></StorefrontShell>;
}
