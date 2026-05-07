import { type Category } from '../types/Category';

export default async function fetchCategoryLoader(): Promise<Category[]> {
  const res = await fetch("http://localhost:9000/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}
