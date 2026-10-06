import mongoose, { Schema, Document, Model } from 'mongoose';
import { LifeAtRequinDoc, LifeAtRequinPhotoDoc } from '../types';

export interface ILifeAtRequinDocument extends Omit<LifeAtRequinDoc, 'id'>, Document {
  id: string;
}

export const LifeAtRequinPhotoSchema = new Schema<LifeAtRequinPhotoDoc>(
  {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      default: '',
      trim: true,
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    caption: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: false }
);

export const LifeAtRequinSchema = new Schema<ILifeAtRequinDocument>(
  {
    id: {
      type: String,
      required: [true, 'Gallery ID is required'],
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Gallery title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    caption: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
      trim: true,
    },
    photoCount: {
      type: Number,
      default: 0,
    },
    years: {
      type: [String],
      default: [],
      index: true,
    },
    photos: {
      type: [LifeAtRequinPhotoSchema],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'PUBLISHED',
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

// Indexes
LifeAtRequinSchema.index({ status: 1, displayOrder: 1 });
LifeAtRequinSchema.index({ category: 1, status: 1 });

export const LifeAtRequinMongoose: Model<ILifeAtRequinDocument> =
  (mongoose.models.LifeAtRequin as Model<ILifeAtRequinDocument>) ||
  mongoose.model<ILifeAtRequinDocument>('LifeAtRequin', LifeAtRequinSchema);

// Data Access Object using LifeAtRequinMongoose (MongoDB Atlas)
export const LifeAtRequinModel = {
  async findPublished(): Promise<LifeAtRequinDoc[]> {
    const galleries = await LifeAtRequinMongoose.find({ status: 'PUBLISHED' }).sort({ displayOrder: 1, createdAt: 1 }).lean();
    return galleries as unknown as LifeAtRequinDoc[];
  },

  async findById(id: string): Promise<LifeAtRequinDoc | null> {
    const gallery = await LifeAtRequinMongoose.findOne({ id }).lean();
    return gallery ? (gallery as unknown as LifeAtRequinDoc) : null;
  },

  async findAll(): Promise<LifeAtRequinDoc[]> {
    const galleries = await LifeAtRequinMongoose.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
    return galleries as unknown as LifeAtRequinDoc[];
  },

  async create(gallery: LifeAtRequinDoc): Promise<LifeAtRequinDoc> {
    const created = await LifeAtRequinMongoose.create(gallery);
    return created.toObject() as unknown as LifeAtRequinDoc;
  },

  async update(id: string, updates: Partial<LifeAtRequinDoc>): Promise<LifeAtRequinDoc | null> {
    const updated = await LifeAtRequinMongoose.findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { new: true }
    ).lean();
    return updated ? (updated as unknown as LifeAtRequinDoc) : null;
  },

  async delete(id: string): Promise<LifeAtRequinDoc | null> {
    const deleted = await LifeAtRequinMongoose.findOneAndDelete({ id }).lean();
    return deleted ? (deleted as unknown as LifeAtRequinDoc) : null;
  },
};

export default LifeAtRequinMongoose;
