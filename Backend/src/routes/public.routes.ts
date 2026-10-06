import { Router } from 'express';
import { PublicController } from '../controllers/public.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const publicRouter = Router();

publicRouter.post('/support', PublicController.submitSupport);
publicRouter.post('/newsletter/subscribe', PublicController.subscribeNewsletter);
publicRouter.get('/admin/subscribers', requireAdminAuth, PublicController.getAllSubscribers);
publicRouter.post('/chat', PublicController.handleChat);
