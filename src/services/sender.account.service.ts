import { api } from './api';
import type { Account } from '../types/emailAccount.types';
import type { ApiResponse } from '../types';
import type { SenderAccount } from '../interfaces';

const BASE_URL = '/sender-account';

export const campaignService = {
    async getSenderAccounts(): Promise<Account[]> {
        const response = await api.get(`${BASE_URL}`);
        return response.data;
    },

    async getSenderAccountById(id: string): Promise<Account> {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    async createSenderAccount(data: Account): Promise<ApiResponse<SenderAccount>> {
        const response = await api.post(`${BASE_URL}`, data);
        return response.data;
    },

    async updateSenderAccount(id: string, data: Account): Promise<ApiResponse<SenderAccount>> {
        const response = await api.put(`${BASE_URL}/${id}`, data);
        return response.data;
    },

    async deleteSenderAccount(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`);
    }
}
export default campaignService;

