import { ReactNode } from "react";
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
  created_at: string;
  campaign_status: ReactNode;
  campaign_name: ReactNode;
  status: any;
  id: string;
  campaign_name: string;
  contacts: any;
  sequences: Sequence[];
  createdAt: string;
  analytics_count: {
    campaignId: number;
    bounced_count: number;
    opened_count: number;
    clicked_count: number;
    sent_count: number;
  };
  campaignStats: any;
  sequence_count: number;
}

export interface IContacts {
  active: any;
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
  designation: string;
  company_location: string;
  industry_type: string;
}