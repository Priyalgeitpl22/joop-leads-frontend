import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, emailApi } from "../../services/api";
import { AxiosError } from "axios";
import { CampaignSettingsPayload } from "../../pages/Email-Campaign/NewCampaign/SetupCampaign/Interface";

const BASE_URL = "/email-campaign";

export const fetchEmailCampaigns = createAsyncThunk(
  "emailCampaign/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const addLeadsToCampaign = createAsyncThunk(
  "emailCampaign/addLeads",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/add-leads-to-campaign`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Network error";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const addEmailCampaignSettings = createAsyncThunk<
  string,
  CampaignSettingsPayload,
  { rejectValue: string }
>(
  "api/email-campaign/add-email-campaign-settings",
  async (data: CampaignSettingsPayload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/add-email-campaign-settings`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Network error";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const addSequencesToCampaign = createAsyncThunk(
  "emailCampaign/addSequences",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/add-sequence-to-campaign`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Network error";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCampaignContacts = createAsyncThunk(
  "emailCampaign/fetchAll",
  async (campaignId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/contacts/${campaignId}`);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCampaignSequences = createAsyncThunk(
  "emailCampaign/fetchAll",
  async (campaignId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/sequences/${campaignId}`);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const SendTestEmail = createAsyncThunk(
  "accounts/send-test-email",
  async (data: { email: string | string[], toEmail: string  }, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(`/accounts/send-test-email`, {
        email: data.email,
        toEmail: data.toEmail,
      });
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Network error";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const scheduleCampaign = createAsyncThunk(
  "email-campaign/schedule-campaign",
  async (
    { campaignId, status }: { campaignId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/email-campaign/schedule-campaign`, {
        campaignId,
        status,
      });
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = (error.response?.data as string) || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const SearchEmailCampaign = createAsyncThunk(
  "email-campaign/email-campaigns-search",
  async (
    { campaign_name }: { campaign_name?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/email-campaign/email-campaigns-search", {
        params: { campaign_name },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);