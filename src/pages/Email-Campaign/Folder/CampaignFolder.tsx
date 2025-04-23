import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  MenuItem,
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
import toast from "react-hot-toast";

const CampaignFolder = ({
  loading,
  handlePause,
  handleResume,
  setSelectedFolder,
  selectedFolder,
  handleEditCampaign,
  handleOpenDeleteDialog,
  handleMoveFolderOpen,
  handleDetailCampaign,
  handleMenuOpen,
  handleMenuClose,
  handleRenameOpen,
  handleRenameClose,
  anchorEl,
  selectedCampaign,
  folderCampaignDel,
  setFolderId,
}: {
  loading: boolean;
  handlePause: (campaignId: string) => Promise<void>;
  handleResume: (campaignId: string) => Promise<void>;
  setSelectedFolder: (folder: string) => void;
  selectedFolder: string | null;
  handleEditCampaign: (campaignId: string) => void;
  handleOpenDeleteDialog: (campaignId: string) => void;
  handleMoveFolderOpen: (campaignId: string) => void;
  handleDetailCampaign: (campaignId: string) => void;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    campaignId: string
  ) => void;
  handleMenuClose: () => void;
  handleRenameOpen: (campaignId: string, campaignName: string) => void;
  handleRenameClose: () => void;
  anchorEl: null | HTMLElement;
  selectedCampaign: string | null;
  folderCampaignDel: string | null;
  setFolderId: (folderId: string) => void;
}) => {
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [folderCampaigns, setFolderCampaigns] = useState<IEmailCampaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  console.log(loadingCampaigns);

  const folders = useSelector((state: any) => state.folder.folders);
  const folderDetail = useSelector((state:any)=> state.folder.folderDetail)

  useEffect(() => {
    if (folderCampaignDel && selectedFolderId) {
      setFolderCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign.id !== folderCampaignDel)
      );
    }
  }, [folderCampaignDel, selectedFolderId]);

  // useEffect(() => {
  //   dispatch(showFolders());
  // }, [dispatch]);
  useEffect(() => {
    if (selectedFolderId) {
      dispatch(showFolderDetail(selectedFolderId));
    }
  }, [selectedFolderId, dispatch]);

  useEffect(() => {
    if (folderDetail && Array.isArray(folderDetail.campaigns)) {
      const transformedCampaigns: IEmailCampaign[] = folderDetail.campaigns.map(
        (campaign: any) => ({
          id: campaign?.analytics?.campaignId,
          sequence_count: campaign?.sequence_count,
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
          contact_count: campaign?.contact_count,
          campaignStats: campaign?.campaignStats || {},
        })
      );

      setFolderCampaigns(transformedCampaigns);
      setLoadingCampaigns(false);
      navigate(`/email-campaign/folders/${selectedFolderId}/view`);
    } else {
      setFolderCampaigns([]);
    }
  }, [folderDetail, selectedFolderId, navigate]);

  const handleMenuOpenbox = (
    event: React.MouseEvent<HTMLButtonElement>,
    folderId: string,
    folderName: string
  ) => {
    event.stopPropagation();
    setAnchorEl1(event.currentTarget);
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
  };

  const handleMenuClosebox = () => {
    setAnchorEl1(null);
  };

  const handleOpenRenameDialog = () => {
    handleMenuClosebox();
    setOpenRenameDialog(true);
  };

  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleOpenDeleteDialogbox = () => {
    handleMenuClosebox();
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (folderId: string, _deleteCampaigns: boolean) => {
    if (folderId) {
      dispatch(deleteFolder(folderId))
        .unwrap()
        .then((response) => {
          if (response?.code === 200) {
            toast.success(response?.message || "Folder deleted successfully.");
          }
          setOpenDeleteDialog(false);
          dispatch(showFolders());
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to delete folder");
        });
    }
  };

  const handleFolderClick = (folderId: string, folderName: string) => {
    setSelectedFolder(folderName);
    setSelectedFolderId(folderId);
    setFolderId(folderId);
  };

  const handleViewClick = () => {
    if (!selectedFolderId) return;
    setOpenViewDialog(true);
    handleMenuClosebox();
  };

  return (
    <div>
      {selectedFolder ? (
        <EmailCampaignTable
          campaigns={folderCampaigns}
          loading={loading}
          handlePause={handlePause}
          handleResume={handleResume}
          handleEditCampaign={handleEditCampaign}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleMoveFolderOpen={handleMoveFolderOpen}
          handleDetailCampaign={handleDetailCampaign}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          handleRenameOpen={handleRenameOpen}
          handleRenameClose={handleRenameClose}
          anchorEl={anchorEl}
          selectedCampaign={selectedCampaign}
        />
      ) : (
        <Grid2 container spacing={3} sx={{margin: "15px 0px 0px 15px"}}>
          {folders.map((folder: any) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }} key={folder.id}>
              <CampaignsFolder>
                <Icon onClick={() => handleFolderClick(folder.id, folder.name)}>
                  <FoldersIcon />
                  <Box
                    sx={{
                      cursor: "pointer!important",
                      whiteSpace: "nowrap",
                      // overflow: "hidden",
                      maxWidth: "100%",
                    }}
                  >
                    {folder.name}
                  </Box>
                </Icon>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpenbox(e, folder.id, folder.name)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <FolderMenu
                  anchorEl={anchorEl1}
                  open={Boolean(anchorEl1)}
                  onClose={handleMenuClosebox}
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
                    onClick={handleOpenDeleteDialogbox}
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
