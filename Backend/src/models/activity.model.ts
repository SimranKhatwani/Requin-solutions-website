import mongoose, { Schema, Document, Model } from 'mongoose';
import { CMSStore } from '../config/db';
import { ActivityDoc } from '../types';

export interface IActivityDocument extends Omit<ActivityDoc, 'id'>, Document {
  id: string;
}

export const ActivitySchema = new Schema<IActivityDocument>(
  {
    id: {
      type: String,
      required: [true, 'Activity ID is required'],
      unique: true,
      index: true,
    },
    action: {
      type: String,
      required: [true, 'Action description is required'],
      trim: true,
    },
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      index: true,
    },
    entityTitle: {
      type: String,
      required: [true, 'Entity title is required'],
      trim: true,
    },
    adminEmail: {
      type: String,
      required: [true, 'Admin email is required'],
      trim: true,
    },
    timestamp: {
      type: String,
      required: [true, 'Timestamp is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Performance Indexes
ActivitySchema.index({ timestamp: -1 });
ActivitySchema.index({ createdAt: -1 });

export const ActivityMongoose: Model<IActivityDocument> =
  (mongoose.models.Activity as Model<IActivityDocument>) ||
  mongoose.model<IActivityDocument>('Activity', ActivitySchema);

export const ActivityModel = {
  add(
    action: string,
    entityType: ActivityDoc['entityType'],
    entityTitle: string,
    adminEmail: string,
    timestamp?: string
  ): ActivityDoc {
    const newAct: ActivityDoc = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entityType,
      entityTitle,
      adminEmail,
      timestamp: timestamp || new Date().toISOString(),
    };

    // 1. Asynchronously persist to MongoDB Atlas activities collection
    if (mongoose.connection.readyState === 1) {
      ActivityMongoose.create(newAct).catch((err) => {
        console.warn('Warning: Could not persist Activity to MongoDB Atlas:', err);
      });
    }

    // 2. Synchronize to CMSStore memory cache
    try {
      const db = CMSStore.get();
      if (!db.activities) {
        db.activities = [];
      }
      db.activities.unshift(newAct);
      if (db.activities.length > 50) {
        db.activities = db.activities.slice(0, 50);
      }
      CMSStore.save(db);
    } catch {
      // In-memory cache fallback failure is non-fatal
    }

    return newAct;
  },

  async getRecent(limit: number = 10): Promise<ActivityDoc[]> {
    // 1. Primary source: Query MongoDB Atlas
    try {
      if (mongoose.connection.readyState === 1) {
        const atlasActivities = await ActivityMongoose.find()
          .sort({ timestamp: -1, createdAt: -1 })
          .limit(limit)
          .lean();

        if (atlasActivities && atlasActivities.length > 0) {
          return atlasActivities.map((doc) => ({
            id: doc.id,
            action: doc.action,
            entityType: doc.entityType as ActivityDoc['entityType'],
            entityTitle: doc.entityTitle,
            adminEmail: doc.adminEmail,
            timestamp: doc.timestamp,
          }));
        }
      }
    } catch (err) {
      console.warn('Warning: Could not fetch activities from MongoDB Atlas, falling back to memory store:', err);
    }

    // 2. Fallback: CMSStore
    const db = CMSStore.get();
    return (db.activities || []).slice(0, limit);
  },
};

export default ActivityMongoose;
