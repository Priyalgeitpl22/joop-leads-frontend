// ============================================================================
// Sender Account Model
// ============================================================================

import { EmailProvider, WarmupStatus } from "./enums";
import type { IOrganization } from "./organisation.types";
import type { ISenderRuntime } from "./sender.runtime.types";
import type { IEmailSend } from "./email.send.types";
import type { ICampaignSender } from "./campaign.sender.types";

export interface ISenderAccount {
  id: string;
  email: string;
  name: string | null; // Display name
  provider: EmailProvider;

  // SMTP Config
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  smtpPass: string | null; // Encrypted

  // OAuth Config (for Gmail/Outlook API)
  accessToken: string | null; // Encrypted
  refreshToken: string | null; // Encrypted
  tokenExpiry: Date | null;

  // Limits & Settings
  dailyLimit: number;
  hourlyLimit: number;
  minDelaySeconds: number; // Min gap between emails
  isEnabled: boolean;
  isVerified: boolean;

  // Warmup
  warmupStatus: WarmupStatus;
  warmupStartedAt: Date | null;
  warmupDailyIncrement: number;

  // Signature
  signature: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  orgId: string;
  organization?: IOrganization;
  runtime?: ISenderRuntime[];
  emailSends?: IEmailSend[];
  campaignSenders?: ICampaignSender[];
}

// Input types for creating/updating
export interface ICreateSenderAccount {
  email: string;
  name?: string | null;
  provider?: EmailProvider;
  smtpHost?: string | null;
  smtpPort?: number | null;
  smtpUser?: string | null;
  smtpPass?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiry?: Date | null;
  dailyLimit?: number;
  hourlyLimit?: number;
  minDelaySeconds?: number;
  isEnabled?: boolean;
  warmupDailyIncrement?: number;
  signature?: string | null;
  orgId: string;
}

export interface IUpdateSenderAccount {
  email?: string;
  name?: string | null;
  provider?: EmailProvider;
  smtpHost?: string | null;
  smtpPort?: number | null;
  smtpUser?: string | null;
  smtpPass?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiry?: Date | null;
  dailyLimit?: number;
  hourlyLimit?: number;
  minDelaySeconds?: number;
  isEnabled?: boolean;
  isVerified?: boolean;
  warmupStatus?: WarmupStatus;
  warmupStartedAt?: Date | null;
  warmupDailyIncrement?: number;
  signature?: string | null;
}

// Response type (without sensitive fields)
export interface ISenderAccountResponse {
  id: string;
  email: string;
  name: string | null;
  provider: EmailProvider;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  dailyLimit: number;
  hourlyLimit: number;
  minDelaySeconds: number;
  isEnabled: boolean;
  isVerified: boolean;
  warmupStatus: WarmupStatus;
  warmupStartedAt: Date | null;
  warmupDailyIncrement: number;
  signature: string | null;
  createdAt: Date;
  updatedAt: Date;
  orgId: string;
}

