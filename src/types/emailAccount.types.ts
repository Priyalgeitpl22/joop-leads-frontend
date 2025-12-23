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
  maxPerDay: number;

  identifierTag: string;
  rampupIncrement: number;

  randomizeEmailsPerDay: boolean;
  replyRate: number;

  reputation: number;
  reputationLastCalculated: Date | null;

  startDate: Date | null;
  weekdaysOnly: boolean;

  customDomainTracking: boolean;
  dailyRampup: boolean;
  dailyReplyTarget: number;

  maxEmailsPerDay: [number, number];

  // Derived / runtime fields (not from API)
  dailyLimit?: number;
  dailyLimitUsed?: number;
  dailyLimitRemaining?: number;
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

export enum EmailAccountState {
  CONNECTED = 'connected',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
  DISABLED = 'disabled',
  DELETED = 'deleted',
}

export enum EmailAccountType {
  GMAIL = 'gmail',
  OUTLOOK = 'outlook',
  IMAP = 'imap',
  SMTP = 'smtp',
}
