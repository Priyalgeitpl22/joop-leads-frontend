import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { AxiosError } from "axios";

interface Organization {
  id: string;
  name: string;
  domain: string;
  country: string;
  phone: string;
}

interface OrganizationState {
  data: Organization | null;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch organization details
export const fetchOrganization = createAsyncThunk<
  { data: Organization },
  string,
  { rejectValue: string }
>("organization/fetchOrganization", async (orgId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/org/?orgId=${orgId}`);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

const initialState: OrganizationState = {
  data: null,
  loading: false,
  error: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganization.fulfilled, (state, action: PayloadAction<{ data: Organization }>) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchOrganization.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default organizationSlice.reducer;
