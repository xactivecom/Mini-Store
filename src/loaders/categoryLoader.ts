import { type Category } from '../types/Category';

export default async function fetchCategoryLoader(): Promise<Category[]> {
  const res = await fetch("http://localhost:9000/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  // Explicit data conversion
  const data = await res.json() as unknown[];
  return data.map((item): Category => {
    const p = item as Record<string, unknown>;
    return {
      id: String(p["id"]),
      name: String(p["name"]),
      img: String(p["img"]),
    };
  });
}
