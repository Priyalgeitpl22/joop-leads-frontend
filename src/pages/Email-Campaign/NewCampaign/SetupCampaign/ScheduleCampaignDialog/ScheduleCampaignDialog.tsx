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
  FormHelperText,
  Autocomplete,
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
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import moment from "moment-timezone";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
  campaign_id?: string;
  handleSave: (data: any) => void;
  handleScheduleValid: (data: any) => void;
  campaignSchedule?: any;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
  handleSave,
  handleScheduleValid,
  campaignSchedule,
  campaign_id,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const commonInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      "&:hover fieldset": { borderColor: "#3b82f6" },
      "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
    },
  };

  const topLabelStyle = {
    marginBottom: "6px",
    color: "#1f2937",
    fontSize: "14px",
    fontWeight: 500,
    float: "left"
  };

  const [formData, setFormData] = useState<{
    timeZone: "";
    selectedDays: number[];
    startTime: Dayjs;
    endTime: Dayjs;
    emailInterval: number;
    startDate: Dayjs | null;
    maxLeads: number;
    selectedEmailAccounts: EmailAccounts[];
  }>({
    timeZone: "",
    selectedDays: [],
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(18).minute(0),
    emailInterval: 0,
    startDate: null,
    maxLeads: 100,
    selectedEmailAccounts: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [touched, setTouched] = useState({
    timeZone: false,
    selectedDays: false,
    startTime: false,
    endTime: false,
    startDate: false,
    maxLeads: false,
  });


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    const id = campaignId ?? campaign_id;
    if (id != null) {
      fetchCampaignDetails(id);
    }
  }, [open, campaignSchedule]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      const campaignSchedule = campaign.campaign_schedule;
      if (campaignSchedule) {
        setFormData((prev) => ({
          ...prev,
          timeZone: campaignSchedule.timeZone || "",
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
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const handleTimeZoneChange = (value: string | string[]) => {
    handleChange("timeZone", value);
  };

  const daysOfWeek = Object.values(DaysOfWeek).filter(
    (value) => typeof value === "number"
  ) as number[];

  const handleDayChange = (day: number) => {
    setTouched((prev) => ({
      ...prev,
      selectedDays: true,
    }));
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.timeZone.length) {
      newErrors.timeZone = "Time zone is required.";
    }
    if (!formData.selectedDays.length) {
      newErrors.selectedDays = "Select at least one day.";
    }
    if (!formData.startTime || !formData.endTime) {
      newErrors.startTime = "Start and end time are required.";
    } else if (formData.startTime.isAfter(formData.endTime)) {
      newErrors.startTime = "Start time must be before end time.";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (formData.startDate.isBefore(dayjs(), "day")) {
      newErrors.startDate = "Start date cannot be in the past.";
    }
    if (formData.maxLeads <= 0) {
      newErrors.maxLeads = "Max leads must be greater than 0.";
    }

    setErrors(newErrors);
    setIsSaveDisabled(Object.keys(newErrors).some((key) => newErrors[key]));

    return Object.keys(newErrors).length === 0;
  };
  const validateField = (field: keyof typeof formData, value: any) => {
    let newErrors = { ...errors };

    switch (field) {
      case "timeZone":
        newErrors.timeZone = value.length ? "" : "Time zone is required.";
        break;

      case "selectedDays":
        newErrors.selectedDays = value.length ? "" : "Select at least one day.";
        break;

      case "startTime":
      case "endTime":
        if (!formData.startTime || !formData.endTime) {
          newErrors.startTime = "Start and end time are required.";
        } else if (formData.startTime.isAfter(formData.endTime)) {
          newErrors.startTime = "Start time must be before end time.";
          newErrors.endTime = "";
        } else {
          newErrors.startTime = "";
          newErrors.endTime = "";
        }
        break;

      case "startDate":
        if (!value) {
          newErrors.startDate = "Start date is required.";
        } else if (dayjs(value).isBefore(dayjs(), "day")) {
          newErrors.startDate = "Start date cannot be in the past.";
        } else {
          newErrors.startDate = "";
        }
        break;

      case "maxLeads":
        newErrors.maxLeads =
          value > 0 ? "" : "Max leads must be greater than 0.";
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      handleScheduleValid(true);
      handleSave({ schedule_settings: formData });
      onClose();
    }
  };

  const getTimeZoneOptions = () => {
    return moment.tz.names().map((tz: any) => {
      const offset = moment.tz(tz).utcOffset();
      const hours = Math.floor(offset / 60);
      const minutes = offset % 60;
      const sign = offset >= 0 ? "+" : "-";
      const formattedOffset = `UTC${sign}${String(Math.abs(hours)).padStart(2, "0")}:${String(Math.abs(minutes)).padStart(2, "0")}`;

      return {
        label: `${tz} (${formattedOffset})`,
        value: tz,
      };
    });
  };

  const timeZoneOptions = getTimeZoneOptions();

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          <ScheduleIcon
            sx={{
              fontSize: 30,
              color: "var(--primary-dark)",
              padding: "5px",
              background: "#e3eaeeff",
              borderRadius: "20px",
            }}
          />
          <Typography variant="h5">Schedule Settings</Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12, color: "#6b7280" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomDialogHeader>

      <CustomDialogContainer>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            sx={{
              backgroundColor: "#f9fafb",
              padding: 2,
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography sx={topLabelStyle}>Select Time Zone *</Typography>

            <FormControl fullWidth error={!!errors.timeZone}>
              <Autocomplete
                fullWidth
                disablePortal
                options={timeZoneOptions}
                getOptionLabel={(option) => option.label}
                value={
                  timeZoneOptions.find(
                    (tz: any) => tz.value === formData.timeZone
                  ) || null
                }
                onChange={(_event, newValue) =>
                  handleTimeZoneChange(newValue?.value || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Time Zone"
                    sx={commonInputSx}
                  />
                )}
              />
              {touched.timeZone && errors.timeZone && (
                <FormHelperText sx={{ color: "#ef4444" }}>
                  {errors.timeZone}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f9fafb",
              padding: 2,
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography sx={topLabelStyle}>Send on Days *</Typography>
            <FormControl error={!!errors.selectedDays}>
              <FormGroup row sx={{ gap: "2px" }}>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={formData.selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                        sx={{
                          color: "#9ca3af",
                          "&.Mui-checked": { color: "#3b82f6" },
                        }}
                      />
                    }
                    label={DaysOfWeek[day]}
                  />
                ))}
              </FormGroup>
              {touched.selectedDays && errors.selectedDays && (
                <FormHelperText sx={{ color: "#ef4444" }}>
                  {errors.selectedDays}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f9fafb",
              padding: 2,
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography sx={topLabelStyle}>Schedule Time Range *</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography sx={topLabelStyle}>Start Time</Typography>
                  <FormControl fullWidth error={!!errors.startTime}>
                    <MobileTimePicker
                      value={formData.startTime}
                      onChange={(value) => handleChange("startTime", value)}
                      slotProps={{
                        textField: { sx: commonInputSx },
                      }}
                    />
                    {touched.startTime && errors.startTime && (
                      <FormHelperText sx={{ color: "#ef4444" }}>
                        {errors.startTime}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography sx={topLabelStyle}>End Time</Typography>
                  <FormControl fullWidth error={!!errors.endTime}>
                    <MobileTimePicker
                      value={formData.endTime}
                      onChange={(value) => handleChange("endTime", value)}
                      slotProps={{
                        textField: { sx: commonInputSx },
                      }}
                    />
                    {touched.endTime && errors.endTime && (
                      <FormHelperText sx={{ color: "#ef4444" }}>
                        {errors.endTime}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography sx={topLabelStyle}>Interval (Minutes)</Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      value={formData.emailInterval}
                      onChange={(e) =>
                        handleChange(
                          "emailInterval",
                          Number(e.target.value) || 0
                        )
                      }
                      sx={commonInputSx}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f9fafb",
              padding: 2,
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography sx={topLabelStyle}>Campaign Details *</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={topLabelStyle}>
                    Campaign Start Date
                  </Typography>
                  <FormControl fullWidth error={!!errors.startDate}>
                    <DesktopDatePicker
                      value={formData.startDate}
                      onChange={(value) => handleChange("startDate", value)}
                      slotProps={{
                        textField: { sx: commonInputSx },
                      }}
                    />
                    {touched.startDate && errors.startDate && (
                      <FormHelperText sx={{ color: "#ef4444" }}>
                        {errors.startDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography sx={topLabelStyle}>Max Leads Per Day</Typography>
                  <FormControl fullWidth error={!!errors.maxLeads}>
                    <TextField
                      type="number"
                      value={formData.maxLeads}
                      onChange={(e) =>
                        handleChange("maxLeads", Number(e.target.value) || 0)
                      }
                      sx={commonInputSx}
                    />
                    {touched.maxLeads && errors.maxLeads && (
                      <FormHelperText sx={{ color: "#ef4444" }}>
                        {errors.maxLeads}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        </Box>
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent="flex-end">
        <Button
          onClick={handleSaveClick}
          disabled={isSaveDisabled}
          style={{
            color: isSaveDisabled ? "lightgrey" : "white",
            background: isSaveDisabled
              ? "#9ca3af"
              : "var(--secondary-gradient)",
            opacity: isSaveDisabled ? 0.7 : 1,
            cursor: isSaveDisabled ? "not-allowed" : "pointer",
          }}
        >
          Save Schedule
        </Button>
      </CustomDialogFooter>
    </Dialog>
  );
};

export default ScheduleCampaignDialog;
