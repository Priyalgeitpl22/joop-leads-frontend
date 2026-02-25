import { api } from './api';
import type { IPlan } from '../types/plan.types';
import type { IOrganizationPlan } from '../types/organisation.plan.types';
import type { BillingPeriod } from '../types/enums';
import { AddOnCode, addOnPlanService, type IAddOnPlan } from './add-on.plan.service';

export interface PlanFeature {
  name: string;
  value: boolean | number | string | null;
}

export interface PlanWithFeatures extends IPlan {
  featureNames?: PlanFeature[];
  offer?: number;
  priceUsd?: number;  
}

export interface ContactSalesPayload {
  planCode: string;
  addOns: {name: string, code: AddOnCode}[];
  billingPeriod: BillingPeriod;
  totalCost: number;
}

export interface AssignPlanPayload {
  orgId: string;
  planCode: string;
  billingPeriod: BillingPeriod;
}
export interface PlanAddon {
  id: string | number;
  code: AddOnCode;
  name: string;
  description?: string;
  priceMonthly?: number | string | null;
  priceYearly?: number | string | null;
  perPlan?: Record<string, { included: boolean; limit?: string; priceMonthly?: number | null }>;
}

export const subscriptionService = {

  async getPlanByCode(planCode: string): Promise<PlanWithFeatures> {
    const response = await api.get(`/plan/${planCode}`);
    const data = response.data;
    if (data?.data) {
      return data.data as PlanWithFeatures;
    }
    return data as PlanWithFeatures;
  },

  async getCurrentOrgPlan(orgId: string): Promise<IOrganizationPlan & { plan?: PlanWithFeatures }> {
    const response = await api.get(`/org-plan/${orgId}/plan/current`);
    const data = response.data;
    if (data?.data) {
      return data.data;
    }
    return data;
  },

  async assignPlanToOrg(payload: AssignPlanPayload): Promise<IOrganizationPlan> {
    const response = await api.post(`/org-plan/${payload.orgId}/plan/assign`, {
      planCode: payload.planCode,
      billingPeriod: payload.billingPeriod,
    });
    const data = response.data;
    if (data?.data) {
      return data.data;
    }
    return data;
  },

  async getAddons(): Promise<IAddOnPlan[]> {
    const response = await addOnPlanService.getAllAddOnPlans();
    return response;
  },

  async contactSales(payload: ContactSalesPayload): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/org-plan/contact-sales', payload);
    const data = response.data;
    if (data?.data) {
      return data.data;
    }
    return data;
  },
};

export default subscriptionService;

