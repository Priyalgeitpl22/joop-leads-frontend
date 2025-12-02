import React from "react";
import {
  IconButton,
  Box,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../styles/global.styled";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  handleSave?: (data: any) => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  handleSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box sx={{ minWidth: "80%", padding: "16px" }}>
        <CustomDialogHeader>
          <Typography variant="h5">
            Campaign Settings
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </CustomDialogHeader>

        <Box
          sx={{
            padding: "12px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="600">Email Account</Typography>
        </Box>

        <CustomDialogFooter>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: "var(--theme-color)",
              color: "white",
              padding: "8px 16px",
              fontWeight: "bold",
            }}
          >
            Save Email Accounts
          </Button>
        </CustomDialogFooter>
      </Box>
    </Dialog>
  );
};
