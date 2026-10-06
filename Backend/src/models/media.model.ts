import mongoose, { Schema, Document, Model } from 'mongoose';
import { MediaDoc } from '../types';

export interface IMediaDocument extends Omit<MediaDoc, 'id'>, Document {
  id: string;
}

export const MediaSchema = new Schema<IMediaDocument>(
  {
    id: {
      type: String,
      required: [true, 'Media ID is required'],
      unique: true,
      index: true,
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
      index: true,
    },
    originalName: {
      type: String,
      required: [true, 'Original name is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Media URL is required'],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
      index: true,
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
    },
    dimensions: {
      width: { type: Number },
      height: { type: Number },
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

// Indexes
MediaSchema.index({ createdAt: -1 });

export const MediaMongoose: Model<IMediaDocument> =
  (mongoose.models.Media as Model<IMediaDocument>) ||
  mongoose.model<IMediaDocument>('Media', MediaSchema);

// Data Access Object using MediaMongoose (MongoDB Atlas)
export const MediaModel = {
  async findAll(): Promise<MediaDoc[]> {
    const media = await MediaMongoose.find().sort({ createdAt: -1 }).lean();
    return media as unknown as MediaDoc[];
  },

  async findById(id: string): Promise<MediaDoc | null> {
    const media = await MediaMongoose.findOne({ id }).lean();
    return media ? (media as unknown as MediaDoc) : null;
  },

  async create(media: MediaDoc): Promise<MediaDoc> {
    const created = await MediaMongoose.create(media);
    return created.toObject() as unknown as MediaDoc;
  },

  async delete(id: string): Promise<MediaDoc | null> {
    const deleted = await MediaMongoose.findOneAndDelete({ id }).lean();
    return deleted ? (deleted as unknown as MediaDoc) : null;
  },
};

export default MediaMongoose;
