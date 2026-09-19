import { RouteContent } from "../../components/RouteContent";
import { StorefrontShell } from "../../components/StorefrontShell";
import { pageMetadata } from '../../services/seo';
export const metadata = pageMetadata('Nigerian Recipes & Kitchen Journals', 'Explore Nigerian recipes with step-by-step instructions, equipment lists and cooking notes from the SAGI kitchen.', '/journals');

export default function JournalsPage() {
  return <StorefrontShell><RouteContent view="journals" /></StorefrontShell>;
}
