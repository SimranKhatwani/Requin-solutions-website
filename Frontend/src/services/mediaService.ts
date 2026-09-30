import { apiClient } from './apiClient';

export interface MediaItem {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export const mediaService = {
  async getMediaList(): Promise<{ success: boolean; data: MediaItem[] }> {
    return apiClient<{ success: boolean; data: MediaItem[] }>('/api/admin/media');
  },

  async uploadMedia(file: File): Promise<{ success: boolean; data: MediaItem }> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient<{ success: boolean; data: MediaItem }>('/api/admin/media', {
      method: 'POST',
      body: formData,
    });
  },

  async deleteMedia(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/media/${id}`, {
      method: 'DELETE',
    });
  },
};
