import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { AxiosError } from "axios";
interface ScheduleSlot {
  day: string;
  hours: { startTime: string; endTime: string }[];
}
export interface Agent {
  id: string;
  fullName: string;
  email: string;
  role: string;
  orgId: string;
  aiOrgId: string;
  profilePicture: string | null;
  phone?: string;
  schedule: {
    timeZone: string;
    schedule: ScheduleSlot[];
  };
}
interface AgentState {
  data: Agent[] | null;
  loading: boolean;
  error: string | null;
}

interface CreateAgentPayload {
  email: string;
  fullName: string;
  phone: string;
  orgId: string;
  profilePicture?: File;
  schedule?:any
}

export const fetchAgents = createAsyncThunk<
  { data: Agent[] },
  string,
  { rejectValue: string }
>("agents/fetchAgents", async (orgId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/agent/org/${orgId}`);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

export const createAgent = createAsyncThunk<
  { data: Agent },
  CreateAgentPayload,
  { rejectValue: string }
>("agents/createAgent", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/agent", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

export const updateAgent = createAsyncThunk<
  { data: Agent },
  { agentId: string; data: any },
  { rejectValue: string }
>(
  "organization/updateAgent",
  async ({ agentId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/agent?id=${agentId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Ensure correct headers
      });
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage =
          (error.response?.data as string) || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: AgentState = {
  data: null,
  loading: false,
  error: null,
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgents.fulfilled,
        (state, action: PayloadAction<{ data: Agent[] }>) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchAgents.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // createAgent cases
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createAgent.fulfilled,
        (state, action: PayloadAction<{ data: Agent }>) => {
          state.loading = false;
          state.data = state.data ? [...state.data, action.payload.data] : [action.payload.data];
        }
      )
      .addCase(createAgent.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default agentsSlice.reducer;
