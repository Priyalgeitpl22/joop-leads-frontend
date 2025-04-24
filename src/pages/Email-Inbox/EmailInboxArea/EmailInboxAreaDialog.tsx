import {
  Dialog,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogBody, DialogBoxData, DialogContentBox, DialogSubject } from "./EmailInboxAreaDialog.styled";

interface EmailInboxAreaDialogProps {
  open: boolean;
  onClose: () => void;
  message: any;
}

const EmailInboxAreaDialog: React.FC<EmailInboxAreaDialogProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 10,
          backgroundColor: "#f7f9fc",
        },
      }}
    >
      <DialogSubject>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "20px" }}>
          {message.subject || "No Subject"}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogSubject>

      <DialogContentBox>
        <DialogBoxData>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ fontSize: "18px" }}
              >
                {message.from?.[0]?.name || "Unknown Sender"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                {message.from?.[0]?.address || "No Email"}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "16px" }}
          >
            {message.date ? new Date(message.date).toLocaleString() : "No Date"}
          </Typography>
        </DialogBoxData>

        <Typography
          variant="body2"
          sx={{ mb: 2, color: "text.secondary", fontSize: "14px" }}
        >
          To: {message.to?.[0]?.name || "Unknown"} (
          {message.to?.[0]?.address || "No Email"})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <DialogBody dangerouslySetInnerHTML={{ __html: message.body || "No content available." }} />
      </DialogContentBox>
    </Dialog>
  );
};

export default EmailInboxAreaDialog;
