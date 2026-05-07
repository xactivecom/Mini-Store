export type Product = {
  id: number;
  categoryId: string;
  name: string;
  price: number;
  img: string;
}

export interface ProductsLocationState {
  tag: 'products',
  products: Product[],
  sourceLabel: string;
}

export type ProductsRouteState = ProductsLocationState;

export function isProductsRouteState(value: unknown): value is ProductsRouteState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    candidate['tag'] === 'products' &&
    Array.isArray(candidate['products']) &&
    typeof candidate['sourceLabel'] === 'string'
  );
}
