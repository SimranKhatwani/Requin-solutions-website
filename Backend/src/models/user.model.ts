import { CMSStore } from '../config/db';
import { AdminUser } from '../types';

export const UserModel = {
  findByEmailOrUsername(identifier: string): AdminUser | undefined {
    const db = CMSStore.get();
    const idLower = identifier.toLowerCase();
    return db.adminUsers.find(
      (u) => u.email.toLowerCase() === idLower || u.username.toLowerCase() === idLower
    );
  },

  findById(id: string): AdminUser | undefined {
    const db = CMSStore.get();
    return db.adminUsers.find((u) => u.id === id);
  },

  updatePassword(userId: string, newPasswordHash: string): boolean {
    const db = CMSStore.get();
    const idx = db.adminUsers.findIndex((u) => u.id === userId);
    if (idx === -1) return false;

    db.adminUsers[idx].passwordHash = newPasswordHash;
    db.adminUsers[idx].updatedAt = new Date().toISOString();
    CMSStore.save(db);
    return true;
  },
};
