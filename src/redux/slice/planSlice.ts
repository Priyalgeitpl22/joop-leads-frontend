import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface Plan {
  id: number;
  code: string;
  name: string;
  description: string;
  priceUsd: number | null;
  isContactSales: boolean;
  maxSenderAccounts: number | null;
  maxLeadListPerMonth: number | null;
  maxEmailsPerMonth: number | null;
  maxLiveCampaigns: number | null;
  includeEmailVerification: boolean;
  includeEmailWarmup: boolean;
  includeUnifiedInbox: boolean;
  includeTeammates: boolean;
  includeAiCampaignGen: boolean;
  includeAiTagging: boolean;
  includeAiResponses: boolean;
  includeAiImprovement: boolean;
  includeWebsiteLinkWarmup: boolean;
  supportType: string;
  createdAt: string;
  updatedAt: string;
  offer: number | null;
  featureNames?: { name: string; value: boolean | number | null }[];
}

export interface PlanFeatures {
  includeEmailVerification: boolean;
  includeEmailWarmup: boolean;
  includeUnifiedInbox: boolean;
  includeTeammates: boolean;
  includeAiCampaignGen: boolean;
  includeAiTagging: boolean;
  includeAiResponses: boolean;
  includeAiImprovement: boolean;
  includeWebsiteLinkWarmup: boolean;
}

export enum PlanFeatureName {
  EMAIL_VERIFICATION = 'Email Verification',
  EMAIL_WARMUP = 'Email Warmup',
  UNIFIED_INBOX = 'Unified Inbox',
  TEAMMATES = 'Teammates',
  AI_CAMPAIGN_GEN = 'AI Campaign Gen',
  AI_TAGGING = 'AI Tagging',
  AI_RESPONSES = 'AI Responses',
  AI_IMPROVEMENT = 'AI Improvement',
  WEBSITE_LINK_WARMUP = 'Website Link Warmup',
}

interface PlanState {
  plans: Plan[];
  currentPlan: Plan | null;
  loading: boolean;
  error: string | null;
}

const token = Cookies.get("access_token");

// Fetch all plans
export const fetchPlans = createAsyncThunk<
  { data: Plan[] },
  void,
  { rejectValue: string }
>("plan/fetchPlans", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/plan", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch plans";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data?.message as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

// Fetch plan by code
export const fetchPlanByCode = createAsyncThunk<
  { data: Plan },
  string,
  { rejectValue: string }
>("plan/fetchPlanByCode", async (planCode, { rejectWithValue }) => {
  try {
    const response = await api.get(`/plan/${planCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch plan";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data?.message as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

const initialState: PlanState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all plans
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlans.fulfilled,
        (state, action: PayloadAction<{ data: Plan[] }>) => {
          state.loading = false;
          state.plans = action.payload.data;
        }
      )
      .addCase(
        fetchPlans.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch plans";
        }
      )
      // Fetch plan by code
      .addCase(fetchPlanByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlanByCode.fulfilled,
        (state, action: PayloadAction<{ data: Plan }>) => {
          state.loading = false;
          state.currentPlan = action.payload.data;
        }
      )
      .addCase(
        fetchPlanByCode.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch plan";
        }
      );
  },
});

export const { clearCurrentPlan, clearError } = planSlice.actions;
export default planSlice.reducer;

