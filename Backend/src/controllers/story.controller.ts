import { Request, Response } from 'express';
import { StoryService } from '../services/story.service';
import { AuthenticatedRequest } from '../types';

export const StoryController = {
  getPublishedStories(_req: Request, res: Response): void {
    const stories = StoryService.getPublished();
    res.json({ success: true, count: stories.length, data: stories });
  },

  getAllAdminStories(_req: AuthenticatedRequest, res: Response): void {
    const stories = StoryService.getAll();
    res.json({ success: true, count: stories.length, data: stories });
  },

  createStory(req: AuthenticatedRequest, res: Response): void {
    const result = StoryService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateStory(req: AuthenticatedRequest, res: Response): void {
    const result = StoryService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  togglePublishStory(req: AuthenticatedRequest, res: Response): void {
    const result = StoryService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteStory(req: AuthenticatedRequest, res: Response): void {
    const result = StoryService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Story deleted successfully.' });
  },
};
