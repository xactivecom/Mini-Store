// Resolve all matching files, content hash them and emit URLs into the bundle
const imageModules = import.meta.glob(
  '/src/assets/images/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

// Strip the full Vite path to just the filename to match JSON entries
export const imageMap: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([Path2D, url]) => [
    Path2D.split('/').at(-1)!,
    url,
  ])
);

// Resolve a fallback for missing images
export function resolveImage(filename: string, fallback = 'placeholder.png'): string {
  return imageMap[filename] ?? fallback;
}