import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { api } from "../../services/api";
interface LeadState {
  leads: Lead[];
  selectedLead: Lead | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  selectedLead: null,
  loading: false,
  error: null,
};

const token = Cookies.get("access_token");

/* -------------------------------------------------------------------------- */
/*                                   Thunks                                   */
/* -------------------------------------------------------------------------- */

export const fetchLeads = createAsyncThunk<Lead[], void, { rejectValue: string }>(
  "lead/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/lead", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data as Lead[];
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch leads");
    }
  }
);

export const fetchLeadById = createAsyncThunk<
  Lead,
  string,
  { rejectValue: string }
>("lead/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/lead/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data as Lead;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch lead");
  }
});

export const createLead = createAsyncThunk<
  Lead,
  Partial<Lead>,
  { rejectValue: string }
>("lead/create", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/lead", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data as Lead;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || "Failed to create lead");
  }
});

export const updateLead = createAsyncThunk<
  Lead,
  { id: string; data: Partial<Lead> },
  { rejectValue: string }
>("lead/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/lead/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data as Lead;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || "Failed to update lead");
  }
});

export const deleteLeads = createAsyncThunk<
  string[],
  string[],
  { rejectValue: string }
>("lead/delete", async (leadIds, { rejectWithValue }) => {
  try {
    await api.delete("/lead", {
      data: { leadIds },
      headers: { Authorization: `Bearer ${token}` },
    });
    return leadIds;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || "Failed to delete leads");
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    clearSelectedLead(state) {
      state.selectedLead = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.selectedLead = action.payload;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.leads.unshift(action.payload);
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.leads = state.leads.map((l) =>
          l.id === action.payload.id ? action.payload : l
        );
      })
      .addCase(deleteLeads.fulfilled, (state, action) => {
        state.leads = state.leads.filter(
          (l) => !action.payload.includes(l.id)
        );
      });
  },
});

export const { clearSelectedLead } = leadSlice.actions;
export default leadSlice.reducer;
