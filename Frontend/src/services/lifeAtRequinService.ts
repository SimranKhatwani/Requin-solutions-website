import { apiClient } from './apiClient';
import { GalleryImage, GalleryPhotoItem } from '../data/requinData';

export interface LifeAtRequinItem extends GalleryImage {
  displayOrder?: number;
  status?: 'DRAFT' | 'PUBLISHED';
  createdAt?: string;
  updatedAt?: string;
}

export const lifeAtRequinService = {
  // Public
  async getPublishedGalleries(): Promise<{ success: boolean; data: LifeAtRequinItem[] }> {
    return apiClient<{ success: boolean; data: LifeAtRequinItem[] }>('/api/life-at-requin');
  },

  // Admin
  async getAllGalleries(): Promise<{ success: boolean; data: LifeAtRequinItem[] }> {
    return apiClient<{ success: boolean; data: LifeAtRequinItem[] }>('/api/admin/life-at-requin');
  },

  async createGallery(payload: Partial<LifeAtRequinItem>): Promise<{ success: boolean; data: LifeAtRequinItem }> {
    return apiClient<{ success: boolean; data: LifeAtRequinItem }>('/api/admin/life-at-requin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateGallery(id: string, payload: Partial<LifeAtRequinItem>): Promise<{ success: boolean; data: LifeAtRequinItem }> {
    return apiClient<{ success: boolean; data: LifeAtRequinItem }>(`/api/admin/life-at-requin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async togglePublishGallery(id: string): Promise<{ success: boolean; data: LifeAtRequinItem }> {
    return apiClient<{ success: boolean; data: LifeAtRequinItem }>(`/api/admin/life-at-requin/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async deleteGallery(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/life-at-requin/${id}`, {
      method: 'DELETE',
    });
  },
};
