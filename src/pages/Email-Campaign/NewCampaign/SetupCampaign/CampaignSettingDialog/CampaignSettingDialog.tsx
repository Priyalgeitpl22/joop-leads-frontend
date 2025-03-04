import { SetStateAction, useState } from "react";
import { Box, Checkbox, Dialog, DialogTitle, FormControlLabel, IconButton, Radio, RadioGroup, Slider, TextField, Typography } from "@mui/material";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
} from "../../../EmailCampaign.styled";
import GeneralCampaignSetting from "./GeneralCampaignSetting";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { addEmailCampaignSettings } from "../../../../../redux/slice/emailCampaignSlice";

interface SettingCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
}

const CampaignSettingDialog: React.FC<SettingCampaignProps> = ({
  open,
  onClose,
  campaignId,
}) => {
  const [activeTab, setActiveTab] = useState("general");
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    campaignName: "",
    timeZone: "",
    selectedDays: [],
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(18).minute(0),
    emailInterval: "",
    startDate: null as Dayjs | null,
    maxLeads: 100,
    selectedEmailAccounts: [],
    stopSending: "replies",
    trackEmailOpens: false,
    trackLinkClicks: false,
    emailDeliveryOptimization: false,
    priority: 50,
    companyAutoPause: false,
    EmailDelivery: false,
    BounceRate: false,
    Unsubscribe: false,
  });

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    setActiveTab(newValue);
  };

  const handleSave = async () => {
    try {
      if(!campaignId) {
        return;
      }

      await dispatch(
        addEmailCampaignSettings({
          // sender_account: formData.selectedEmailAccounts,
          campaign_id: campaignId,
          // auto_warm_up: false,
          // schedule_settings: {
          //   time_zone: formData.timeZone,
          //   send_these_days: formData.selectedDays,
          //   time_sequences: {
          //     from: formData.startTime.format("HH:mm"),
          //     to: formData.endTime.format("HH:mm"),
          //     minutes: formData.emailInterval,
          //   },
          //   start_date: formData.startDate
          //     ? formData.startDate.format("YYYY-MM-DD")
          //     : "",
          //   max_leads_per_day: formData.maxLeads,
          // },
          campaign_settings: {
            campaign_name: formData.campaignName,
            stop_message_on_lead: formData.stopSending,
            email_delivery_optimization: formData.emailDeliveryOptimization,
            excluded_tracking: {
              dont_track_open_emails: formData.trackEmailOpens,
              dont_track_link_clicks: formData.trackLinkClicks,
            },
            priority_sending_pattern: formData.priority,
            company_auto_pause: formData.companyAutoPause,
            enhanced_email_delivery: formData.EmailDelivery,
            bounce_rate: formData.BounceRate,
            unsubscribe: formData.Unsubscribe,
          },
        })
      ).unwrap();
      onClose();
    } catch (error) {
      alert("Failed to save campaign settings.");
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
          {activeTab === "general" && (
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
                  onChange={(e) => handleChange("trackEmailOpens", e.target.checked)}
                />
              }
              label="DON'T track email opens"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.trackLinkClicks}
                  onChange={(e) => handleChange("trackLinkClicks", e.target.checked)}
                />
              }
              label="DON'T track link clicks"
            />
      
            <Typography variant="h6" mt={2}>
              Prioritise sending pattern
            </Typography>
            <Slider
              value={formData.priority}
              onChange={(e, newValue) => handleChange("priority", newValue)}
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
              Stops messaging other people within a company once a person replies from
              that company.
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              value={formData.companyAutoPause}
              onChange={(e, newValue) => handleChange("companyAutoPause", newValue)}
              label="Auto-pause if one of the leads from the same domain replies."
            />
      
            <Typography variant="h6" mt={2}>
              Enhanced Email Sending & Delivery
            </Typography>
            <Typography variant="body1">
              AI Auto-matches your leads email providers + Your mailbox providers for
              boosted deliver (e.g Gmail to Gmail, Outlook to Outlook)
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.EmailDelivery}
              onChange={(e) =>
                handleChange("EmailDelivery", (e.target as HTMLInputElement).checked)
              }
              label="Auto-analyse leads mailbox email service providers."
            />
      
            <Typography variant="h6" mt={2}>
              High Bounce Rate Auto-Protection
            </Typography>
            <Typography>
              Protect your mailbox reputation with auto-pause on high bounce rates
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              checked={formData.BounceRate}
              onChange={(e) =>
                handleChange("BounceRate", (e.target as HTMLInputElement).checked)
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
                handleChange("Unsubscribe", (e.target as HTMLInputElement).checked)
              }
              label="Add unsubscribe message in all emails"
            />
          </Box>
          )}
        </ContentContainer>

        <CustomDialogFooter justifyContent="flex-end">
          <Button onClick={handleSave}>Save General Settings</Button>
        </CustomDialogFooter>
      </Dialog>
    </>
  );
};

export default CampaignSettingDialog;
