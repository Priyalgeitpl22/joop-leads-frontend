export interface CampaignSettingsPayload {
  campaign_id: string;
  auto_warm_up?: boolean;
  sender_accounts?: EmailAccounts;
  schedule_settings?: {
    time_zone: string;
    send_these_days: number[];
    time_sequences: {
      from: string;
      to: string;
      minutes: string;
    };
    start_date: string;
    max_leads_per_day: number;
  };
  campaign_settings?: {
    campaign_name: string;
    stop_message_on_lead: string;
    email_delivery_optimization: boolean;
    excluded_tracking: {
      dont_track_open_emails: boolean;
      dont_track_link_clicks: boolean;
    };
    priority_sending_pattern: number;
    company_auto_pause: boolean;
    enhanced_email_delivery: boolean;
    bounce_rate: boolean;
    unsubscribe: boolean;
  };
}

export interface CampaignSettings {
  auto_warm_up: boolean;
  sender_accounts: EmailAccounts[];
  schedule_settings: {
    time_zone: string;
    send_these_days: number[];
    time_sequences: {
      from: string;
      to: string;
      minutes: string;
    };
    start_date: string;
    max_leads_per_day: number;
  };
  campaign_settings: {
    campaign_name: string;
    stop_message_on_lead: string;
    email_delivery_optimization: boolean;
    excluded_tracking: {
      dont_track_open_emails: boolean;
      dont_track_link_clicks: boolean;
    };
    priority_sending_pattern: number;
    company_auto_pause: boolean;
    enhanced_email_delivery: boolean;
    bounce_rate: boolean;
    unsubscribe: boolean;
  };
}

export interface EmailAccount {
  account_id: string;
  user?: string;
  pass?: string;
  oauth2?: any;
}

export interface Account {
  oauth2?: any;
  email: string
  type: string,
  imap: {
    host: string;
    port: string;
    secure: string;
    auth: {
      user: string;
      pass: string;
    },
  },
  smtp: {
    host: string;
    port: string;
    secure: string;
    auth: {
      user: string;
      pass: string;
    },
  },
  proxy: null,
  smtpEhloName: "localhost",
}


export type EmailAccounts = EmailAccount[];