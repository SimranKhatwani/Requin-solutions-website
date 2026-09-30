import { apiClient } from './apiClient';

export interface StoryItem {
  id: string;
  title: string;
  description: string;
  year: string;
  image: string;
  galleryImages: string[];
  storyContent: string;
  displayOrder: number;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export const storyService = {
  // Public
  async getPublishedStories(): Promise<{ success: boolean; data: StoryItem[] }> {
    return apiClient<{ success: boolean; data: StoryItem[] }>('/api/stories');
  },

  // Admin
  async getAllStories(): Promise<{ success: boolean; data: StoryItem[] }> {
    return apiClient<{ success: boolean; data: StoryItem[] }>('/api/admin/stories');
  },

  async createStory(payload: Partial<StoryItem>): Promise<{ success: boolean; data: StoryItem }> {
    return apiClient<{ success: boolean; data: StoryItem }>('/api/admin/stories', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateStory(id: string, payload: Partial<StoryItem>): Promise<{ success: boolean; data: StoryItem }> {
    return apiClient<{ success: boolean; data: StoryItem }>(`/api/admin/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async togglePublishStory(id: string): Promise<{ success: boolean; data: StoryItem }> {
    return apiClient<{ success: boolean; data: StoryItem }>(`/api/admin/stories/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async deleteStory(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/stories/${id}`, {
      method: 'DELETE',
    });
  },
};
