import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addFolder } from "../../../redux/slice/emailCampaignFolderSlice";
import {
  selectFolderError,
} from "../../../redux/slice/emailCampaignFolderSlice";
import { AppDispatch } from "../../../redux/store/store";
interface EmailCampaignDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailCampaignDialog: React.FC<EmailCampaignDialogProps> = ({
  open,
  onClose,
}) => {
  const folderNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectFolderError);

  const handleSave = async () => {
    const folderName = folderNameRef.current?.value.trim();
    if (folderName) {
      try {
        await dispatch(addFolder(folderName));
        onClose();
      } catch (err) {
        console.error("Error creating folder:", err);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          background: "#f1f2fb",
          padding: "12px 24px",
        }}
      >
        Create New Folder
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          placeholder="Type here..."
          variant="outlined"
          inputRef={folderNameRef}
          sx={{
            background: "white",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        />

        {error && (
          <Box sx={{ color: "red", marginTop: 2 }}>
            <small>{error}</small>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "var(--theme-color)",
              color: "white",
              textTransform: "none",
              borderRadius: "6px",
              "&:hover": { backgroundColor: "var(--hover-color)" },
            }}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCampaignDialog;