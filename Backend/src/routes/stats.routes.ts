import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const statsRouter = Router();

statsRouter.get('/admin/stats', requireAdminAuth, StatsController.getStats);
