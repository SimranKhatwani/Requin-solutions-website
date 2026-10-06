import { Response } from 'express';
import { MediaService } from '../services/media.service';
import { AuthenticatedRequest } from '../types';

export const MediaController = {
  getAllMedia(_req: AuthenticatedRequest, res: Response): void {
    const media = MediaService.getAll();
    res.json({ success: true, data: media });
  },

  uploadMedia(req: AuthenticatedRequest, res: Response): void {
    if (!req.file) {
      res.status(400).json({ error: 'No media file provided.' });
      return;
    }

    const newMedia = MediaService.upload(req.file, req.adminUser!.email);
    res.status(201).json({ success: true, data: newMedia });
  },

  deleteMedia(req: AuthenticatedRequest, res: Response): void {
    const result = MediaService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Media file deleted successfully.' });
  },
};
