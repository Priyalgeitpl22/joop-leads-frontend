// ============================================================================
// Organization Model
// ============================================================================

import type { IUser } from "./user.types";
import type { ISenderAccount } from "./sender.account.types";
import type { ICampaign } from "./campaign.types";
import type { ILead } from "./lead.types";
import type { IOrganizationPlan } from "./organisation.plan.types";

export interface IOrganization {
  id: string;
  name: string;
  domain: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
  industry: string | null;
  description: string | null;
  logoUrl: string | null;
  timezone: string;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  users?: IUser[];
  senderAccounts?: ISenderAccount[];
  campaigns?: ICampaign[];
  leads?: ILead[];
  plans?: IOrganizationPlan[];
}

// Input types for creating/updating
export interface ICreateOrganization {
  name: string;
  domain?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip?: string | null;
  industry?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  timezone?: string;
}

export interface IUpdateOrganization {
  name?: string;
  domain?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip?: string | null;
  industry?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  timezone?: string;
}
