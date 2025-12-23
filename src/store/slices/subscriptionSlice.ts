import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { subscriptionService, type PlanWithFeatures, type ContactSalesPayload, type AssignPlanPayload } from '../../services/subscription.service';
import type { IOrganizationPlan } from '../../types/organisation.plan.types';

// ============================================================================
// State Interface
// ============================================================================

interface SubscriptionState {
  plans: PlanWithFeatures[];
  currentOrgPlan: (IOrganizationPlan & { plan?: PlanWithFeatures }) | null;
  selectedPlanCode: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  plans: [],
  currentOrgPlan: null,
  selectedPlanCode: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// Async Thunks
// ============================================================================

// Fetch all available plans
export const fetchPlans = createAsyncThunk(
  'subscription/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const plans = await subscriptionService.getAllPlans();
      return plans;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch plans');
    }
  }
);

// Fetch plan by code
export const fetchPlanByCode = createAsyncThunk(
  'subscription/fetchPlanByCode',
  async (planCode: string, { rejectWithValue }) => {
    try {
      const plan = await subscriptionService.getPlanByCode(planCode);
      return plan;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch plan');
    }
  }
);

// Fetch current organization's plan
export const fetchCurrentOrgPlan = createAsyncThunk(
  'subscription/fetchCurrentOrgPlan',
  async (orgId: string, { rejectWithValue }) => {
    try {
      const orgPlan = await subscriptionService.getCurrentOrgPlan(orgId);
      return orgPlan;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch current plan');
    }
  }
);

// Assign plan to organization
export const assignPlanToOrg = createAsyncThunk(
  'subscription/assignPlanToOrg',
  async (payload: AssignPlanPayload, { rejectWithValue }) => {
    try {
      const result = await subscriptionService.assignPlanToOrg(payload);
      return result;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to assign plan');
    }
  }
);

// Contact sales for plan upgrade
export const contactSales = createAsyncThunk(
  'subscription/contactSales',
  async (payload: ContactSalesPayload, { rejectWithValue }) => {
    try {
      const result = await subscriptionService.contactSales(payload);
      return result;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to contact sales');
    }
  }
);

// ============================================================================
// Slice
// ============================================================================

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    setSelectedPlanCode: (state, action: PayloadAction<string | null>) => {
      state.selectedPlanCode = action.payload;
    },
    clearCurrentOrgPlan: (state) => {
      state.currentOrgPlan = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all plans
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch current organization plan
    builder
      .addCase(fetchCurrentOrgPlan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentOrgPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrgPlan = action.payload;
        if (action.payload?.plan?.code) {
          state.selectedPlanCode = action.payload.plan.code;
        }
      })
      .addCase(fetchCurrentOrgPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Assign plan to organization
    builder
      .addCase(assignPlanToOrg.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignPlanToOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrgPlan = action.payload;
      })
      .addCase(assignPlanToOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Contact sales
    builder
      .addCase(contactSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(contactSales.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(contactSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSubscriptionError, setSelectedPlanCode, clearCurrentOrgPlan } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

