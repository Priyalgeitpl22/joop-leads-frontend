import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

interface Chat {
  createdAt: string | number | Date;
  id: string;
  threadId: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface chatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: chatState = {
  chats: [],
  loading: false,
  error: null,
};

export const getchats = createAsyncThunk(
  "chats/getchats",
  async (threadId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/message/${threadId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch chats");
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addchat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getchats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getchats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(getchats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addchat } = chatSlice.actions;
export default chatSlice.reducer;
