import { apiRequest } from './api-client';

export type Recipe = {
  id: string;
  title: string;
  image: string;
  procedures: string[];
  notes?: string | null;
  equipment: string[];
};

export type RecipePage = {
  items: Recipe[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

export async function getRecipes(page = 1, limit = 6, query = '') {
  return apiRequest<RecipePage>(`/api/v1/recipes?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}`);
}
