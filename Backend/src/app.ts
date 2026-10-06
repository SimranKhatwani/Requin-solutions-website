import express, { Express } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/error.middleware';

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: ENV.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static files for uploads (kept outside src/)
  app.use('/uploads', express.static(ENV.UPLOADS_DIR));

  // Health Check Endpoint
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Requin Solutions Backend API',
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
