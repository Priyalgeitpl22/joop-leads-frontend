import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
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
import { TextField, InputLabel } from "../../../styles/layout.styled";

import ReactQuill from "react-quill";
import {
  getEmailAccountSmtpDetail,
  updateEmailAccount,
  verifyEmailAccount,
  VerifyEmailAccountPayload,
  EmailAccount,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { validateEmail } from "../../../utils/Validation";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import { Button } from "../../../styles/global.styled";

interface EditGeneralEmailAccountProps {
  id?: string;
  emailAccount: EmailAccount;
}

export interface EditGeneralEmailAccountRef {
  handleUpdate: () => Promise<void>;
  isUpdateDisabled: boolean;
  loading: boolean;
}

const EditGeneralEmailAccount = forwardRef<
  EditGeneralEmailAccountRef,
  EditGeneralEmailAccountProps
>(({ id, emailAccount: emailAccountProp }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const emailAccountFromRedux = useSelector((state: RootState) =>
    id ? state.emailAccount?.accounts?.[id] : null
  );
  const emailAccount = emailAccountProp || emailAccountFromRedux;

  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    limit: 0,
    timeGap: 0,
    time_gap: 0,
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: null as number | null,
    security: true,
    imapHost: "",
    imapPort: null as number | null,
    imapSecurity: true,
    imapUserName: "",
    imapPassword: "",
    replyToAddressChecked: false,
    replyToAddress: "",
    bccEmail: "",
    trackingDomainChecked: false,
    tags: "",
    clients: "",
    signature: "",
    type: "",
  });

  const [smtpFormData, setSmtpFormData] = useState({
    fromName: "",
    fromEmail: "",
    limit: 0,
    warmup: {
      enabled: false,
      maxPerDay: 0,
      dailyRampup: false,
      rampupIncrement: 0,
    },
  });

  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [errors, setErrors] = useState({
    fromName: "",
    fromEmail: "",
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: "",
    limit: "",
    time_gap: "",
    imapHost: "",
    imapPort: "",
  });

  useEffect(() => {
    if (id && !emailAccountProp) {
      dispatch(getEmailAccountSmtpDetail(id));
    }
  }, [id, dispatch, emailAccountProp]);

  useEffect(() => {
    if (emailAccount) {
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
        imap?: {
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
        bccEmail?: string;
        trackingDomain?: boolean;
        tags?: string;
        clients?: string;
      };
      setFormData({
        fromName: account?.name || "",
        fromEmail: account?.email || "",
        limit: account?.limit || 0,
        timeGap: account?.time_gap || 0,
        time_gap: account?.time_gap || 0,
        userName: account?.smtp?.auth?.user || "",
        password: account?.smtp?.auth?.pass || "",
        smtpHost: account?.smtp?.host || "",
        smtpPort: account?.smtp?.port ?? null,
        security: account?.smtp?.secure ?? true,
        imapHost: account?.imap?.host || "",
        imapPort: account?.imap?.port ?? null,
        imapSecurity: account?.imap?.secure ?? true,
        imapUserName: account?.imap?.auth?.user || "",
        imapPassword: account?.imap?.auth?.pass || "",
        replyToAddressChecked: !!account?.replyToAddress,
        replyToAddress: account?.replyToAddress || "",
        bccEmail: account?.bccEmail || "",
        trackingDomainChecked: account?.trackingDomain || false,
        tags: account?.tags || "",
        clients: account?.clients || "",
        signature: account?.signature || "",
        type: account?.type || "",
      });
      setSmtpFormData({
        fromName: account?.name || "",
        fromEmail: account?.email || "",
        limit: account?.limit || 0,
        warmup: {
          enabled: account?.warmup?.enabled ?? false,
          maxPerDay: account?.warmup?.maxPerDay ?? 0,
          dailyRampup: account?.warmup?.dailyRampup ?? false,
          rampupIncrement: account?.warmup?.rampupIncrement ?? 0,
        },
      });
    }
  }, [emailAccount]);

  const isUpdateDisabled =  false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "smtpPort" || name === "imapPort" || name === "timeGap"
            ? Number(value)
            : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSmtpFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setSmtpFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "limit"
          ? Number(value)
          : value,
    }));
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
    setVerificationFailed(false);
    setVerificationInProgress(true);
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
      })
      .catch(() => {
        setVerificationFailed(true);
        setVerificationInProgress(false);
        setIsVerified(false);
      })
      .finally(() => {
        setVerificationInProgress(false);
      });
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromName.trim()) newErrors.fromName = "From Name is required";
    if (!formData.fromEmail.trim()) {
      newErrors.fromEmail = "From Email is required";
    } else if (!validateEmail(formData.fromEmail)) {
      newErrors.fromEmail = "Enter a valid email address";
    }
    if (!formData.userName.trim()) newErrors.userName = "User Name is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.smtpHost.trim()) newErrors.smtpHost = "SMTP Host is required";

    if (formData.smtpPort === null || formData.smtpPort === undefined) {
      newErrors.smtpPort = "SMTP Port is required";
    }

    if (
      !formData.limit ||
      isNaN(Number(formData.limit)) ||
      Number(formData.limit) <= 0
    ) {
      newErrors.limit = "Message per day must be a positive number";
    }
    if (
      !formData.timeGap ||
      isNaN(Number(formData.timeGap)) ||
      Number(formData.timeGap) <= 0
    ) {
      newErrors.time_gap = "Minimum time gap must be a positive number";
    }

    if (!formData.imapHost.trim()) newErrors.imapHost = "IMAP Host is required";

    if (formData.imapPort === null || formData.imapPort === undefined) {
      newErrors.imapPort = "Imap port is required";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    console.log("Validation Errors:", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatAccount = async (): Promise<void> => {
    if (!id) return;

    let payload;
    setLoading(true);
    if (formData.type === "gmail") {
      payload = {
        name: formData.fromName,
        email: formData.fromEmail,
        limit: formData.limit,
        time_gap: formData.timeGap,
        type: formData.type,
      };
    } else {
      payload = {
        name: formData.fromName,
        email: formData.fromEmail,
        smtp: {
          host: formData.smtpHost,
          port: formData.smtpPort,
          secure: formData.security,
          auth: {
            user: formData.userName,
            pass: formData.password,
          },
        },
        imap: {
          host: formData.imapHost,
          port: formData.imapPort,
          secure: formData.imapSecurity,
          auth: {
            user: formData.imapUserName,
            pass: formData.imapPassword,
          },
        },
        replyToAddress: formData.replyToAddressChecked
          ? formData.replyToAddress
          : "",
        bccEmail: formData.bccEmail,
        trackingDomain: formData.trackingDomainChecked
          ? formData.trackingDomainChecked
          : false,
        tags: formData.tags,
        clients: formData.clients,
        signature: formData.signature,
        limit: formData.limit,
        time_gap: formData.timeGap,
        type: formData.type,
      };
    }

    try {
      const res = await dispatch(
        updateEmailAccount({ id, data: payload })
      ).unwrap();
      console.log(res);
      toast.success(res?.message);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpdate: handleUpdatAccount,
    isUpdateDisabled,
    loading,
  }));

  return !loading ? (
    <div
      style={{
        padding: "3%",
        border: "1px solid var(--border-grey)",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      {emailAccount?.type === "imap" && (
        <div>
          <Box sx={{ paddingBottom: "1rem" }}>
            <Typography
              sx={{ fontWeight: "bold", color: "var(--text-secondary)" }}
            >
              SMTP Settings (sending emails)
            </Typography>
          </Box>
          <Grid2 container spacing={2} sx={{ justifyContent: "left", mt: 1 }}>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Name</InputLabel>
              <TextField
                fullWidth
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                error={!!errors.fromName}
                helperText={errors.fromName}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Email</InputLabel>
              <TextField
                fullWidth
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
                error={!!errors.fromEmail}
                helperText={errors.fromEmail}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>User Name</InputLabel>
              <TextField
                fullWidth
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                error={!!errors.userName}
                helperText={errors.userName}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Password</InputLabel>
              <TextField
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>SMTP host</InputLabel>
              <TextField
                fullWidth
                name="smtpHost"
                value={formData.smtpHost}
                onChange={handleChange}
                error={!!errors.smtpHost}
                helperText={errors.smtpHost}
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <InputLabel>SMTP Port</InputLabel>
              <TextField
                fullWidth
                name="smtpPort"
                value={formData.smtpPort}
                onChange={handleChange}
                error={!!errors.smtpPort}
                helperText={errors.smtpPort}
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <RadioGroup
                sx={{ display: "block", marginTop: "10%" }}
                value={formData.imapSecurity ? "ssl" : "tls"}
                onChange={(e) => handleSelectChange(e, "imapSecurity")}
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
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                error={!!errors.limit}
                helperText={errors.limit}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min)</InputLabel>
              <TextField
                fullWidth
                name="timeGap"
                value={formData.timeGap}
                onChange={handleChange}
                error={!!errors.time_gap}
                helperText={errors.time_gap}
              />
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 10 }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Checkbox
                  checked={formData.replyToAddressChecked}
                  onChange={handleChange}
                  name="replyToAddressChecked"
                />
                Set a different reply-to address
              </label>

              {formData.replyToAddressChecked && (
                <Grid2 size={{ xs: 5, sm: 5 }}>
                  <TextField
                    fullWidth
                    name="replyToAddress"
                    value={formData.replyToAddress}
                    onChange={handleChange}
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
                  checked={formData.replyToAddressChecked}
                  onChange={handleChange}
                  name="replyToAddressChecked"
                />
                Use different email accounts for receiving emails
              </label>
            </Grid2>

            {formData.replyToAddressChecked && (
              <>
                <Grid2 size={{ xs: 5, sm: 5 }}>
                  <InputLabel>IMAP User Name</InputLabel>
                  <TextField
                    fullWidth
                    name="imapUserName"
                    value={formData.imapUserName}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 5, sm: 5 }}>
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

            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>IMAP Host</InputLabel>
              <TextField
                fullWidth
                name="imapHost"
                value={formData.imapHost}
                onChange={handleChange}
                error={!!errors.imapHost}
                helperText={errors.imapHost}
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <InputLabel>IMAP Port</InputLabel>
              <TextField
                fullWidth
                name="imapPort"
                value={formData.imapPort}
                onChange={handleChange}
                error={!!errors.imapPort}
                helperText={errors.imapPort}
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <RadioGroup
                sx={{ display: "block", marginTop: "10%" }}
                value={formData.imapSecurity ? "ssl" : "tls"}
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
                disabled={verificationInProgress}
                style={{ 
                  width: "100%", 
                  cursor: "pointer",
                  background: "var(--theme-color)",
                  color: "white"
                }}
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
                sx={{ display: "flex", gap: "10px" }}
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
                Enter your email signature below (manually or by copy-pasting it
                from your email client).
              </div>
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 10 }}>
              <ReactQuill
                theme="snow"
                value={formData.signature}
                onChange={(value: string) =>
                  setFormData((prev) => ({ ...prev, signature: value }))
                }
              />
            </Grid2>
          </Grid2>
        </div>
      )}

      {(emailAccount?.type === "gmail" || emailAccount?.type === "outlook") && (
        <div>
          <Box sx={{ paddingBottom: "2rem" }}>
            <Typography
              sx={{ fontWeight: "bold", color: "var(--text-secondary)" }}
            >
              SMTP Settings (sending emails)
            </Typography>
          </Box>

          <Grid2 container spacing={5} sx={{ justifyContent: "left" }}>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Name</InputLabel>

              <TextField
                fullWidth
                name="fromName"
                value={smtpFormData.fromName}
                error={!smtpFormData.fromName}
                helperText={!smtpFormData.fromName ? "From Name is required" : ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Email</InputLabel>

              <TextField
                fullWidth
                name="fromEmail"
                value={smtpFormData.fromEmail}
                error={
                  !smtpFormData.fromEmail || !validateEmail(smtpFormData.fromEmail)
                }
                helperText={
                  !smtpFormData.fromEmail
                    ? "From Email is required"
                    : !validateEmail(smtpFormData.fromEmail)
                      ? "Enter a valid email address"
                      : ""
                }
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Message Per Day (Warmups not included) *</InputLabel>
              <TextField
                fullWidth
                type="number"
                name="limit"
                placeholder="12"
                value={smtpFormData.limit}
                onChange={handleSmtpFormDataChange}
                error={!smtpFormData.limit || smtpFormData.limit <= 0}
                inputProps={{ min: 1 }}
                helperText={
                  !smtpFormData.limit
                    ? "Msg per day is required"
                    : smtpFormData.limit <= 0
                      ? "Enter a valid positive number"
                      : ""
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min) *</InputLabel>
              <TextField
                fullWidth
                type="number"
                name="timeGap"
                placeholder="12"
                value={formData.timeGap}
                onChange={handleChange}
                error={!formData.timeGap || formData.timeGap <= 0}
                helperText={
                  !formData.timeGap
                    ? " Minimum time gap is required"
                    : formData.timeGap <= 0
                      ? "Enter a valid positive number"
                      : ""
                }
                inputProps={{ min: 1 }}
              />
            </Grid2>
          </Grid2>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
});

EditGeneralEmailAccount.displayName = "EditGeneralEmailAccount";

export default EditGeneralEmailAccount;
