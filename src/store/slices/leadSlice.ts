import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { leadsService } from '../../services/leads.service';
import type { ILead, ICreateLead, IUpdateLead } from '../../types/lead.types';

// ============================================================================
// State Interface
// ============================================================================

export interface LeadState {
  leads: ILead[];
  selectedLead: ILead | null;
  searchResults: ILead[];
  filteredLeads: ILead[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: LeadState = {
  leads: [],
  selectedLead: null,
  searchResults: [],
  filteredLeads: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 25,
    total: 0,
  },
};

// ============================================================================
// Async Thunks
// ============================================================================

// Fetch all leads
export const fetchAllLeads = createAsyncThunk(
  'lead/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await leadsService.getAllLeads();
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch leads');
    }
  }
);

// Fetch lead by ID
export const fetchLeadById = createAsyncThunk(
  'lead/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await leadsService.getLeadById(id);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch lead');
    }
  }
);

// Create lead
export const createLead = createAsyncThunk(
  'lead/create',
  async (data: ICreateLead, { rejectWithValue }) => {
    try {
      const response = await leadsService.createLead(data as ILead);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to create lead');
    }
  }
);

// Update lead
export const updateLead = createAsyncThunk(
  'lead/update',
  async ({ id, data }: { id: string; data: IUpdateLead }, { rejectWithValue }) => {
    try {
      const response = await leadsService.updateLead(id, data as ILead);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update lead');
    }
  }
);

// Delete single lead
export const deleteLead = createAsyncThunk(
  'lead/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await leadsService.deleteLead(id);
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete lead');
    }
  }
);

// Delete multiple leads
export const deleteLeads = createAsyncThunk(
  'lead/deleteMultiple',
  async (leadIds: string[], { rejectWithValue }) => {
    try {
      await leadsService.deleteLeads(leadIds);
      return leadIds;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete leads');
    }
  }
);

// Search leads
export const searchLeads = createAsyncThunk(
  'lead/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await leadsService.searchLeads(query);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to search leads');
    }
  }
);

// Filter leads
export const filterLeads = createAsyncThunk(
  'lead/filter',
  async (params: { status?: string; startDate?: string; endDate?: string }, { rejectWithValue }) => {
    try {
      const response = await leadsService.filterLeads(params);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to filter leads');
    }
  }
);

// Unsubscribe lead
export const unsubscribeLead = createAsyncThunk(
  'lead/unsubscribe',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await leadsService.unsubscribeLead(email);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to unsubscribe lead');
    }
  }
);

// ============================================================================
// Slice
// ============================================================================

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    clearLeadError: (state) => {
      state.error = null;
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null;
    },
    setSelectedLead: (state, action: PayloadAction<ILead>) => {
      state.selectedLead = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearFilteredLeads: (state) => {
      state.filteredLeads = [];
    },
    setPagination: (state, action: PayloadAction<{ page?: number; limit?: number; total?: number }>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Fetch All Leads
    builder
      .addCase(fetchAllLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = action.payload;
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Lead By ID
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedLead = action.payload;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Lead
    builder
      .addCase(createLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads.unshift(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Lead
    builder
      .addCase(updateLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.leads.findIndex((lead) => lead.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        if (state.selectedLead?.id === action.payload.id) {
          state.selectedLead = action.payload;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Single Lead
    builder
      .addCase(deleteLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
        if (state.selectedLead?.id === action.payload) {
          state.selectedLead = null;
        }
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Multiple Leads
    builder
      .addCase(deleteLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.filter((lead) => !action.payload.includes(lead.id));
        if (state.selectedLead && action.payload.includes(state.selectedLead.id)) {
          state.selectedLead = null;
        }
      })
      .addCase(deleteLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Search Leads
    builder
      .addCase(searchLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Filter Leads
    builder
      .addCase(filterLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredLeads = action.payload;
      })
      .addCase(filterLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Unsubscribe Lead
    builder
      .addCase(unsubscribeLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unsubscribeLead.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the lead in the list if it exists
        const updatedLead = action.payload;
        const index = state.leads.findIndex((lead) => lead.email === updatedLead.email);
        if (index !== -1) {
          state.leads[index] = { ...state.leads[index], isUnsubscribed: true, unsubscribedAt: new Date() };
        }
      })
      .addCase(unsubscribeLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearLeadError,
  clearSelectedLead,
  setSelectedLead,
  clearSearchResults,
  clearFilteredLeads,
  setPagination,
} = leadSlice.actions;

export default leadSlice.reducer;

