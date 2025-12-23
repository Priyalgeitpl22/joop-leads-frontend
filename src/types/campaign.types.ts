// ============================================================================
// Campaign Model
// ============================================================================

import { CampaignStatus, StopSending } from "./enums";
import type { IOrganization } from "./organisation.types";
import type { ISequence } from "./sequence.types";
import type { ICampaignLead } from "./campaign.lead.types";
import type { ICampaignSender } from "./campaign.sender.types";
import type { ICampaignRuntime } from "./campaign.runtime.types";
import type { ICampaignAnalytics } from "./campaign.analytics.types";
import type { IEmailSend } from "./email.send.types";
import type { IUser } from "./user.types";

export interface ICampaign {
  id: string;
  name: string;
  description: string | null;
  status: CampaignStatus;

  // Schedule Settings
  timezone: string;
  sendDays: string[]; // ["Mon", "Tue", "Wed", "Thu", "Fri"]
  windowStart: string; // HH:mm
  windowEnd: string; // HH:mm
  intervalMinutes: number; // Gap between emails
  maxEmailsPerDay: number; // Campaign daily limit

  // Stop Conditions
  stopSending: StopSending;

  // Email Delivery
  sendAsPlainText: boolean;

  // Tracking Settings
  trackOpens: boolean;
  trackClicks: boolean;

  // Advanced Settings
  sendingPriority: number;
  autoPauseSameDomain: boolean;
  autoPauseOnHighBounce: boolean;

  // Unsubscribe
  includeUnsubscribeLink: boolean;
  unsubscribeText: string | null;

  createdAt: Date;
  updatedAt: Date;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  // Relations
  orgId: string;
  organization?: IOrganization;
  createdById: string | null;
  createdBy?: IUser | null;
  sequences?: ISequence[];
  leads?: ICampaignLead[];
  senders?: ICampaignSender[];
  runtime?: ICampaignRuntime | null;
  analytics?: ICampaignAnalytics | null;
  emailSends?: IEmailSend[];
}

// Input types for creating/updating
export interface ICreateCampaign {
  name?: string;
  description?: string | null;
  status?: CampaignStatus;
  timezone?: string;
  sendDays?: string[];
  windowStart?: string;
  windowEnd?: string;
  intervalMinutes?: number;
  maxEmailsPerDay?: number;
  sendAsPlainText?: boolean;
  trackOpens?: boolean;
  trackClicks?: boolean;
  sendingPriority?: number;
  autoPauseSameDomain?: boolean;
  autoPauseOnHighBounce?: boolean;
  includeUnsubscribeLink?: boolean;
  unsubscribeText?: string | null;
  scheduledAt?: Date | string | null;
  orgId?: string;
  createdById?: string | null;
}

export interface IUpdateCampaign {
  name?: string;
  description?: string | null;
  status?: CampaignStatus;
  timezone?: string;
  sendDays?: string[];
  windowStart?: string;
  windowEnd?: string;
  intervalMinutes?: number;
  maxEmailsPerDay?: number;
  sendAsPlainText?: boolean;
  trackOpens?: boolean;
  trackClicks?: boolean;
  sendingPriority?: number;
  autoPauseSameDomain?: boolean;
  autoPauseOnHighBounce?: boolean;
  includeUnsubscribeLink?: boolean;
  unsubscribeText?: string | null;
  scheduledAt?: Date | string | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
}

