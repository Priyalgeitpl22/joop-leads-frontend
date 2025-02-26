import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Grid2";
import { Button2 } from "../../../styles/layout.styled";
import ReactQuill from "react-quill";


interface EmailAccountSmtpDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailAccountSmtpDialog: React.FC<EmailAccountSmtpDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
        Add Email
        <br />
        <Typography mt={1}>
          Read the full tutorial on setting up your email account here
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography fontWeight="bold" mt={2}>
          SMTP Settings (sending emails)
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>From Name</InputLabel>
            <TextField fullWidth margin="dense" name="fullName" />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>From Email</InputLabel>
            <TextField fullWidth margin="dense" name="email" />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>User Name</InputLabel>
            <TextField fullWidth margin="dense" name="userName" />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Password</InputLabel>
            <TextField fullWidth margin="dense" name="password" />
          </Grid2>
          <Grid2 size={{ xs: 5, sm: 5 }}>
            <InputLabel>SMTP host</InputLabel>
            <TextField fullWidth margin="dense" name="smtpHost" />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 2 }}>
            <InputLabel>SMTP Port</InputLabel>
            <TextField fullWidth margin="dense" name="port" />
          </Grid2>
          <Grid2 size={{ xs: 5, sm: 5 }}>
            <RadioGroup sx={{ display: "block", marginTop: "10%" }}>
              <FormControlLabel value="ssl" control={<Radio />} label="SSL" />
              <FormControlLabel value="tls" control={<Radio />} label="TLS" />
              <FormControlLabel value="none" control={<Radio />} label="None" />
            </RadioGroup>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Message Per Day (Warmups not included)</InputLabel>
            <TextField fullWidth margin="dense" name="message" />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Minimum time gap (min)</InputLabel>
            <TextField fullWidth margin="dense" name="time" />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <MenuItem>
              <Checkbox size="small" />
              <Typography>Set a different reply to address</Typography>
            </MenuItem>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography fontWeight="bold">
              IMAP Settings (receives emails)
            </Typography>
            <MenuItem>
              <Checkbox size="small" />
              <Typography>
                Use different email accounts for receiving emails
              </Typography>
            </MenuItem>
          </Grid2>
          <Grid2 size={{ xs: 5, sm: 5 }}>
            <InputLabel>IMAP host</InputLabel>
            <TextField fullWidth margin="dense" name="imapHost" />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 2 }}>
            <InputLabel>IMAP Port</InputLabel>
            <TextField fullWidth margin="dense" name="imapPort" />
          </Grid2>
          <Grid2 size={{ xs: 5, sm: 5 }}>
            <RadioGroup sx={{ display: "block", marginTop: "10%" }}>
              <FormControlLabel
                value="imapSsl"
                control={<Radio />}
                label="SSL"
              />
              <FormControlLabel
                value="imapTls"
                control={<Radio />}
                label="TLS"
              />
              <FormControlLabel
                value="imapNone"
                control={<Radio />}
                label="None"
              />
            </RadioGroup>
          </Grid2>
          <Button2 color={"black"} background={"#16173d1a"}>
            Verify Email Account
          </Button2>

          <Typography fontWeight="bold">Signature</Typography>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography>
              Enter your email signature below (manually or by copy-pasting it
              from your email client).
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <ReactQuill
              theme="snow"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid2>
          <Typography fontWeight="bold">BCC to CRM Settings</Typography>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography>
              Add a BCC email address to forward all emails sent by system
              through this sender account to your CRM
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <TextField fullWidth margin="dense" name="bccEmail" />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography fontWeight="bold">
              Custom tracking domain (Setup guide)
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography>
              Users who set up a custom tracking domain for their sender
              accounts see up to 20% improvement in deliverability.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <MenuItem>
              <Checkbox size="small" />
              <Typography>
                Use different email accounts for receiving emails
              </Typography>
            </MenuItem>
          </Grid2>

          <Typography fontWeight="bold">Add Tags</Typography>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography>
              Create tags to make it easy for you to filter different accounts
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <FormControl fullWidth variant="outlined">
              <Select>
                <MenuItem value="zoho">Zoho</MenuItem>
                <MenuItem value="work">work</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography fontWeight="bold">Add Clients</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography>
              Assign client to make it easy for you to filter different accounts
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <FormControl fullWidth variant="outlined">
              <Select>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Button2
              color={"white"}
              background={"#6e58f1"}
              style={{ float: "right", width: "10%" }}
            >
              Save
            </Button2>
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export default EmailAccountSmtpDialog;
