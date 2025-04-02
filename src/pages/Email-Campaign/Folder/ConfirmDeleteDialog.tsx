import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button2 } from "../../../styles/layout.styled";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: (folderId: string, deleteCampaigns: boolean) => void;
  folderId: string | null;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirmDelete,
  folderId,
}) => {
  const [deleteCampaigns, setDeleteCampaigns] = useState(false);
  console.log(setDeleteCampaigns);

  const handleConfirmDelete = () => {
    if (folderId) {
      onConfirmDelete(folderId, deleteCampaigns);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 10, top: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          background: "#f1f2fb",
          padding: "12px 24px",
        }}
      >
        Delete Folder
      </DialogTitle>

      <DialogContent sx={{ padding: "10px 20px" }}>
        <Typography
          variant="body1"
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Are you sure you want to delete the folder?
        </Typography>

        {/* <FormControlLabel
          control={
            <Checkbox
              checked={deleteCampaigns}
              onChange={(e) => setDeleteCampaigns(e.target.checked)}
            />
          }
          label="Do you wish to delete the campaigns within this folder?"
          sx={{ fontSize: 14 }}
        /> */}
      </DialogContent>

      <DialogActions sx={{ padding: "16px 24px", gap: "8px" }}>
        <Button2 onClick={onClose} color={"black"} background={""}>
          Cancel
        </Button2>
        <Button2
          color="white"
          background="var(--theme-color)"
          onClick={handleConfirmDelete}
        >
          Confirm & Proceed
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
