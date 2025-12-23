// ============================================================================
// Campaign Lead Model (Junction table: Campaign <-> Lead with status tracking)
// ============================================================================

import { LeadStatus } from "./enums";
import type { ICampaign } from "./campaign.types";
import type { ILead } from "./lead.types";

export interface ICampaignLead {
  id: string;
  campaignId: string;
  leadId: string;
  status: LeadStatus;
  currentSequenceStep: number;
  nextSendAt: Date | null;
  lastSentAt: Date | null;
  lastOpenedAt: Date | null;
  lastClickedAt: Date | null;
  lastRepliedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  campaign?: ICampaign;
  lead?: ILead;
}

export interface ICreateCampaignLead {
  campaignId: string;
  leadId: string;
  status?: LeadStatus;
  currentSequenceStep?: number;
  nextSendAt?: Date | null;
}

export interface IUpdateCampaignLead {
  status?: LeadStatus;
  currentSequenceStep?: number;
  nextSendAt?: Date | null;
  lastSentAt?: Date | null;
  lastOpenedAt?: Date | null;
  lastClickedAt?: Date | null;
  lastRepliedAt?: Date | null;
}

