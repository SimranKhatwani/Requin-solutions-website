import { AdminUser } from '../types';
import { AdminUserMongoose, AdminUserSchema, type IAdminUserDocument } from './AdminUser.model';

export { AdminUserMongoose, AdminUserSchema };
export type { IAdminUserDocument };

export const UserModel = {
  async findByEmailOrUsername(identifier: string): Promise<AdminUser | null> {
    const idLower = identifier.toLowerCase().trim();
    const user = await AdminUserMongoose.findOne({
      $or: [{ email: idLower }, { username: idLower }, { id: identifier.trim() }],
    }).lean();
    return user ? (user as unknown as AdminUser) : null;
  },

  async findById(id: string): Promise<AdminUser | null> {
    const user = await AdminUserMongoose.findOne({ id }).lean();
    return user ? (user as unknown as AdminUser) : null;
  },

  async findByIdOrEmail(id: string, email: string): Promise<AdminUser | null> {
    const user = await AdminUserMongoose.findOne({
      $or: [{ id }, { email: email.toLowerCase().trim() }],
    }).lean();
    return user ? (user as unknown as AdminUser) : null;
  },

  async updatePassword(userId: string, newPasswordHash: string): Promise<boolean> {
    const result = await AdminUserMongoose.findOneAndUpdate(
      { id: userId },
      { $set: { passwordHash: newPasswordHash, updatedAt: new Date().toISOString() } },
      { new: true }
    );
    return !!result;
  },
};
