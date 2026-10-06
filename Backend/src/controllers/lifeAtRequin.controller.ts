import { Request, Response } from 'express';
import { LifeAtRequinService } from '../services/lifeAtRequin.service';
import { AuthenticatedRequest } from '../types';

export const LifeAtRequinController = {
  async getPublishedGalleries(_req: Request, res: Response): Promise<void> {
    const galleries = await LifeAtRequinService.getPublished();
    res.json({ success: true, count: galleries.length, data: galleries });
  },

  async getAllAdminGalleries(_req: AuthenticatedRequest, res: Response): Promise<void> {
    const galleries = await LifeAtRequinService.getAll();
    res.json({ success: true, count: galleries.length, data: galleries });
  },

  async createGallery(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await LifeAtRequinService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  async updateGallery(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await LifeAtRequinService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async togglePublishGallery(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await LifeAtRequinService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async deleteGallery(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await LifeAtRequinService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Gallery deleted successfully.' });
  },
};
