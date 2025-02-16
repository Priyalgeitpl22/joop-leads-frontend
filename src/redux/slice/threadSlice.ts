import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";
import { ThreadType } from "../../enums";

export interface Thread {
    id: string,
    user: string,
    type: ThreadType,
    createdAt: string,
}
interface ThreadState {
    threads: Thread[];
    loading: boolean;
    error: string | null;
}

const initialState: ThreadState = {
    threads: [],
    loading: false,
    error: null,
};

const token = Cookies.get("access_token");

export const getAllThreads = createAsyncThunk(
    "threads/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/thread", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response:", response.data);

            const threads = response.data?.data?.threads;

            if (!Array.isArray(threads)) {
                return rejectWithValue("Invalid API response format");
            }

            return threads;
        } catch (error: any) {
            console.error("API Error:", error);
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
