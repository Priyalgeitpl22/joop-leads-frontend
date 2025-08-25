import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emailApi } from "../../services/api";
import { ReactNode } from "react";

export interface Account {
  createdAt: ReactNode;
  _id: string;
  name: string;
  email: string;
}
export interface ReplyPayload {
  from: { name: string; address: string };
  to: { name: string; address: string };
  emailTemplate: { subject: string; emailBody: string };
  messageId: string;
  threadId: string;
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
  searchResults: any;
  mailboxMessages: Message[];
  accounts: Account[];
  mailboxes: Mailbox[];
  selectedAccountId: string | null;
  selectedMailboxId: string | null;
  currentPage: number;
  totalMessages: number;
  loading: boolean;
  error: string | null;
  searchLoading: boolean;
  results: Message[];
  threadMessages: Message[];
  appliedFilters:string[];
}

const initialState: EmailInboxState = {
  searchResults: [],
  accounts: [],
  mailboxes: [],
  mailboxMessages: [],
  threadMessages: [],
  selectedAccountId: null,
  selectedMailboxId: null,
  currentPage: 1,
  totalMessages: 0,
  loading: false,
  error: null,
  searchLoading: false,
  results: [],
  appliedFilters:[]
};

export const getAllChats = createAsyncThunk(
  "emailInbox/getAllChats",
  async ({ orgId }: { orgId: string }, { rejectWithValue }) => {
    try {
      const response = await emailApi.get("/accounts", {
        params: { orgId },
      });

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

export const getAllEmailThreads = createAsyncThunk(
  "emailInbox/getAllEmailThreads",
  async (
    {
      accountId,
      page = 1,
      limit = 10,
      filters = [],
    }: { accountId: string; page?: number; limit?: number; filters?: string[] },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        page,
        limit,
        ...(filters.length > 0 && { filters: JSON.stringify(filters) }), // Encode filters as JSON array
      };
      const response = await emailApi.get(`/accounts/${accountId}/allThreads`, {
        params,
      });

      return {
        messages: response.data?.data?.messages || [],
        totalMessages: response.data?.data?.totalMessages || 0,
        currentPage: Number(response.data?.data?.currentPage) || 1,
      };
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const reloadAccountMailboxes = createAsyncThunk(
  "emailInbox/reloadAccountMailboxes",
  async ({ accountId }: { accountId: string }, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/${accountId}/loadmailboxes`);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const reloadAccountMessages = createAsyncThunk(
  "emailInbox/reloadAccountMailboxes",
  async ({ accountId }: { accountId: string }, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/${accountId}/load-messages`);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const markThreadAsRead = createAsyncThunk(
  "emailInbox/markThreadAsRead",
  async (
    { threadId }: { threadId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.patch(`/accounts/message/read-thread`, { threadId });
      return { threadId, response: response.data };
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);


export const searchEmails = createAsyncThunk(
  "emailSearch/searchEmails",
  async ({
    accountId,
    mailboxId,
    search,
    page = 1,
    limit = 10,
  }: {
    accountId: string;
    mailboxId: string;
    search: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await emailApi.get(`/accounts/${accountId}/${mailboxId}/messages`, {
      params: { limit, page, search },
    });
    return response.data.data;
  }
);

export const getAllThreadsMessages = createAsyncThunk(
  "emailInbox/getEmailThread",
  async (
    { accountId, threadId }: { accountId: string; threadId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.get(`/accounts/${accountId}/thread/${threadId}`);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch thread:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const sentEmailReply = createAsyncThunk(
  "emailInbox/sentEmailReply",
  async (payload: ReplyPayload, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/send-reply-email`, payload);
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
    setSelectedAccount: (state, action: PayloadAction<string | null>) => {
      state.selectedAccountId = action.payload;
      state.mailboxes = [];
      state.mailboxMessages = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedMailbox: (state, action: PayloadAction<string | null>) => {
      state.selectedMailboxId = action.payload;
      state.mailboxMessages = [];
    },
    resetMailboxes: (state) => {
      state.mailboxes = [];
      state.mailboxMessages = [];
    },
    setAppliedFilters: (state, action: PayloadAction<string[]>) => {
      state.appliedFilters = action.payload;
    },
    clearFilters: (state) => {
      state.appliedFilters = [];
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(getAllEmailThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmailThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxMessages = action.payload.messages;
        state.totalMessages = action.payload?.totalMessages || 0;
      })
      .addCase(getAllEmailThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchEmails.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchEmails.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload?.messages || [];
      })
      .addCase(searchEmails.rejected, (state) => {
        state.searchLoading = false;
        state.searchResults = [];
      })
      .addCase(getAllThreadsMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllThreadsMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.threadMessages = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllThreadsMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markThreadAsRead.pending,(state)=>{
        state.error = null
      })
      .addCase(markThreadAsRead.fulfilled, (state, action) => {
        const { threadId } = action.payload;
        state.mailboxMessages = state.mailboxMessages.map((msg: any) =>
          msg.threadId === threadId
            ? { ...msg, flags: msg.flags?.filter((f: string) => f !== "UNREAD") }
            : msg
        );
        state.threadMessages = state.threadMessages.map((msg: any) =>
          msg.threadId === threadId
            ? { ...msg, flags: msg.flags?.filter((f: string) => f !== "UNREAD") }
            : msg
        );
      })
      .addCase(markThreadAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedAccount,
  setSelectedMailbox,
  resetMailboxes,
  setCurrentPage,
  setAppliedFilters,
  clearFilters
} = emailInboxSlice.actions;

export default emailInboxSlice.reducer;