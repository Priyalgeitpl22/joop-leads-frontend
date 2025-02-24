import { createAsyncThunk} from "@reduxjs/toolkit";
import emailApi from "../../services/api";
import { AxiosError } from "axios";

export interface EmailAccount {
  id: string;
  name: string;
  email: string;
  type: string;
}

export const fetchEmailAccount = createAsyncThunk(
  "accounts",
  async (_, { rejectWithValue }) => {
  try {
    const response = await emailApi.get("/accounts");
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof AxiosError) {
      errorMessage = (error.response?.data as string) || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

export const addOuthEmailAccount = createAsyncThunk(
  "oauth/auth-url",
  async (_, { rejectWithValue }) => {
    try {
      const origin = encodeURIComponent(window.location.href);
      const response = await emailApi.get(`/oauth/auth-url?origin=${origin}`);
      return response.data.url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);