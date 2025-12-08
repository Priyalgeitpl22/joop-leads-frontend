import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Switch, Slider, Checkbox, Box, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
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
import {
  Button,
  Container,
  SectionFooter,
} from "../../../styles/global.styled";

interface EditWarmupEmailAccountProps {
  id?: string;
  emailAccount?: EmailAccount;
}

export interface EditWarmupEmailAccountRef {
  handleUpdate: () => Promise<void>;
  loading: boolean;
}

interface WarmupFormData {
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

const defaultValues: WarmupFormData = {
  enabled: false,
  maxPerDay: 20,
  dailyRampup: false,
  rampupIncrement: 5,
  maxEmailsPerDay: [1, 50],
  replyRate: 20,
  dailyReplyTarget: 10,
  identifierTagFirst: "",
  identifierTagSecond: "",
  autoAdjust: false,
  customDomainTracking: false,
  weekdaysOnly: false,
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

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WarmupFormData>({
    defaultValues,
    mode: "onChange",
  });

  const enabled = watch("enabled");
  const dailyRampup = watch("dailyRampup");
  const maxPerDay = watch("maxPerDay");
  const identifierTagFirst = watch("identifierTagFirst");
  const identifierTagSecond = watch("identifierTagSecond");

  const checkBoxSettings = [
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

      reset({
        enabled: warmup.enabled ?? false,
        maxPerDay: warmup.maxPerDay || 20,
        dailyRampup: warmup.dailyRampup ?? false,
        rampupIncrement: warmup.rampupIncrement ?? 5,
        maxEmailsPerDay: Array.isArray(warmup.maxEmailsPerDay)
          ? warmup.maxEmailsPerDay
          : [1, 50],
        replyRate: warmup.replyRate ?? 20,
        dailyReplyTarget: warmup.dailyReplyTarget ?? 10,
        identifierTagFirst: identifierTagFirst,
        identifierTagSecond: identifierTagSecond,
        autoAdjust: warmup.autoAdjust ?? false,
        customDomainTracking: warmup.customDomainTracking ?? false,
        weekdaysOnly: warmup.weekdaysOnly ?? false,
      });
    } else {
      reset(defaultValues);
    }
  }, [emailAccount, reset]);

  const onSubmit = async (formData: WarmupFormData): Promise<void> => {
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

  const handleUpdateWarmup = handleSubmit(onSubmit);

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
            <Controller
              name="enabled"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  sx={switchStyles.primary}
                />
              )}
            />
            <HeadingText>
              <h3>Email Warmup Enabled</h3>
            </HeadingText>
          </WarmUpHeading>
        </WarmUpBlock>

        {enabled && (
          <>
            <SettingBlock>
              <HeadingText>
                <h3>Total number of warm-up emails per day</h3>
                <p>
                  Maximum number of warm-up emails that could be sent via this
                  email account per day
                </p>
              </HeadingText>

              <Controller
                name="maxPerDay"
                control={control}
                rules={{
                  required: "This field is required",
                  min: { value: 1, message: "Minimum value is 1" },
                  max: { value: 50, message: "Maximum value is 50" },
                }}
                render={({ field }) => (
                  <Box>
                    <TextField
                      // type="number"
                      value={field.value}
                      defaultValue={20}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      error={!!errors.maxPerDay}
                      inputProps={{ min: 1, max: 50 }}
                    />
                    {errors.maxPerDay && (
                      <FormHelperText error>
                        {errors.maxPerDay.message}
                      </FormHelperText>
                    )}
                  </Box>
                )}
              />
            </SettingBlock>

            <WarmUpBlock>
              <WarmUpHeading>
                <Controller
                  name="dailyRampup"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={switchStyles.secondary}
                    />
                  )}
                />
                <HeadingText>
                  <h3>Daily Rampup</h3>
                </HeadingText>
              </WarmUpHeading>
            </WarmUpBlock>

            {dailyRampup && (
              <>
                <SettingBlock>
                  <HeadingText>
                    <h3>Rampup increment value per day</h3>
                    <p>(suggested 5 per day)</p>
                  </HeadingText>

                  <Controller
                    name="rampupIncrement"
                    control={control}
                    rules={{
                      required: "This field is required",
                      min: { value: 1, message: "Minimum value is 1" },
                      max: { value: 100, message: "Maximum value is 100" },
                    }}
                    render={({ field }) => (
                      <Box>
                        <TextField
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          error={!!errors.rampupIncrement}
                          inputProps={{ min: 1, max: 100 }}
                        />
                        {errors.rampupIncrement && (
                          <FormHelperText error>
                            {errors.rampupIncrement.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
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
                  <Controller
                    name="maxEmailsPerDay"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value[0] < value[1] ||
                        "Min value must be less than max value",
                    }}
                    render={({ field }) => (
                      <Box sx={{ width: "100%" }}>
                        <Slider
                          value={field.value}
                          min={1}
                          max={maxPerDay}
                          onChange={(_e, newValue) =>
                            field.onChange(newValue as number[])
                          }
                          valueLabelDisplay="auto"
                          sx={{
                            marginLeft: "12px",
                            color: "var(--primary)",
                            marginRight: "12px",
                            width: "90%",
                          }}
                        />
                        {errors.maxEmailsPerDay && (
                          <FormHelperText error>
                            {errors.maxEmailsPerDay.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                  />
                </WarmupBox>

                <SettingBlock>
                  <HeadingText>
                    <h3>Reply Rate (%)</h3>
                    <p>Suggested - 20, Maximum - 100</p>
                  </HeadingText>
                  <Controller
                    name="replyRate"
                    control={control}
                    rules={{
                      required: "This field is required",
                      min: { value: 1, message: "Minimum value is 1%" },
                      max: { value: 100, message: "Maximum value is 100%" },
                    }}
                    render={({ field }) => (
                      <Box>
                        <TextField
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          error={!!errors.replyRate}
                          inputProps={{ min: 1, max: 100 }}
                        />
                        {errors.replyRate && (
                          <FormHelperText error>
                            {errors.replyRate.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
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
                  <Controller
                    name="dailyReplyTarget"
                    control={control}
                    rules={{
                      min: { value: 1, message: "Minimum value is 1" },
                      max: { value: 50, message: "Maximum value is 50" },
                    }}
                    render={({ field }) => (
                      <Box sx={{ width: "100%" }}>
                        <Slider
                          value={field.value}
                          min={1}
                          max={50}
                          onChange={(_e, newValue) =>
                            field.onChange(newValue as number)
                          }
                          valueLabelDisplay="auto"
                          sx={{
                            marginLeft: "12px",
                            marginRight: "12px",
                            color: "var(--secondary)",
                            width: "90%",
                          }}
                        />
                        {errors.dailyReplyTarget && (
                          <FormHelperText error>
                            {errors.dailyReplyTarget.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
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
                    <Controller
                      name="identifierTagFirst"
                      control={control}
                      rules={{
                        required: "First tag is required",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only alphanumeric characters allowed",
                        },
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Box>
                          <TextField
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.identifierTagFirst}
                            placeholder="Tag1"
                          />
                          {errors.identifierTagFirst && (
                            <FormHelperText error>
                              {errors.identifierTagFirst.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                    -
                    <Controller
                      name="identifierTagSecond"
                      control={control}
                      rules={{
                        required: "Second tag is required",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only alphanumeric characters allowed",
                        },
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Box>
                          <TextField
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.identifierTagSecond}
                            placeholder="Tag2"
                          />
                          {errors.identifierTagSecond && (
                            <FormHelperText error>
                              {errors.identifierTagSecond.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                    = {identifierTagFirst} - {identifierTagSecond}
                  </div>
                </WarmupBox>

                {checkBoxSettings.map(({ key, label, description }) => (
                  <SettingBlock2 key={key}>
                    <Controller
                      name={key}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          sx={{
                            color: "#d1d5db",
                            "&.Mui-checked": { color: "#3b82f6" },
                          }}
                        />
                      )}
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
