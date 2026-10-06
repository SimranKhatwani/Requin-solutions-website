import { createApp } from './app';
import { ENV } from './config/env';
import { CMSStore } from './config/db';

const app = createApp();

async function startServer(): Promise<void> {
  // Ensure persistent store is loaded & seeded if needed
  CMSStore.get();

  app.listen(ENV.PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`🚀 Requin Solutions Backend API Server`);
    console.log(`📡 URL: http://localhost:${ENV.PORT}`);
    console.log(`📑 API Base: http://localhost:${ENV.PORT}/api`);
    console.log(`🩺 Health: http://localhost:${ENV.PORT}/health`);
    console.log(`💾 Database: Persistent Store (JSON Store Ready for MongoDB Migration)`);
    console.log(`=========================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
