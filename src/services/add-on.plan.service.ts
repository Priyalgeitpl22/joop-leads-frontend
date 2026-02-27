import { api } from "./api";

export interface IAddOnPlan {
    id: number;
    addOnId: number;
    code: AddOnCode;
    name: string;
    description: string | null;
    priceMonthly: number | null;
    priceYearly: number | null;
    emailVerificationLimit: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export enum AddOnCode {
    EmailVerification = 'email-verification',
}

const BASE_URL = '/add-on';

export const addOnPlanService = {
    getAllAddOnPlans: async (): Promise<IAddOnPlan[]> => {
        const response = await api.get<{ data: IAddOnPlan[] }>(`${BASE_URL}`);
        return response.data.data;
    },
    getAddOnPlanById: async (id: number): Promise<IAddOnPlan> => {
        const response = await api.get<{ data: IAddOnPlan }>(`${BASE_URL}/${id}`);
        return response.data.data;
    },
    createAddOnPlan: async (data: IAddOnPlan): Promise<IAddOnPlan> => {
        const response = await api.post<{ data: IAddOnPlan }>(`${BASE_URL}`, data);
        return response.data.data;
    },
    updateAddOnPlan: async (id: number, data: IAddOnPlan): Promise<IAddOnPlan> => {
        const response = await api.put<{ data: IAddOnPlan }>(`${BASE_URL}/${id}`, data);
        return response.data.data;
    },
    deleteAddOnPlan: async (id: string): Promise<void> => {
        await api.delete<void>(`${BASE_URL}/${id}`);
    },
}