import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
}

interface ForgetPasswordData {
  email: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
};

export const forgetPassword = createAsyncThunk(
  "auth/forget-password",
  async (data: ForgetPasswordData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/forget-password`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to send forget password email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/reset-password`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to reset password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccessState: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccessState } = authSlice.actions;
export default authSlice.reducer;
