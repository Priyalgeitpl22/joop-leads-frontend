export interface IEmailAccount {
  id: string;
  name: string;
  email: string;
  vendor?: string;
  dailyLimit: number;
  dailyLimitUsed: number;
  warmupEnabled: boolean;
  warmupReputation: number;
  warmupScore?: number;
  mailboxIssue?: string;
  type?: EmailAccountType;
  isInUse?: boolean;
  minTimeGap?: number;
  emailsSent?: number;
  campaignsUsed?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Account {
  id: string;
  _id?: string;
  account?: string;
  name: string;
  email: string;
  orgId: string;
  type: EmailAccountType;
  time_gap: number;
  limit: number;
  lastFetchTimestamp?: string;
  last_sent?: string;
  state: EmailAccountState;
  oauth2: {
    authorize: boolean;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    tokens: {
      access_token: string;
      expiry_date: Date;
      refresh_token: string;
      scope: string;
      token_type: string;
    }
  }
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  imap: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  replyToAddress?: string;
  warmup: IWarmupSettings;
  signature: string | null;
}


export interface IWarmupSettings {
  enabled: boolean;
  maxEmailPerDay: number;
  warmupMaxCount: number;
  warmupMinCount: number;
  isRampupEnabled: boolean;
  rampupIncrement: number;
  startDate: Date | null;
  replyRate: number;
  dailyReplyTarget: number;
  identifierTag: string;
  autoAdjust: boolean;
  customDomainTracking: boolean;
  weekdaysOnly: boolean;
  reputation: number;
  reputationLastCalculated: Date | null;
}
export interface IEmailAccountResponse {
  data: IEmailAccount[];
  total?: number;
}

export interface IEmailAccountFilters {
  search?: string;
  vendor?: string;
  warmupEnabled?: boolean;
}

/** Warmup stats API response (payload inside ApiResponse.data) */
export interface WarmupStatsResponse {
  accountId: string;
  accountEmail: string;
  period: {
    startDate: string;
    endDate: string;
  };
  statistics: {
    warmupEmailsSent: number;
    landedInInbox: number;
    savedFromSpam: number;
    emailsReceived: number;
    emailPerformance: number;
    outboundStatus: string;
    replies: number;
    replyRate: number | string;
    deliveryRate: number | string;
  };
  recentEmails: unknown[];
}

export enum EmailAccountState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
  DISABLED = 'disabled',
  DELETED = 'deleted',
  REAUTH_REQUIRED = 'reauth_required',
}

export enum EmailAccountType {
  GMAIL = 'gmail',
  OUTLOOK = 'outlook',
  IMAP = 'imap',
  SMTP = 'smtp',
}
