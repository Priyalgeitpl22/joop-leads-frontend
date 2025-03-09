
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { AxiosError } from "axios";

export interface CampaignList {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  company_name: string | null;
  website: string | null;
  linkedin_profile: string | null;
  campaign_id: string;
  location: string | null;
  orgId: string | null;
  file_name: string | null;
  blocked: boolean | null;
  unsubscribed: boolean | null;
  active: boolean | null;
  createdAt: string;
}

export interface ContactsAccount {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type: string;
  createdAt: string;
}


interface ContactsState {
  contacts: ContactsAccount[] | null;
  loading: boolean;
  error: string | null;

  campaignList: CampaignList[] | null; 
  campaignLoading: boolean;
  campaignError: string | null;
}


const initialState: ContactsState = {
  contacts: null,
  loading: false,
  error: null,

  campaignList: null,
  campaignLoading: false,
  campaignError: null,

};


export interface VerifyViewContactPayload {
  id: string;
}


export interface CreateContactsAccountPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  website: string;
  linkedin_profile: string;
  location: string;
  orgId: string;
}


export const fetchContacts = createAsyncThunk<
  ContactsAccount[], 
  void,
  { rejectValue: string } 
>(
  "email-campaign/all-contacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/email-campaign/all-contacts");
      return response.data.data;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = (error.response?.data as string) || errorMessage;
      }
      return rejectWithValue(errorMessage); 
    }
  }
);

export const getCampaignListById = createAsyncThunk<
  CampaignList[], 
  VerifyViewContactPayload,
  { rejectValue: string }
>(
  "email-campaign/contacts",
  async (data: VerifyViewContactPayload, { rejectWithValue }) => {
    try {
      const response = await api.get(`/email-campaign/contacts/${data.id}`);
      // Ensure that response.data.data is indeed an array of Campaign objects
      return response.data.data as CampaignList[];
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
  }
);


const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<ContactsAccount[]>) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Something went wrong";
      })

      
      .addCase(getCampaignListById.pending, (state) => {
        state.campaignLoading = true;
        state.campaignError = null;
      })
      .addCase(getCampaignListById.fulfilled, (state, action: PayloadAction<CampaignList[]>) => {
        state.campaignLoading = false;
        state.campaignList = action.payload;
      })
      
      .addCase(getCampaignListById.rejected, (state, action) => {
        state.campaignLoading = false;
        state.campaignError = action.payload || "Something went wrong";
      })
      
      
      .addCase(CreateContactsAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateContactsAccount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateContactsAccount.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});


export default contactsSlice.reducer;





