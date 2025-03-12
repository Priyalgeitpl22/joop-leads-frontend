import React, { useEffect, useState } from "react";
import {
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid2 from "@mui/material/Grid2";
import { Button2, TextField, InputLabel } from "../../../styles/layout.styled";
import ReactQuill from "react-quill";
import {
  CreateEmailAccount,
  CreateEmailAccountPayload,
  getEmailAccountSmtpDetail,
  verifyEmailAccount,
  VerifyEmailAccountPayload,
} from "../../../redux/slice/emailAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";

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
    smtpPort: 0,
    security: false,
    imapHost: "",
    imapPort: 0,
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
    messagePerDay: "",
    timeGap: "",
    type: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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
        messagePerDay: emailAccount?.messagePerDay || "",
        timeGap: emailAccount?.timeGap || "",
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
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value === "ssl";
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      .then(() => {
        setIsVerified(true);
        setIsSaveDisabled(false);
      })
      .catch(() => {
        setIsVerified(false);
        setIsSaveDisabled(true);
      });
  };

  const handleCreateAccount = () => {
    const payload: CreateEmailAccountPayload = {
      account: "smtp",
      name: formData.fromName,
      state: "init",
      type: "imap",
      email: formData.fromEmail,
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
      .then(() => {
        
      })
      .catch(() => {});
  };

  return (
    <div style={{ padding: "3%" }}>
      {formData.type === "imap" && (
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
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Email</InputLabel>
              <TextField
                fullWidth
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>User Name</InputLabel>
              <TextField
                fullWidth
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Password</InputLabel>
              <TextField
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>SMTP host</InputLabel>
              <TextField
                fullWidth
                name="smtpHost"
                value={formData.smtpHost}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <InputLabel>SMTP Port</InputLabel>
              <TextField
                fullWidth
                name="smtpPort"
                value={formData.smtpPort}
                onChange={handleChange}
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
                name="messagePerDay"
                value={formData.messagePerDay}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min)</InputLabel>
              <TextField
                fullWidth
                name="timeGap"
                value={formData.timeGap}
                onChange={handleChange}
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
              />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 2 }}>
              <InputLabel>IMAP Port</InputLabel>
              <TextField
                fullWidth
                name="imapPort"
                value={formData.imapPort}
                onChange={handleChange}
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
                background={"var(--theme-color)"}
                style={{ cursor: "pointer" }}
              >
                Verify Email Account
              </Button2>
            </Grid2>
            {isVerified && (
              <Grid2
                size={{ xs: 10, sm: 10 }}
                sx={{ display: "flex", gap: "10px" }}
              >
                <CheckBoxIcon sx={{ color: "green" }} />
                <div>Email account verified successfully!</div>
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
                onClick={handleCreateAccount}
                color={isSaveDisabled ? "black" : "white"}
                background={isSaveDisabled ? "#d3d3d3" : "var(--theme-color)"}
                style={{
                  width: "40%",
                  cursor: isSaveDisabled ? "not-allowed" : "pointer",
                }}
              >
                Save
              </Button2>
            </Grid2>
          </Grid2>
        </div>
      )}

      {formData.type === "gmail" && (
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
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>From Email</InputLabel>
              <TextField
                fullWidth
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Message Per Day (Warmups not included)</InputLabel>
              <TextField
                fullWidth
                name="messagePerDay"
                value={formData.messagePerDay}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 5, sm: 5 }}>
              <InputLabel>Minimum time gap (min)</InputLabel>
              <TextField
                fullWidth
                name="timeGap"
                value={formData.timeGap}
                onChange={handleChange}
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
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 10 }}>
              <Button2
                // onClick={handleVerifyAccount}
                color={"white"}
                background={"var(--theme-color)"}
                style={{ cursor: "pointer" }}
              >
                Reconnect
              </Button2>
            </Grid2>
          </Grid2>
        </div>
      )}
    </div>
  );
};

export default EditGeneralEmailAccount;
