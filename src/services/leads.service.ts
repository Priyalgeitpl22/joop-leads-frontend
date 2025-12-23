import type { ILead } from "../types/lead.types";
import { api } from "./api";

const BASE_URL = '/lead';

export const leadsService = {
    
    getAllLeads: async () => {
        const response = await api.get(`${BASE_URL}`);
        return response.data;
    },
    getLeadById: async (id: string) => {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },
    createLead: async (lead: ILead) => {
        const response = await api.post(`${BASE_URL}`, lead);
        return response.data;
    },
    updateLead: async (id: string, lead: ILead) => {
        const response = await api.put(`${BASE_URL}/${id}`, lead);
        return response.data;
    },
    deleteLead: async (id: string) => {
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    },
    deleteLeads: async (leadIds: string[]) => {
        const response = await api.delete(`${BASE_URL}`, { data: { leadIds } });
        return response.data;
    },
    searchLeads: async (query: string) => {
        const response = await api.get(`${BASE_URL}/search`, { params: { query } });
        return response.data;
    },
    filterLeads: async (params: { status?: string; startDate?: string; endDate?: string }) => {
        const response = await api.get(`${BASE_URL}/filter`, { params });
        return response.data;
    },
    unsubscribeLead: async (email: string) => {
        const response = await api.post(`${BASE_URL}/unsubscribe`, { email });
        return response.data;
    }
};