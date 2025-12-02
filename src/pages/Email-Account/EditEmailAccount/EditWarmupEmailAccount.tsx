import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Switch, Slider, Checkbox, Box } from "@mui/material";
import {
  HeadingText,
  InfoText,
  SettingBlock,
  WarmUpBlock,
  WarmUpHeading,
  SettingBlock2,
  WarmupBox,
} from "./EditEmailAccount.styled";
import { TextField } from "../../../styles/layout.styled";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  updateEmailAccount,
  getEmailAccountSmtpDetail,
} from "../../../redux/slice/emailAccountSlice";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import { EmailAccount } from "../../../redux/slice/emailAccountSlice";
import { Button, Container, SectionFooter } from "../../../styles/global.styled";
interface EditWarmupEmailAccountProps {
  id?: string;
  emailAccount?: EmailAccount;
}

export interface EditWarmupEmailAccountRef {
  handleUpdate: () => Promise<void>;
  loading: boolean;
}

interface WarmupState {
  enabled: boolean;
  maxPerDay: number;
  dailyRampup: boolean;
  rampupIncrement: number;
  maxEmailsPerDay: number[];
  replyRate: number;
  dailyReplyTarget: number;
  identifierTagFirst: string;
  identifierTagSecond: string;
  autoAdjust: boolean;
  customDomainTracking: boolean;
  weekdaysOnly: boolean;
}

const switchStyles = {
  primary: {
    "& .MuiSwitch-track": { backgroundColor: "#BDBDBD", opacity: 1 },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "var(--primary) !important",
      opacity: 1,
    },
    "& .MuiSwitch-thumb": { backgroundColor: "#9E9E9E" },
    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
      backgroundColor: "var(--primary-dark)",
    },
  },
  secondary: {
    "& .MuiSwitch-track": { backgroundColor: "#BDBDBD", opacity: 1 },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "var(--secondary) !important",
      opacity: 1,
    },
    "& .MuiSwitch-thumb": { backgroundColor: "#9E9E9E" },
    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
      backgroundColor: "var(--secondary-dark)",
    },
  },
};

const EditWarmupEmailAccount = forwardRef<
  EditWarmupEmailAccountRef,
  EditWarmupEmailAccountProps
