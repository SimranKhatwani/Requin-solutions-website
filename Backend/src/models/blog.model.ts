import mongoose, { Schema, Document, Model } from 'mongoose';
import { BlogDoc } from '../types';

export interface IBlogDocument extends Omit<BlogDoc, 'id'>, Document {
  id: string;
}

export const BlogSchema = new Schema<IBlogDocument>(
  {
    id: {
      type: String,
      required: [true, 'Blog ID is required'],
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      default: '',
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    featuredImage: {
      type: String,
      default: '',
      trim: true,
    },
    author: {
      type: String,
      default: 'Requin Team',
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    publishedDate: {
      type: String,
      default: () => new Date().toISOString(),
      index: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'DRAFT',
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
BlogSchema.index({ status: 1, category: 1 });
BlogSchema.index({ status: 1, publishedDate: -1 });
BlogSchema.index({ title: 'text', shortDescription: 'text', tags: 'text' });

export const BlogMongoose: Model<IBlogDocument> =
  (mongoose.models.Blog as Model<IBlogDocument>) ||
  mongoose.model<IBlogDocument>('Blog', BlogSchema);

// Data Access Object using BlogMongoose (MongoDB Atlas)
export const BlogModel = {
  async findPublished(filters?: { category?: string; search?: string }): Promise<BlogDoc[]> {
    const query: any = { status: 'PUBLISHED' };

    if (filters?.category && filters.category !== 'All') {
      query.category = { $regex: new RegExp(`^${filters.category}$`, 'i') };
    }

    if (filters?.search) {
      const q = filters.search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    const blogs = await BlogMongoose.find(query).sort({ publishedDate: -1, createdAt: -1 }).lean();
    return blogs as unknown as BlogDoc[];
  },

  async findBySlug(slug: string): Promise<BlogDoc | null> {
    const blog = await BlogMongoose.findOne({ slug: slug.toLowerCase().trim() }).lean();
    return blog ? (blog as unknown as BlogDoc) : null;
  },

  async findById(id: string): Promise<BlogDoc | null> {
    const blog = await BlogMongoose.findOne({ id }).lean();
    return blog ? (blog as unknown as BlogDoc) : null;
  },

  async findAll(): Promise<BlogDoc[]> {
    const blogs = await BlogMongoose.find().sort({ updatedAt: -1, createdAt: -1 }).lean();
    return blogs as unknown as BlogDoc[];
  },

  async create(blog: BlogDoc): Promise<BlogDoc> {
    const created = await BlogMongoose.create(blog);
    return created.toObject() as unknown as BlogDoc;
  },

  async update(id: string, updates: Partial<BlogDoc>): Promise<BlogDoc | null> {
    const updated = await BlogMongoose.findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { new: true }
    ).lean();
    return updated ? (updated as unknown as BlogDoc) : null;
  },

  async delete(id: string): Promise<BlogDoc | null> {
    const deleted = await BlogMongoose.findOneAndDelete({ id }).lean();
    return deleted ? (deleted as unknown as BlogDoc) : null;
  },
};

export default BlogMongoose;
