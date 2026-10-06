import { Router } from 'express';
import { LifeAtRequinController } from '../controllers/lifeAtRequin.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const lifeAtRequinRouter = Router();

// Public
lifeAtRequinRouter.get('/life-at-requin', LifeAtRequinController.getPublishedGalleries);

// Admin
lifeAtRequinRouter.get('/admin/life-at-requin', requireAdminAuth, LifeAtRequinController.getAllAdminGalleries);
lifeAtRequinRouter.post('/admin/life-at-requin', requireAdminAuth, LifeAtRequinController.createGallery);
lifeAtRequinRouter.put('/admin/life-at-requin/:id', requireAdminAuth, LifeAtRequinController.updateGallery);
lifeAtRequinRouter.patch('/admin/life-at-requin/:id/publish', requireAdminAuth, LifeAtRequinController.togglePublishGallery);
lifeAtRequinRouter.delete('/admin/life-at-requin/:id', requireAdminAuth, LifeAtRequinController.deleteGallery);
