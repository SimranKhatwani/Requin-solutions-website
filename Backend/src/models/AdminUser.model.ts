import mongoose, { Schema, Document, Model } from 'mongoose';
import { AdminUser } from '../types';

export interface IAdminUserDocument extends Omit<AdminUser, 'id'>, Document {
  id: string;
}

export const AdminUserSchema = new Schema<IAdminUserDocument>(
  {
    id: {
      type: String,
      required: [true, 'Admin user ID is required'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'editor'],
      default: 'superadmin',
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

// Schema options & indexes configured via field definitions (unique: true)


export const AdminUserMongoose: Model<IAdminUserDocument> =
  (mongoose.models.AdminUser as Model<IAdminUserDocument>) ||
  mongoose.model<IAdminUserDocument>('AdminUser', AdminUserSchema);

export default AdminUserMongoose;
