import React from "react";
import {
  Button,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogBox, DialogFooter, DialogHeader } from "./SequenceCampaign/sequenceCampaign.styled";

interface SendTestEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

const SendTestEmailDialog: React.FC<SendTestEmailDialogProps> = ({
    open,
    onClose,
  }) => {

return (
  <DialogBox open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogHeader>
      <Typography fontWeight="600">Send Test Email</Typography>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 12, padding: "0px" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogHeader>

    <DialogContent>
      <Typography fontWeight={500} fontSize={16}>
        Edit the email account if you want to send to a different email.
      </Typography>
      <Typography fontWeight={500} fontSize={14} mt={1}>
        PS: <b>Do not </b> use this as a mechanism for testing email
        deliverability. Use this for testing formatting and copy.
      </Typography>
      <TextField
        name="fullName"
        fullWidth
        variant="outlined"
        value="sibananda.k@geitpl.com"
        sx={{ marginTop: "15px" }}
        InputProps={{
          sx: { height: "40px" },
        }}
      />
    </DialogContent>

    <DialogFooter>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#6e58f1",
          color: "white",
          textTransform: "none",
          padding: "8px 24px",
          borderRadius: "6px",
          "&:hover": { backgroundColor: "#5a46d1" },
        }}
        onClick={onClose}
      >
        Save Manul Distribution
      </Button>
    </DialogFooter>
  </DialogBox>
);
}

export default SendTestEmailDialog;