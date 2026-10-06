import { Request, Response } from 'express';
import { LifeAtRequinService } from '../services/lifeAtRequin.service';
import { AuthenticatedRequest } from '../types';

export const LifeAtRequinController = {
  getPublishedGalleries(_req: Request, res: Response): void {
    const galleries = LifeAtRequinService.getPublished();
    res.json({ success: true, count: galleries.length, data: galleries });
  },

  getAllAdminGalleries(_req: AuthenticatedRequest, res: Response): void {
    const galleries = LifeAtRequinService.getAll();
    res.json({ success: true, count: galleries.length, data: galleries });
  },

  createGallery(req: AuthenticatedRequest, res: Response): void {
    const result = LifeAtRequinService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateGallery(req: AuthenticatedRequest, res: Response): void {
    const result = LifeAtRequinService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  togglePublishGallery(req: AuthenticatedRequest, res: Response): void {
    const result = LifeAtRequinService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteGallery(req: AuthenticatedRequest, res: Response): void {
    const result = LifeAtRequinService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Gallery deleted successfully.' });
  },
};
