import { apiClient } from './apiClient';

export interface CareerItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  salary?: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  displayOrder: number;
  applyEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationItem {
  id: string;
  careerId?: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  message?: string;
  status?: 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED';
  createdAt: string;
}

export const careerService = {
  // Public
  async getPublishedCareers(params?: { department?: string; employmentType?: string; search?: string }): Promise<{ success: boolean; count: number; data: CareerItem[] }> {
    const query = new URLSearchParams();
    if (params?.department && params.department !== 'All') query.append('department', params.department);
    if (params?.employmentType && params.employmentType !== 'All') query.append('employmentType', params.employmentType);
    if (params?.search) query.append('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiClient<{ success: boolean; count: number; data: CareerItem[] }>(`/api/careers${qs}`);
  },

  async getCareerBySlug(slug: string): Promise<{ success: boolean; data: CareerItem }> {
    return apiClient<{ success: boolean; data: CareerItem }>(`/api/careers/${slug}`);
  },

  async applyForJob(payload: {
    careerId?: string;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    experienceLevel: string;
    portfolioUrl?: string;
    resumeUrl?: string;
    message?: string;
  }): Promise<{ success: boolean; message: string; data: JobApplicationItem }> {
    return apiClient<{ success: boolean; message: string; data: JobApplicationItem }>('/api/careers/apply', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Admin
  async getAllCareers(): Promise<{ success: boolean; data: CareerItem[] }> {
    return apiClient<{ success: boolean; data: CareerItem[] }>('/api/admin/careers');
  },

  async createCareer(payload: Partial<CareerItem>): Promise<{ success: boolean; data: CareerItem }> {
    return apiClient<{ success: boolean; data: CareerItem }>('/api/admin/careers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateCareer(id: string, payload: Partial<CareerItem>): Promise<{ success: boolean; data: CareerItem }> {
    return apiClient<{ success: boolean; data: CareerItem }>(`/api/admin/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async togglePublishCareer(id: string): Promise<{ success: boolean; data: CareerItem }> {
    return apiClient<{ success: boolean; data: CareerItem }>(`/api/admin/careers/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async deleteCareer(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(`/api/admin/careers/${id}`, {
      method: 'DELETE',
    });
  },

  async getJobApplications(): Promise<{ success: boolean; count: number; data: JobApplicationItem[] }> {
    return apiClient<{ success: boolean; count: number; data: JobApplicationItem[] }>('/api/admin/careers/applications');
  },

  async updateApplicationStatus(id: string, status: string): Promise<{ success: boolean; data: JobApplicationItem }> {
    return apiClient<{ success: boolean; data: JobApplicationItem }>(`/api/admin/careers/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
