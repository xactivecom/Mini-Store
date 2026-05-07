import { type Product } from '../types/Product';

export default async function fetchProductLoader(): Promise<Product[]> {
  const res = await fetch("http://localhost:9000/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
