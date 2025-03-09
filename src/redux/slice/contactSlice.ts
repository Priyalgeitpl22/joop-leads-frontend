import { createAsyncThunk} from "@reduxjs/toolkit";
import { api, emailApi } from "../../services/api";
import { AxiosError } from "axios";

export interface ContactsAccount {
  id: string;
  first_name : string;
  last_name : string;
  email: string;
  phone_number : string;
  type: string;
  createdAt:string;
}

export interface VerifyEmailAccountPayload {
    id: string;
    first_name : string;
    last_name : string;
    email: string;
    phone_number : string;
    type: string;
    createdAt:string;
}

export interface CreateContactsAccountPayload{
  first_name: string;
  last_name:string;
  email: string;
  phone_number:String
  company_name:String
  website:String
  linkedin_profile:String
  campaign_id:String
  location:String
  orgId:String
  file_name:String
  blocked:Boolean
  unsubscribed:Boolean
  active:Boolean

}

export const fetchContacts = createAsyncThunk(
  "email-campaign/all-contacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/email-campaign/all-contacts");
      console.log("response",response.data.data);
      return response.data.data;

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

export const CreateContactsAccount = createAsyncThunk<
  string,
  CreateContactsAccountPayload,
  { rejectValue: string }
>(
  "/email-campaign/create-contacts", 
  async (data: CreateContactsAccountPayload, { rejectWithValue }) => {
  try {
    const response = await api.post(`/email-campaign/create-contacts`, data);
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