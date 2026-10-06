import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../types';

export const AuthController = {
  login(req: Request, res: Response): void {
    const { email, password } = req.body;
    const result = AuthService.login(email, password);

    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.json({
      success: true,
      token: result.token,
      user: result.user,
    });
  },

  logout(req: AuthenticatedRequest, res: Response): void {
    AuthService.logout(req.adminUser);
    res.json({ success: true, message: 'Logged out successfully.' });
  },

  getMe(req: AuthenticatedRequest, res: Response): void {
    const user = req.adminUser!;
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  },

  changePassword(req: AuthenticatedRequest, res: Response): void {
    const { currentPassword, newPassword } = req.body;
    const result = AuthService.changePassword(req.adminUser!, currentPassword, newPassword);

    if ('error' in result) {
      res.status(result.status || 400).json({ error: result.error });
      return;
    }

    res.json({ success: true, message: result.message });
  },
};
