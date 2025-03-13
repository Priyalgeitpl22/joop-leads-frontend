import React, { useEffect, useState } from "react";
import {
  Dialog,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import {
  LocalizationProvider,
  MobileTimePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
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

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  handleSave: (data: any) => void;
  campaignSchedule: any;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
  handleSave,
  campaignSchedule
}) => {
  const [formData, setFormData] = useState<{
    timeZone: [];
    selectedDays: number[];
    startTime: Dayjs;
    endTime: Dayjs;
    emailInterval: number;
    startDate: Dayjs | null;
    maxLeads: number;
    selectedEmailAccounts: EmailAccounts[];
  }>({
    timeZone: [],
    selectedDays: [],
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(18).minute(0),
    emailInterval: 0,
    startDate: null,
    maxLeads: 100,
    selectedEmailAccounts: [],
  });

  useEffect(() => {
    if (campaignSchedule) {
      setFormData((prev) => ({
        ...prev,
        timeZone: campaignSchedule.timeZone || [],
        selectedDays: campaignSchedule.selectedDays || [],
        startTime: dayjs(campaignSchedule.startTime),
        endTime: dayjs(campaignSchedule.endTime),
        emailInterval: campaignSchedule.emailInterval || 0,
        startDate: campaignSchedule.startDate
          ? dayjs(campaignSchedule.startDate)
          : null,
        maxLeads: campaignSchedule.maxLeads || 100,
      }));
    }
  }, [open, campaignSchedule]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeZoneChange = (value: string | string[]) => {
    handleChange("timeZone", value);
  };

  const daysOfWeek = Object.values(DaysOfWeek).filter(
    (value) => typeof value === "number"
  ) as number[];

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
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <MultiSelectDropdown
              width="100%"
              label="Select Time Zone"
              options={timeZones}
              selectedValues={formData.timeZone}
              onChange={handleTimeZoneChange}
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
            <Grid container spacing={2} sx={{ minWidth: "710px" }}>
              <Grid item xs={4}>
                <MobileTimePicker
                  label="From"
                  value={formData.startTime}
                  onChange={(value) => handleChange("startTime", value)}
                />
              </Grid>
              <Grid item xs={4}>
                <MobileTimePicker
                  label="To"
                  value={formData.endTime}
                  onChange={(value) => handleChange("endTime", value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Minutes"
                  type="number"
                  value={formData.emailInterval}
                  onChange={(e) =>
                    handleChange("emailInterval", Number(e.target.value) || 0)
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Typography>Set Campaign Start Date</Typography>
                <DesktopDatePicker
                  value={formData.startDate}
                  onChange={(value) => handleChange("startDate", value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Max Number Of New Leads Per Day</Typography>
                <TextField
                  type="number"
                  value={formData.maxLeads}
                  onChange={(e) =>
                    handleChange("maxLeads", Number(e.target.value) || 0)
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent="flex-end">
        <Button
          onClick={() => {
            handleSave({ schedule_settings: formData });
            onClose();
          }}
        >
          Save
        </Button>
      </CustomDialogFooter>
    </Dialog>
  );
};

export default ScheduleCampaignDialog;
