import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Plan } from "./planSlice";

export interface AssignPlanPayload {
  planCode: string;
  billingPeriod: "MONTHLY" | "YEARLY";
}

export interface OrgPlan {
  plan: Plan;
  orgId: string;
  assignedAt?: string;
  expiresAt?: string;
  status?: "ACTIVE" | "INACTIVE" | "EXPIRED";
  [key: string]: string | Plan | undefined;
}

interface OrgPlanState {
  currentPlan: OrgPlan | null;
  loading: boolean;
  error: string | null;
}

const token = Cookies.get("access_token");

// Assign plan to organization
export const assignPlanToOrg = createAsyncThunk<
  string,
  { orgId: string; planCode: string; billingPeriod: "MONTHLY" | "YEARLY" },
  { rejectValue: string }
>(
  "orgPlan/assignPlanToOrg",
  async ({ orgId, planCode, billingPeriod }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/org-plan/${orgId}/plan/assign`,
        { planCode: planCode, billingPeriod: billingPeriod },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to assign plan";
      if (error instanceof AxiosError) {
        errorMessage =
          (error.response?.data?.message as string) || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch current plan for organization
export const fetchCurrentOrgPlan = createAsyncThunk<
  OrgPlan,
  string,
  { rejectValue: string }
>("orgPlan/fetchCurrentOrgPlan", async (orgId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/org-plan/${orgId}/plan/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch current plan";
    if (error instanceof AxiosError) {
      errorMessage =
        (error.response?.data?.message as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

export const conatctSales = createAsyncThunk<
  string,
  { planCode: string; billingPeriod: "MONTHLY" | "YEARLY" },
  { rejectValue: string }
>("orgPlan/createSubscription", async ({ planCode, billingPeriod }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/org-plan/contact-sales`, {
      planCode: planCode,
      billingPeriod: billingPeriod,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to create subscription";
    if (error instanceof AxiosError) {
      errorMessage =
        (error.response?.data?.message as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

const initialState: OrgPlanState = {
  currentPlan: null,
  loading: false,
  error: null,
};

const orgPlanSlice = createSlice({
  name: "orgPlan",
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
      // Assign plan to organization
      .addCase(assignPlanToOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        assignPlanToOrg.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentPlan = action.payload as unknown as OrgPlan;
        }
      )
      .addCase(
        assignPlanToOrg.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to assign plan";
        }
      )
      // Fetch current plan for organization
      .addCase(fetchCurrentOrgPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentOrgPlan.fulfilled,
        (state, action: PayloadAction<OrgPlan>) => {
          state.loading = false;
          state.currentPlan = action.payload;
        }
      )
      .addCase(
        fetchCurrentOrgPlan.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch current plan";
        }
      );
  },
});

export const { clearCurrentPlan, clearError } = orgPlanSlice.actions;
export default orgPlanSlice.reducer;

