import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface PreviewEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

const PreviewMailDialog: React.FC<PreviewEmailDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Sequence Preview
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Select a Lead
        </Typography>
        <FormControl fullWidth>
          <Select value="" displayEmpty>
            <MenuItem value="" disabled>
              No leads imported
            </MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Select a lead or add an email address to check the email preview with
          actual variables.
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" mt={3}>
          Email Preview
        </Typography>
        <TextField
          fullWidth
          sx={{ backgroundColor: "#f5f5f5", marginTop: 1 }}
        />

        <Box
          sx={{
            backgroundColor: "#f8f9fc",
            padding: 2,
            marginTop: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Send Test Email
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Send a test email to preview how your message will appear before
            sending to your full list.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled
            sx={{ marginTop: 2 }}
          >
            Send Test Email
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewMailDialog;
