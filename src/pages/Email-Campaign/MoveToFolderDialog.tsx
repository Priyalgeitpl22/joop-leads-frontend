import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  showFolders,
  addCampaignToFolder,
} from "../../redux/slice/emailCampaignFolderSlice";
import { AppDispatch } from "../../redux/store/store";
import { FoldersIcon } from "./Folder/CampaignFolder.styled";

const MoveToFolderDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  campaignId: string | null;
}> = ({ open, onClose, campaignId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const folders = useSelector((state: any) => state.folder.folders);
  const loading = useSelector((state: any) => state.folder.loading);
  const error = useSelector((state: any) => state.folder.error);

  useEffect(() => {
    if (open) {
      dispatch(showFolders());
    }
  }, [open, dispatch]);

  const handleMoveToFolder = (folderId: string) => {
    if (campaignId) {
      dispatch(addCampaignToFolder({ campaignId, folderId }));
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{ "& .MuiPaper-root": { height: "60%" } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          background: "#f7f8fc",
          padding: "12px 24px",
        }}
      >
        Add to Folder
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: "calc(100% - 100px)",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Typography>Loading folders...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <List>
            {folders.map((folder: any) => (
              <ListItem
                component="li"
                key={folder.id}
                onClick={() => handleMoveToFolder(folder.id)}
                sx={{
                  borderBottom: "1px solid #f1f2fb",
                  cursor: "pointer",
                  "&:hover": { background: "#f7f7fd" },
                }}
              >
                <ListItemIcon>
                  <FoldersIcon />
                </ListItemIcon>
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoveToFolderDialog;
