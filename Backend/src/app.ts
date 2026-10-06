import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/error.middleware';
import { getMongoConnectionState } from './config/mongodb';

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

  app.get('/health', healthHandler);
  app.get('/api/health', healthHandler);

  // API Routes
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
