import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

export const mediaRouter = Router();

mediaRouter.get('/admin/media', requireAdminAuth, MediaController.getAllMedia);
mediaRouter.post('/admin/media', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.delete('/admin/media/:id', requireAdminAuth, MediaController.deleteMedia);
