import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

interface UserData {
  email: string;
  fullName: string;
  orgName: string;
  domain: string;
  country: string;
  phone: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface OtpData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
}

interface ChangePasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

interface AuthState {
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData); 
      return response.data;  
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData: OtpData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-otp", otpData); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/resetPassword", data); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: ChangePasswordData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/changePassword", data); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginData); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string; 
        } else if (action.error.message) {
          state.error = action.error.message; 
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string; 
        } else if (action.error.message) {
          state.error = action.error.message; 
        }
      })
      
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string; 
        } else if (action.error.message) {
          state.error = action.error.message; 
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string; 
        } else if (action.error.message) {
          state.error = action.error.message; 
        }
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string; 
        } else if (action.error.message) {
          state.error = action.error.message; 
        }
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
