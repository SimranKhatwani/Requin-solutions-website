import { apiClient } from './apiClient';

export interface ProjectItem {
  id: string;
  projectName: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  galleryImages: string[];
  category: string;
  technologies: string[];
  projectUrl?: string;
  clientName?: string;
  status: 'DRAFT' | 'PUBLISHED';
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  // Public
  async getPublishedProjects(category?: string): Promise<{ success: boolean; data: ProjectItem[] }> {
    const qs = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return apiClient<{ success: boolean; data: ProjectItem[] }>(`/api/projects${qs}`);
  },

  async getProjectBySlug(slug: string): Promise<{ success: boolean; data: ProjectItem }> {
    return apiClient<{ success: boolean; data: ProjectItem }>(`/api/projects/${slug}`);
  },

  // Admin
  async getAllProjects(): Promise<{ success: boolean; data: ProjectItem[] }> {
    return apiClient<{ success: boolean; data: ProjectItem[] }>('/api/admin/projects');
  },

  async createProject(payload: Partial<ProjectItem>): Promise<{ success: boolean; data: ProjectItem }> {
    return apiClient<{ success: boolean; data: ProjectItem }>('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateProject(id: string, payload: Partial<ProjectItem>): Promise<{ success: boolean; data: ProjectItem }> {
    return apiClient<{ success: boolean; data: ProjectItem }>(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async togglePublishProject(id: string): Promise<{ success: boolean; data: ProjectItem }> {
    return apiClient<{ success: boolean; data: ProjectItem }>(`/api/admin/projects/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },
};
