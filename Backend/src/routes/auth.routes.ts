import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const authRouter = Router();

authRouter.post('/admin/auth/login', AuthController.login);
authRouter.post('/admin/auth/logout', requireAdminAuth, AuthController.logout);
authRouter.get('/admin/auth/me', requireAdminAuth, AuthController.getMe);
authRouter.put('/admin/auth/password', requireAdminAuth, AuthController.changePassword);