>(({ id, emailAccount: emailAccountProp }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const emailAccountFromRedux = useSelector((state: RootState) =>
    id ? state.emailAccount?.accounts?.[id] : null
  );
  const emailAccount = emailAccountProp || emailAccountFromRedux;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WarmupState>({
    enabled: false,
    maxPerDay: 0,
    dailyRampup: false,
    rampupIncrement: 0,
    maxEmailsPerDay: [0, 0],
    replyRate: 0,
    dailyReplyTarget: 0,
    identifierTagFirst: "",
    identifierTagSecond: "",
    autoAdjust: false,
    customDomainTracking: false,
    weekdaysOnly: false,
  });

  const checkBoxSettings = [
    // {
    //   key: "autoAdjust" as const,
    //   label: "Enable Auto-adjust warmup/sending ratio",
    //   description:
    //     "Would you like us to adjust the warmups to optimize for email deliverability",
    // },
    {
      key: "customDomainTracking" as const,
      label: "Warmup the Custom Domain tracking Link",
      description:
        "We will warmup your custom domain tracking link for better deliverability.",
    },
    {
      key: "weekdaysOnly" as const,
      label: "Send warmup emails only on weekdays",
      description:
        "To emulate human sending patterns, Jooper AI will automatically pause sending warmup emails on weekends.",
    },
  ];
  useEffect(() => {
    if (id && !emailAccountProp) {
      dispatch(getEmailAccountSmtpDetail(id));
    }
  }, [id, dispatch, emailAccountProp]);

  useEffect(() => {
    if (!emailAccount || !emailAccount._id) {
      return;
    }

    const warmup = emailAccount.warmup;

    if (warmup) {
      const identifierTagFirst = warmup.identifierTag?.split("-")[0] || "";
      const identifierTagSecond = warmup.identifierTag?.split("-")[1] || "";

      setFormData({
        enabled: warmup.enabled ?? false,
        maxPerDay: warmup.maxPerDay ?? 0,
        dailyRampup: warmup.dailyRampup ?? false,
        rampupIncrement: warmup.rampupIncrement ?? 0,
        maxEmailsPerDay: Array.isArray(warmup.maxEmailsPerDay)
          ? warmup.maxEmailsPerDay
          : [0, 0],
        replyRate: warmup.replyRate ?? 20,
        dailyReplyTarget: warmup.dailyReplyTarget ?? 0,
        identifierTagFirst: identifierTagFirst,
        identifierTagSecond: identifierTagSecond,
        autoAdjust: warmup.autoAdjust ?? false,
        customDomainTracking: warmup.customDomainTracking ?? false,
        weekdaysOnly: warmup.weekdaysOnly ?? false,
      });
    } else {
      setFormData({
        enabled: false,
        maxPerDay: 0,
        dailyRampup: false,
        rampupIncrement: 0,
        maxEmailsPerDay: [0, 0],
        replyRate: 20,
        dailyReplyTarget: 0,
        identifierTagFirst: "",
        identifierTagSecond: "",
        autoAdjust: false,
        customDomainTracking: false,
        weekdaysOnly: false,
      });
    }
  }, [emailAccount]);

  const handleChange = <K extends keyof WarmupState>(
    field: K,
    value: WarmupState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateWarmup = async (): Promise<void> => {
    if (!id) {
      toast.error("Email account ID is missing");
      return;
    }

    setLoading(true);

    const payload = {
      warmup: {
        enabled: formData.enabled,
        maxPerDay: formData.maxPerDay,
        dailyRampup: formData.dailyRampup,
        rampupIncrement: formData.rampupIncrement,
        startDate: new Date(),
        maxEmailsPerDay: formData.maxEmailsPerDay,
        replyRate: formData.replyRate,
        dailyReplyTarget: formData.dailyReplyTarget,
        identifierTag: `${formData.identifierTagFirst}-${formData.identifierTagSecond}`,
        autoAdjust: formData.autoAdjust,
        customDomainTracking: formData.customDomainTracking,
        weekdaysOnly: formData.weekdaysOnly,
        reputation: 100,
        reputationLastCalculated: new Date(),
      },
    };

    try {
      const res = await dispatch(
        updateEmailAccount({ id, data: payload })
      ).unwrap();
      toast.success(res?.message || "Warmup settings updated successfully");

      if (id) {
        await dispatch(getEmailAccountSmtpDetail(id));
      }
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to update warmup settings"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpdate: handleUpdateWarmup,
    loading,
  }));

  return !loading ? (
    <Box>
      <Container>
        <InfoText>
          Warming up an IP address involves sending low volumes of email on your
          dedicated IP and then systematically increasing your email volume over
          a period of time.
        </InfoText>
        <WarmUpBlock>
          <WarmUpHeading>
            <Switch
              checked={formData.enabled}
              onChange={(e) => handleChange("enabled", e.target.checked)}
              sx={switchStyles.primary}
            />
            <HeadingText>
              <h3>Email Warmup Enabled</h3>
            </HeadingText>
          </WarmUpHeading>
        </WarmUpBlock>
        {formData.enabled && (
          <>
            <SettingBlock>
              <HeadingText>
                <h3>Total number of warm-up emails per day</h3>
                <p>
                  Maximum number of warm-up emails that could be sent via this
                  email account per day{" "}
                </p>
              </HeadingText>

              <TextField
                type="number"
                value={formData.maxPerDay}
                onChange={(e) =>
                  handleChange("maxPerDay", Number(e.target.value))
                }
              />
            </SettingBlock>

            <WarmUpBlock>
              <WarmUpHeading>
                <Switch
                  checked={formData.dailyRampup}
                  onChange={(e) =>
                    handleChange("dailyRampup", e.target.checked)
                  }
                  sx={switchStyles.secondary}
                />
                <HeadingText>
                  <h3>Daily Rampup</h3>
                </HeadingText>
              </WarmUpHeading>
            </WarmUpBlock>

            {formData.dailyRampup && (
              <>
                <SettingBlock>
                  <HeadingText>
                    <h3>Rampup increment value per day</h3>
                    <p>(suggested 5 per day)</p>
                  </HeadingText>

                  <TextField
                    type="number"
                    value={formData.rampupIncrement}
                    onChange={(e) =>
                      handleChange("rampupIncrement", Number(e.target.value))
                    }
                    inputProps={{ min: 5, max: 100 }}
                  />
                </SettingBlock>
                <WarmupBox>
                  <HeadingText>
                    <h3>Randomise number of warm-up emails per day</h3>
                    <p>
                      Maximum number of emails that could be sent via this email
                      account per day
                    </p>
                  </HeadingText>
                  <Slider
                    value={formData.maxEmailsPerDay}
                    min={1}
                    max={100}
                    onChange={(_e, newValue) =>
                      handleChange("maxEmailsPerDay", newValue as number[])
                    }
                    valueLabelDisplay="auto"
                    sx={{
                      marginLeft: "12px",
                      color: "var(--primary)",
                      marginRight: "12px",
                      width: "90%",
                    }}
                  />
                </WarmupBox>

                <SettingBlock>
                  <HeadingText>
                    <h3>Reply Rate (%)</h3>
                    <p>Suggested - 20, Maximum - 100</p>
                  </HeadingText>
                  <TextField
                    type="number"
                    value={formData.replyRate}
                    onChange={(e) =>
                      handleChange("replyRate", Number(e.target.value))
                    }
                    inputProps={{ min: 20, max: 100 }}
                  />
                </SettingBlock>
                <WarmupBox>
                  <HeadingText>
                    <h3>Daily Target for Replies to Inbound Warmup Emails</h3>
                    <p>
                      Set how many replies this mailbox will send to inbound
                      warmup emails each day.
                    </p>
                  </HeadingText>
                  <Slider
                    value={formData.dailyReplyTarget}
                    min={1}
                    max={50}
                    onChange={(_e, newValue) =>
                      handleChange("dailyReplyTarget", newValue as number)
                    }
                    valueLabelDisplay="auto"
                    sx={{
                      marginLeft: "12px",
                      marginRight: "12px",
                      color: "var(--secondary)",
                      width: "90%",
                    }}
                  />
                </WarmupBox>

                <WarmupBox>
                  <HeadingText>
                    <h3>Custom Warmup Identifier Tag</h3>
                    <p>
                      Use this two-worded tag to filter out any warmup emails
                      from your inbox.
                    </p>
                  </HeadingText>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      type="text"
                      value={formData.identifierTagFirst}
                      onChange={(e) =>
                        handleChange("identifierTagFirst", e.target.value)
                      }
                    />
                    -
                    <TextField
                      type="text"
                      value={formData.identifierTagSecond}
                      onChange={(e) =>
                        handleChange("identifierTagSecond", e.target.value)
                      }
                    />
                    = {formData.identifierTagFirst} -{" "}
                    {formData.identifierTagSecond}
                  </div>
                </WarmupBox>

                {checkBoxSettings.map(({ key, label, description }) => (
                  <SettingBlock2 key={key}>
                    <Checkbox
                      checked={formData[key]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(key, e.target.checked)
                      }
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": { color: "#3b82f6" },
                      }}
                    />
                    <HeadingText>
                      <h3>{label}</h3>
                      <p>{description}</p>
                    </HeadingText>
                  </SettingBlock2>
                ))}
              </>
            )}
          </>
        )}
      </Container>

      <SectionFooter>
        <Button onClick={handleUpdateWarmup} style={{ minWidth: "150px" }}>
          Update
        </Button>
      </SectionFooter>
    </Box>
  ) : (
    <Loader />
  );
});

EditWarmupEmailAccount.displayName = "EditWarmupEmailAccount";

export default EditWarmupEmailAccount;
