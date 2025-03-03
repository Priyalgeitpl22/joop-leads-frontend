import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
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
import {
  Button,
  CustomDialogContainer,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";
import MultiSelectDropdown from "../../../../../assets/Custom/cutomSelectOption";
import timeZones from "../../../../../constants";
import Grid from "@mui/material/Grid2";

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
  campaignId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimeZones, setSelectedTimeZones] = useState<string | string[]>(
    ""
  );

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
      if (campaignId) {
        await dispatch(
          addEmailCampaignSettings({
            sender_accounts: formData.selectedEmailAccounts,
            campaign_id: campaignId,
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
      }
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{ overflowX: "hidden" }}
    >
      <CustomDialogHeader>
        <Typography variant="h5">Schedule Settings</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </CustomDialogHeader>

      <CustomDialogContainer>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
        >
          <FormControl fullWidth>
            <MultiSelectDropdown
              width="100%"
              label="Select Time Zone"
              options={timeZones}
              selectedValues={selectedTimeZones}
              onChange={setSelectedTimeZones}
              multiple={false}
            />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container sx={{ width: "100%" }} spacing={2}>
              <Grid
                sx={{
                  width: "48%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography>Set Campaign Start Date</Typography>
                <DesktopDatePicker
                  value={formData.startDate}
                  onChange={(value) => handleChange("startDate", value)}
                />
              </Grid>
              <Grid
                sx={{
                  width: "49%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography>Max Number Of New Leads Per Day</Typography>
                <TextField
                  type="number"
                  value={formData.maxLeads}
                  onChange={(e) =>
                    handleChange("maxLeads", Number(e.target.value))
                  }
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent="flex-end">
        <Button onClick={handleSave}>Save</Button>
      </CustomDialogFooter>
    </Dialog>
  );
};

export default ScheduleCampaignDialog;
