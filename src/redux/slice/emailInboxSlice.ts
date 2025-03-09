import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emailApi } from "../../services/api";
import { ReactNode } from "react";

export interface Account {
  createdAt: ReactNode;
  _id: string;
  name: string;
  email: string;
}

export interface Mailbox {
  _id: string;
  id: string;
  name: string;
}

export interface Message {
  id: string;
  subject: string;
  body: string;
  sender: string;
}

interface EmailInboxState {
  mailboxMessages: any;
  accounts: Account[];
  mailboxes: Mailbox[];
  messages: Message[];
  selectedAccountId: string | null;
  selectedMailboxId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailInboxState = {
  accounts: [],
  mailboxes: [],
  messages: [],
  selectedAccountId: null,
  selectedMailboxId: null,
  loading: false,
  error: null,
  mailboxMessages: []
};

export const getAllChats = createAsyncThunk(
  "emailInbox/getAllChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await emailApi.get("/accounts");

      if (!Array.isArray(response.data)) {
        return rejectWithValue("Invalid API response format");
      }

      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const getAllMailBox = createAsyncThunk(
  "emailInbox/getAllMailBox",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await emailApi.get(`/accounts/${accountId}/mailboxes`);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const getAllAccountMailBox = createAsyncThunk(
  "emailInbox/getAllAccountMailBox",
  async (
    { accountId, mailBoxId }: { accountId: string; mailBoxId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.get(
        `/accounts/${accountId}/${mailBoxId}/messages`
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

const emailInboxSlice = createSlice({
  name: "emailInbox",
  initialState,
  reducers: {
    // Store selected account & clear previous mailboxes/messages
    setSelectedAccount: (state, action: PayloadAction<string | null>) => {
      state.selectedAccountId = action.payload;
      state.mailboxes = [];
      state.messages = [];
    },

    // Store selected mailbox & clear previous messages
    setSelectedMailbox: (state, action: PayloadAction<string | null>) => {
      state.selectedMailboxId = action.payload;
      state.messages = [];
    },
    resetMailboxes: (state) => {
      state.mailboxes = [];
      state.mailboxMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Accounts
      .addCase(getAllChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Mailboxes
      .addCase(getAllMailBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMailBox.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxes = action.payload;
      })
      .addCase(getAllMailBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Messages
      .addCase(getAllAccountMailBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccountMailBox.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxMessages = action.payload;
      })
      .addCase(getAllAccountMailBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAccount, setSelectedMailbox ,resetMailboxes} =
  emailInboxSlice.actions;
export default emailInboxSlice.reducer;