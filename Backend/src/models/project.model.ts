import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProjectDoc } from '../types';

export interface IProjectDocument extends Omit<ProjectDoc, 'id'>, Document {
  id: string;
}

export const ProjectSchema = new Schema<IProjectDocument>(
  {
    id: {
      type: String,
      required: [true, 'Project ID is required'],
      unique: true,
      index: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
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
    fullDescription: {
      type: String,
      default: '',
    },
    featuredImage: {
      type: String,
      default: '',
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
      index: true,
    },
    technologies: {
      type: [String],
      default: [],
      index: true,
    },
    projectUrl: {
      type: String,
      default: '',
      trim: true,
    },
    clientName: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'PUBLISHED',
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
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
ProjectSchema.index({ status: 1, displayOrder: 1 });
ProjectSchema.index({ category: 1, status: 1 });
ProjectSchema.index({ projectName: 'text', shortDescription: 'text', technologies: 'text' });

export const ProjectMongoose: Model<IProjectDocument> =
  (mongoose.models.Project as Model<IProjectDocument>) ||
  mongoose.model<IProjectDocument>('Project', ProjectSchema);

// Data Access Object using ProjectMongoose (MongoDB Atlas)
export const ProjectModel = {
  async findPublished(filters?: { category?: string } | string): Promise<ProjectDoc[]> {
    const query: any = { status: 'PUBLISHED' };
    const category = typeof filters === 'string' ? filters : filters?.category;
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const projects = await ProjectMongoose.find(query).sort({ displayOrder: 1, createdAt: -1 }).lean();
    return projects as unknown as ProjectDoc[];
  },

  async findBySlug(slug: string): Promise<ProjectDoc | null> {
    const project = await ProjectMongoose.findOne({ slug: slug.toLowerCase().trim() }).lean();
    return project ? (project as unknown as ProjectDoc) : null;
  },

  async findById(id: string): Promise<ProjectDoc | null> {
    const project = await ProjectMongoose.findOne({ id }).lean();
    return project ? (project as unknown as ProjectDoc) : null;
  },

  async findAll(): Promise<ProjectDoc[]> {
    const projects = await ProjectMongoose.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return projects as unknown as ProjectDoc[];
  },

  async create(project: ProjectDoc): Promise<ProjectDoc> {
    const created = await ProjectMongoose.create(project);
    return created.toObject() as unknown as ProjectDoc;
  },

  async update(id: string, updates: Partial<ProjectDoc>): Promise<ProjectDoc | null> {
    const updated = await ProjectMongoose.findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { new: true }
    ).lean();
    return updated ? (updated as unknown as ProjectDoc) : null;
  },

  async delete(id: string): Promise<ProjectDoc | null> {
    const deleted = await ProjectMongoose.findOneAndDelete({ id }).lean();
    return deleted ? (deleted as unknown as ProjectDoc) : null;
  },
};

export default ProjectMongoose;
