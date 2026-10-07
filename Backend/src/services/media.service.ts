import { MediaModel } from '../models/media.model';
import { GridFSService, GridFSUploadResult } from './gridfs.service';
import { MediaDoc } from '../types';

export const MediaService = {
  async getAll(): Promise<MediaDoc[]> {
    return await MediaModel.findAll();
  },

  async upload(
    file: Express.Multer.File,
    adminEmail: string,
    module: string = 'general'
  ): Promise<GridFSUploadResult> {
    return await GridFSService.uploadImage(file, adminEmail, module);
  },

  async getFileStream(idOrName: string) {
    return await GridFSService.getFileStream(idOrName);
  },

  async delete(
    id: string,
    adminEmail: string
  ): Promise<{ success: boolean; message?: string; error?: string; status?: number }> {
    return await GridFSService.deleteImage(id, adminEmail);
  },
};
