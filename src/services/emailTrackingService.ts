import { emailApi } from './api';

export interface TrackingAnalytics {
  totalSent: number;
  totalOpened: number;
  totalReplied: number;
  totalInSpam: number;
  totalMovedFromSpam: number;
  avgOpenRate: number;
  avgReplyRate: number;
}

export interface TrackingData {
  _id: string;
  account: string;
  messageId: string;
  subject: string;
  recipient: string;
  status: {
    sent: boolean;
    delivered: boolean;
    opened: boolean;
    replied: boolean;
    inSpam: boolean;
    movedFromSpam: boolean;
  };
  openCount: number;
  openTimestamps: string[];
  replyTimestamps: string[];
  openedAt: string;
  repliedAt: string;
  movedFromSpamAt: string;
  sentAt: string;
  deliveredAt: string;
  isWarmupEmail: boolean;
  warmupTag: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingResponse {
  data: TrackingData[];
  total: number;
  limit: number;
  skip: number;
}

// Get analytics for an account
export const getAccountAnalytics = async (accountId: string): Promise<TrackingAnalytics> => {
  const response = await emailApi.get(`/tracking/analytics/${accountId}`);
  return response.data;
};

// Get tracking data for an account
export const getTrackingData = async (
  accountId: string,
  limit = 100,
  skip = 0,
  sort = '-createdAt'
): Promise<TrackingResponse> => {
  const response = await emailApi.get(`/tracking/data/${accountId}`, {
    params: { limit, skip, sort }
  });
  return response.data;
}; 