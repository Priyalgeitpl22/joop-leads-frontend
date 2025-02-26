import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Grid2";
import { Button2, TextField, InputLabel } from "../../../styles/layout.styled";
import ReactQuill from "react-quill";
import {
  verifyEmailAccount,
  VerifyEmailAccountPayload,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";

interface EmailAccountSmtpDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailAccountSmtpDialog: React.FC<EmailAccountSmtpDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: 0,
    security: false,
    messagePerDay: "",
    timeGap: "",
    replyToAddressChecked: false,
    replyToAddress: "",
    imapChecked: false,
    imapUserName: "",
    imapPassword: "",
    imapHost: "",
    imapPort: 0,
    imapSecurity: false,
    bccEmail: "",
    trackingDomainChecked: false,
    tags: "",
    clients: "",
    signature: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!formData.replyToAddressChecked) {
      setFormData((prev) => ({
        ...prev,
        imapUserName: prev.userName,
        imapPassword: prev.password,
      }));
    }
  }, [formData.replyToAddressChecked, formData.userName, formData.password]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ value: unknown }>,
    field: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value as string }));
  };

  const handleVerifyAccount = () => {
    const payload: VerifyEmailAccountPayload = {
      type: "smtp",
      imap: {
        host: formData.imapHost,
        port: formData.imapPort,
        secure: formData.imapSecurity,
        auth: {
          user: formData.imapUserName,
          pass: formData.imapPassword,
        },
      },
      smtp: {
        host: formData.smtpHost,
        port: formData.smtpPort,
        secure: formData.security,
        auth: {
          user: formData.userName,
          pass: formData.password,
        },
      },
      proxy: null,
      smtpEhloName: "localhost",
    };

    dispatch(verifyEmailAccount(payload))
      .unwrap()
      .then((url: any) => {
        setIsVerified(true);
        setIsSaveDisabled(false);
      })
      .catch((error: any) => {
        setIsVerified(false);
        setIsSaveDisabled(true);
      });
  };

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
        <Typography fontWeight="bold" mt={2} mb={2}>
          SMTP Settings (sending emails)
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>From Name</InputLabel>
            <TextField
              fullWidth
              name="fromName"
              value={formData.fromName}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>From Email</InputLabel>
            <TextField
              fullWidth
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>User Name</InputLabel>
            <TextField
              fullWidth
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Password</InputLabel>
            <TextField
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>SMTP host</InputLabel>
            <TextField
              fullWidth
              name="smtpHost"
              value={formData.smtpHost}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <InputLabel>SMTP Port</InputLabel>
            <TextField
              fullWidth
              name="smtpPort"
              value={formData.smtpPort}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <RadioGroup
              sx={{ display: "block", marginTop: "10%" }}
              value={formData.security}
              onChange={(e) => handleSelectChange(e, "security")}
            >
              <FormControlLabel value="ssl" control={<Radio />} label="SSL" />
              <FormControlLabel value="tls" control={<Radio />} label="TLS" />
            </RadioGroup>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Message Per Day (Warmups not included)</InputLabel>
            <TextField
              fullWidth
              name="messagePerDay"
              value={formData.messagePerDay}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Minimum time gap (min)</InputLabel>
            <TextField
              fullWidth
              name="timeGap"
              value={formData.timeGap}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.replyToAddressChecked}
                  onChange={(e) => handleChange(e as any)}
                />
              }
              label="Set a different reply to address"
              name="replyToAddressChecked"
            />
            {formData.replyToAddressChecked && (
              <Grid2 size={{ xs: 6, sm: 6 }}>
                <TextField
                  fullWidth
                  name="replyToAddress"
                  value={formData.replyToAddress}
                  onChange={handleChange}
                />
              </Grid2>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography fontWeight="bold">
              IMAP Settings (receives emails)
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.replyToAddressChecked}
                  onChange={(e) => handleChange(e as any)}
                />
              }
              name="replyToAddressChecked"
              label="Use different email accounts for receiving emails"
            />
          </Grid2>

          {formData.replyToAddressChecked && (
            <>
              <Grid2 size={{ xs: 6, sm: 6 }}>
                <InputLabel>IMAP User Name</InputLabel>
                <TextField
                  fullWidth
                  name="imapUserName"
                  value={formData.imapUserName}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 6 }}>
                <InputLabel>IMAP Password</InputLabel>
                <TextField
                  fullWidth
                  name="imapPassword"
                  value={formData.imapPassword}
                  onChange={handleChange}
                />
              </Grid2>
            </>
          )}

          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>IMAP Host</InputLabel>
            <TextField
              fullWidth
              name="imapHost"
              value={formData.imapHost}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <InputLabel>IMAP Port</InputLabel>
            <TextField
              fullWidth
              name="imapPort"
              value={formData.imapPort}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <RadioGroup
              sx={{ display: "block", marginTop: "10%" }}
              value={formData.imapSecurity}
              onChange={(e) => handleSelectChange(e, "imapSecurity")}
            >
              <FormControlLabel value="ssl" control={<Radio />} label="SSL" />
              <FormControlLabel value="tls" control={<Radio />} label="TLS" />
            </RadioGroup>
          </Grid2>

          <Button2
            onClick={handleVerifyAccount}
            color={"white"}
            background={"#6e58f1"}
            style={{ cursor: "pointer" }}
          >
            Verify Email Account
          </Button2>
          {isVerified && (
            <Grid2
              size={{ xs: 12, sm: 12 }}
              sx={{ display: "flex", gap: "10px" }}
            >
              <CheckBoxIcon sx={{ color: "green" }} />
              <Typography color="success.main">
                Email account verified successfully!
              </Typography>
            </Grid2>
          )}
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
              value={formData.signature}
              onChange={(value: any) =>
                setFormData((prev) => ({ ...prev, signature: value }))
              }
            />
          </Grid2>
          <Button2
            disabled={isSaveDisabled}
            onClick={() => console.log("Save clicked")}
            color={isSaveDisabled ? "black" : "white"}
            background={isSaveDisabled ? "#d3d3d3" : "#6e58f1"}
            style={{
              width: "10%",
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
            }}
          >
            Save
          </Button2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export default EmailAccountSmtpDialog;
