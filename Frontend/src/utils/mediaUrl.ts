export const DEFAULT_PROD_BACKEND_URL = 'https://requin-solutions-website.onrender.com';

export function resolveApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    let cleaned = envUrl.trim().replace(/\/+$/, '');
    if (
      typeof window !== 'undefined' &&
      window.location.protocol === 'https:' &&
      cleaned.startsWith('http://') &&
      !cleaned.includes('localhost') &&
      !cleaned.includes('127.0.0.1')
    ) {
      cleaned = cleaned.replace(/^http:\/\//i, 'https://');
    }
    return cleaned;
  }
  // In production browser environments (Vercel, custom domains), automatically default to Render backend
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return DEFAULT_PROD_BACKEND_URL;
    }
  }
  return DEFAULT_PROD_BACKEND_URL;
}

export const API_BASE_URL = resolveApiBaseUrl();

/**
 * Resolves an image path, MongoDB GridFS media ID, or URL into a fully-qualified browser URL.
 * Supports:
 * - Public static assets: '/images/...' -> '/images/...'
 * - External URLs: 'https://...' or 'data:image/...' -> unchanged
 * - Localhost dev URLs: 'http://localhost:5000/api/media/:id' -> API_BASE_URL + '/api/media/:id'
 * - GridFS API endpoints: '/api/media/:id' -> API_BASE_URL + '/api/media/:id'
 * - Raw GridFS ObjectIds or media IDs: '65f123...' -> API_BASE_URL + '/api/media/65f123...'
 */
export function getMediaUrl(src?: string | null): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return '/images/placeholder.jpg';
  }

  let clean = src.trim();

  // Data URLs and blob URLs
  if (clean.startsWith('data:') || clean.startsWith('blob:')) {
    return clean;
  }

  // Protocol-relative URLs
  if (clean.startsWith('//')) {
    clean = 'https:' + clean;
  }

  // 1. Rewrite any localhost or 127.0.0.1 URLs (e.g. from local admin upload or local database testing)
  if (/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i.test(clean)) {
    const pathOnly = clean.replace(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i, '');
    if (pathOnly.startsWith('/images/')) {
      return pathOnly;
    }
    if (pathOnly.startsWith('/api/') || pathOnly.startsWith('/uploads/')) {
      return `${API_BASE_URL}${pathOnly}`;
    }
    if (pathOnly) {
      return `${API_BASE_URL}${pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`}`;
    }
    return '/images/placeholder.jpg';
  }

  // 2. Upgrade Render backend http:// to https:// (mixed content prevention on HTTPS deployed sites)
  if (/^http:\/\/requin-solutions-website\.onrender\.com/i.test(clean)) {
    return clean.replace(/^http:\/\//i, 'https://');
  }

  // 3. Local frontend public assets
  if (clean.startsWith('/images/')) {
    return clean;
  }

  // 4. External absolute URLs
  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }

  // 5. GridFS or backend uploads path with leading slash
  if (clean.startsWith('/api/media/') || clean.startsWith('/uploads/') || clean.startsWith('/api/')) {
    return API_BASE_URL ? `${API_BASE_URL}${clean}` : clean;
  }

  // 6. Without leading slash: api/media/... or uploads/...
  if (clean.startsWith('api/media/') || clean.startsWith('uploads/') || clean.startsWith('api/')) {
    return API_BASE_URL ? `${API_BASE_URL}/${clean}` : `/${clean}`;
  }

  // 7. Raw MongoDB ObjectId (24 hex characters) or 'med-...' ID
  if (/^[a-fA-F0-9]{24}$/.test(clean) || clean.startsWith('med-')) {
    const path = `/api/media/${clean}`;
    return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
  }

  // 8. Generic relative path
  if (clean.startsWith('/')) {
    return API_BASE_URL ? `${API_BASE_URL}${clean}` : clean;
  }

  return clean;
}

/**
 * Transforms all embedded <img> tags in rich-text HTML (such as blog content),
 * rewriting relative /api/media/ or localhost URLs into fully-qualified production URLs,
 * and adding responsive lazy loading and fallback onerror handlers.
 */
export function transformHtmlMediaUrls(html?: string | null): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return html.replace(
    /(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
    (fullMatch, prefix, srcValue, suffix) => {
      const resolvedSrc = getMediaUrl(srcValue);
      let updatedTag = `${prefix}${resolvedSrc}${suffix}`;

      if (!/loading=/i.test(updatedTag)) {
        updatedTag = updatedTag.replace(/<img\b/i, '<img loading="lazy" decoding="async"');
      }

      if (!/onerror=/i.test(updatedTag)) {
        updatedTag = updatedTag.replace(
          /<img\b/i,
          '<img onerror="this.onerror=null;this.src=\'/images/placeholder.jpg\';" '
        );
      }

      return updatedTag;
    }
  );
}
