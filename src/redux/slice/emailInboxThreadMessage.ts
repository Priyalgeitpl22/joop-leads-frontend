import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "./emailInboxSlice";
import { emailApi } from "../../services/api";


interface MessagesState{
    loading:boolean,
    threadMessages: Message[],
    error:string|null
}

const initialState:MessagesState ={
    loading:false,
    threadMessages:[],
    error:null
}

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

const threadMessages = createSlice({
    name:"ThreadMessages",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
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
    }
})

export default threadMessages.reducer

