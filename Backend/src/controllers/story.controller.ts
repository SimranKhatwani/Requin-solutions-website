import { Request, Response } from 'express';
import { StoryService } from '../services/story.service';
import { AuthenticatedRequest } from '../types';

export const StoryController = {
  async getPublishedStories(_req: Request, res: Response): Promise<void> {
    const stories = await StoryService.getPublished();
    res.json({ success: true, count: stories.length, data: stories });
  },

  async getAllAdminStories(_req: AuthenticatedRequest, res: Response): Promise<void> {
    const stories = await StoryService.getAll();
    res.json({ success: true, count: stories.length, data: stories });
  },

  async createStory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await StoryService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  async updateStory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await StoryService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async togglePublishStory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await StoryService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async deleteStory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await StoryService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Story deleted successfully.' });
  },
};
