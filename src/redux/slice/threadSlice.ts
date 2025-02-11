import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

interface ThreadState {
    threads: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ThreadState = {
    threads: [],
    loading: false,
    error: null,
};

export const getAllThreads = createAsyncThunk(
    "threads/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/thread");
            return response.data.data.threads;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Network error");
        }
    }
);

const threadSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllThreads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllThreads.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.threads = action.payload;
            })
            .addCase(getAllThreads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default threadSlice.reducer;
