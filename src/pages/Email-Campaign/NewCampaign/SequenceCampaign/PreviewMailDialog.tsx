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
  emailContent: string;
}

const PreviewMailDialog: React.FC<PreviewEmailDialogProps> = ({
  open,
  onClose,
  emailContent,
}) => {
  const stripTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
        <Typography variant="h6" fontWeight="bold">
          Sequence Preview
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
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
          value={stripTags(emailContent)}
          multiline
          // minRows={3}
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
            sx={{
              backgroundColor: "#E4D9FF",
              color: "white",
              background: "#6e58f1",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            Send Test Email
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewMailDialog;
