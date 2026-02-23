// ============================================================================
// Organization Plan Model (Subscription junction table)
// ============================================================================

import { BillingPeriod } from "./enums";
import type { IOrganization } from "./organisation.types";
import type { IPlan } from "./plan.types";

export interface IOrganizationPlan {
  id: number;
  orgId: string;
  planId: number;
  billingPeriod: BillingPeriod;

  isActive: boolean;
  startsAt: Date;
  endsAt: Date | null;

  // Current period usage
  emailsSentThisPeriod: number;
  leadsAddedThisPeriod: number;
  senderAccountsCount: number;

  // Stripe/Payment info
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  organization?: IOrganization;
  plan?: IPlan;
}

// Input types for creating/updating
export interface ICreateOrganizationPlan {
  orgId: string;
  planId: number;
  billingPeriod?: BillingPeriod;
  isActive?: boolean;
  startsAt?: Date;
  endsAt?: Date | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}

export interface IUpdateOrganizationPlan {
  planId?: number;
  billingPeriod?: BillingPeriod;
  isActive?: boolean;
  startsAt?: Date;
  endsAt?: Date | null;
  emailsSentThisPeriod?: number;
  leadsAddedThisPeriod?: number;
  senderAccountsCount?: number;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}

