import { createAsyncThunk} from "@reduxjs/toolkit";
import { emailApi } from "../../services/api";
import { AxiosError } from "axios";

export interface EmailAccount {
  _id: string;
  name: string;
  email: string;
  type: string;
}

export interface VerifyEmailAccountPayload {
  type: string;
  email?: string;
  imap: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  proxy: null | string;
  smtpEhloName: string;
}

export interface CreateEmailAccountPayload {
  account: string;
  name: string;
  state: string;
  type: string;
  email: string;
  imap: {
    auth: {
      user: string;
      pass: string;
    };
    host: string;
    port: number;
    secure: boolean;
  };
  smtp: {
    auth: {
      user: string;
      pass: string;
    };
    host: string;
    port: number;
    secure: boolean;
  };
  proxy: null | string;
  smtpEhloName: string;
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

export const addOutlookEmailAccount = createAsyncThunk(
  "outlook/auth-url",
  async (__dirname, {rejectWithValue}) => {
    try {
      const origin = encodeURIComponent(window.location.href);
      const response = await emailApi.get(`/outlook/auth-url?origin=${origin}`);
      return response.data.url;
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  });

export const verifyEmailAccount = createAsyncThunk<
  string,
  VerifyEmailAccountPayload,
  { rejectValue: string }
>(
  "accounts/verify",
  async ( data: VerifyEmailAccountPayload, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/verify`, data);
      return response.data.url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const CreateEmailAccount = createAsyncThunk<
  string,
  CreateEmailAccountPayload,
  { rejectValue: string }
>(
  "accounts", 
  async (data: CreateEmailAccountPayload, { rejectWithValue }) => {
  try {
    const response = await emailApi.post(`/accounts`, data);
    return response.data.url;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Network error");
  }
});

export const SearchEmailAccount = createAsyncThunk(
  "accounts/search",
  async (
    { email, name }: { email?: string; name?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.get(`/accounts/search`, {
        params: { email, name },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);