import { api } from './api';
import type { CampaignSender } from '../interfaces';
import type { ApiResponse } from '../types/common.types';

const BASE_URL = '/campaign-sender';

export const campaignSenderService = {

  async getAllCampaignSenders(accountId: string): Promise<ApiResponse<CampaignSender[]>> {
    const response = await api.get(`${BASE_URL}/${accountId}`);
    return response.data;
  }
}