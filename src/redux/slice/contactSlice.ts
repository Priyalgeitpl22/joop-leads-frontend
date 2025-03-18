
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface UploadedUser {
  id: string;
  fullName: string;
  email: string;
}
export interface Campaign {
  id: string;
  campaignName: string;
  status: string;
  createdAt: string;
}
export interface EmailCampaign {
  campaign: Campaign;
}


export interface CampaignList {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  company_name: string | null;
  website: string | null;
  linkedin_profile: string | null;
  campaign_id: string | null;
  location: string | null;
  orgId: string | null;
  file_name: string | null;
  blocked: boolean | null;
  unsubscribed: boolean | null;
  active: boolean | null;
  createdAt: string;
  uploadedBy: string;
  uploadedUser: UploadedUser; 
  emailCampaigns: EmailCampaign[]|null;
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

  campaignList: CampaignList | null;
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

const token = Cookies.get("access_token");

export const fetchContacts = createAsyncThunk<
ContactsAccount[],
void,
{ rejectValue: string }
>(
  "contact/all-contacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/contact/all-contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
      console.log("");
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
  CampaignList, 
  VerifyViewContactPayload,
  { rejectValue: string }
>(
  "contact",
  async (data: VerifyViewContactPayload, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token");
      const response = await api.get(`/contact/${data.id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response.data.data as CampaignList; 
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
      const token = Cookies.get("access_token"); 

      const response = await api.post(
        `/contact/create-contacts`,
        data, 
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", 
          },
        }
      );

      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const SearchContacts = createAsyncThunk( 
  "contact/search-contacts",
  async (
    { email, first_name, orgId }: { email?: string; first_name?: string; orgId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/contact/search-contacts", {
        params: { email, first_name, orgId},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const DeactivateContacts = createAsyncThunk(
  "contact/deactivate",
  async (contactIds: string[], { rejectWithValue }) => {
    try {
      const response = await api.patch("/contact/deactivate", 
        { contactIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

export const CreateCampaignWithContacts = createAsyncThunk(
  "contact/create",
  async ( contactIds: string[], { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/contact/create", 
        { contactIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; 
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
      .addCase(getCampaignListById.fulfilled, (state, action: PayloadAction<CampaignList>) => {
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

export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (contactId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/contact/${contactId}`);
      return { contactId, message: response.data.message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);





export default contactsSlice.reducer;





