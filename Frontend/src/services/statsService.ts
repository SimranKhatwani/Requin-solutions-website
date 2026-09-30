import { apiClient } from './apiClient';

export interface ActivityItem {
  id: string;
  action: string;
  entityType: 'blog' | 'project' | 'story' | 'media' | 'auth';
  entityTitle: string;
  adminEmail: string;
  timestamp: string;
}

export interface CMSStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalProjects: number;
  publishedProjects: number;
  totalStories: number;
  publishedStories: number;
  totalMedia: number;
  recentActivity: ActivityItem[];
}

export const statsService = {
  async getStats(): Promise<{ success: boolean; data: CMSStats }> {
    return apiClient<{ success: boolean; data: CMSStats }>('/api/admin/stats');
  },
};
