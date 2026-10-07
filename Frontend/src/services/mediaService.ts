import { apiClient } from './apiClient';

export interface MediaItem {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt?: string;
}

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/avif-sequence',
  'image/heif',
  'image/heic',
  'application/octet-stream',
];

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'jfif', 'avif', 'heic', 'heif'];

export const mediaService = {
  /**
   * Fetches media items for Admin Media library
   */
  async getMediaList(): Promise<{ success: boolean; data: MediaItem[] }> {
    try {
      return await apiClient<{ success: boolean; data: MediaItem[] }>('/api/admin/media');
    } catch {
      return await apiClient<{ success: boolean; data: MediaItem[] }>('/api/media');
    }
  },

  /**
   * Uploads an image to MongoDB GridFS with client-side 5MB and format validation.
   */
  async uploadMedia(file: File, module: string = 'general'): Promise<{ success: boolean; data: MediaItem }> {
    // 1. Client-side File Size Validation (strictly 5 MB)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error('File size must be less than 5 MB.');
    }

    // 2. Client-side MIME Type & Extension Validation
    const fileType = (file.type || '').toLowerCase();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    const isMimeValid = fileType ? (ALLOWED_IMAGE_MIME_TYPES.includes(fileType) || fileType.startsWith('image/')) : false;
    const isExtValid = ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      throw new Error('Please upload a valid image file. Allowed formats: JPG, PNG, WEBP, GIF, SVG, AVIF.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('module', module);

    // Primary endpoint: /api/media/upload; Fallback endpoint: /api/admin/media
    try {
      return await apiClient<{ success: boolean; data: MediaItem }>('/api/media/upload', {
        method: 'POST',
        body: formData,
      });
    } catch (err: any) {
      if (err?.message?.includes('404') || err?.message?.includes('Endpoint not found') || err?.message?.includes('Cannot POST')) {
        return await apiClient<{ success: boolean; data: MediaItem }>('/api/admin/media', {
          method: 'POST',
          body: formData,
        });
      }
      throw err;
    }
  },

  /**
   * Deletes an image from MongoDB GridFS
   */
  async deleteMedia(id: string): Promise<{ success: boolean; message: string }> {
    try {
      return await apiClient<{ success: boolean; message: string }>(`/api/media/${id}`, {
        method: 'DELETE',
      });
    } catch {
      return await apiClient<{ success: boolean; message: string }>(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });
    }
  },
};
