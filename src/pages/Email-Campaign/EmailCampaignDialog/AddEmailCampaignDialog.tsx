import React from "react";
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

interface EmailCampaignDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailCampaignDialog: React.FC<EmailCampaignDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 12 }}
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

      <DialogContent sx={{ padding: "16px 24px", marginTop: "10px" }}>
        <TextField
          fullWidth
          placeholder="Type here..."
          variant="outlined"
          sx={{
            background: "white",
            borderRadius: "6px",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6e58f1",
              color: "white",
              textTransform: "none",
              padding: "6px 16px",
              borderRadius: "6px",
              "&:hover": { backgroundColor: "#5a46d1" },
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
