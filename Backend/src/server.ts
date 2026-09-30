import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiRouter } from './routes';
import { CMSStore } from './db';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Uploads directory
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static files for uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// API Routes
app.use('/api', apiRouter);

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Requin Solutions Backend API',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      console.log('MongoDB connected successfully');
    } catch {
      console.log('Operating in local persistent store mode (JSON database)');
    }
  } else {
    console.log('Operating in local persistent store mode (JSON database)');
  }

  // Ensure initial store is loaded
  CMSStore.get();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`🚀 Requin Solutions Backend API Server`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📑 API Base: http://localhost:${PORT}/api`);
    console.log(`🩺 Health: http://localhost:${PORT}/health`);
    console.log(`=========================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
