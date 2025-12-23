import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IMailbox,
  IEmailThread,
  IThreadMessage,
  IReplyPayload,
} from '../../services/inbox.service';
import { inboxService } from '../../services/inbox.service';

interface InboxState {
  mailboxes: IMailbox[];
  mailboxMessages: IEmailThread[];
  threadMessages: IThreadMessage[];
  searchResults: IEmailThread[];
  selectedAccountId: string | null;
  selectedMailboxId: string | null;
  currentPage: number;
  totalMessages: number;
  loading: boolean;
  threadLoading: boolean;
  searchLoading: boolean;
  error: string | null;
  appliedFilters: string[];
}

const initialState: InboxState = {
  mailboxes: [],
  mailboxMessages: [],
  threadMessages: [],
  searchResults: [],
  selectedAccountId: null,
  selectedMailboxId: null,
  currentPage: 1,
  totalMessages: 0,
  loading: false,
  threadLoading: false,
  searchLoading: false,
  error: null,
  appliedFilters: [],
};

// Async thunks
export const fetchMailboxes = createAsyncThunk(
  'inbox/fetchMailboxes',
  async (accountId: string, { rejectWithValue }) => {
    try {
      return await inboxService.getMailboxes(accountId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch mailboxes');
    }
  }
);

export const fetchEmailThreads = createAsyncThunk(
  'inbox/fetchEmailThreads',
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
      return await inboxService.getEmailThreads(accountId, page, limit, filters);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch threads');
    }
  }
);

export const fetchThreadMessages = createAsyncThunk(
  'inbox/fetchThreadMessages',
  async (
    { accountId, threadId }: { accountId: string; threadId: string },
    { rejectWithValue }
  ) => {
    try {
      return await inboxService.getThreadMessages(accountId, threadId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

export const searchEmails = createAsyncThunk(
  'inbox/searchEmails',
  async (
    {
      accountId,
      mailboxId,
      search,
      page = 1,
      limit = 10,
    }: { accountId: string; mailboxId: string; search: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      return await inboxService.searchEmails(accountId, mailboxId, search, page, limit);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to search emails');
    }
  }
);

export const markThreadAsRead = createAsyncThunk(
  'inbox/markThreadAsRead',
  async (threadId: string, { rejectWithValue }) => {
    try {
      await inboxService.markThreadAsRead(threadId);
      return threadId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to mark as read');
    }
  }
);

export const sendReply = createAsyncThunk(
  'inbox/sendReply',
  async (payload: IReplyPayload, { rejectWithValue }) => {
    try {
      return await inboxService.sendReply(payload);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to send reply');
    }
  }
);

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<string | null>) => {
      state.selectedAccountId = action.payload;
      state.mailboxes = [];
      state.mailboxMessages = [];
      state.selectedMailboxId = null;
    },
    setSelectedMailbox: (state, action: PayloadAction<string | null>) => {
      state.selectedMailboxId = action.payload;
      state.mailboxMessages = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setAppliedFilters: (state, action: PayloadAction<string[]>) => {
      state.appliedFilters = action.payload;
    },
    clearFilters: (state) => {
      state.appliedFilters = [];
    },
    clearThreadMessages: (state) => {
      state.threadMessages = [];
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    resetInbox: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch mailboxes
    builder
      .addCase(fetchMailboxes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMailboxes.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxes = action.payload;
      })
      .addCase(fetchMailboxes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch email threads
    builder
      .addCase(fetchEmailThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.mailboxMessages = action.payload.messages;
        state.totalMessages = action.payload.totalMessages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchEmailThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch thread messages
    builder
      .addCase(fetchThreadMessages.pending, (state) => {
        state.threadLoading = true;
        state.error = null;
      })
      .addCase(fetchThreadMessages.fulfilled, (state, action) => {
        state.threadLoading = false;
        state.threadMessages = action.payload;
      })
      .addCase(fetchThreadMessages.rejected, (state, action) => {
        state.threadLoading = false;
        state.error = action.payload as string;
      });

    // Search emails
    builder
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
      });

    // Mark thread as read
    builder.addCase(markThreadAsRead.fulfilled, (state, action) => {
      const threadId = action.payload;
      state.mailboxMessages = state.mailboxMessages.map((msg) =>
        msg.threadId === threadId
          ? { ...msg, flags: msg.flags?.filter((f) => f !== 'UNREAD') }
          : msg
      );
    });
  },
});

export const {
  setSelectedAccount,
  setSelectedMailbox,
  setCurrentPage,
  setAppliedFilters,
  clearFilters,
  clearThreadMessages,
  clearSearchResults,
  resetInbox,
} = inboxSlice.actions;

export default inboxSlice.reducer;

