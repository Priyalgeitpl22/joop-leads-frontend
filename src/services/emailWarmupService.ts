import { emailApi } from './api';

export interface WarmupSettings {
  _id: string;
  account: string;
  isEnabled: boolean;
  dailyLimit: number;
  currentDailyCount: number;
  lastSentDate: string;
  startDate: string;
  totalSent: number;
  totalReceived: number;
  totalReplied: number;
  rampUpPercentage: number;
  rampUpWeek: number;
  createdAt: string;
  updatedAt: string;
}

export interface WarmupConfig {
  _id: string;
  account: string;
  subject: string;
  body: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WarmupParticipant {
  id: string;
  name: string;
  email: string;
  type: string;
}

export interface WarmupResponse {
  success: boolean;
  message?: string;
  data?: WarmupSettings;
  error?: string;
}

export interface WarmupConfigResponse {
  success: boolean;
  message?: string;
  data?: WarmupConfig;
  error?: string;
}

export interface ParticipantsResponse {
  success: boolean;
  data: WarmupParticipant[];
}

// Setup email warmup for an account
export const setupEmailWarmup = async (
  accountId: string,
  isEnabled: boolean = true,
  dailyLimit: number = 50,
  subject?: string,
  body?: string
): Promise<WarmupResponse> => {
  try {
    console.log(`Setting up warmup for account ${accountId}, enabled: ${isEnabled}, limit: ${dailyLimit}`);
    const response = await emailApi.post(`/warmup/setup/${accountId}`, {
      isEnabled,
      dailyLimit,
      subject,
      body
    });
    console.log('Warmup setup response:', response.data);
    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error: any) {
    console.error('Error in setupEmailWarmup:', error.response?.status, error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to setup warmup'
    };
  }
};

// Get email warmup settings for an account
export const getWarmupSettings = async (accountId: string): Promise<WarmupResponse> => {
  try {
    const response = await emailApi.get(`/warmup/settings/${accountId}`);
    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log(`No warmup settings found for account ${accountId}, need to create default settings`);
      return {
        success: false,
        error: 'Warmup settings not found'
      };
    }
    console.error('Error in getWarmupSettings:', error.response?.status, error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Error fetching warmup settings'
    };
  }
};

// Update email warmup settings
export const updateWarmupSettings = async (
  accountId: string,
  settings: {
    isEnabled?: boolean;
    dailyLimit?: number;
  }
): Promise<WarmupResponse> => {
  const response = await emailApi.put(`/warmup/settings/${accountId}`, settings);
  return response.data;
};

// Manually run the warmup process
export const runWarmupProcess = async (): Promise<WarmupResponse> => {
  const response = await emailApi.post('/warmup/run');
  return response.data;
};

// Fetch messages for all warmup participants
export const fetchWarmupMessages = async (): Promise<WarmupResponse> => {
  const response = await emailApi.post('/warmup/fetch-messages');
  return response.data;
};

// Fetch messages and then run warmup process
export const fetchAndRunWarmup = async (): Promise<WarmupResponse> => {
  // First fetch messages
  await fetchWarmupMessages();
  // Then run warmup process
  return await runWarmupProcess();
};

// Get all warmup participants
export const getWarmupParticipants = async (): Promise<ParticipantsResponse> => {
  const response = await emailApi.get('/warmup/participants');
  return response.data;
};

// Get warmup system status
export const getWarmupSystemStatus = async (): Promise<{
  success: boolean;
  data?: {
    accounts: number;
    pendingReplies: number;
    lastRunTime?: string;
  };
  error?: string;
}> => {
  try {
    const response = await emailApi.get('/warmup/system-status');
    return response.data;
  } catch (error: any) {
    console.error('Error getting warmup system status:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get warmup system status'
    };
  }
};

// Get warmup stats for all accounts
export const getWarmupStats = async (): Promise<{
  success: boolean;
  data?: {
    totalSent: number;
    totalReplied: number;
    replyRate: number;
    accountStats: Array<{
      accountId: string;
      email: string;
      sent: number;
      replied: number;
      replyRate: number;
    }>;
  };
  error?: string;
}> => {
  try {
    const response = await emailApi.get('/warmup/stats');
    return response.data;
  } catch (error: any) {
    console.error('Error getting warmup stats:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get warmup stats'
    };
  }
};

// Get warmup config for an account
export const getWarmupConfig = async (accountId: string): Promise<WarmupConfigResponse> => {
  try {
    const response = await emailApi.get(`/warmup/config/${accountId}`);
    // Transform API response to expected frontend format
    return {
      success: response.data.code === 200,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error: any) {
    console.error('Error in getWarmupConfig:', error.response?.status, error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Error fetching warmup configuration'
    };
  }
};

// Update warmup config
export const updateWarmupConfig = async (
  accountId: string,
  config: {
    subject?: string;
    body?: string;
    isActive?: boolean;
  }
): Promise<WarmupConfigResponse> => {
  try {
    const response = await emailApi.put(`/warmup/config/${accountId}`, config);
    // Transform API response to expected frontend format
    return {
      success: response.data.code === 200,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error: any) {
    console.error('Error in updateWarmupConfig:', error.response?.status, error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Error updating warmup configuration'
    };
  }
}; 