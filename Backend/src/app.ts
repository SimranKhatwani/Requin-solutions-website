import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { corsOptions } from './config/cors';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { getMongoConnectionState } from './config/mongodb';

export function createApp(): Express {
  const app = express();

  // Trust proxy for Render / Vercel reverse proxy environments
  app.set('trust proxy', 1);

  // Global CORS Middleware & Explicit Preflight handling
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static files for uploads (kept outside src/)
  app.use('/uploads', express.static(ENV.UPLOADS_DIR));

  // Health Check Endpoint
  const healthHandler = (_req: Request, res: Response): void => {
    const mongoState = getMongoConnectionState();
    res.json({
      status: 'ok',
      service: 'Requin Solutions Backend API',
      database: {
        mongodb: mongoState.isConnected ? 'connected' : 'disconnected',
        readyState: mongoState.readyState,
        databaseName: mongoState.name,
      },
      timestamp: new Date().toISOString(),
    });
  };

  app.get('/', healthHandler);
  app.get('/health', healthHandler);
  app.get('/api/health', healthHandler);

  // API Routes (mounted at both /api and root for total compatibility)
  app.use('/api', apiRouter);
  app.use('/', apiRouter);

  // 404 Handler for undefined routes
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
