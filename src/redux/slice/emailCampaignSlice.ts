import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, emailApi } from "../../services/api";
import { AxiosError } from "axios";

export interface EmailCampaign {
  id: string;
  campaignName: string;
}

const BASE_URL = "/email-campaign";

export const fetchEmailCampaigns = createAsyncThunk(
  "emailCampaign/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await emailApi.get(`${BASE_URL}`);
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
      const response = await api.post(`${BASE_URL}/add-leads-to-campaign`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Corrected this line
    } catch (error: unknown) {
      let errorMessage = "Network error";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
