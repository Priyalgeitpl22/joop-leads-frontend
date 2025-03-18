import React, { useEffect, useState } from "react";
import {
  RadioGroup,
  Radio,
  Checkbox,
  CircularProgress,

} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid2 from "@mui/material/Grid2";
import { Button2, TextField, InputLabel } from "../../../styles/layout.styled";
import { SmtpUpdateTextField } from "../../../styles/layout.styled";

import ReactQuill from "react-quill";
import {
  getEmailAccountSmtpDetail,
  updateEmailAccountSmtpDetail,
  verifyEmailAccount,
  VerifyEmailAccountPayload,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { validateEmail } from "../../../utils/Validation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditGeneralEmailAccount: React.FC<{ id?: string }> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const emailAccount = useSelector((state: RootState) =>
    id ? state.emailAccount?.accounts?.[id] : null
  );

  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: null,
    security: false,
    imapHost: "",
    imapPort: null,
    imapUserName: "",
    imapPassword: "",
    imapSecurity: false,
    replyToAddressChecked: false,
    replyToAddress: "",
    bccEmail: "",
    trackingDomainChecked: false,
    tags: "",
    clients: "",
    signature: "",
    msg_per_day: 0,
    time_gap: null,
    type: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const navigate = useNavigate();
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

  const isUpdateDisabled =
    !formData.fromName ||
    !formData.fromEmail ||
    !validateEmail(formData.fromEmail) ||
    !formData.msg_per_day ||
    formData.msg_per_day <= 0 ||
    !formData.time_gap ||
    formData.time_gap <= 0;

  useEffect(() => {
    if (id) {
      dispatch(getEmailAccountSmtpDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (emailAccount) {
      setFormData({
        fromName: emailAccount?.name || "",
        fromEmail: emailAccount?.email || "",
        userName: emailAccount?.smtp?.auth?.user || "",
        password: emailAccount?.smtp?.auth?.pass || "",
        smtpHost: emailAccount?.smtp?.host || "",
        smtpPort: emailAccount?.smtp?.port || 0,
        security: emailAccount?.smtp?.secure || false,
        imapHost: emailAccount?.imap?.host || "",
        imapPort: emailAccount?.imap?.port || 0,
        imapUserName: emailAccount?.imap?.auth?.user || "",
        imapPassword: emailAccount?.imap?.auth?.pass || "",
        imapSecurity: emailAccount?.imap?.secure || false,
        replyToAddressChecked: !!emailAccount?.replyToAddress,
        replyToAddress: emailAccount?.replyToAddress || "",
        bccEmail: emailAccount?.bccEmail || "",
        trackingDomainChecked: !!emailAccount?.trackingDomain,
        tags: emailAccount?.tags || "",
        clients: emailAccount?.clients || "",
        signature: emailAccount?.signature || "",
        msg_per_day: emailAccount?.msg_per_day || "",
        time_gap: emailAccount?.time_gap || "",
        type: emailAccount?.type || "",
      });
    }
  }, [emailAccount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "smtpPort" || name === "imapPort"
            ? Number(value)
            : value,
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
        setIsSaveDisabled(false);
      })
      .catch(() => {
        setVerificationFailed(true);
        setVerificationInProgress(false);
        setIsVerified(false);
        setIsSaveDisabled(true);
      })
      .finally(() => {
        setVerificationInProgress(false);
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

    if (
      !formData.msg_per_day ||
      isNaN(Number(formData.msg_per_day)) ||
      Number(formData.msg_per_day) <= 0
    ) {
      newErrors.msg_per_day = "Message per day must be a positive number";
    }
    if (
      !formData.time_gap ||
      isNaN(Number(formData.time_gap)) ||
      Number(formData.time_gap) <= 0
    ) {
      newErrors.time_gap = "Minimum time gap must be a positive number";
    }

    if (!formData.imapHost.trim()) newErrors.imapHost = "IMAP Host is required";

    if (formData.imapPort === null || formData.imapPort === "") {
      newErrors.imapPort = "Imap port is required";
    }

    setErrors(newErrors);

    console.log("Validation Errors:", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatAccount = () => {

    if (!id) return;

    let payload;
    setLoading(true);
    if (formData.type === "gmail") {
      payload = {
        name: formData.fromName,
        email: formData.fromEmail,
        msg_per_day: formData.msg_per_day,
        time_gap: formData.time_gap,
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
        msg_per_day: formData.msg_per_day,
        time_gap: formData.time_gap,
        type: formData.type,
      };
    }

    dispatch(updateEmailAccountSmtpDetail({ id, data: payload }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        console.log(res);
        navigate(`/email-accounts`);
        toast.success(res?.message);
        console.log("account updated successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Failed to update email account: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "3%" }}>
      {formData.type === "imap" && (
        <div>
          <b>
            <div>SMTP Settings (sending emails)</div>
          </b>
          <Grid2 container spacing={2} sx={{ justifyContent: "left" }}>
            <Grid2 size={{ xs: 6, sm: 6 }}>
              <InputLabel>From Name</InputLabel>
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
                fullWidth
                name="msg_per_day"
                value={formData.msg_per_day}
                onChange={handleChange}
                error={!!errors.msg_per_day}
                helperText={errors.msg_per_day}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min)</InputLabel>
              <SmtpUpdateTextField
                fullWidth
                name="time_gap"
                value={formData.time_gap}
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
                  <SmtpUpdateTextField
                    fullWidth
                    name="imapUserName"
                    value={formData.imapUserName}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 5, sm: 5 }}>
                  <InputLabel>IMAP Password</InputLabel>
                  <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <SmtpUpdateTextField
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
              <Button2
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
              </Button2>
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
                onChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, signature: value }))
                }
              />
            </Grid2>
            <br />
            <Grid2 size={{ xs: 3, sm: 3 }}>
              <Button2
                disabled={isSaveDisabled}
                onClick={handleUpdatAccount}
                color={isSaveDisabled ? "black" : "white"}
                background={isSaveDisabled ? "#d3d3d3" : "var(--theme-color)"}
                style={{
                  cursor: isSaveDisabled ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Update Details"
                )}{" "}
              </Button2>
            </Grid2>
          </Grid2>
        </div>
      )}

      {(formData.type === "gmail" || formData.type === "outlook") && (
        <div>
          <b>
            <div>SMTP Settings (sending emails)</div>
          </b>
          <Grid2 container spacing={2} sx={{ justifyContent: "left" }}>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Name</InputLabel>

              <TextField
                fullWidth
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                error={!formData.fromName}
                helperText={!formData.fromName ? "From Name is required" : ""}
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
                value={formData.fromEmail}
                onChange={handleChange}
                error={
                  !formData.fromEmail || !validateEmail(formData.fromEmail)
                }
                helperText={
                  !formData.fromEmail
                    ? "From Email is required"
                    : !validateEmail(formData.fromEmail)
                      ? "Enter a valid email address"
                      : ""
                }
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Message Per Day (Warmups not included)</InputLabel>
              <SmtpUpdateTextField
                fullWidth
                type="number"
                name="msg_per_day"
                value={formData.msg_per_day}
                onChange={handleChange}
                error={!formData.msg_per_day || formData.msg_per_day <= 0}
                inputProps={{ min: 1 }}
                helperText={
                  !formData.msg_per_day
                    ? "Time gap is required"
                    : formData.msg_per_day <= 0
                      ? "Enter a valid positive number"
                      : ""
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min)</InputLabel>
              <SmtpUpdateTextField
                fullWidth
                type="number"
                name="time_gap"
                value={formData.time_gap}
                onChange={handleChange}
                error={!formData.time_gap || formData.time_gap <= 0}
                helperText={
                  !formData.time_gap
                    ? "Message Per Day is required"
                    : formData.time_gap <= 0
                      ? "Enter a valid positive number"
                      : ""
                }
                inputProps={{ min: 1 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 10 }}>
              {formData.type === "gmail" ? (
                <Button2
                  disabled={isUpdateDisabled}
                  onClick={handleUpdatAccount}
                  color={"white"}
                  background={"var(--theme-color)"}
                  style={{
                    cursor: isUpdateDisabled ? "not-allowed" : "pointer",
                    width: "20%",
                  }}
                >
                  Update Details
                </Button2>
              ) : (
                <Button2
                  disabled={isSaveDisabled}
                  onClick={handleUpdatAccount}
                  color={"white"}
                  background={"var(--theme-color)"}
                  style={{
                    width: "10%",
                    cursor: isSaveDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Update Details
                </Button2>
              )}
            </Grid2>
          </Grid2>
        </div>
      )}
    </div>
  );
};

export default EditGeneralEmailAccount;
