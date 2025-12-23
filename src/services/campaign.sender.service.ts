import { api } from './api';
import type { CampaignSender } from '../interfaces';

const BASE_URL = '/campaign-sender';

export const campaignSenderService = {

  async getAllCampaignSenders(accountId: string): Promise<CampaignSender[]> {
    const response = await api.get(`${BASE_URL}/${accountId}`);
    return response.data;
  }
}