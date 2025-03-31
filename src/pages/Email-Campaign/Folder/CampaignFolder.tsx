import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  CircularProgress,
  Grid2,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolder,
  showFolderDetail,
  showFolders,
} from "../../../redux/slice/emailCampaignFolderSlice";
import {
  selectFolderLoading,
  selectFolderError,
} from "../../../redux/slice/emailCampaignFolderSlice";
import {
  CampaignsFolder,
  Icon,
  FoldersIcon,
  FolderMenu,
} from "./CampaignFolder.styled";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import RenameFolderDialog from "./RenameFolderDialog";
import { AppDispatch } from "../../../redux/store/store";
import ViewFolderDialog from "./ViewFolderDialog";
import { IEmailCampaign } from "../NewCampaign/interfaces";
import EmailCampaignTable from "../EmailCampaignTable";
import { useNavigate } from "react-router-dom";

const CampaignFolder = ({
  setSelectedFolder,
  selectedFolder,
}: {
  setSelectedFolder: (folder: string) => void;
  selectedFolder: string | null;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [folderCampaigns, setFolderCampaigns] = useState<IEmailCampaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const folders = useSelector((state: any) => state.folder.folders);
  const loading = useSelector(selectFolderLoading);
  const error = useSelector(selectFolderError);

  useEffect(() => {
    dispatch(showFolders());
  }, [dispatch]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    folderId: string,
    folderName: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenRenameDialog = () => {
    handleMenuClose();
    setOpenRenameDialog(true);
  };

  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    handleMenuClose();
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (folderId: string, _deleteCampaigns: boolean) => {
    if (folderId) {
      dispatch(deleteFolder(folderId));
      setOpenDeleteDialog(false);
    }
  };

  const handleFolderClick = async (folderId: string, folderName: string) => {
    setSelectedFolder(folderName);
    setSelectedFolderId(folderId);
    setLoadingCampaigns(true);
    try {
      const response = await dispatch(showFolderDetail(folderId)).unwrap();

      if (response && Array.isArray(response.campaigns)) {
        const transformedCampaigns: IEmailCampaign[] = response.campaigns.map(
          (campaign: any) => ({
            id: campaign?.id,
            campaignName: campaign?.campaignName,
            created_at: campaign?.createdAt || "",
            campaign_status: campaign?.status || "Unknown",
            campaign_name: campaign?.name || "",
            status: campaign?.status,
            contacts: campaign?.contacts || [],
            sequences: campaign?.sequences || [],
            createdAt: campaign?.createdAt || "",
            analytics_count: campaign?.analytics || {
              campaignId: campaign?.id,
              bounced_count: campaign?.bounced_count,
              opened_count: campaign?.opened_count,
              clicked_count: campaign?.clicked_count,
              sent_count: campaign?.sent_count,
            },
            campaignStats: campaign.campaignStats || {},
          })
        );

        setFolderCampaigns(transformedCampaigns);
        console.log("transform dataa------->>>>",transformedCampaigns)
        navigate(`/email-campaign/folders/${folderId}/view`);
      } else {
        setFolderCampaigns([]);
        console.error("Invalid campaigns data received", response);
      }
    } catch (error) {
      console.error("Error fetching folder campaigns:", error);
      setFolderCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const handleViewClick = () => {
    if (!selectedFolderId) return;
    setOpenViewDialog(true);
    handleMenuClose();
  };

  const handlePause = async (campaignId: string) => {
    try {
      console.log(`Pausing campaign: ${campaignId}`);
    } catch (error) {
      console.error("Error pausing campaign:", error);
    }
  };

  const handleResume = async (campaignId: string) => {
    try {
      console.log(`Resuming campaign: ${campaignId}`);
    } catch (error) {
      console.error("Error resuming campaign:", error);
    }
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box sx={{ color: "red" }}>Error: {error}</Box>
      ) : selectedFolder ? (
        <EmailCampaignTable
          campaigns={folderCampaigns}
          loading={loadingCampaigns}
          handlePause={handlePause}
          handleResume={handleResume}
          handleEditCampaign={() => {}}
          handleOpenDeleteDialog={() => {}}
          handleMoveFolderOpen={() => {}}
          handleDetailCampaign={() => {}}
          anchorEl={null}
          selectedCampaign={null}
          handleMenuOpen={() => {}}
          handleMenuClose={() => {}}
        />
      ) : (
        <Grid2 container spacing={3}>
          {folders.map((folder: any) => (
            <Grid2 size={{xs:12, sm:4, md:3}} key={folder.id}>
              <CampaignsFolder>
                <Icon onClick={() => handleFolderClick(folder.id, folder.name)}>
                  <FoldersIcon />
                  <Box sx={{cursor: "pointer"}}>{folder.name}</Box>
                </Icon>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, folder.id, folder.name)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <FolderMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={handleOpenRenameDialog}>Rename</MenuItem>
                  <MenuItem onClick={handleViewClick}>Details</MenuItem>
                  <MenuItem
                    onClick={handleOpenDeleteDialog}
                    sx={{ color: "red", fontWeight: "500" }}
                  >
                    Delete
                  </MenuItem>
                </FolderMenu>
              </CampaignsFolder>
            </Grid2>
          ))}
        </Grid2>
      )}

      <RenameFolderDialog
        open={openRenameDialog}
        onClose={handleCloseRenameDialog}
        folderId={selectedFolderId}
        folderName={selectedFolderName}
      />

      <ViewFolderDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        selectedId={selectedFolderId}
      />

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        folderId={selectedFolderId}
      />
    </div>
  );
};

export default CampaignFolder;
