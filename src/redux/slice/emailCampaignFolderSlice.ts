import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import Cookies from "js-cookie";
import {EmailCampaignTableProps} from '../../pages/Email-Campaign/EmailCampaignTable'

interface Folder {
  id: string;
  name: string;
}

interface FolderState {
  folders: Folder[];
  folderCampaign: EmailCampaignTableProps[];
  loading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  folders: [],
  folderCampaign:[],
  loading: false,
  error: null,
};

const token = Cookies.get("access_token");

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
      return response.data.data;
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
  string,
  string,
  { rejectValue: string }
>("folder/deleteFolder", async (folderId: string, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/folder/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    return folderId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete folder"
    );
  }
});

export const updateFolder = createAsyncThunk(
  "folder/updateFolder",
  async ({ id, data }: { id: string; data: any}, { rejectWithValue}) => {
    try {
      const response = await api.put(`/folder/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update email account"
      );
    }
  }
)

export const addCampaignToFolder = createAsyncThunk(
  "folder/addCampaignToFolder",
  async (
    { campaignId, folderId }: { campaignId: string; folderId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/email-campaign/email-campaign-add`,
        {
          campaignId,
          folderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding campaign to folder:", error);
      return rejectWithValue("Network error");
    }
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default folderSlice.reducer;

export const selectFolderLoading = (state: { folder: { loading: boolean } }) =>
  state.folder.loading;
export const selectFolderError = (state: {
  folder: { error: string | null };
}) => state.folder.error;
