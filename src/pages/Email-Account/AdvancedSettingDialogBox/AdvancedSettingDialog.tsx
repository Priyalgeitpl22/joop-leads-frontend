import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AdvancedSettingDialogProps {
  open: boolean;
  onClose: () => void;
}

const AdvancedSettingDialog: React.FC<AdvancedSettingDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 10 }}
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
        Advanced Settings
      </DialogTitle>

      <DialogContent >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
          py={1}
        >
          <Typography fontSize={14} fontWeight={500}>
            Bulk Validate your DKIM/DMARC/SPF
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "var(--theme-color)",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 500,
              px: 2,
            }}
          >
            Validate DNS
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={1}
        >
          <Typography fontSize={14} fontWeight={500}>
            Bulk (Re)connect email accounts
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "var(--theme-color)",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 500,
              px: 2,
            }}
          >
            (Re)connect Emails
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSettingDialog;