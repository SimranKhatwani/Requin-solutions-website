import fs from 'fs';
import path from 'path';
import { MediaModel } from '../models/media.model';
import { ActivityModel } from '../models/activity.model';
import { MediaDoc } from '../types';
import { ENV } from '../config/env';

export const MediaService = {
  getAll(): MediaDoc[] {
    return MediaModel.findAll();
  },

  upload(file: Express.Multer.File, adminEmail: string): MediaDoc {
    const mediaUrl = `/uploads/${file.filename}`;

    const newMedia: MediaDoc = {
      id: `med-${Date.now()}`,
      fileName: file.filename,
      originalName: file.originalname,
      url: mediaUrl,
      mimeType: file.mimetype,
      size: file.size,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MediaModel.create(newMedia);
    ActivityModel.add(`Uploaded media file ${file.originalname}`, 'media', file.originalname, adminEmail);
    return newMedia;
  },

  delete(id: string, adminEmail: string): MediaDoc | { error: string; status: number } {
    const target = MediaModel.findById(id);
    if (!target) {
      return { error: 'Media file not found.', status: 404 };
    }

    // Attempt to remove physical file from disk
    if (target.fileName) {
      const diskPath = path.join(ENV.UPLOADS_DIR, target.fileName);
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch (err) {
          console.warn('Could not delete physical upload file:', diskPath);
        }
      }
    }

    const deleted = MediaModel.delete(id);
    if (deleted) {
      ActivityModel.add(`Deleted media file ${deleted.originalName}`, 'media', deleted.originalName, adminEmail);
      return deleted;
    }

    return { error: 'Failed to delete media record.', status: 500 };
  },
};
