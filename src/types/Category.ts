// Product category type
export type Category = {
  id: string;
  name: string;
  img: string;
}

// State wrapper for category collection
export interface CategoriesLocationState {
  tag: 'categories',
  categories: Category[],
  sourceLabel: string;
}

export type CategoriesRouteState = CategoriesLocationState;

// Determine if state contains a category collection
export function isCategoriesRouteState(value: unknown): value is CategoriesRouteState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    candidate['tag'] === 'categories' &&
    Array.isArray(candidate['categories']) &&
    typeof candidate['sourceLabel'] === 'string'
  );
}
