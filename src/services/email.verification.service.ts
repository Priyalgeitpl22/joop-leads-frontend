import { api } from './api';

const BASE_URL = '/email-verification';

export interface Batch {
  id: string;
  reoonTaskId: string;
  fileName: string;
  createdAt: string;
  name: string;
  orgId: string;
  status: string;
  totalEmails: number;
  updatedAt: string;
  verifiedCount: number;
  uploadedById: string;
  [key: string]: unknown;
}

export interface BatchDetails extends Batch {
  [key: string]: unknown;
}

export interface BatchStatistics {
  total?: number;
  verified?: number;
  unverified?: number;
  [key: string]: unknown;
}

export interface VerifyEmailsPayload {
  emails: string;
  mode?: 'quick' | 'power';
}

export interface VerifyEmailsResponse {
  verified?: unknown[];
  verifiedCount?: number;
  failed?: unknown[];
  failedCount?: number;
}

export interface GetEmailsStatusParams {
  batchId?: string;
  page?: number;
  limit?: number;
  status?: string;
  [key: string]: unknown;
}

export const emailVerificationService = {

  async getAllBatches(): Promise<Batch[]> {
    const response = await api.get(`${BASE_URL}/batches`);
    const data = response.data;
    if (data?.data != null) return data.data as Batch[];
    return Array.isArray(data) ? data : [];
  },

  async uploadAndCreateBatch(file: File): Promise<{ batchId?: string; data?: Batch }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`${BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const data = response.data;
    if (data?.data) return data;
    return data;
  },

  async verifyEmails(payload: VerifyEmailsPayload): Promise<VerifyEmailsResponse> {
    const response = await api.post(`${BASE_URL}/verify`, {
      emails: payload.emails,
      mode: payload.mode ?? 'power',
    });
    const data = response.data;
    if (data?.data) return data.data as VerifyEmailsResponse;
    return (data as VerifyEmailsResponse) ?? {};
  },

  async getEmails(params?: GetEmailsStatusParams): Promise<{ data?: unknown[] }> {
    const response = await api.get(`${BASE_URL}/status`, { params });
    const data = response.data;
    if (data?.data != null) return { data: Array.isArray(data.data) ? data.data : [] };
    if (Array.isArray(data)) return { data };
    return { data: [] };
  },

  async getBatchDetails(batchId: string): Promise<BatchDetails> {
    const response = await api.get(`${BASE_URL}/${batchId}`);
    const data = response.data;
    if (data?.data) return data.data as BatchDetails;
    return data as BatchDetails;
  },

  async getBatchStatistics(batchId: string): Promise<BatchStatistics> {
    const response = await api.get(`${BASE_URL}/${batchId}/statistics`);
    const data = response.data;
    if (data?.data) return data.data as BatchStatistics;
    return data as BatchStatistics;
  },

  async getVerifiedEmails(
    batchId: string,
    params?: { page?: number; limit?: number },
  ): Promise<{ data?: unknown[] }> {
    const response = await api.get(`${BASE_URL}/${batchId}/verified`, { params });
    const data = response.data;
    if (data?.data) return data;
    return data ?? { data: [] };
  },

  async getUnverifiedEmails(
    batchId: string,
    params?: { page?: number; limit?: number },
  ): Promise<{ data?: unknown[] }> {
    const response = await api.get(`${BASE_URL}/${batchId}/unverified`, { params });
    const data = response.data;
    if (data?.data) return data;
    return data ?? { data: [] };
  },

  async exportVerifiedEmails(batchId: string): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/${batchId}/export/verified`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  async exportUnverifiedEmails(batchId: string): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/${batchId}/export/unverified`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  async deleteBatch(batchId: string): Promise<void> {
    await api.delete(`${BASE_URL}/${batchId}`);
  },
};
