import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

export const mediaRouter = Router();

// Public image streaming endpoint from MongoDB GridFS
mediaRouter.get('/media/:id', MediaController.getMediaById);
mediaRouter.get('/api/media/:id', MediaController.getMediaById);

// Admin image upload endpoints (all aliases supported)
mediaRouter.post('/media/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/api/media/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/api/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/admin/media', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/api/admin/media', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/admin/media/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);
mediaRouter.post('/api/admin/media/upload', requireAdminAuth, upload.single('file'), MediaController.uploadMedia);

// Admin image delete endpoints
mediaRouter.delete('/media/:id', requireAdminAuth, MediaController.deleteMedia);
mediaRouter.delete('/api/media/:id', requireAdminAuth, MediaController.deleteMedia);
mediaRouter.delete('/admin/media/:id', requireAdminAuth, MediaController.deleteMedia);
mediaRouter.delete('/api/admin/media/:id', requireAdminAuth, MediaController.deleteMedia);

// Admin Media Library list endpoints
mediaRouter.get('/admin/media', requireAdminAuth, MediaController.getAllMedia);
mediaRouter.get('/api/admin/media', requireAdminAuth, MediaController.getAllMedia);
