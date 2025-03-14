import { useEffect, useState } from "react";
import { Box, Checkbox, Dialog, FormControlLabel, IconButton, Radio, RadioGroup, Slider, TextField, Typography } from "@mui/material";
import {
  ContentContainer
} from "../../../EmailCampaign.styled";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";

interface SettingCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  handleSave: (data: any) => void
  campaignSetting?: any;
}

const CampaignSettingDialog: React.FC<SettingCampaignProps> = ({
  open,
  onClose,
  handleSave,
}) => {
  const [formData, setFormData] = useState({
    campaignName: "",
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

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  
  useEffect(() => {
    if (open) {
      const params = new URLSearchParams(location.search);
      const campaignId = params.get("id");
  
      if (campaignId) fetchCampaignDetails(campaignId);
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
          campaignName: campaignSetting.campaignName || "",
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
      }
      return response.campaign;
    } catch (error) {
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
        sx={{ "& .MuiDialog-paper": { height: "620px" } }}
      >
        <CustomDialogHeader>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 2 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5">General Campaign Settings</Typography>
        </CustomDialogHeader>

        <ContentContainer>
          <Box sx={{ padding: 3, margin: "auto" }}>
            <Box>
              <Typography variant="h6">Campaign Name</Typography>
              <TextField
                fullWidth
                value={formData.campaignName}
                onChange={(e) => handleChange("campaignName", e.target.value)}
              />
            </Box>
            <Typography variant="h6" mt={2}>
              Stop sending messages when your lead
            </Typography>
            <RadioGroup
              value={formData.stopSending}
              onChange={(e) => handleChange("stopSending", e.target.value)}
            >
              <FormControlLabel
                value="replies"
                control={<Radio />}
                label="Replies to a message"
              />
              <FormControlLabel
                value="clicks"
                control={<Radio />}
                label="Clicks on a link"
              />
              <FormControlLabel
                value="opens"
                control={<Radio />}
                label="Opens an email"
              />
            </RadioGroup>

            <Typography variant="h6" mt={2}>
              Optimise Email Delivery
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.emailDeliveryOptimization}
              onChange={(e) =>
                handleChange(
                  "emailDeliveryOptimization",
                  (e.target as HTMLInputElement).checked
                )
              }
              label="Boost your deliverability by sending emails in plain text, without HTML"
            />

            <Typography variant="h6" mt={2}>
              What shouldn't we track
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.trackEmailOpens}
                  onChange={(e) =>
                    handleChange("trackEmailOpens", e.target.checked)
                  }
                />
              }
              label="DON'T track email opens"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.trackLinkClicks}
                  onChange={(e) =>
                    handleChange("trackLinkClicks", e.target.checked)
                  }
                />
              }
              label="DON'T track link clicks"
            />

            <Typography variant="h6" mt={2}>
              Prioritise sending pattern
            </Typography>
            <Slider
              value={formData.priority}
              onChange={(_event, newValue) => handleChange("priority", newValue)}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />

            <Typography variant="h6" mt={2}>
              Company Level Auto-Pause
            </Typography>
            <Typography>
              Stops messaging other people within a company once a person
              replies from that company.
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              value={formData.companyAutoPause}
              onChange={(newValue) =>
                handleChange("companyAutoPause", newValue)
              }
              label="Auto-pause if one of the leads from the same domain replies."
            />

            <Typography variant="h6" mt={2}>
              Enhanced Email Sending & Delivery
            </Typography>
            <Typography variant="body1">
              AI Auto-matches your leads email providers + Your mailbox
              providers for boosted deliver (e.g Gmail to Gmail, Outlook to
              Outlook)
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.EmailDelivery}
              onChange={(e) =>
                handleChange(
                  "EmailDelivery",
                  (e.target as HTMLInputElement).checked
                )
              }
              label="Auto-analyse leads mailbox email service providers."
            />

            <Typography variant="h6" mt={2}>
              High Bounce Rate Auto-Protection
            </Typography>
            <Typography>
              Protect your mailbox reputation with auto-pause on high bounce
              rates
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.BounceRate}
              onChange={(e) =>
                handleChange(
                  "BounceRate",
                  (e.target as HTMLInputElement).checked
                )
              }
              label="Activate auto-pause protection from bounces"
            />

            <Typography variant="h6" mt={2}>
              Unsubscribe
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.Unsubscribe}
              onChange={(e) =>
                handleChange(
                  "Unsubscribe",
                  (e.target as HTMLInputElement).checked
                )
              }
              label="Add unsubscribe message in all emails"
            />
          </Box>
        </ContentContainer>

        <CustomDialogFooter justifyContent="flex-end">
          <Button
            onClick={() => {
              handleSave({ campaign_settings: formData });
              onClose();
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
