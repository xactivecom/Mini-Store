// Product detail type
export type Product = {
  id: number;
  categoryId: string;
  name: string;
  price: number;
  img: string;
}

// State wrapper for product collection
export interface ProductsLocationState {
  tag: 'products',
  products: Product[],
  sourceLabel: string;
}

export type ProductsRouteState = ProductsLocationState;

// Determine if state contains a product collection
export function isProductsRouteState(value: unknown): value is ProductsRouteState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    candidate['tag'] === 'products' &&
    Array.isArray(candidate['products']) &&
    typeof candidate['sourceLabel'] === 'string'
  );
}
