import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { AxiosError } from "axios";

// Define the Availability interface
export interface Availability {
  day: string;
  from: string;
  to: string;
}

// Define the Agent interface
export interface Agent {
  id: string;
  fullName: string;
  email: string;
  role: string;
  orgId: string;
  profilePicture: string | null;
  phone?: string;
  availability?: Availability[];
  timezone?: string;
}

// Define the state interface for agents
interface AgentState {
  data: Agent[] | null;
  loading: boolean;
  error: string | null;
}

// Define the payload interface for creating an agent
interface CreateAgentPayload {
  email: string;
  fullName: string;
  phone: string;
  orgId: string;
  profilePicture?: File;
  schedule?:any
}

// Async thunk to fetch agents by organization ID
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

// Async thunk to create a new agent via a POST API call
export const createAgent = createAsyncThunk<
  { data: Agent },
  CreateAgentPayload,
  { rejectValue: string }
>("agents/createAgent", async (payload, { rejectWithValue }) => {
  try {
    // Build form data for file upload and other fields
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("fullName", payload.fullName);
    formData.append("phone", payload.phone);
    formData.append("orgId", payload.orgId);
    if (payload.profilePicture) {
      formData.append("profilePicture", payload.profilePicture);
    }
    const response = await api.post("/agent", formData, {
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
      // fetchAgents cases
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
