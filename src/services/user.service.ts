import { api } from './api';
import type { UpdateUserData, CreateUserData } from '../types/user.types';
import type { IUser } from '../types/user.types';

export const userService = {
  /**
   * Get current user details
   */
  async getCurrentUser(): Promise<IUser> {
    const response = await api.get('/user');
    // Handle different API response structures
    const data = response.data;
    if (data?.user) {
      return data.user as IUser;
    }
    if (data?.data?.user) {
      return data.data.user as IUser;
    }
    if (data?.data) {
      return data.data as IUser;
    }
    return data as IUser;
  },

  /**
   * Update current user details
   */
  async updateUser(data: UpdateUserData): Promise<IUser> {
    const formData = new FormData();
    formData.append("id", data.id);
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.phone) formData.append("phone", data.phone);
    if (data.removeProfilePicture) {
      formData.append("removeProfilePicture", "true");
    }
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    const response = await api.put(`/user/${data.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Handle different API response structures
    const resData = response.data;
    if (resData?.user) {
      return resData.user as IUser;
    }
    if (resData?.data?.user) {
      return resData.data.user as IUser;
    }
    if (resData?.data) {
      return resData.data as IUser;
    }
    return resData as IUser;
  },

  /**
   * Get all users in organization
   */
  async getAllUsers(): Promise<IUser[]> {
    const response = await api.get<{ data: IUser[] }>('/user/all');
    return response.data.data;
  },

  /**
   * Create new user
   */
  async createUser(data: CreateUserData): Promise<{ code: number; message: string; data?: IUser }> {
    const response = await api.post<{ code: number; message: string; data?: IUser }>('/user', data);
    return response.data;
  },

  /**
   * Delete user by ID
   */
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/user/${id}`);
  },

  /**
   * Search users
   */
  async searchUsers(query: string, orgId: string): Promise<IUser[]> {
    const response = await api.get<{ data: IUser[] }>('/user/search-user', {
      params: { query, orgId },
    });
    return response.data.data;
  },
};

export default userService;
