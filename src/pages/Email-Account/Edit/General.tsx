import React, { useCallback, useEffect, useState } from "react";
import {
  RadioGroup,
  Radio,
  Checkbox,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid2 from "@mui/material/Grid2";
import { Button2, TextField, InputLabel } from "../../../styles/layout.styled";
import ReactQuill from "react-quill";
import {
  verifyEmailAccount,
  VerifyEmailAccountPayload,
  updateEmailAccount,
  EmailAccount,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import toast from "react-hot-toast";
import {
  Button,
  ButtonDisabled,
  Container,
  SectionFooter,
} from "../../../styles/global.styled";
import { HeadingText } from "../EditEmailAccount/EditEmailAccount.styled";

const GeneralAccount = ({ emailAccount }: { emailAccount: EmailAccount }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [smtpFormData, setSmtpFormData] = useState({
    name: "",
    email: "",
    limit: null as number | null,
    time_gap: null as number | null,
    smtp: {
      host: "",
      port: null as number | null,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    },
    imap: {
      host: "",
      port: null as number | null,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    },
    signature: "",
    replyToAddress: "",
    differentImap: false,
  });

  const [OAuthFormData, setOAuthFormData] = useState({
    name: "",
    email: "",
    limit: null as number | null,
    time_gap: null as number | null,
  });

  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setSmtpFormDataHandler = useCallback(() => {
    const account = emailAccount as EmailAccount & {
      limit?: number;
      time_gap?: number;
      smtp?: {
        host?: string;
        port?: number;
        secure?: boolean;
        auth?: {
          user?: string;
          pass?: string;
        };
      };
      signature?: string;
      replyToAddress?: string;
      differentImap?: boolean;
    };

    setSmtpFormData((prev) => ({
      ...prev,
      name: account?.name || "",
      email: account?.email || "",
      limit: account?.limit ?? null,
      time_gap: account?.time_gap ?? null,
      smtp: {
        host: account?.smtp?.host || "",
        port: account?.smtp?.port ?? null,
        secure: account?.smtp?.secure ?? true,
        auth: {
          user: account?.smtp?.auth?.user || "",
          pass: account?.smtp?.auth?.pass || "",
        },
      },
      imap: {
        host: account?.imap?.host || "",
        port: account?.imap?.port ?? null,
        secure: account?.imap?.secure ?? true,
        auth: {
          user: account?.imap?.auth?.user || "",
          pass: account?.imap?.auth?.pass || "",
        },
      },
      replyToAddress: account?.replyToAddress || "",
      differentImap: account?.differentImap || false,
      signature: account?.signature || "",
    }));
  }, [emailAccount]);

  const setOAuthFormDataHandler = useCallback(() => {
    const account = emailAccount as EmailAccount & {
      limit?: number;
      time_gap?: number;
    };

    setOAuthFormData((prev) => ({
      ...prev,
      name: account?.name || "",
      email: account?.email || "",
      limit: account?.limit ?? null,
      time_gap: account?.time_gap ?? null,
    }));
  }, [emailAccount]);

  useEffect(() => {
    if (emailAccount) {
      if (emailAccount?.type === "imap") {
        setSmtpFormDataHandler();
      } else if (
        emailAccount?.type === "gmail" ||
        emailAccount?.type === "outlook"
      ) {
        setOAuthFormDataHandler();
      }
    }
  }, [emailAccount, setSmtpFormDataHandler, setOAuthFormDataHandler]);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Handle OAuthFormData for gmail/outlook accounts
    if (emailAccount?.type === "gmail" || emailAccount?.type === "outlook") {
      if (name === "limit" || name === "time_gap") {
        setOAuthFormData((prev) => ({
          ...prev,
          [name]: type === "number" ? Number(value) : value,
        }));
      }
    } else {
      // Handle nested fields for IMAP accounts
      if (name === "userName" || name === "password") {
        setSmtpFormData((prev) => ({
          ...prev,
          smtp: {
            ...prev.smtp,
            auth: {
              ...prev.smtp.auth,
              [name === "userName" ? "user" : "pass"]: value,
            },
          },
        }));
      } else if (
        name === "smtpHost" ||
        name === "smtpPort" ||
        name === "security"
      ) {
        setSmtpFormData((prev) => ({
          ...prev,
          smtp: {
            ...prev.smtp,
            [name === "smtpHost"
              ? "host"
              : name === "smtpPort"
                ? "port"
                : "secure"]:
              name === "security"
                ? checked
                : name === "smtpPort"
                  ? value
                    ? Number(value)
                    : null
                  : value,
          },
        }));
      } else if (
        name === "imapHost" ||
        name === "imapPort" ||
        name === "imapSecurity"
      ) {
        setSmtpFormData((prev) => ({
          ...prev,
          imap: {
            ...prev.imap,
            [name === "imapHost"
              ? "host"
              : name === "imapPort"
                ? "port"
                : "secure"]:
              name === "imapSecurity"
                ? checked
                : name === "imapPort"
                  ? value
                    ? Number(value)
                    : null
                  : value,
          },
        }));
      } else if (name === "imapUserName" || name === "imapPassword") {
        setSmtpFormData((prev) => ({
          ...prev,
          imap: {
            ...prev.imap,
            auth: {
              ...prev.imap.auth,
              [name === "imapUserName" ? "user" : "pass"]: value,
            },
          },
        }));
      } else if (name === "replyToAddress" || name === "useDifferentImap") {
        setSmtpFormData((prev) => ({
          ...prev,
          [name === "replyToAddress" ? "replyToAddress" : "differentImap"]:
            type === "checkbox" ? checked : value,
        }));
      } else {
        setSmtpFormData((prev) => ({
          ...prev,
          [name]:
            type === "checkbox"
              ? checked
              : name === "limit" || name === "time_gap"
                ? Number(value) || null
                : value,
        }));
      }
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value === "ssl";
    if (field === "security") {
      setSmtpFormData((prev) => ({
        ...prev,
        smtp: { ...prev.smtp, secure: value },
      }));
    } else if (field === "imapSecurity") {
      setSmtpFormData((prev) => ({
        ...prev,
        imap: { ...prev.imap, secure: value },
      }));
    }
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (emailAccount?.type === "imap") {
      // Skip validation for disabled fields (fromName and fromEmail)
      if (!smtpFormData.smtp.auth.user.trim())
        newErrors.userName = "User Name is required";
      if (!smtpFormData.smtp.auth.pass.trim())
        newErrors.password = "Password is required";
      if (!smtpFormData.smtp.host.trim())
        newErrors.smtpHost = "SMTP Host is required";
      if (!smtpFormData.smtp.port) newErrors.smtpPort = "SMTP Port is required";
      if (!smtpFormData.limit || Number(smtpFormData.limit) < 0) {
        newErrors.limit = "Message per day must be a positive number";
      }
      if (!smtpFormData.time_gap || Number(smtpFormData.time_gap) < 0) {
        newErrors.time_gap = "Minimum time gap must be a positive number";
      }
      if (!smtpFormData.imap.host.trim())
        newErrors.imapHost = "IMAP Host is required";
      if (!smtpFormData.imap.port) newErrors.imapPort = "IMAP Port is required";
      if (!smtpFormData.imap.auth.user.trim())
        newErrors.imapUserName = "IMAP User Name is required";
      if (!smtpFormData.imap.auth.pass.trim())
        newErrors.imapPassword = "IMAP Password is required";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyAccount = async () => {
    if (!validateFields()) {
      toast.error("Please fix the errors before verifying");
      return;
    }

    setVerificationFailed(false);
    setVerificationInProgress(true);

    const payload: VerifyEmailAccountPayload = {
      type: emailAccount?.type || "imap",
      email: smtpFormData.email,
      imap: {
        host: smtpFormData.imap.host,
        port: Number(smtpFormData.imap.port),
        secure: smtpFormData.imap.secure,
        auth: {
          user: smtpFormData.imap.auth.user,
          pass: smtpFormData.imap.auth.pass,
        },
      },
      smtp: {
        host: smtpFormData.smtp.host,
        port: Number(smtpFormData.smtp.port),
        secure: smtpFormData.smtp.secure,
        auth: {
          user: smtpFormData.smtp.auth.user,
          pass: smtpFormData.smtp.auth.pass,
        },
      },
      proxy: null,
      smtpEhloName: "localhost",
    };

    try {
      await dispatch(verifyEmailAccount(payload)).unwrap();
      setIsVerified(true);
      setVerificationFailed(false);
      toast.success("Email account verified successfully!");
    } catch {
      setVerificationFailed(true);
      setIsVerified(false);
      toast.error(
        "Email account verification failed. Please check your credentials."
      );
    } finally {
      setVerificationInProgress(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const validateOAuthFields = () => {
    const newErrors: Record<string, string> = {};

    if (!OAuthFormData.limit || Number(OAuthFormData.limit) <= 0) {
      newErrors.limit = "Message per day must be a positive number";
    }
    if (!OAuthFormData.time_gap || Number(OAuthFormData.time_gap) <= 0) {
      newErrors.time_gap = "Minimum time gap must be a positive number";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (emailAccount?.type === "imap") {
      if (!validateFields()) {
        toast.error("Please fix the errors before updating");
        return;
      }
      await updateSmtp();
    } else if (
      emailAccount?.type === "gmail" ||
      emailAccount?.type === "outlook"
    ) {
      if (!validateOAuthFields()) {
        toast.error("Please fix the errors before updating");
        return;
      }
      await updateOAuth();
    }
  };

  const updateSmtp = async () => {
    if (!emailAccount?._id) {
      toast.error("Email account ID is missing");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: emailAccount._id,
        data: {
          name: smtpFormData.name,
          email: smtpFormData.email,
          limit: smtpFormData.limit,
          time_gap: smtpFormData.time_gap,
          smtp: {
            host: smtpFormData.smtp.host,
            port: Number(smtpFormData.smtp.port),
            secure: smtpFormData.smtp.secure,
            auth: {
              user: smtpFormData.smtp.auth.user,
              pass: smtpFormData.smtp.auth.pass,
            },
          },
          imap: {
            host: smtpFormData.imap.host,
            port: Number(smtpFormData.imap.port),
            secure: smtpFormData.imap.secure,
            auth: {
              user: smtpFormData.differentImap
                ? smtpFormData.imap.auth.user
                : smtpFormData.smtp.auth.user,
              pass: smtpFormData.differentImap
                ? smtpFormData.imap.auth.pass
                : smtpFormData.smtp.auth.pass,
            },
          },
          replyToAddress: smtpFormData.replyToAddress || "",
          signature: smtpFormData.signature || "",
        },
      };

      const response = await dispatch(updateEmailAccount(payload)).unwrap();
      toast.success(response?.message || "Email account updated successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (error as { message?: string })?.message ||
        (typeof error === "string" ? error : "Failed to update email account");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateOAuth = async () => {
    if (!emailAccount?._id) {
      toast.error("Email account ID is missing");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: emailAccount._id,
        data: {
          oauth: {
            limit: Number(OAuthFormData.limit),
            time_gap: Number(OAuthFormData.time_gap),
          },
        },
      };

      const response = await dispatch(updateEmailAccount(payload)).unwrap();
      toast.success(response?.message || "Email account updated successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (error as { message?: string })?.message ||
        (typeof error === "string" ? error : "Failed to update email account");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box>
        {emailAccount?.type === "imap" && (
          <div>
            <HeadingText>
              <h3>SMTP Settings (sending emails)</h3>
            </HeadingText>
            <Grid2 container spacing={2} sx={{ justifyContent: "left", mt: 1 }}>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>From Name</InputLabel>
                <TextField
                  fullWidth
                  name="fromName"
                  disabled
                  value={smtpFormData.name}
                  error={false}
                  helperText=""
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      backgroundColor: "var(--input-disabled-bg, #f5f5f5)",
                      "& fieldset": {
                        borderColor: "var(--border-grey, #e0e0e0) !important",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "var(--text-secondary, #666)",
                      color: "var(--text-secondary, #666)",
                    },
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>From Email</InputLabel>
                <TextField
                  fullWidth
                  name="fromEmail"
                  disabled
                  value={smtpFormData.email}
                  error={false}
                  helperText=""
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      backgroundColor: "var(--input-disabled-bg, #f5f5f5)",
                      "& fieldset": {
                        borderColor: "var(--border-grey, #e0e0e0) !important",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "var(--text-secondary, #666)",
                      color: "var(--text-secondary, #666)",
                    },
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>User Name</InputLabel>
                <TextField
                  fullWidth
                  name="userName"
                  value={smtpFormData.smtp.auth.user}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userName && !!errors.userName}
                  helperText={touched.userName ? errors.userName : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>Password</InputLabel>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  value={smtpFormData.smtp.auth.pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>SMTP host</InputLabel>
                <TextField
                  fullWidth
                  name="smtpHost"
                  value={smtpFormData.smtp.host}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.smtpHost && !!errors.smtpHost}
                  helperText={touched.smtpHost ? errors.smtpHost : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 2 }}>
                <InputLabel>SMTP Port</InputLabel>
                <TextField
                  fullWidth
                  name="smtpPort"
                  value={smtpFormData.smtp.port}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.smtpPort && !!errors.smtpPort}
                  helperText={touched.smtpPort ? errors.smtpPort : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 2 }}>
                <InputLabel>Security</InputLabel>
                <RadioGroup
                  sx={{ display: "block", marginTop: "10%" }}
                  value={smtpFormData.smtp.secure ? "ssl" : "tls"}
                  onChange={(e) => handleSelectChange(e, "security")}
                >
                  <Radio value="ssl" />
                  <label>SSL</label>
                  <Radio value="tls" />
                  <label>TLS</label>
                </RadioGroup>
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>Message Per Day (Warmups not included)</InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  name="limit"
                  value={smtpFormData.limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.limit && !!errors.limit}
                  helperText={touched.limit ? errors.limit : ""}
                  inputProps={{ min: 1 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>Minimum time gap (min)</InputLabel>
                <TextField
                  fullWidth
                  // type="number"
                  name="time_gap"
                  value={smtpFormData.time_gap}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.time_gap && !!errors.time_gap}
                  helperText={touched.time_gap ? errors.time_gap : ""}
                  inputProps={{ min: 1 }}
                />
              </Grid2>
              <Grid2 size={{ xs: 10, sm: 10 }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Checkbox
                    checked={smtpFormData.replyToAddress ? true : false}
                    onChange={handleChange}
                    name="replyToAddress"
                  />
                  Set a different reply-to address
                </label>

                {(smtpFormData.replyToAddress ? true : false) && (
                  <Grid2 size={{ xs: 5, sm: 5 }} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      name="replyToAddress"
                      value={smtpFormData.replyToAddress}
                      onChange={handleChange}
                      placeholder="Reply-to email address"
                    />
                  </Grid2>
                )}
              </Grid2>
              <Grid2 size={{ xs: 10, sm: 10 }}>
                <b>
                  <div>IMAP Settings (receives emails)</div>
                </b>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Checkbox
                    checked={smtpFormData.differentImap}
                    onChange={handleChange}
                    name="useDifferentImap"
                  />
                  Use different email accounts for receiving emails
                </label>
              </Grid2>

              {smtpFormData.differentImap && (
                <>
                  <Grid2 size={{ xs: 5, sm: 5 }}>
                    <InputLabel>IMAP User Name</InputLabel>
                    <TextField
                      fullWidth
                      name="imapUserName"
                      value={smtpFormData.imap.auth.user}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 5, sm: 5 }}>
                    <InputLabel>IMAP Password</InputLabel>
                    <TextField
                      fullWidth
                      type="password"
                      name="imapPassword"
                      value={smtpFormData.imap.auth.pass}
                      onChange={handleChange}
                    />
                  </Grid2>
                </>
              )}

              <Grid2 size={{ xs: 5, sm: 5 }}>
                <InputLabel>IMAP Host</InputLabel>
                <TextField
                  fullWidth
                  name="imapHost"
                  value={smtpFormData.imap.host}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.imapHost && !!errors.imapHost}
                  helperText={touched.imapHost ? errors.imapHost : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 2 }}>
                <InputLabel>IMAP Port</InputLabel>
                <TextField
                  fullWidth
                  name="imapPort"
                  value={smtpFormData.imap.port}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.imapPort && !!errors.imapPort}
                  helperText={touched.imapPort ? errors.imapPort : ""}
                />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 2 }}>
                <InputLabel>Security</InputLabel>
                <RadioGroup
                  sx={{ display: "block", marginTop: "10%" }}
                  value={smtpFormData.imap.secure ? "ssl" : "tls"}
                  onChange={(e) => handleSelectChange(e, "imapSecurity")}
                >
                  <Radio value="ssl" />
                  <label>SSL</label>
                  <Radio value="tls" />
                  <label>TLS</label>
                </RadioGroup>
              </Grid2>

              <Grid2 size={{ xs: 10, sm: 10 }}>
                <Button
                  onClick={handleVerifyAccount}
                  color={"white"}
                  disabled={verificationInProgress}
                  background={"var(--theme-color)"}
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  {verificationInProgress ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Verify Email Account"
                  )}
                </Button>
              </Grid2>
              {isVerified && (
                <Grid2
                  size={{ xs: 10, sm: 10 }}
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <CheckBoxIcon sx={{ color: "green" }} />
                  <div style={{ color: "green" }}>
                    Email account verified successfully!
                  </div>
                </Grid2>
              )}
              {verificationFailed && (
                <Grid2
                  size={{ xs: 12, sm: 12 }}
                  sx={{ display: "flex", gap: "10px" }}
                >
                  <div style={{ color: "var(--error-color)" }}>
                    Email account verification failed. Please check your
                    credentials and try again.
                  </div>
                </Grid2>
              )}
              <Grid2 size={{ xs: 10, sm: 10 }}>
                <div>Signature</div>
                <div>
                  Enter your email signature below (manually or by copy-pasting
                  it from your email client).
                </div>
              </Grid2>
              <Grid2 size={{ xs: 10, sm: 10 }}>
                <ReactQuill
                  theme="snow"
                  value={smtpFormData.signature}
                  onChange={(value: string) =>
                    setSmtpFormData((prev) => ({ ...prev, signature: value }))
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 10, sm: 10 }} sx={{ mt: 3 }}>
                <Button
                  onClick={handleUpdate}
                  disabled={loading || verificationInProgress}
                  style={{
                    padding: "10px 24px",
                    cursor:
                      loading || verificationInProgress
                        ? "not-allowed"
                        : "pointer",
                    opacity: loading || verificationInProgress ? 0.6 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ mr: 1, color: "white" }}
                      />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </Grid2>
            </Grid2>
          </div>
        )}

        {(emailAccount?.type === "gmail" ||
          emailAccount?.type === "outlook") && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <HeadingText>
              <h3>SMTP Settings (sending emails)</h3>
            </HeadingText>

            <Grid2 container columnGap={5} rowGap={3}>
              {/* A */}
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <TextField
                  disabled
                  label="From Name"
                  value={OAuthFormData.name}
                  fullWidth
                />
              </Grid2>

              {/* B */}
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <TextField
                  disabled
                  label="From Email"
                  value={OAuthFormData.email}
                  fullWidth
                />
              </Grid2>

              {/* C */}
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <TextField
                  required
                  name="limit"
                  label="Message Per Day (Warmups not included)"
                  value={OAuthFormData.limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.limit && errors.limit)}
                  helperText={touched.limit && errors.limit ? errors.limit : ""}
                />
              </Grid2>

              {/* D */}
              <Grid2 size={{ xs: 5, sm: 5 }}>
                <TextField
                  required
                  name="time_gap"
                  label="Minimum time gap (min)"
                  value={OAuthFormData.time_gap}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.time_gap && errors.time_gap)}
                  helperText={
                    touched.time_gap && errors.time_gap ? errors.time_gap : ""
                  }
                />
              </Grid2>
            </Grid2>
          </div>
        )}
      </Box>
      <SectionFooter>
        <Button
          onClick={handleUpdate}
          disabled={loading}
          style={{
            padding: "10px 24px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </SectionFooter>
    </Container>
  );
};

export default GeneralAccount;
