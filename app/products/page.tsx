import { RouteContent } from "../../components/RouteContent";
import { StorefrontShell } from "../../components/StorefrontShell";

export default function ProductsPage() {
  return <StorefrontShell><RouteContent view="products" /></StorefrontShell>;
}
