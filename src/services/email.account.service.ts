import { emailApi } from './api';
import type { Account, IEmailAccountResponse, IEmailAccountFilters, WarmupStatsResponse } from '../types/emailAccount.types';
import type { ApiResponse } from '../types';

export const emailAccountService = {
  /**
   * Fetch all email accounts
   * @param orgId - Organization ID (required)
   * @param filters - Optional filters
   * @returns EmailAccount array (response.data.data from API)
   */
  async getEmailAccounts(orgId: string, filters?: IEmailAccountFilters): Promise<Account[]> {
    const response = await emailApi.get<{ data: Account[] }>('/accounts', {
      params: { orgId, ...filters },
    });
    return response.data.data;
  },

  /**
   * Get a single email account by ID
   * @param id - Email account ID
   * @returns Raw API response (response.data from API)
   */
  async getEmailAccountByEmail(email: string): Promise<Account> {
    const response = await emailApi.get(`/accounts/email?email=${email}`);
    return response.data;
  },

  /**
   * Get a single email account by ID
   * @param id - Email account ID
   * @returns Raw API response (response.data from API)
   */
  async getEmailAccountById(id: string): Promise<Account> {
    const response = await emailApi.get(`/accounts/${id}`);
    return response.data;
  },
  /**
   * Create a new email account
   */
  async createEmailAccount(data: Partial<Account>): Promise<Account> {
    const response = await emailApi.post<{ data: Account }>('/accounts', data);
    return response.data.data;
  },

  /**
   * Update an email account
   * @param id - Email account ID
   * @param data - Data to update
   * @returns Updated account data
   */
  async updateEmailAccount(id: string, data: Partial<Account> | Record<string, unknown>): Promise<{ code: number; message: string; data?: Account }> {
    const response = await emailApi.put(`/accounts/${id}`, data);
    return response.data;
  },

  /**
   * Delete an email account
   */
  async deleteEmailAccount(id: string): Promise<void> {
    await emailApi.delete(`/accounts/${id}`);
  },

  /**
   * Search email accounts
   * @param query - Search query string
   * @param orgId - Organization ID (required)
   * @returns EmailAccountResponse with data array (response.data from API)
   */
  async searchEmailAccounts(query: string, orgId: string): Promise<IEmailAccountResponse> {
    const response = await emailApi.get<IEmailAccountResponse>('/accounts/search', {
      params: { query, orgId },
      headers: { 'Cache-Control': 'no-cache' },
    });
    return response.data;
  },

  /**
   * Get Google OAuth URL
   * @param orgId - Organization ID (required)
   * @returns OAuth URL string
   */
  async getGoogleOAuthUrl(orgId: string): Promise<string> {
    const origin = encodeURIComponent(window.location.href);
    const response = await emailApi.get<{ url: string }>(
      `/oauth/auth-url?origin=${origin}&orgId=${encodeURIComponent(orgId)}`
    );
    return response.data.url;
  },

  /**
   * Get Outlook OAuth URL
   * @param orgId - Organization ID (required)
   * @returns OAuth URL string
   */
  async getOutlookOAuthUrl(orgId: string): Promise<string> {
    const origin = encodeURIComponent(window.location.href);
    const response = await emailApi.get<{ url: string }>(
      `/outlook/auth-url?origin=${origin}&orgId=${encodeURIComponent(orgId)}`
    );
    return response.data.url;
  },

  /**
   * Verify SMTP/IMAP account credentials
   * @param payload - Verification payload with SMTP and IMAP settings
   * @returns Verification result
   */
  async verifySmtpAccount(payload: {
    type: string;
    imap: {
      host: string;
      port: string;
      secure: boolean;
      auth: { user: string; pass: string };
    };
    smtp: {
      host: string;
      port: string;
      secure: boolean;
      auth: { user: string; pass: string };
    };
    proxy: null;
    smtpEhloName: string;
  }): Promise<Account> {
    const response = await emailApi.post('/accounts/verify', payload);
    return response.data;
  },

  /**
   * Create SMTP email account
   * @param payload - Account creation payload
   * @returns Created account data
   */
  async createSmtpAccount(payload: {
    account: string;
    name: string;
    state: string;
    type: string;
    orgId: string;
    email: string;
    limit: number;
    time_gap: number;
    imap: {
      host: string;
      port: string;
      secure: boolean;
      auth: { user: string; pass: string };
    };
    smtp: {
      host: string;
      port: string;
      secure: boolean;
      auth: { user: string; pass: string };
    };
    proxy: null;
    smtpEhloName: string;
    signature?: string;
  }): Promise<ApiResponse<Account>> {
    const response = await emailApi.post('/accounts', payload);
    return response.data;
  },

  /**
   * Get warmup stats for an email account
   * @param id - Email account ID
   * @param startDate - Start date for stats
   * @param endDate - End date for stats
   * @returns Warmup statistics
   */
  async getWarmupStats(
    id: string,
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<WarmupStatsResponse>> {
    const response = await emailApi.get<ApiResponse<WarmupStatsResponse>>(`/accounts/${id}/warmup/stats`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data;
  },

  /**
   * Get warmup emails for an email account
   * @param id - Email account ID
   * @returns Warmup emails data
   */
  async getWarmupEmails(id: string): Promise<Account> {
    const response = await emailApi.get(`/accounts/${id}/warmup/emails`);
    return response.data;
  },

  /**
   * Refresh an email account
   * @param id - Email account ID
   * @returns Refresh result
   */
  async refreshEmailAccount(id: string): Promise<{ code: number; message: string; data?: Account }> {
    const response = await emailApi.post(`/accounts/${id}/load-inbox-messages`);
    return response.data;
  },
};

