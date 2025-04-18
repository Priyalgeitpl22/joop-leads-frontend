import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {api} from "../../services/api";
import Cookies from "js-cookie";
import { User } from "../../components/User-Profile/UserProfile";

export interface UserAccount {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  type: string;
  createdAt: string;
}

interface AuthState {
  user: {
    id: string;
    fullName: string;
    email: string;
    orgId: string;
    aiOrgId: string;
    profilePicture: string;
    role: string;
    online: boolean;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  passwordChangeSuccess: boolean;
}

const token = Cookies.get("access_token");

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/user", {
        headers: { Authorization: ` Bearer ${token}` },
      });
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async ({ userData }: { userData: any }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token");
      const response = await api.put("/user", userData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user details"
      );
    }
  }
);

export const createUser = createAsyncThunk<
  {
    message: string; data: User 
},
  FormData,
  { rejectValue: string }
>("user/createUser", async (formData, { rejectWithValue }) => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.post("/user/create-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create user"
    );
  }
});

export const getAllUsers = createAsyncThunk<
  { data: User[] },
  void,
  { rejectValue: string }
>("user/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("access_token");
    const response = await api.get(`/user/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
});

export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async (id: string, {rejectWithValue}) => {
    try {
      const token = Cookies.get("access_token");
      const response = await api.delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
)

export const SearchUsers = createAsyncThunk(
  "user/search-user",
  async (
    { query, orgId }: { query: string; orgId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/user/search-user", {
        params: { query, orgId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const filterUsers = createAsyncThunk(
  'user/filter',
  async ({ query, startDate, endDate }: { query: string; startDate: string; endDate: string }) => {
    try {
      const response = await api.get(`user/filter`, {
      params:{query,startDate,endDate},
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message; 
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: Cookies.get("access_token") ?? null,
    loading: false,
    error: null,
    success: null,
    passwordChangeSuccess: false,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else if (action.error.message) {
          state.error = action.error.message;
        }
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
