import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { FormField, SectionDescription, SettingsContainer, SettingSection } from "./CampaignSetting.styled";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { SectionTitle } from "../../../../../styles/layout.styled";

interface SettingCampaignProps {
  open: boolean;
  onClose: () => void;
  campaign_id?: string;
  handleSave: (data: any) => void;
  campaignSetting?: any;
  handleSettingsValid: (data: any) => void;
}

const CampaignSettingDialog: React.FC<SettingCampaignProps> = ({
  open,
  onClose,
  handleSave,
  campaign_id,
  handleSettingsValid,
}) => {
  const [formData, setFormData] = useState({
    campaign_name: "",
    stopSending: "replies",
    emailDeliveryOptimization: false,
    trackEmailOpens: false,
    trackLinkClicks: false,
    priority: 50,
    companyAutoPause: false,
    EmailDelivery: false,
    BounceRate: false,
    Unsubscribe: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const [, setLoading] = useState(true);
  const [errors, setErrors] = useState({ campaign_name: "" });
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    let isValid = errors.campaign_name === "" && formData.campaign_name.trim().length >= 3;
    setIsFormValid(isValid);
    handleSettingsValid(isValid);
  }, [errors, formData.campaign_name]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "campaign_name") {
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        setErrors((prev) => ({
          ...prev,
          campaign_name: "Campaign Name is required",
        }));
      } else if (trimmedValue.length < 3) {
        setErrors((prev) => ({
          ...prev,
          campaign_name: "Must be at least 3 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, campaign_name: "" }));
      }
    }
  };


  useEffect(() => {
    if (open) {
      const params = new URLSearchParams(location.search);
      const campaignId = params.get("id");

      const id = campaignId ?? campaign_id;
      if (id !== undefined && id !== null) {
        fetchCampaignDetails(id);
      } else {
        setLoading(false);
        setErrors({ campaign_name: "" });
      }
    }
  }, [open]);


  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      const campaignSetting = campaign.campaign_settings;
      if (campaignSetting) {
        setFormData((prev) => ({
          ...prev,
          campaign_name: campaignSetting.campaign_name || "",
          stopSending: campaignSetting.stopSending || "replies",
          emailDeliveryOptimization:
            campaignSetting.emailDeliveryOptimization ?? false,
          trackEmailOpens: campaignSetting.trackEmailOpens ?? false,
          trackLinkClicks: campaignSetting.trackLinkClicks ?? false,
          priority: campaignSetting.priority ?? 50,
          companyAutoPause: campaignSetting.companyAutoPause ?? false,
          EmailDelivery: campaignSetting.EmailDelivery ?? false,
          BounceRate: campaignSetting.BounceRate ?? false,
          Unsubscribe: campaignSetting.Unsubscribe ?? false,
        }));
        setLoading(false);
      }
      setErrors({ campaign_name: "" });
      return response.campaign;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CustomDialogHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CampaignOutlinedIcon
              sx={{
                fontSize: 33,
                color: "var(--primary-dark)",
                background: "#e3eaeeff",
                borderRadius: "20px",
                padding: "5px"
              }}
            />
            <Typography variant="h5">General Campaign Settings</Typography>
          </Box>

          <IconButton onClick={onClose} size="small">
            <CloseIcon style={{ color: "#6b7280" }} />
          </IconButton>
        </CustomDialogHeader>


        <SettingsContainer>
          <SettingSection>
            <FormField>
              <SectionTitle>Campaign Name *</SectionTitle>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter campaign name"
                value={formData.campaign_name}
                onChange={(e) => handleChange("campaign_name", e.target.value)}
                error={!!errors.campaign_name}
                helperText={errors.campaign_name}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9ca3af",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Stop Sending When Your Lead</SectionTitle>
              <SectionDescription>
                Automatically pause campaigns when leads take these actions
              </SectionDescription>
              <RadioGroup
                value={formData.stopSending}
                onChange={(e) => handleChange("stopSending", e.target.value)}
              >
                <FormControlLabel
                  value="replies"
                  control={
                    <Radio
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": { color: "#3b82f6" },
                      }}
                    />
                  }
                  label={
                    <span style={{ color: "#374151", fontSize: "14px" }}>
                      Replies to a message
                    </span>
                  }
                />
                <FormControlLabel
                  value="clicks"
                  control={
                    <Radio
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": { color: "#3b82f6" },
                      }}
                    />
                  }
                  label={
                    <span style={{ color: "#374151", fontSize: "14px" }}>
                      Clicks on a link
                    </span>
                  }
                />
                <FormControlLabel
                  value="opens"
                  control={
                    <Radio
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": { color: "#3b82f6" },
                      }}
                    />
                  }
                  label={
                    <span style={{ color: "#374151", fontSize: "14px" }}>
                      Opens an email
                    </span>
                  }
                />
              </RadioGroup>
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Email Delivery</SectionTitle>
              <SectionDescription>
                Boost your deliverability by sending emails in plain text,
                without HTML
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.emailDeliveryOptimization}
                    onChange={(e) =>
                      handleChange(
                        "emailDeliveryOptimization",
                        e.target.checked
                      )
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Optimize for plain text delivery
                  </span>
                }
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Tracking Preferences</SectionTitle>
              <SectionDescription>
                Choose what metrics to exclude from tracking
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.trackEmailOpens}
                    onChange={(e) =>
                      handleChange("trackEmailOpens", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Don't track email opens
                  </span>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.trackLinkClicks}
                    onChange={(e) =>
                      handleChange("trackLinkClicks", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Don't track link clicks
                  </span>
                }
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Sending Priority</SectionTitle>
              <SectionDescription>
                Set the priority level for sending (0 = low, 100 = high)
              </SectionDescription>
              <Slider
                value={formData.priority}
                onChange={(_event, newValue) =>
                  handleChange("priority", newValue)
                }
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{
                  color: "#3b82f6",
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e5e7eb",
                  },
                  "& .MuiSlider-thumb": {
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.4)",
                  },
                }}
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Company Level Auto-Pause</SectionTitle>
              <SectionDescription>
                Automatically stops messaging other people from a company once
                one person replies
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.companyAutoPause}
                    onChange={(e) =>
                      handleChange("companyAutoPause", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Enable auto-pause for same domain replies
                  </span>
                }
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Smart Email Delivery</SectionTitle>
              <SectionDescription>
                AI auto-matches lead email providers with your mailbox provider
                for better deliverability
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.EmailDelivery}
                    onChange={(e) =>
                      handleChange("EmailDelivery", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Analyze leads mailbox email service providers
                  </span>
                }
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Bounce Rate Protection</SectionTitle>
              <SectionDescription>
                Protect your mailbox reputation with automatic pause on high
                bounce rates
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.BounceRate}
                    onChange={(e) =>
                      handleChange("BounceRate", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Activate auto-pause protection from bounces
                  </span>
                }
              />
            </FormField>
          </SettingSection>

          <SettingSection>
            <FormField>
              <SectionTitle>Unsubscribe Option</SectionTitle>
              <SectionDescription>
                Add unsubscribe message in all sent emails
              </SectionDescription>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.Unsubscribe}
                    onChange={(e) =>
                      handleChange("Unsubscribe", e.target.checked)
                    }
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#3b82f6" },
                    }}
                  />
                }
                label={
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    Include unsubscribe link in emails
                  </span>
                }
              />
            </FormField>
          </SettingSection>
        </SettingsContainer>

        <CustomDialogFooter justifyContent="flex-end">
          <Button
            onClick={() => {
              handleSave({ campaign_settings: formData });
              onClose();
            }}

            disabled={!isFormValid}
            style={{
              cursor: !isFormValid ? "not-allowed" : "pointer",
              color: !isFormValid ? "lightgrey" : "white",
              opacity: !isFormValid ? 0.7 : 1,
              background: !isFormValid
                ? "#9ca3af"
                : "var(--secondary-gradient)",
            }}

          >
            Save General Settings
          </Button>
        </CustomDialogFooter>
      </Dialog>
    </>
  );
};

export default CampaignSettingDialog;
