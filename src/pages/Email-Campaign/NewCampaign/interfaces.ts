import { Sequence } from "./SequenceCampaign/Sequences/interfaces";

export interface ILeadsCounts {
  uploadedCount: number;
  duplicateCount: number;
  blockedCount: number;
  emptyCount: number;
  invalidCount: number;
  unsubscribedCount: number;
}

export interface IEmailCampaign {
  status: any;
  id: string;
  campaignName: string;
  sequences: Sequence[];
  createdAt: string;
}

export interface IContacts {
  id: string;
  campaign_id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  phone_number: string;
  linkedin_profile: string;
  location: string;
  orgId: string;
  unsubscribed: boolean;
  blocked: boolean;
  website: string;
  file_name: string;
}