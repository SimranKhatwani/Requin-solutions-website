import { apiClient } from './apiClient';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location?: string;
  quote: string;
  image: string;
  isHighlighted?: boolean;
  status?: 'DRAFT' | 'PUBLISHED';
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const testimonialService = {
  // Public
  async getPublishedTestimonials(): Promise<{ success: boolean; data: TestimonialItem[] }> {
    try {
      return await apiClient<{ success: boolean; data: TestimonialItem[] }>('/api/testimonials');
    } catch (err) {
      console.warn('Backend API unavailable, using local default testimonials:', err);
      return { success: false, data: [] };
    }
  },

  // Admin
  async getAllTestimonials(): Promise<{ success: boolean; data: TestimonialItem[] }> {
    return apiClient<{ success: boolean; data: TestimonialItem[] }>('/api/admin/testimonials');
  },

  async createTestimonial(payload: Partial<TestimonialItem>): Promise<{ success: boolean; data: TestimonialItem }> {
    return apiClient<{ success: boolean; data: TestimonialItem }>('/api/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTestimonial(id: string, payload: Partial<TestimonialItem>): Promise<{ success: boolean; data: TestimonialItem }> {
    return apiClient<{ success: boolean; data: TestimonialItem }>(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTestimonial(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
    });
  },
};
