import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emailApi } from "../../services/api";
import { AxiosError } from "axios";

export const enum EmailAccountType {
  IMAP = "imap",
  GMAIL = "gmail",
  OUTLOOK = "outlook",
}
export interface EmailAccount {
  _id: string;
  name: string;
  email: string;
  type: string;
  warmup: {
    enabled?: boolean;
    maxPerDay?: number;
    dailyRampup?: boolean;
    rampupIncrement?: number;
    startDate?: Date;
    maxEmailsPerDay?: number;
    replyRate?: number;
    dailyReplyTarget?: number;
    identifierTag?: string;
    autoAdjust?: boolean;
    customDomainTracking?: boolean;
    weekdaysOnly?: boolean;
    reputation?: number;
    reputationLastCalculated?: Date;
  };
  imap?: {
    host?: string;
    port?: number;
    secure?: boolean;
    auth: {
      user?: string;
      pass?: string;
    };
  };
}
export interface WarmUp {
  enabled?: boolean;
  maxPerDay?: number;
  dailyRampup?: boolean;
  rampupIncrement?: number;
  startDate?: Date;
  maxEmailsPerDay?: number;
  replyRate?: number;
  dailyReplyTarget?: number;
  identifierTag?: string;
  autoAdjust?: boolean;
  customDomainTracking?: boolean;
  weekdaysOnly?: boolean;
  reputation?: number;
  reputationLastCalculated?: Date;
}
export interface VerifyEmailAccountPayload {
  type: string;
  email?: string;
  imap: {
    host: string;
    port: any;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  smtp: {
    host: string;
    port: any;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  proxy: null | string;
  smtpEhloName: string;
}
export interface CreateEmailAccountPayload {
  account: string;
  name: string;
  state: string;
  type: string;
  email: string;
  orgId: string;
  limit: any;
  time_gap: any;
  imap: {
    auth: {
      user: string;
      pass: string;
    };
    host: string;
    port: any;
    secure: boolean;
  };
  smtp: {
    auth: {
      user: string;
      pass: string;
    };
    host: string;
    port: any;
    secure: boolean;
  };
  proxy: null | string;
  smtpEhloName: string;
}
export interface WarmUpStats {
    accountId: string;
    accountEmail: string;
    period: {
        startDate: Date;
        endDate: Date;
    },
    statistics: WarmUpStatsStatistics;
    recentEmails?: any[];
}

export interface WarmUpStatsStatistics {
    warmupEmailsSent: number;
    landedInInbox: number;
    savedFromSpam: number;
    emailsReceived: number;
    emailPerformance: number;
    outboundStatus: {
        sent: number;
        failed: number;
        delivered: number;
        inbox: number;
        spam: number;
        bounced: number;
        pending: number;
    };
    replies: number;
    replyRate: number;
    deliveryRate: number;
}

export const fetchEmailAccount = createAsyncThunk(
  "accounts",
  async ({ orgId }: { orgId: string }, { rejectWithValue }) => {
    try {
      const response = await emailApi.get("/accounts", {
        params: { orgId }, // ✅ Pass orgId inside params
      });
      return response.data.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = (error.response?.data as string) || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const addOuthEmailAccount = createAsyncThunk(
  "oauth/auth-url",
  async ({ orgId }: { orgId: any }, { rejectWithValue }) => {
    try {
      const origin = encodeURIComponent(window.location.href);
      const response = await emailApi.get(`/oauth/auth-url?origin=${origin}&orgId=${encodeURIComponent(orgId)}`);
      return response.data.url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const addOutlookEmailAccount = createAsyncThunk(
  "outlook/auth-url",
  async ({ orgId }: { orgId: any }, { rejectWithValue }) => {
    try {
      const origin = encodeURIComponent(window.location.href);
      const response = await emailApi.get(`/outlook/auth-url?origin=${origin}&orgId=${encodeURIComponent(orgId)}`);
      return response.data.url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const verifyEmailAccount = createAsyncThunk<
  string,
  VerifyEmailAccountPayload,
  { rejectValue: string }
>(
  "accounts/verify",
  async (data: VerifyEmailAccountPayload, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/verify`, data);
      return response.data.url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const CreateEmailAccount = createAsyncThunk<
  string,
  CreateEmailAccountPayload,
  { rejectValue: string }
>(
  "accounts/create",
  async (data: CreateEmailAccountPayload, { rejectWithValue }) => {
  try {
    const response = await emailApi.post(`/accounts`, data);
    return response.data.url;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Network error");
  }
});

export const SearchEmailAccount = createAsyncThunk(
  "accounts/search",
  async (
    { query, orgId }: { query: string; orgId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.get(`/accounts/search`, {
        params: { query, orgId},
        headers: { "Cache-Control": "no-cache" }, 
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const getEmailAccountSmtpDetail = createAsyncThunk(
  "accounts/getEmailAccountSmtpDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await emailApi.get(`/accounts/${id}`);
      console.log("id---------", id, response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const updateEmailAccount = createAsyncThunk(
  "emailAccounts/updateEmailAccount",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await emailApi.put(`/accounts/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update email account"
      );
    }
  }
);

const emailAccountSlice = createSlice({
  name: "emailAccounts",
  initialState: {
    accounts: {} as Record<string, any>,
    loading: false,
    error: null,
    warmUpStats: null as WarmUpStats | null | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmailAccountSmtpDetail.fulfilled, (state, action) => {
      if (state.accounts) {
        state.accounts[action.meta.arg] = action.payload;
      }
    });
    builder.addCase(updateEmailAccount.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      if (state.accounts && id && state.accounts[id]) {
        // Merge the updated data with existing account data
        // The response might have data.data or just data
        const updatedData = action.payload?.data || action.payload;
        if (updatedData) {
          state.accounts[id] = { ...state.accounts[id], ...updatedData };
        }
      }
    });
    builder.addCase(getWarmupStats.fulfilled, (state, action) => {
      state.warmUpStats = action.payload;
    });
    builder.addCase(getWarmupStats.rejected, (state) => {
      state.warmUpStats = null;
    });
  },
});

export const deleteEmailAccount = createAsyncThunk(
  "emailAccounts/deleteEmailAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await emailApi.delete(`/accounts/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete email account"
      );
    }
  }
);

export const getWarmupStats = createAsyncThunk(
  "emailAccounts/getWarmupStats",
  async ({ id, startDate, endDate }: { id: string; startDate?: Date | null; endDate?: Date | null }, { rejectWithValue }) => {
    try {
      const response = await emailApi.get(`/accounts/${id}/warmup/stats`, {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const getWarmupEmails = createAsyncThunk(
  "emailAccounts/getWarmupEmails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await emailApi.get(`/accounts/${id}/warmup/emails`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const trackDeliveryStatus = createAsyncThunk(
  "emailAccounts/trackDeliveryStatus",
  async ({ id, hours }: { id: string; hours?: number }, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/${id}/warmup/track-delivery-status?hours=${hours}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  });

export default emailAccountSlice.reducer;