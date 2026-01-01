import { api } from './api';
import type { ICreateSequence, ISequence } from '../types/sequence.types';
import type { CampaignInbox, CampaignStatus, Lead } from '../interfaces';
import type { Campaign, CampaignLead, CampaignSenderWithStats, SequenceAnalytics } from '../interfaces';
import type { ApiResponse } from '../types/common.types';

const BASE_URL = '/campaign';

export const campaignService = {
  /**
   * Fetch all campaigns
   */
  async getAllCampaigns(): Promise<Campaign[]> {
    const response = await api.get(BASE_URL);
    // Handle different response structures from API
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    if (data?.campaigns && Array.isArray(data.campaigns)) {
      return data.campaigns;
    }
    return [];
  },

  /**
   * Get campaign by ID
   */
  async getCampaignById(id: string): Promise<Campaign> {
    const response = await api.get(`${BASE_URL}/${id}`);
    const data = response.data;
    if (data?.data?.campaign) {
      return data.data.campaign;
    }
    if (data?.campaign) {
      return data.campaign;
    }
    if (data?.data) {
      return data.data;
    }
    return data as Campaign;
  },

  /**
   * Add leads to campaign via CSV upload
   */
  async addLeadsToCampaign(data: FormData): Promise<{
    code: number;
    data: {
      campaign: Campaign;
      counts: {
        uploaded: number;
        uploadedCount: number;
        duplicates: number;
        duplicateCount: number;
        errors: number;
        errorCount: number;
      };
    };
    message?: string;
  }> {
    const response = await api.post(`${BASE_URL}/leads`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Add campaign settings
   */
  async addCampaignSettings(data: Record<string, unknown>): Promise<{ code: number; message: string }> {
    const response = await api.post(`${BASE_URL}/settings`, data);
    return response.data;
  },

  /**
   * Add sequences to campaign
   */
  async addSequencesToCampaign(data: ICreateSequence): Promise<{
    code: number;
    data: { campaign_id: string };
  }> {
    const response = await api.post(`${BASE_URL}/sequences`, data);
    return response.data;
  },

  /**
   * Update campaign status
   */
  async updateCampaignStatus(campaignId: string, status: string): Promise<{ code: number; message: string }> {
    const response = await api.put(`${BASE_URL}/status`, {
      campaignId,
      status,
    });
    return response.data;
  },

  /**
   * Rename campaign
   */
  async renameCampaign(campaignId: string, newName: string): Promise<{ code: number; message: string }> {
    const response = await api.patch(`${BASE_URL}/${campaignId}/rename`, { newName });
    return response.data;
  },

  /**
   * Delete campaign
   */
  async deleteCampaign(campaignId: string): Promise<{ code: number; message: string }> {
    const response = await api.delete(`${BASE_URL}/${campaignId}`);
    return response.data;
  },

  /**
   * Search campaigns
   */
  async searchCampaigns(query: string): Promise<Campaign[]> {
    const response = await api.get<{ data: Campaign[] }>(`${BASE_URL}/search/campaign?query=${query}`);
    return response.data.data || [];
  },

  /**
   * Filter campaigns
   */
  async filterCampaigns(status: string, startDate: string, endDate: string): Promise<Campaign[]> {
    const response = await api.get<{ data: Campaign[] }>(`${BASE_URL}/filter`, {
      params: { status, startDate, endDate },
    });
    return response.data.data || [];
  },

  /**
   * Get campaign contacts
   */
  async getCampaignContacts(campaignId: string): Promise<Lead[]> {
    const response = await api.get(`${BASE_URL}/contacts/${campaignId}`);
    return response.data || [];
  },

  /**
   * Get campaign sequences
   */
  async getCampaignSequences(campaignId: string): Promise<ISequence[]> {
    const response = await api.get(`${BASE_URL}/sequences/${campaignId}`);
    return response.data.data || [];
  },

  /**
   * Get trigger logs for a campaign
   */
  async getTriggerLogs(campaignId: string): Promise<{
    upcomingTriggers?: Array<{
      id: string;
      dateTime: string;
      status: string;
      timezone: string;
    }>;
    logs?: Array<{
      id: string;
      dateTime: string;
      status: string;
      newLeadsCount?: number;
      emailsSent?: number;
      eligibleEmailAccounts?: number;
      timezone: string;
    }>;
  }> {
    const response = await api.get(`/trigger-log/campaign/${campaignId}`);
    return response.data.data || response.data || { upcomingTriggers: [], logs: [] };
  },

  /**
   * Get upcoming triggers for a campaign
   */
  async getUpcomingTriggers(campaignId: string): Promise<{
    upcomingTriggers: Array<{
      id: string;
      dateTime: string;
      status: string;
      timezone: string;
    }>;
  }> {
    const response = await api.get(`/trigger-log/campaign/${campaignId}/upcoming`);
    return response.data.data || response.data || { upcomingTriggers: [] };
  },
  /**
   * Get campaigns by sender (email account)
   * @param senderId - Email account ID
   * @returns Campaigns associated with the sender
   */
  async getCampaignsBySender(senderId: string): Promise<{ campaigns: Campaign[] }> {
    const response = await api.get(`${BASE_URL}/sender/${senderId}`);
    return response.data.data || response.data || { campaigns: [] };
  },

  /**
   * Search contacts by campaign
   */
  async searchContactsByCampaign(campaignId: string, email?: string): Promise<{ data: Lead[] }> {
    const url = email
      ? `${BASE_URL}/search-lead?campaign_id=${campaignId}&email=${email}`
      : `${BASE_URL}/search-lead?campaign_id=${campaignId}`;
    const response = await api.get(url);
    return response.data;
  },

  /**
   * Get sequence analytics for a campaign
   */
  async getSequenceAnalytics(campaignId: string): Promise<{ data: SequenceAnalytics[] }> {
    const response = await api.get(`${BASE_URL}/${campaignId}/sequences/analytics`);
    return response.data;
  },

  async getCampaignSenders(campaignId: string): Promise<CampaignSenderWithStats[]> {
    const response = await api.get(`${BASE_URL}/${campaignId}/senders`);
    return response.data;
  },

  async getOverallAnalytics(orgId: string, from: string, to: string): Promise<ApiResponse> {
    const response = await api.get(`campaign-analytics/org/${orgId}`, {
      params: { from, to },
    });
    return response.data;
  },

  async getLeadsGroupedBySender(campaignId: string): Promise<ApiResponse<{ groupedLeads: CampaignLead[] }>> {
    const response = await api.get(`${BASE_URL}/${campaignId}/leads/grouped-by-sender`);
    return response.data;
  },

  async getCampaignsByLead(leadId: string): Promise<ApiResponse<[]>> {
    const response = await api.get(`${BASE_URL}/lead/${leadId}/campaigns-by-lead`);
    return response.data;
  },

  async getCampaignInbox(campaignId: string): Promise<ApiResponse<CampaignInbox[]>> {
    const response = await api.get(`${BASE_URL}/campaign-inbox/${campaignId}`);
    return response.data;
  },

  async changeCampaignStatus(campaignId: string, status: CampaignStatus): Promise<ApiResponse<{ message: string }>> {
    const response = await api.patch(`${BASE_URL}/${campaignId}/change-status`, { status: status.toString() });
    return response.data;
  },
};

export default campaignService;

