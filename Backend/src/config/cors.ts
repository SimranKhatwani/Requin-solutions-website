import { CorsOptions } from 'cors';
import { ENV } from './env';

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://requin-solutions-website.vercel.app',
];

export function getAllowedOrigins(): string[] {
  const customOrigins: string[] = [];

  if (ENV.FRONTEND_URL) {
    customOrigins.push(...ENV.FRONTEND_URL.split(',').map((o) => o.trim()));
  }
  if (ENV.CORS_ORIGIN) {
    customOrigins.push(...ENV.CORS_ORIGIN.split(',').map((o) => o.trim()));
  }

  const combined = [...DEFAULT_ALLOWED_ORIGINS, ...customOrigins]
    .filter(Boolean)
    .map((origin) => origin.replace(/\/+$/, '')); // strip trailing slashes

  return Array.from(new Set(combined));
}

export function isOriginAllowed(origin?: string): boolean {
  // Allow non-browser requests (e.g. server-to-server, curl, Postman, health checkers)
  if (!origin) {
    return true;
  }

  const normalized = origin.replace(/\/+$/, '');
  const allowed = getAllowedOrigins();

  if (allowed.includes(normalized)) {
    return true;
  }

  // Allow Vercel preview and branch deployments for this project
  if (/^https:\/\/requin-solutions-website[a-zA-Z0-9_-]*\.vercel\.app$/.test(normalized)) {
    return true;
  }

  return false;
}

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Request blocked from unauthorized origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 204,
  maxAge: 86400, // 24 hours preflight cache
};
