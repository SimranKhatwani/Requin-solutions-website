const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Resolves an image path, MongoDB GridFS media ID, or URL into a fully-qualified browser URL.
 * Supports:
 * - Public static assets: '/images/...' -> '/images/...'
 * - External URLs: 'https://...' or 'data:image/...' -> unchanged
 * - GridFS API endpoints: '/api/media/:id' -> API_BASE_URL + '/api/media/:id'
 * - Raw GridFS ObjectIds or media IDs: '65f123...' -> API_BASE_URL + '/api/media/65f123...'
 */
export function getMediaUrl(src?: string | null): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return '/images/placeholder.jpg';
  }

  const clean = src.trim();

  // 1. External absolute URLs or Data URLs
  if (/^https?:\/\//i.test(clean) || clean.startsWith('data:') || clean.startsWith('blob:')) {
    return clean;
  }

  // 2. Local frontend public assets
  if (clean.startsWith('/images/')) {
    return clean;
  }

  // 3. GridFS or backend uploads path
  if (clean.startsWith('/api/media/') || clean.startsWith('/uploads/') || clean.startsWith('/api/')) {
    return API_BASE_URL ? `${API_BASE_URL}${clean}` : clean;
  }

  // 4. Raw MongoDB ObjectId (24 hex characters) or 'med-...' ID
  if (/^[a-fA-F0-9]{24}$/.test(clean) || clean.startsWith('med-')) {
    const path = `/api/media/${clean}`;
    return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
  }

  // 5. Generic relative path
  if (clean.startsWith('/')) {
    return API_BASE_URL ? `${API_BASE_URL}${clean}` : clean;
  }

  return clean;
}
