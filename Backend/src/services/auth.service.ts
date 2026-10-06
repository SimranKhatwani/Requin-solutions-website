import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { ActivityModel } from '../models/activity.model';
import { generateToken } from '../middleware/auth.middleware';
import { AdminUser } from '../types';

export const AuthService = {
  async login(identifier: string, passwordPlain: string): Promise<{ token: string; user: Partial<AdminUser> } | { error: string; status: number }> {
    if (!identifier || !passwordPlain) {
      return { error: 'Please provide both email and password.', status: 400 };
    }

    const user = await UserModel.findByEmailOrUsername(identifier);
    if (!user) {
      return { error: 'Invalid credentials. User does not exist.', status: 401 };
    }

    const isValid = bcrypt.compareSync(passwordPlain, user.passwordHash);
    if (!isValid) {
      return { error: 'Invalid credentials. Password incorrect.', status: 401 };
    }

    const token = generateToken(user);
    ActivityModel.add('Admin logged in', 'auth', 'Successful authentication', user.email);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  },

  logout(adminUser?: AdminUser): void {
    if (adminUser) {
      ActivityModel.add('Admin logged out', 'auth', 'Session closed', adminUser.email);
    }
  },

  async changePassword(
    adminUser: AdminUser,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: true; message: string } | { success: false; error: string; status: number }> {
    if (!currentPassword || !newPassword) {
      return { success: false, error: 'Please provide both current and new password.', status: 400 };
    }

    if (newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.', status: 400 };
    }

    const user = await UserModel.findById(adminUser.id);
    if (!user) {
      return { success: false, error: 'Admin user not found.', status: 404 };
    }

    const isValid = bcrypt.compareSync(currentPassword, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Current password incorrect.', status: 401 };
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);
    await UserModel.updatePassword(user.id, newHash);

    ActivityModel.add('Admin password changed', 'auth', 'Security credential update', user.email);
    return { success: true, message: 'Password updated successfully.' };
  },
};
