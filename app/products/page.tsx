import { RouteContent } from "../../components/RouteContent";
import { StorefrontShell } from "../../components/StorefrontShell";
import { pageMetadata } from '../../services/seo';
export const metadata = pageMetadata('Shop Nigerian Pantry Staples', 'Browse SAGI provisions and pantry staples. Explore products, compare options and shop in Canadian dollars.', '/products');

export default function ProductsPage() {
  return <StorefrontShell><RouteContent view="products" /></StorefrontShell>;
}
