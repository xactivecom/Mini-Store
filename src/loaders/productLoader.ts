import { type Product } from '../types/Product';

export default async function fetchProductLoader(): Promise<Product[]> {
  const res = await fetch("http://localhost:9000/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Explicit data conversion
  const data = await res.json() as unknown[];
  return data.map((item): Product => {
    const p = item as Record<string, unknown>;
    return {
      id: Number(p["id"]),
      categoryId: String(p["categoryId"]),
      name: String(p["name"]),
      price: Number(p["price"]),
      img: String(p["img"]),
    };
  });
}
