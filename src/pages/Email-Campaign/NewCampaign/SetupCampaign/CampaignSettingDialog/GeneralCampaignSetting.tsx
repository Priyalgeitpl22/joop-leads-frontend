import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
} from "@mui/material";
import { TextField } from "../../../../../styles/layout.styled";
import { AppDispatch } from "../../../../../redux/store/store";
import { useDispatch } from "react-redux";
import { addEmailCampaignSettings } from "../../../../../redux/slice/emailCampaignSlice";
import dayjs, { Dayjs } from "dayjs";

interface GeneralCampaignSettingProps {
  onClose: () => void;
}

const GeneralCampaignSetting: React.FC<GeneralCampaignSettingProps> = ({
  onClose,
}) => {
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

  const handleSave = async () => {
    try {
      await dispatch(
        addEmailCampaignSettings({
          sender_accounts: formData.selectedEmailAccounts,
          campaign_id: "250cac40-bbbf-4da2-96e7-67d8ad6094f4",
          auto_warm_up: false,
          schedule_settings: {
            time_zone: formData.timeZone,
            send_these_days: formData.selectedDays,
            time_sequences: {
              from: formData.startTime.format("HH:mm"),
              to: formData.endTime.format("HH:mm"),
              minutes: formData.emailInterval,
            },
            start_date: formData.startDate
              ? formData.startDate.format("YYYY-MM-DD")
              : "",
            max_leads_per_day: formData.maxLeads,
          },
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
    <Box sx={{ padding: 3, margin: "auto" }}>
      <Box>
        <Typography fontWeight="600">Campaign Name</Typography>
        <TextField
          fullWidth
          value={formData.campaignName}
          onChange={(e) => handleChange("campaignName", e.target.value)}
        />
      </Box>
      <Typography fontWeight="600" mt={2}>
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

      <Typography fontWeight="600" mt={2}>
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

      <Typography fontWeight="600" mt={2}>
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

      {/* <Typography fontWeight="600" mt={2}>
        Assign a SmartServer
      </Typography>
      <Typography>
        Assigning a SmartServer to a campaign provides a higher level of control
        over your infrastructure, improves email deliverability and reduces
        management overhead.
      </Typography>
      <Select
        value={smartServer}
        onChange={(e) => setSmartServer(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Select Smart Server</MenuItem>
        <MenuItem value="1">
          No IP Address added yet. Please add IP Address.
        </MenuItem>
      </Select> */}

      <Typography fontWeight="600" mt={2}>
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

      <Typography fontWeight="600" mt={2}>
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

      <Typography fontWeight="600" mt={2}>
        Enhanced Email Sending & Delivery
      </Typography>
      <Typography>
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

      {/* <Typography fontWeight="600" mt={2}>
        Isolated Lead Email Provider Sending
      </Typography>
      <Typography>
        This campaign will auto-analyse your lead's MX records and only send to
        the ESP you select
      </Typography>
      <RadioGroup>
        <FormControlLabel
          value="send_all"
          control={<Radio />}
          label="Send To All"
        />
        <FormControlLabel value="gmail" control={<Radio />} label="Gmail" />
        <FormControlLabel
          value="outlooks"
          control={<Radio />}
          label="Outlooks"
        />
        <FormControlLabel value="others" control={<Radio />} label="Others" />
      </RadioGroup> */}

      {/* <Typography fontWeight="600" mt={2}>
        Intelligent AI Lead Categorisation (Max: 5)
      </Typography>
      <Typography>
        Our Machine Learning Engine will auto-categorise replies.
      </Typography>
      <RadioGroup>
        <FormControlLabel
          value="no_category"
          control={<Radio />}
          label="Don’t categorise lead with AI"
        />
        <FormControlLabel
          value="intelli_category"
          control={<Radio />}
          label="Intelli-categorise replies using Smartlead's AI"
        />
        <FormControlLabel
          value="prompt_category"
          control={<Radio />}
          label="Write your own prompt to categories lead through AI"
        />
      </RadioGroup> */}

      <Typography fontWeight="600" mt={2}>
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

      <Typography fontWeight="600" mt={2}>
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{
          backgroundColor: "#E4D9FF",
          color: "white",
          background: "#6e58f1",
          marginTop: "40px",
          marginBottom: "20px",
          float: "right",
        }}
      >
        Save General Settings
      </Button>
    </Box>
  );
};

export default GeneralCampaignSetting;
