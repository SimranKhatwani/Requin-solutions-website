import fs from 'fs';
import path from 'path';
import { MediaModel } from '../models/media.model';
import { ActivityModel } from '../models/activity.model';
import { MediaDoc } from '../types';
import { ENV } from '../config/env';

export const MediaService = {
  async getAll(): Promise<MediaDoc[]> {
    return await MediaModel.findAll();
  },

  async upload(file: Express.Multer.File, adminEmail: string): Promise<MediaDoc> {
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

    const created = await MediaModel.create(newMedia);
    ActivityModel.add(`Uploaded media file ${file.originalname}`, 'media', file.originalname, adminEmail);
    return created;
  },

  async delete(id: string, adminEmail: string): Promise<MediaDoc | { error: string; status: number }> {
    const target = await MediaModel.findById(id);
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

    const deleted = await MediaModel.delete(id);
    if (deleted) {
      ActivityModel.add(`Deleted media file ${deleted.originalName}`, 'media', deleted.originalName, adminEmail);
      return deleted;
    }

    return { error: 'Failed to delete media record.', status: 500 };
  },
};
