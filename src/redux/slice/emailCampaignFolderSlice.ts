import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import Cookies from "js-cookie";
import { EmailCampaignTableProps } from "../../pages/Email-Campaign/EmailCampaignTable";

interface Campaign {
  id: string;
  campaignName: string;
}
interface Folder {
  id: string;
  name: string;
}
interface FolderDetail {
  id: string;
  name: string;
  createdAt: string;
  campaignCount: number;
  campaigns: Campaign[];
}

interface FolderState {
  folders: Folder[];
  folderCampaign: EmailCampaignTableProps[];
  loading: boolean;
  error: string | null;
  folderDetail: FolderDetail | null;
}

const initialState: FolderState = {
  folders: [],
  folderCampaign: [],
  loading: false,
  error: null,
  folderDetail: null,
};

const token = Cookies.get("access_token");

export const showFolderDetail = createAsyncThunk<
  FolderDetail,
  string,
  { rejectValue: string }
>("folder/showFolderDetail", async (folderId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/folder/?folderId=${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.data;

    if (!data || Object.keys(data).length === 0) {
      return rejectWithValue("No folder details found.");
    }

    const folder = data[0];

    const campaigns =
      folder.campaigns?.map((campaign: any) => ({
        id: campaign?.id,
        name: campaign?.campaign?.campaignName,
        createdAt: campaign?.campaign?.createdAt,
        status: campaign?.campaign?.status,
        analytics: campaign?.campaign?.CampaignAnalytics?.[0] || {},
        sequence_count: folder?.sequence_count,
        contact_count:campaign?.contact_count
      })) || [];

    const folderAnalytics = campaigns.length > 0 ? campaigns[0].analytics : {};

    return {
      id: folder.id,
      name: folder.name,
      createdAt: folder.createdAt,
      campaignCount: campaigns?.length,
      campaigns: campaigns,
      bounced_count: folderAnalytics?.bounced_count || 0,
      sent_count: folderAnalytics?.sent_count || 0,
      opened_count: folderAnalytics?.opened_count || 0,
      clicked_count: folderAnalytics?.clicked_count || 0,
    };
  } catch (error) {
    console.error("Error fetching folder details:", error);
    return rejectWithValue("Network error");
  }
});


export const addFolder = createAsyncThunk(
  "folder/addFolder",
  async (folderName: string, { rejectWithValue }) => {
    try {
      if (!token) {
        return rejectWithValue("Token not available");
      }
      const response = await api.post(
        "/folder/",
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding folder:", error);
      return rejectWithValue("Network error");
    }
  }
);

export const showFolders = createAsyncThunk(
  "folder/showFolder",
  async (_, { rejectWithValue }) => {
    try {
      if (!token) {
        return rejectWithValue("Token not available");
      }
      const response = await api.get("/folder/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      return rejectWithValue("Network error");
    }
  }
);

export const deleteFolder = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("folder/deleteFolder", async (folderId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/folder/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete folder"
    );
  }
});

export const updateFolder = createAsyncThunk(
  "folder/updateFolder",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/folder/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update folder"
      );
    }
  }
);

export const addCampaignToFolder = createAsyncThunk<
  any,
  { campaignId: string; folderId: string },
  { rejectValue: string }
>(
  "folder/addCampaignToFolder",
  async ({ campaignId, folderId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/email-campaign/add`,
        { campaignId, folderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Network error";
      return rejectWithValue(errorMessage);
    }
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFolder.fulfilled, (state, action) => {
        console.log("New folder added:", action.payload);
        state.folders.push(action.payload);
      })
      .addCase(showFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showFolders.fulfilled, (state, action) => {
        state.loading = false;
        state.folders = action.payload;
      })
      .addCase(showFolders.rejected, (state, _action) => {
        state.loading = false;
      })
      .addCase(deleteFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.folders = state.folders.filter(
          (folder) => folder.id !== action.payload
        );
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete folder";
      })
      .addCase(addCampaignToFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCampaignToFolder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCampaignToFolder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to add campaign to folder";
      })
      .addCase(showFolderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showFolderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.folderDetail = action.payload;
      })
      .addCase(showFolderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectFolderLoading = (state: { folder: { loading: boolean } }) =>
  state.folder.loading;
export const selectFolderError = (state: {
  folder: { error: string | null };
}) => state.folder.error;

export default folderSlice.reducer;
