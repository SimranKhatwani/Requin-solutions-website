import { apiClient } from './apiClient';

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedDate: string;
  status: 'DRAFT' | 'PUBLISHED';
  isFeatured?: boolean;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export const blogService = {
  // Public
  async getPublishedBlogs(params?: { category?: string; search?: string }): Promise<{ success: boolean; data: BlogItem[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiClient<{ success: boolean; data: BlogItem[] }>(`/api/blogs${qs}`);
  },

  async getBlogBySlug(slug: string): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>(`/api/blogs/${slug}`);
  },

  // Admin
  async getAllBlogs(): Promise<{ success: boolean; data: BlogItem[] }> {
    return apiClient<{ success: boolean; data: BlogItem[] }>('/api/admin/blogs');
  },

  async createBlog(payload: Partial<BlogItem>): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>('/api/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateBlog(id: string, payload: Partial<BlogItem>): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>(`/api/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async togglePublishBlog(id: string): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>(`/api/admin/blogs/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async toggleFeaturedBlog(id: string): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>(`/api/admin/blogs/${id}/featured`, {
      method: 'PATCH',
    });
  },

  async updateBlogOrder(id: string, displayOrder: number): Promise<{ success: boolean; data: BlogItem }> {
    return apiClient<{ success: boolean; data: BlogItem }>(`/api/admin/blogs/${id}/order`, {
      method: 'PATCH',
      body: JSON.stringify({ displayOrder }),
    });
  },

  async deleteBlog(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
    });
  },
};
