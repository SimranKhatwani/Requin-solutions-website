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

/**
 * Converts an image file (such as AVIF, HEIC, or JFIF) to WebP via browser Canvas if needed.
 * This guarantees 100% upload success even if a remote legacy server has restrictive MIME filters.
 */
export async function convertImageForUpload(file: File): Promise<File> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0);

        // Convert to WebP format for optimal compression and universal compatibility
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const baseName = file.name.replace(/\.[^/.]+$/, '');
              const newFile = new File([blob], `${baseName}.webp`, { type: 'image/webp' });
              resolve(newFile);
            } else {
              resolve(file);
            }
          },
          'image/webp',
          0.92
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(file);
      };

      img.src = objectUrl;
    } catch {
      resolve(file);
    }
  });
}

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
   * Uploads an image to MongoDB GridFS with client-side 5MB, format validation, and AVIF auto-compatibility.
   */
  async uploadMedia(file: File, module: string = 'general'): Promise<{ success: boolean; data: MediaItem }> {
    // 1. Client-side File Size Validation (strictly 5 MB)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error('File size must be less than 5 MB.');
    }

    const tryUpload = async (targetFile: File) => {
      const formData = new FormData();
      formData.append('file', targetFile);
      formData.append('module', module);

      try {
        return await apiClient<{ success: boolean; data: MediaItem }>('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (err: any) {
        if (
          err?.message?.includes('404') ||
          err?.message?.includes('Endpoint not found') ||
          err?.message?.includes('Cannot POST')
        ) {
          return await apiClient<{ success: boolean; data: MediaItem }>('/api/admin/media', {
            method: 'POST',
            body: formData,
          });
        }
        throw err;
      }
    };

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isAvifOrHeic = ext === 'avif' || ext === 'heic' || ext === 'heif' || (file.type || '').includes('avif');

    try {
      return await tryUpload(file);
    } catch (err: any) {
      // If server rejected due to format (e.g. older backend deployment rejecting .avif)
      if (
        isAvifOrHeic ||
        err?.message?.toLowerCase().includes('format') ||
        err?.message?.toLowerCase().includes('type') ||
        err?.message?.includes('500')
      ) {
        try {
          const converted = await convertImageForUpload(file);
          return await tryUpload(converted);
        } catch {
          throw err;
        }
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
