import { apiClient, setStoredToken, clearStoredToken, getStoredToken } from './apiClient';

export interface AdminProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: AdminProfile;
}

export const adminAuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiClient<LoginResponse>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  async logout(): Promise<void> {
    try {
      await apiClient('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // Continue even if network fails
    } finally {
      clearStoredToken();
    }
  },

  async getMe(): Promise<{ success: boolean; user: AdminProfile }> {
    return apiClient<{ success: boolean; user: AdminProfile }>('/api/admin/auth/me');
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>('/api/admin/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  isAuthenticated(): boolean {
    return !!getStoredToken();
  },
};
