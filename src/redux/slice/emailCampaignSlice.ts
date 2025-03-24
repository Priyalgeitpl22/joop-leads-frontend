import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, emailApi } from "../../services/api";
import { AxiosError } from "axios";
import { CampaignSettingsPayload } from "../../pages/Email-Campaign/NewCampaign/SetupCampaign/Interface";
import Cookies from "js-cookie";

const BASE_URL = "/email-campaign";
const token = Cookies.get("access_token");
interface Campaign {
  id: string;
  name: string;
}


export const fetchEmailCampaigns = createAsyncThunk(
  "emailCampaign/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

export const getCampaignById = createAsyncThunk(
  "emailCampaign/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

export const getCampaignBySender = createAsyncThunk(
  "emailAccount/campaignSenderAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/get-campaigns-by-sender?sender_account_id=${id}`)
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
)

export const addLeadsToCampaign = createAsyncThunk(
  "emailCampaign/addLeads",
  async (data: any, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("No authentication token found");

      const response = await api.post(
        `${BASE_URL}/add-leads-to-campaign`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
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
        data, { headers: { Authorization: `Bearer ${token}` } }
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
        data, { headers: { Authorization: `Bearer ${token}` } }
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
      const response = await api.get(`${BASE_URL}/contacts/${campaignId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const response = await api.get(`${BASE_URL}/sequences/${campaignId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
  async (data: { email: string | string[], toEmail: string ,sequence:string}, { rejectWithValue }) => {
    try {
      const response = await emailApi.post(
        `/accounts/send-test-email`,
        {
          email: data.email,
          toEmail: data.toEmail,
          emailTemplate: data.sequence,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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
      },
        {
          headers: { Authorization: `Bearer ${token}` },
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
      const response = await api.get(`${BASE_URL}/search/campaign?query=${campaign_name}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const searchContactsByCampaign = createAsyncThunk(
  "contacts/searchByCampaign",
  async (
    { campaign_id, email }: { campaign_id: string; email?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `${BASE_URL}/search-contact?campaign_id=${campaign_id}${email ? `&email=${email}` : ""
        }`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const DeleteEmailCampaign = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("emailCampaigns/deleteEmailCampaign", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${BASE_URL}/delete?campaign_id=${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete campaign");
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Network error");
  }
});

export const UpdateCampaignStatus = createAsyncThunk<
  any,
  { campaignId: string; status: string },
  { rejectValue: string }
>("emailCampaigns/status", async ({ campaignId, status }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${BASE_URL}/status`, {
      campaignId,
      status,
    });

    if (response.status !== 200) {
      throw new Error("Failed to update campaign status");
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Network error");
  }
});

const emailCampaignSlice = createSlice({
  name: "emailCampaigns",
  initialState: {
    campaigns: [] as Campaign[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
      })
      .addCase(DeleteEmailCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteEmailCampaign.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.campaigns = state.campaigns.filter(
            (campaign) => campaign.id !== action.payload
          );
        }
      })
      .addCase(DeleteEmailCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default emailCampaignSlice.reducer;
