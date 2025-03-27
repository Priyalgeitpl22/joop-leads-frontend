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
import { deleteFolder, showFolders } from "../../../redux/slice/emailCampaignFolderSlice";
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
import EmailCampaign from "../EmailCampaign";

const CampaignFolder = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [isEmailCampaignOpen, setEmailCampaignOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const folders = useSelector((state: any) => state.folder.folders);
  const loading = useSelector(selectFolderLoading);
  const error = useSelector(selectFolderError);

  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(showFolders());
  }, [dispatch]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    folderId: string,
    folderName: string
  ) => {
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

  const handleFolderClick = () => {
    setEmailCampaignOpen(true);
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box sx={{ color: "red" }}>Error: {error}</Box>
      ) : (
        <Grid2 container spacing={3}>
          {folders.map((folder: any) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }} key={folder.id}>
              <CampaignsFolder>
                <Icon onClick={handleFolderClick}>
                  <FoldersIcon />
                  <Box>{folder.name}</Box>
                </Icon>
                {isEmailCampaignOpen && (
                  <EmailCampaign />
                )}
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, folder.id, folder.name)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>

                <FolderMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleOpenRenameDialog}>Rename</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    Add/Update Client
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Details</MenuItem>
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
