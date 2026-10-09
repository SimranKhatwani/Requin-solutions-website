import { createApp } from './app';
import { ENV } from './config/env';
import { connectMongoDB } from './config/mongodb';
import { CMSStore } from './config/db';
import { getAllowedOrigins } from './config/cors';

import { autoSeedDatabase } from './config/autoSeed';

async function startServer(): Promise<void> {
  try {
    // 1. Establish MongoDB connection first
    await connectMongoDB();

    // 2. Ensure all CMS blogs and documents are seeded in MongoDB Atlas
    await autoSeedDatabase();

    // 3. Ensure legacy CMS store is initialized
    CMSStore.get();

    // 3. Create Express app instance
    const app = createApp();

    // 4. Start HTTP server
    app.listen(ENV.PORT, '0.0.0.0', () => {
      console.log(`=========================================`);
      console.log(`🚀 Requin Solutions Backend API Server`);
      console.log(`📡 URL: http://localhost:${ENV.PORT}`);
      console.log(`📑 API Base: http://localhost:${ENV.PORT}/api`);
      console.log(`🩺 Health: http://localhost:${ENV.PORT}/health`);
      console.log(`🔒 Allowed CORS Origins: ${getAllowedOrigins().join(', ')}`);
      console.log(`🍃 Database: MongoDB Atlas Connected`);
      console.log(`💾 JSON CMS Store: cms_store.json Active`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error('❌ Fatal error during server startup. Aborting:', error);
    process.exit(1);
  }
}

startServer();
