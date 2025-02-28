import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  LocalizationProvider,
  MobileTimePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { addEmailCampaignSettings } from "../../../../../redux/slice/emailCampaignSlice";
import { EmailAccounts } from "../Interface";
import { DaysOfWeek } from "../enums";

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<{
    timeZone: string;
    selectedDays: number[];
    startTime: Dayjs;
    endTime: Dayjs;
    emailInterval: string;
    startDate: Dayjs | null;
    maxLeads: number;
    selectedEmailAccounts: EmailAccounts[];
  }>({
    timeZone: "",
    selectedDays: [],
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(18).minute(0),
    emailInterval: "",
    startDate: null,
    maxLeads: 100,
    selectedEmailAccounts: [],
  });


  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const daysOfWeek = Object.values(DaysOfWeek).filter(
    (value) => typeof value === "number"
  ) as number[];


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
            campaign_name: "",
            stop_message_on_lead: "",
            email_delivery_optimization: false,
            excluded_tracking: {
              dont_track_open_emails: false,
              dont_track_link_clicks: false,
            },
            priority_sending_pattern: 0,
            company_auto_pause: false,
            enhanced_email_delivery: false,
            bounce_rate: false,
            unsubscribe: false,
          },
        })
      ).unwrap();
      onClose();
    } catch (error) {
      alert("Failed to save campaign settings.");
    }
  };

  const handleDayChange = (day: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box sx={{ minWidth: "100%", maxWidth: "fit-content !important" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
          }}
        >
          Schedule Settings
        </DialogTitle>
        <DialogContent
          sx={{ padding: "12px 15px", fontWeight: "bold", marginTop: "30px" }}
        >
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ mt: "5px" }}>Choose Time Zone</InputLabel>
              <Select
                label="Choose Time Zone"
                name="Choose Time Zone"
                value={formData.timeZone}
                onChange={(e) => handleChange("timeZone", e.target.value)}
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="PST">Pacific Standard Time (PST)</MenuItem>
                <MenuItem value="EST">Eastern Standard Time (EST)</MenuItem>
              </Select>
            </FormControl>

            <Typography>Send these days</Typography>
            <FormGroup row>
              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={formData.selectedDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                  }
                  label={DaysOfWeek[day]}
                />
              ))}
            </FormGroup>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid>
                  <MobileTimePicker
                    label="From"
                    value={formData.startTime}
                    onChange={(value) => handleChange("startTime", value)}
                  />
                </Grid>
                <Grid>
                  <MobileTimePicker
                    label="To"
                    value={formData.endTime}
                    onChange={(value) => handleChange("endTime", value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Minutes"
                    type="number"
                    value={formData.emailInterval}
                    onChange={(e) =>
                      handleChange("emailInterval", Number(e.target.value))
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <Typography>Set Campaign Start Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(value) => handleChange("startDate", value)}
              />
            </LocalizationProvider>

            <TextField
              label="Max Leads Per Day"
              type="number"
              value={formData.maxLeads}
              onChange={(e) => handleChange("maxLeads", Number(e.target.value))}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ width: "20%", background: "#6e58f1", color: "white" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ScheduleCampaignDialog;
