// Create a collection of all image file URLs in the assets folder.
// The Vite bundler uniquely hashes their name, so capture those path URLs.
const imageModules = import.meta.glob(
  '/src/assets/images/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

// Create an image map of each filename and corresponding full path URL.
// Strip the pathname from the Vite path URL to just the filename.
export const imageMap: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([Path2D, url]) => [
    Path2D.split('/').at(-1)!,
    url,
  ])
);

// Resolve the image path URL for the specified image filename
export function resolveImage(filename: string, fallback = 'placeholder.png'): string {
  return imageMap[filename] ?? fallback;
}
