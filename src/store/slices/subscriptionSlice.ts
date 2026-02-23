import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { subscriptionService, type PlanWithFeatures, type ContactSalesPayload, type AssignPlanPayload, type PlanAddon } from '../../services/subscription.service';
import type { IOrganizationPlan } from '../../types/organisation.plan.types';
import { planService } from '../../services/plan.service';
import { addOnPlanService, type IAddOnPlan } from '../../services/add-on.plan.service';

interface SubscriptionState {
  plans: PlanWithFeatures[];
  addons: PlanAddon[];
  currentOrgPlan: (IOrganizationPlan & { plan?: PlanWithFeatures }) | null;
  selectedPlanCode: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  plans: [],
  addons: [],
  currentOrgPlan: null,
  selectedPlanCode: null,
  isLoading: false,
  error: null,
};

export const fetchPlans = createAsyncThunk(
  'subscription/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const plans = await planService.getAllPlans();
      return plans;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch plans');
    }
  }
);

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

export const fetchAddons = createAsyncThunk(
  'subscription/fetchAddons',
  async (_, { rejectWithValue }) => {
    try {
      const addons = await subscriptionService.getAddons();
      return addons.map((addon) => ({
        id: addon.id,
        code: addon.code,
        name: addon.name,
        description: addon.description ?? "",
        priceMonthly: Number(addon.priceMonthly) || 0,
        priceYearly: Number(addon.priceYearly) || 0,
      }));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch add ons');
    }
  }
);

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

export const fetchPlanAddons = createAsyncThunk(
  'subscription/fetchPlanAddons',
  async (_, { rejectWithValue }) => {
    try {
      const addOnPlans = await addOnPlanService.getAllAddOnPlans();
      return addOnPlans;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch plan add ons');
    }
  }
);

export const fetchPlanAddonById = createAsyncThunk(
  'subscription/fetchPlanAddonById',
  async (addonId: number, { rejectWithValue }) => {
    try {
      const addon = await addOnPlanService.getAddOnPlanById(addonId);
      return addon;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch plan add-on');
    }
  }
);

export const updatePlanAddon = createAsyncThunk(
  'subscription/updatePlanAddon',
  async ({ addonId, addon }: { addonId: number; addon: IAddOnPlan }, { rejectWithValue }) => {
    try {
      const updatedAddon = await addOnPlanService.updateAddOnPlan(addonId, addon);
      return updatedAddon;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update plan add-on');
    }
  }
);

export const deletePlanAddon = createAsyncThunk(
  'subscription/deletePlanAddon',
  async (addonId: number, { rejectWithValue }) => {
    try {
      const deletedAddon = await addOnPlanService.deleteAddOnPlan(addonId.toString());
      return deletedAddon;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete plan add-on');
    }
  }
);

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

    builder
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.addons = action.payload.map((addon) => ({
          id: addon.id,
          code: addon.code,
          name: addon.name,
          description: addon.description ?? "",
          priceMonthly: Number(addon.priceMonthly) || 0,
          priceYearly: Number(addon.priceYearly) || 0,
        }));
      });

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

