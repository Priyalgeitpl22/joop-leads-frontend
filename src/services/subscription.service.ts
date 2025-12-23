import { api } from './api';
import type { IPlan } from '../types/plan.types';
import type { IOrganizationPlan } from '../types/organisation.plan.types';
import type { BillingPeriod } from '../types/enums';

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
  billingPeriod: BillingPeriod;
}

export interface AssignPlanPayload {
  orgId: string;
  planCode: string;
  billingPeriod: BillingPeriod;
}

export const subscriptionService = {
  /**
   * Fetch all available plans
   */
  async getAllPlans(): Promise<PlanWithFeatures[]> {
    const response = await api.get('/plan');
    // Handle different response structures
    const data = response.data;
    if (data?.data) {
      return data.data as PlanWithFeatures[];
    }
    return data as PlanWithFeatures[];
  },

  /**
   * Fetch plan by code
   */
  async getPlanByCode(planCode: string): Promise<PlanWithFeatures> {
    const response = await api.get(`/plan/${planCode}`);
    const data = response.data;
    if (data?.data) {
      return data.data as PlanWithFeatures;
    }
    return data as PlanWithFeatures;
  },

  /**
   * Fetch current organization's plan
   */
  async getCurrentOrgPlan(orgId: string): Promise<IOrganizationPlan & { plan?: PlanWithFeatures }> {
    const response = await api.get(`/org-plan/${orgId}/plan/current`);
    const data = response.data;
    if (data?.data) {
      return data.data;
    }
    return data;
  },

  /**
   * Assign plan to organization
   */
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

  /**
   * Contact sales for plan upgrade
   */
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

