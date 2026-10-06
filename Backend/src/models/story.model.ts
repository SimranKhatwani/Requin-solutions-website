import mongoose, { Schema, Document, Model } from 'mongoose';
import { StoryDoc } from '../types';

export interface IStoryDocument extends Omit<StoryDoc, 'id'>, Document {
  id: string;
}

export const StorySchema = new Schema<IStoryDocument>(
  {
    id: {
      type: String,
      required: [true, 'Story ID is required'],
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Story title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
      index: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    storyContent: {
      type: String,
      default: '',
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
StorySchema.index({ status: 1, displayOrder: 1 });

export const StoryMongoose: Model<IStoryDocument> =
  (mongoose.models.Story as Model<IStoryDocument>) ||
  mongoose.model<IStoryDocument>('Story', StorySchema);

// Data Access Object using StoryMongoose (MongoDB Atlas)
export const StoryModel = {
  async findPublished(): Promise<StoryDoc[]> {
    const stories = await StoryMongoose.find({ status: 'PUBLISHED' }).sort({ displayOrder: 1, createdAt: 1 }).lean();
    return stories as unknown as StoryDoc[];
  },

  async findById(id: string): Promise<StoryDoc | null> {
    const story = await StoryMongoose.findOne({ id }).lean();
    return story ? (story as unknown as StoryDoc) : null;
  },

  async findAll(): Promise<StoryDoc[]> {
    const stories = await StoryMongoose.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
    return stories as unknown as StoryDoc[];
  },

  async create(story: StoryDoc): Promise<StoryDoc> {
    const created = await StoryMongoose.create(story);
    return created.toObject() as unknown as StoryDoc;
  },

  async update(id: string, updates: Partial<StoryDoc>): Promise<StoryDoc | null> {
    const updated = await StoryMongoose.findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { new: true }
    ).lean();
    return updated ? (updated as unknown as StoryDoc) : null;
  },

  async delete(id: string): Promise<StoryDoc | null> {
    const deleted = await StoryMongoose.findOneAndDelete({ id }).lean();
    return deleted ? (deleted as unknown as StoryDoc) : null;
  },
};

export default StoryMongoose;
