import { api } from "./api";
import type { IPlan } from "../types/plan.types";

export const planService = {
    getAllPlans: async (): Promise<IPlan[]> => {
        const response = await api.get<{ data: IPlan[] }>(`/plan`);
        return response.data.data;
    },
    getPlanById: async (id: number): Promise<IPlan> => {
        const response = await api.get<{ data: IPlan }>(`/plan/${id}`);
        return response.data.data;
    },
    createPlan: async (data: IPlan): Promise<IPlan> => {
        const response = await api.post<{ data: IPlan }>(`/plan`, data);
        return response.data.data;
    },
    updatePlan: async (id: number, data: IPlan): Promise<IPlan> => {
        const response = await api.put<{ data: IPlan }>(`/plan/${id}`, data);
        return response.data.data;
    },
    deletePlan: async (id: number): Promise<void> => {
        await api.delete<void>(`/plan/${id}`);
    }
}