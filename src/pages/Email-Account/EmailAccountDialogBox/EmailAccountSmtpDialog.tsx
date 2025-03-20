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
  CircularProgress,

} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Grid2";
import { Button2, TextField, InputLabel } from "../../../styles/layout.styled";
import ReactQuill from "react-quill";
import {
  CreateEmailAccount,
  CreateEmailAccountPayload,
  verifyEmailAccount,
  VerifyEmailAccountPayload,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { validateEmail } from "../../../utils/Validation";
import toast, { Toaster } from "react-hot-toast";

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
    smtpPort: null,
    security: false,
    msg_per_day: null,
    time_gap: null,
    replyToAddressChecked: false,
    replyToAddress: "",
    imapChecked: false,
    imapUserName: "",
    imapPassword: "",
    imapHost: "",
    imapPort: null,
    imapSecurity: false,
    bccEmail: "",
    trackingDomainChecked: false,
    tags: "",
    clients: "",
    signature: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [errors, setErrors] = useState({
    fromName: "",
    fromEmail: "",
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: "",
    msg_per_day: "",
    time_gap: "",
    imapHost: "",
    imapPort: "",
  });

  useEffect(() => {
    if (!formData.replyToAddressChecked) {
      setFormData((prev) => ({
        ...prev,
        imapUserName: prev.userName,
        imapPassword: prev.password,
      }));
    }
  }, [formData.replyToAddressChecked, formData.userName, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));


    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };


  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value === "ssl";
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVerifyAccount = () => {
    if (!validateFields()) return;
    setVerificationInProgress(true);
    setVerificationFailed(false);

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
      .then(() => {
        setVerificationInProgress(false);
        setIsVerified(true);
        setIsSaveDisabled(false);
      })
      .catch(() => {
        setVerificationInProgress(false);
        setIsVerified(false);
        setVerificationFailed(true);
        setIsSaveDisabled(true);
      });
  };

  const handleCreateAccount = () => {
    setLoading(true);
    const payload: CreateEmailAccountPayload = {
      account: "smtp",
      name: formData.fromName,
      state: "init",
      type: "imap",
      orgId: user?.orgId as string,
      email: formData.fromEmail,
      msg_per_day: Number(formData.msg_per_day),
      time_gap: Number(formData.time_gap),
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
  
    dispatch(CreateEmailAccount(payload))
      .unwrap()
      .then((response) => {
        toast.success(response || "Email account created successfully!");
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        toast.error(error || "Failed to create email account!");
        setLoading(false);
      });
  };
  const validateFields = () => {
    let newErrors: any = {};

    if (!formData.fromName.trim()) newErrors.fromName = "From Name is required";
    if (!formData.fromEmail.trim()) {
      newErrors.fromEmail = "From Email is required";
    } else if (!validateEmail(formData.fromEmail)) {
      newErrors.fromEmail = "Enter a valid email address";
    }
    if (!formData.userName.trim()) newErrors.userName = "User Name is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.smtpHost.trim()) newErrors.smtpHost = "SMTP Host is required";

    if (formData.smtpPort === null || formData.smtpPort === "") {
      newErrors.smtpPort = "SMTP Port is required";
    }

    if (!formData.msg_per_day || isNaN(Number(formData.msg_per_day)) || Number(formData.msg_per_day) <= 0) {
      newErrors.msg_per_day = "Message per day must be a positive number";
    }
    if (!formData.time_gap || isNaN(Number(formData.time_gap)) || Number(formData.time_gap) <= 0) {
      newErrors.time_gap = "Minimum time gap must be a positive number";
    }

    if (!formData.imapHost.trim()) newErrors.imapHost = "IMAP Host is required";

    if (formData.imapPort === null || formData.imapPort === "") {
      newErrors.imapPort = "Imap port is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Toaster position="top-right" />
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
        <Grid2 container spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Grid2 size={{ xs: 6, sm: 6 }}>

            <InputLabel>From Name</InputLabel>
            <TextField
              fullWidth
              name="fromName"
              value={formData.fromName}
              onChange={handleChange}
              error={!!errors.fromName}
              autoComplete="off"
            />
            {errors.fromName && <Typography color="red" variant="caption">
              {errors.fromName}
            </Typography>
            }
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>From Email</InputLabel>
            <TextField
              fullWidth
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
              error={!!errors.fromEmail}
              autoComplete="off"
            />
            {errors.fromEmail && <Typography color="red" variant="caption">
              {errors.fromEmail}
            </Typography>
            }

          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>User Name</InputLabel>
            <TextField
              fullWidth
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              error={!!errors.userName}
              autoComplete="off"
            />
            {errors.userName && <Typography color="red" variant="caption">{errors.userName}</Typography>}
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Password</InputLabel>
            <TextField
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              autoComplete="off"
            />
            {errors.password && <Typography color="red" variant="caption">{errors.password}</Typography>}
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>SMTP host</InputLabel>
            <TextField
              fullWidth
              name="smtpHost"
              value={formData.smtpHost}
              onChange={handleChange}
              error={!!errors.smtpHost}
              autoComplete="off"

            />
            {errors.smtpHost && <Typography color="red" variant="caption">{errors.smtpHost}</Typography>}
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <InputLabel>SMTP Port</InputLabel>
            <TextField
              fullWidth
              name="smtpPort"
              value={formData.smtpPort}
              onChange={handleChange}
              error={!!errors.smtpPort}
              autoComplete="off"

            />
            {errors.smtpPort && <Typography color="red" variant="caption">{errors.smtpPort}</Typography>}

          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <RadioGroup
              sx={{ display: "block", marginTop: "10%" }}
              value={formData.security ? "ssl" : "tls"}
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
              name="msg_per_day"
              value={formData.msg_per_day}
              onChange={handleChange}
              error={!!errors.msg_per_day}
              autoComplete="off"
            />
            {errors.msg_per_day && <Typography color="red" variant="caption">{errors.msg_per_day}</Typography>}

          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <InputLabel>Minimum time gap (min)</InputLabel>
            <TextField
              fullWidth
              name="time_gap"
              value={formData.time_gap}
              onChange={handleChange}
              error={!!errors.time_gap}
              autoComplete="off"
            />
            {errors.time_gap && <Typography color="red" variant="caption">{errors.time_gap}</Typography>}

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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 6 }}>
                <InputLabel>IMAP Password</InputLabel>
                <TextField
                  fullWidth
                  name="imapPassword"
                  value={formData.imapPassword}
                  onChange={handleChange}
                  autoComplete="off"
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
              error={!!errors.imapHost}
              autoComplete="off"
            />
            {errors.imapHost && <Typography color="red" variant="caption">{errors.imapHost}</Typography>}

          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <InputLabel>IMAP Port</InputLabel>
            <TextField
              fullWidth
              name="imapPort"
              value={formData.imapPort}
              onChange={handleChange}
              error={!!errors.imapPort}
              autoComplete="off"
            />
            {errors.imapPort && <Typography color="red" variant="caption">{errors.imapPort}</Typography>}

          </Grid2>
          <Grid2 size={{ xs: 3, sm: 3 }}>
            <RadioGroup
              sx={{ display: "block", marginTop: "10%" }}
              value={formData.imapSecurity ? "ssl" : "tls"}
              onChange={(e) => handleSelectChange(e, "imapSecurity")}
            >
              <FormControlLabel value="ssl" control={<Radio />} label="SSL" />
              <FormControlLabel value="tls" control={<Radio />} label="TLS" />
            </RadioGroup>
          </Grid2>

          <Button2
            onClick={handleVerifyAccount}
            color={"white"}
            background={"var(--theme-color)"}
            style={{ width: "100%", cursor: "pointer" }}
          >
            {verificationInProgress ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Verify Email Account"
            )}
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
          {verificationFailed && (
            <Grid2
              size={{ xs: 12, sm: 12 }}
              sx={{ display: "flex", gap: "10px" }}
            >
              <Typography color="error.main">
                Email account verification failed. Please check your credentials
                and try again.
              </Typography>
            </Grid2>
          )}
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Typography fontWeight="bold">Signature</Typography>
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
            onClick={handleCreateAccount}
            color={isSaveDisabled ? "black" : "white"}
            background={isSaveDisabled ? "#d3d3d3" : "var(--theme-color)"}
            style={{
              width: "10%",
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Save"
            )}
          </Button2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export default EmailAccountSmtpDialog;
