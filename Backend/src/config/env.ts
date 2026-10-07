import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://requin-solutions-website.vercel.app',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_requin_cms_2026',
  MONGODB_URI: process.env.MONGODB_URI || '',
  ADMIN_DEFAULT_EMAIL: process.env.ADMIN_DEFAULT_EMAIL || 'admin@requinsolutions.com',
  ADMIN_DEFAULT_PASSWORD: process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Requin2026!',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '',
  UPLOADS_DIR: path.resolve(process.cwd(), 'uploads'),
  DATA_DIR: path.resolve(process.cwd(), 'data'),
};
