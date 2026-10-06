import { Response } from 'express';
import { MediaService } from '../services/media.service';
import { AuthenticatedRequest } from '../types';

export const MediaController = {
  async getAllMedia(_req: AuthenticatedRequest, res: Response): Promise<void> {
    const media = await MediaService.getAll();
    res.json({ success: true, data: media });
  },

  async uploadMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ error: 'No media file provided.' });
      return;
    }

    const newMedia = await MediaService.upload(req.file, req.adminUser!.email);
    res.status(201).json({ success: true, data: newMedia });
  },

  async deleteMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await MediaService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Media file deleted successfully.' });
  },
};
