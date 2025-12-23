import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { emailAccountService } from '../../services/email.account.service';
import type { Account } from '../../types/emailAccount.types';

interface EmailAccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailAccountState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchEmailAccounts = createAsyncThunk(
  'emailAccount/fetchAll',
  async (orgId: string, { rejectWithValue }) => {
    try {
      return await emailAccountService.getEmailAccounts(orgId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch email accounts');
    }
  }
);

export const fetchEmailAccountById = createAsyncThunk(
  'emailAccount/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await emailAccountService.getEmailAccountById(id);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch email account');
    }
  }
);

export const deleteEmailAccount = createAsyncThunk(
  'emailAccount/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await emailAccountService.deleteEmailAccount(id);
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete email account');
    }
  }
);

const emailAccountSlice = createSlice({
  name: 'emailAccount',
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    clearEmailAccountError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all accounts
    builder
      .addCase(fetchEmailAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchEmailAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single account
    builder
      .addCase(fetchEmailAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAccount = action.payload as unknown as Account;
      })
      .addCase(fetchEmailAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete account
    builder
      .addCase(deleteEmailAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmailAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter((acc) => acc._id !== action.payload);
      })
      .addCase(deleteEmailAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAccount, clearEmailAccountError } = emailAccountSlice.actions;
export default emailAccountSlice.reducer;

