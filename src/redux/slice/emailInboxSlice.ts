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

export interface Thread {
  threadId: string;
  messageCount: number;
  latestMessage: {
    _id: string;
    subject: string;
    from: { name: string; address: string }[];
    to: { name: string; address: string }[];
    date: string;
    body: string;
    html?: string;
  };
}

export interface ThreadMessage {
  _id: string;
  subject: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  date: string;
  body: string;
  html?: string;
  threadId: string;
}

interface EmailInboxState {
  searchResults: any;
  mailboxMessages: Message[];
  accounts: Account[];
  mailboxes: Mailbox[];
  threads: Thread[];
  threadMessages: ThreadMessage[];
  selectedAccountId: string | null;
  selectedMailboxId: string | null;
  selectedThreadId: string | null;
  currentPage: number;
  totalMessages: number;
  totalThreads: number;
  loading: boolean;
  threadsLoading: boolean;
  threadMessagesLoading: boolean;
  error: string | null;
  searchLoading: boolean;
  results: Message[];
  viewMode: 'messages' | 'threads';
}

const initialState: EmailInboxState = {
  searchResults: [],
  accounts: [],
  mailboxes: [],
  mailboxMessages: [],
  threads: [],
  threadMessages: [],
  selectedAccountId: null,
  selectedMailboxId: null,
  selectedThreadId: null,
  currentPage: 1,
  totalMessages: 0,
  totalThreads: 0,
  loading: false,
  threadsLoading: false,
  threadMessagesLoading: false,
  error: null,
  searchLoading: false,
  results: [],
  viewMode: 'messages',
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

export const getAllAccountMailBox = createAsyncThunk(
  "emailInbox/getAllAccountMailBox",
  async (
    {
      accountId,
      mailBoxId,
      page = 1,
      limit = 10,
    }: { accountId: string; mailBoxId: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.get(
        `/accounts/${accountId}/${mailBoxId}/messages?page=${page}&limit=${limit}`
      );


      return {
        messages: response.data?.data?.messages || [],
        totalMessages: response.data?.data?.totalMessages || 0,
        currentPage: Number(response.data?.data?.currentPage) || 1,
      };
    } catch (error: any) {
      // console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const reloadAccountMailboxes = createAsyncThunk(
  "emailInbox/reloadAccountMailboxes",
  async (
    { accountId }: { accountId: string },
    { rejectWithValue }
  ) => {
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
  async (
    { accountId }: { accountId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.post(`/accounts/${accountId}/load-messages`);
      return response.data; 
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
    const response = await emailApi.get(
      `/accounts/${accountId}/${mailboxId}/messages`,
      {
        params: { limit, page, search },
      }
    );
    return response.data.data;
  }
);

// Get all threads for an account
export const getAccountThreads = createAsyncThunk(
  "emailInbox/getAccountThreads",
  async (
    {
      accountId,
      mailboxId = null,
      page = 1,
      limit = 10,
      search = "",
    }: { accountId: string; mailboxId?: string | null; page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      let url = `/accounts/${accountId}/threads?page=${page}&limit=${limit}`;
      
      if (search) {
        url += `&search=${search}`;
      }
      
      if (mailboxId) {
        url += `&mailbox=${mailboxId}`;
      }
      
      const response = await emailApi.get(url);

      return {
        threads: response.data?.data?.threads || [],
        totalThreads: response.data?.data?.totalThreads || 0,
        currentPage: Number(response.data?.data?.currentPage) || 1,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

// Get messages for a thread
export const getThreadMessages = createAsyncThunk(
  "emailInbox/getThreadMessages",
  async (
    {
      accountId,
      threadId,
      mailboxId = null,
    }: { accountId: string; threadId: string; mailboxId?: string | null },
    { rejectWithValue }
  ) => {
    try {
      let url = `/accounts/${accountId}/thread/${threadId}`;
      
      if (mailboxId) {
        url += `?mailbox=${mailboxId}`;
      }
      
      const response = await emailApi.get(url);

      return {
        messages: response.data?.data?.messages || [],
        threadId: response.data?.data?.threadId,
        count: response.data?.data?.count || 0,
      };
    } catch (error: any) {
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
      state.mailboxMessages = [];
      state.threads = [];
      state.threadMessages = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Store selected mailbox & clear previous messages
    setSelectedMailbox: (state, action: PayloadAction<string | null>) => {
      state.selectedMailboxId = action.payload;
      state.mailboxMessages = [];
    },
    resetMailboxes: (state) => {
      state.mailboxes = [];
      state.mailboxMessages = [];
      state.threads = [];
      state.threadMessages = [];
    },
    setSelectedThread: (state, action: PayloadAction<string | null>) => {
      state.selectedThreadId = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'messages' | 'threads'>) => {
      state.viewMode = action.payload;
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

      .addCase(getAllAccountMailBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccountMailBox.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxMessages = action.payload.messages;
        state.totalMessages = action.payload?.totalMessages || 0;
      
      })
      .addCase(getAllAccountMailBox.rejected, (state, action) => {
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

      // Thread APIs
      .addCase(getAccountThreads.pending, (state) => {
        state.threadsLoading = true;
        state.error = null;
      })
      .addCase(getAccountThreads.fulfilled, (state, action) => {
        state.threadsLoading = false;
        // Ensure we only store valid threads
        state.threads = Array.isArray(action.payload.threads) ? 
          action.payload.threads.filter(thread => thread && thread.latestMessage) : 
          [];
        state.totalThreads = action.payload.totalThreads || 0;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getAccountThreads.rejected, (state, action) => {
        state.threadsLoading = false;
        state.error = action.payload as string;
        state.threads = [];
      })

      // Thread Messages
      .addCase(getThreadMessages.pending, (state) => {
        state.threadMessagesLoading = true;
        state.error = null;
      })
      .addCase(getThreadMessages.fulfilled, (state, action) => {
        state.threadMessagesLoading = false;
        // Ensure we only store valid messages
        state.threadMessages = Array.isArray(action.payload.messages) ? 
          action.payload.messages : [];
      })
      .addCase(getThreadMessages.rejected, (state, action) => {
        state.threadMessagesLoading = false;
        state.error = action.payload as string;
        state.threadMessages = [];
      })
  },
});

  export const {
    setSelectedAccount,
    setSelectedMailbox,
    resetMailboxes,
    setCurrentPage,
    setSelectedThread,
    setViewMode,
  } = emailInboxSlice.actions;

export default emailInboxSlice.reducer;