import { api } from './api';
import type { Account } from '../types/emailAccount.types';

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

    async createSenderAccount(data: Partial<Account>): Promise<Account> {
        const response = await api.post(`${BASE_URL}`, data);
        return response.data;
    },

    async updateSenderAccount(id: string, data: Partial<Account>): Promise<Account> {
        const response = await api.put(`${BASE_URL}/${id}`, data);
        return response.data;
    },

    async deleteSenderAccount(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`);
    }
}
export default campaignService;

