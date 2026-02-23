import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { campaignService } from '../../services/campaign.service';
import type { Campaign, CampaignStatus, SequenceAnalytics } from '../../interfaces';
import toast from 'react-hot-toast';
import type { Logs } from '../../pages/campaigns/CampaignDetails/components/TriggerLogs';

interface CampaignState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  isLoading: boolean;
  error: string | null;
  triggerLogs: Logs[] | null;
  upcomingTriggers: Logs[] | null;
  sequenceAnalytics: SequenceAnalytics[] | null;
  isLoadingSequenceAnalytics: boolean;
  errorSequenceAnalytics: string | null;
}

const initialState: CampaignState = {
  campaigns: [],
  currentCampaign: null,
  isLoading: false,
  error: null,
  triggerLogs: [],
  upcomingTriggers: [],
  sequenceAnalytics: [],
  isLoadingSequenceAnalytics: false,
  errorSequenceAnalytics: null,
};

// Async thunks
export const fetchCampaigns = createAsyncThunk(
  'campaign/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const campaigns = await campaignService.getAllCampaigns();
      return campaigns;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch campaigns');
    }
  }
);

export const fetchCampaignById = createAsyncThunk(
  'campaign/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const campaign = await campaignService.getCampaignById(id);
      return campaign as Campaign;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch campaign');
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaign/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await campaignService.deleteCampaign(id);
      toast.success('Campaign deleted successfully');
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete campaign');
    }
  }
);

export const updateCampaignStatus = createAsyncThunk(
  'campaign/updateStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      await campaignService.updateCampaignStatus(id, status);
      return { id, status };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update campaign status');
    }
  }
);

export const renameCampaign = createAsyncThunk(
  'campaign/rename',
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      await campaignService.renameCampaign(id, name);
      return { id, name };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to rename campaign');
    }
  }
);

export const searchCampaigns = createAsyncThunk(
  'campaign/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const campaigns = await campaignService.searchCampaigns(query);
      return campaigns;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to search campaigns');
    }
  }
);

export const fetchTriggerLogs = createAsyncThunk(
  'campaign/fetchTriggerLogs',
  async (id: string, { rejectWithValue }) => {
    try {
      const logs = await campaignService.getTriggerLogs(id);
      return logs;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch trigger logs');
    }
  }
);

export const fetchUpcomingTriggers = createAsyncThunk(
  'campaign/fetchUpcomingTriggers',
  async (id: string, { rejectWithValue }) => {
    try {
      const triggers = await campaignService.getUpcomingTriggers(id);
      return triggers;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch upcoming triggers');
    }
  }
);

export const getSequenceAnalytics = createAsyncThunk(
  'campaign/getSequenceAnalytics',
  async (id: string, { rejectWithValue }) => {
    try {
      const analytics = await campaignService.getSequenceAnalytics(id);
      return analytics;
    }
    catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch sequence analytics');
    }
  }
);

export const changeCampaignStatus = createAsyncThunk(
  'campaign/changeStatus',
  async ({ id, status }: { id: string; status: CampaignStatus }, { rejectWithValue }) => {
    try {
      await campaignService.changeCampaignStatus(id, status);
      return { id, status };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to change campaign status');
    }
  }
);

// Slice – explicit CampaignState avoids "Type instantiation is excessively deep" (many thunks)
const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    clearCampaignError: (state) => {
      state.error = null;
    },
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
    setCurrentCampaign: (state, action: PayloadAction<Campaign>) => {
      state.currentCampaign = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CampaignState>) => {
    // Fetch All Campaigns
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campaigns = action.payload as unknown as Campaign[];
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Campaign By ID
    builder
      .addCase(fetchCampaignById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCampaign = action.payload as unknown as Campaign;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Campaign
    builder
      .addCase(deleteCampaign.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campaigns = state.campaigns.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Change Campaign Status
    builder
      .addCase(changeCampaignStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeCampaignStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCampaign = { ...state.currentCampaign as Campaign, status: action.payload.status as CampaignStatus };
        toast.success('Campaign status changed successfully');
      })
      .addCase(changeCampaignStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Campaign Status
    builder
      .addCase(updateCampaignStatus.fulfilled, (state, action) => {
        const campaign = state.campaigns.find((c) => c.id === action.payload.id);
        if (campaign) {
          campaign.status = action.payload.status as CampaignStatus;
          campaign.updatedAt = new Date().toISOString();
        }
      });

    // Rename Campaign
    builder
      .addCase(renameCampaign.fulfilled, (state, action) => {
        const campaign = state.campaigns.find((c) => c.id === action.payload.id);
        if (campaign) {
          campaign.name = action.payload.name;
          campaign.updatedAt = new Date().toISOString();
        }
      });

    // Search Campaigns
    builder
      .addCase(searchCampaigns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campaigns = action.payload as unknown as Campaign[];
      })
      .addCase(searchCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Trigger Logs
    builder
      .addCase(fetchTriggerLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTriggerLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.triggerLogs = action.payload as unknown as Logs[];
      })
      .addCase(fetchTriggerLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Upcoming Triggers
    builder
      .addCase(fetchUpcomingTriggers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingTriggers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingTriggers = action.payload as unknown as Logs[];
      })
      .addCase(fetchUpcomingTriggers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Sequence Analytics
    builder
      .addCase(getSequenceAnalytics.pending, (state) => {
        state.isLoadingSequenceAnalytics = true;
        state.errorSequenceAnalytics = null;
      })
      .addCase(getSequenceAnalytics.fulfilled, (state, action) => {
        state.isLoadingSequenceAnalytics = false;
        state.sequenceAnalytics = action.payload as unknown as SequenceAnalytics[];
      })
      .addCase(getSequenceAnalytics.rejected, (state, action) => {
        state.isLoadingSequenceAnalytics = false;
        state.errorSequenceAnalytics = action.payload as string;
      });
  },
});

export const { clearCampaignError, clearCurrentCampaign, setCurrentCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
