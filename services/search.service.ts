import { getProducts } from './products.service';
import { getRecipes } from './recipes.service';

export async function searchStore(query: string) {
  const [products, recipes] = await Promise.all([getProducts(6, query), getRecipes(1, 6, query)]);
  return { products, recipes: recipes.items };
}
