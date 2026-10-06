import dns from 'node:dns';
import mongoose from 'mongoose';
import { ENV } from './env';

// Configure reliable DNS servers to ensure Atlas SRV (_mongodb._tcp) resolution works across various local ISP environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore if custom DNS cannot be configured in the runtime
}

/**
 * Connects to MongoDB Atlas using Mongoose.
 * Fails fast if MONGODB_URI is not set or if connection cannot be established.
 */
export async function connectMongoDB(): Promise<typeof mongoose> {
  const uri = ENV.MONGODB_URI || process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    const errorMsg = '❌ MongoDB connection error: MONGODB_URI is missing or empty in environment variables.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB connected successfully: host=${mongoose.connection.host || 'Atlas'}, db=${mongoose.connection.name}`);
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export function getMongoConnectionState(): { isConnected: boolean; readyState: number; name: string } {
  const state = mongoose.connection.readyState;
  return {
    isConnected: state === 1,
    readyState: state,
    name: mongoose.connection.name || 'unconnected',
  };
}
