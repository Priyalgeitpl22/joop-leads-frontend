import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import type { IUser, UserState, UpdateUserData, CreateUserData } from '../../types/user.types';

const initialState: UserState = {
  currentUser: null,
  users: [],
  isFetchingCurrentUser: true,
  isFetchingUsers: false,
  isUpdatingUser: false,
  isInitialized: false,
  error: null,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await userService.getCurrentUser();

      if (!user) {
        return rejectWithValue("Unauthorized");
      }

      return user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'user/updateCurrentUser',
  async (data: UpdateUserData, { rejectWithValue }) => {
    try {
      const user = await userService.updateUser(data);
      return user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await userService.getAllUsers();
      return users;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: CreateUserData, { rejectWithValue }) => {
    try {
      const user = await userService.createUser(data);
      return user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to create user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Current User
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isFetchingCurrentUser = false;
        state.isInitialized = true;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isFetchingCurrentUser = false;
        state.isInitialized = true;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Update Current User
    builder
      .addCase(updateCurrentUser.pending, (state) => {
        state.isUpdatingUser = true;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
        state.currentUser = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.error = action.payload as string;
      });

    // Fetch All Users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isFetchingUsers = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isFetchingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isFetchingUsers = false;
        state.error = action.payload as string;
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.isUpdatingUser = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
        if (action.payload.data) {
          state.users.push(action.payload.data);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.error = action.payload as string;
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isUpdatingUser = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserError, clearCurrentUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
