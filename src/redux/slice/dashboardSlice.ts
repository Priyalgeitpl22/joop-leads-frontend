import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";

interface DashboardState {
  dashboardData: any | null;
  loading: boolean;
  error: string | null;
}

export const DashboardDetails = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("dashboard/getDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/email-campaign/dashboard/data");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
});


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardData: null,
    loading: false,
    error: null,
  } as DashboardState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DashboardDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        DashboardDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dashboardData = action.payload;
        }
      )
      .addCase(DashboardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
