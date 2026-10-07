import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';
import { AuthenticatedRequest } from '../types';

export const MediaController = {
  /**
   * Admin-only upload endpoint for images directly to MongoDB GridFS.
   * Path: POST /api/media/upload and POST /api/admin/media
   */
  async uploadMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ error: 'No media file provided.' });
      return;
    }

    // Double check file size on backend
    if (req.file.size > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'File size must be less than 5 MB.' });
      return;
    }

    try {
      const adminEmail = req.adminUser?.email || 'admin@requingroup.com';
      const targetModule = req.body?.module || 'general';

      const newMedia = await MediaService.upload(req.file, adminEmail, targetModule);
      res.status(201).json({ success: true, data: newMedia });
    } catch (err: any) {
      console.error('Upload to GridFS failed:', err);
      res.status(500).json({ error: err.message || 'Failed to upload image to GridFS storage.' });
    }
  },

  /**
   * Public streaming endpoint to fetch image binaries directly from MongoDB GridFS.
   * Path: GET /api/media/:id
   */
  async getMediaById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id || id.trim() === '') {
      res.status(400).json({ error: 'Media ID is required.' });
      return;
    }

    try {
      const fileData = await MediaService.getFileStream(id);

      if (!fileData) {
        res.status(404).json({ error: 'Image not found in MongoDB GridFS storage.' });
        return;
      }

      const { file, stream } = fileData;
      const fileIdStr = file._id.toString();

      // Determine content type safely with fallback detection based on filename
      let contentType =
        (file as any).contentType ||
        (file.metadata as any)?.contentType ||
        '';

      if (!contentType || contentType === 'application/octet-stream') {
        const lowerName = (file.filename || '').toLowerCase();
        if (lowerName.endsWith('.avif')) contentType = 'image/avif';
        else if (lowerName.endsWith('.webp')) contentType = 'image/webp';
        else if (lowerName.endsWith('.png')) contentType = 'image/png';
        else if (lowerName.endsWith('.gif')) contentType = 'image/gif';
        else if (lowerName.endsWith('.svg')) contentType = 'image/svg+xml';
        else contentType = 'image/jpeg';
      }

      // Check client caching ETag
      const ifNoneMatch = req.headers['if-none-match'];
      const eTag = `"${fileIdStr}"`;

      if (ifNoneMatch === eTag) {
        res.status(304).end();
        return;
      }

      // Set proper headers for browser rendering and high performance caching
      res.setHeader('Content-Type', contentType);
      if (file.length) {
        res.setHeader('Content-Length', file.length.toString());
      }
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('ETag', eTag);

      stream.on('error', (streamErr) => {
        console.error('Error while streaming GridFS file:', streamErr);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to stream media file.' });
        }
      });

      stream.pipe(res);
    } catch (err: any) {
      console.error(`Error retrieving media ${id}:`, err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Server error while retrieving image.' });
      }
    }
  },

  /**
   * Admin-only delete endpoint for images in MongoDB GridFS.
   * Path: DELETE /api/media/:id and DELETE /api/admin/media/:id
   */
  async deleteMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const adminEmail = req.adminUser?.email || 'admin@requingroup.com';

    try {
      const result = await MediaService.delete(id, adminEmail);

      if ('error' in result && result.error) {
        res.status(result.status || 400).json({ error: result.error });
        return;
      }

      res.json({
        success: true,
        message: result.message || 'Media file deleted successfully from GridFS.',
      });
    } catch (err: any) {
      console.error(`Failed to delete media ${id}:`, err);
      res.status(500).json({ error: err.message || 'Failed to delete media asset.' });
    }
  },

  /**
   * Admin-only list endpoint for Media Library dashboard.
   * Path: GET /api/admin/media
   */
  async getAllMedia(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const media = await MediaService.getAll();
      res.json({ success: true, data: media });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to list media files.' });
    }
  },
};
