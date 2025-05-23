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
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);



  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    const id = campaignId ?? campaign_id;
    if (id !== undefined && id !== null) {
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
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value); // Validate the field on change
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

  useEffect(() => {
    validateForm();
    // handleScheduleValid(isValid);
  }, [formData]);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    console.log("newError", newErrors);

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
          <FormControl
            fullWidth
            sx={{ textAlign: "left" }}
            error={!!errors.timeZone}
          >
            <MultiSelectDropdown
              width="100%"
              label="Select Time Zone *"
              options={timeZones}
              selectedValues={formData.timeZone}
              onChange={handleTimeZoneChange}
              multiple={false}
            />
            {errors.timeZone && (
              <FormHelperText>{errors.timeZone}</FormHelperText>
            )}
          </FormControl>

          <Typography>Send these days *</Typography>
          <FormControl error={!!errors.selectedDays} component="fieldset">
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
            {errors.selectedDays && (
              <FormHelperText>{errors.selectedDays}</FormHelperText>
            )}
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ minWidth: "710px" }}>
              <Grid item xs={4}>
                <FormControl fullWidth error={!!errors.startTime}>
                  <MobileTimePicker
                    label="From *"
                    value={formData.startTime}
                    onChange={(value) => handleChange("startTime", value)}
                  />
                  {errors.startTime && (
                    <FormHelperText>{errors.startTime}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth error={!!errors.endTime}>
                  <MobileTimePicker
                    label="To *"
                    value={formData.endTime}
                    onChange={(value) => handleChange("endTime", value)}
                  />
                  {errors.endTime && (
                    <FormHelperText>{errors.endTime}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth error={!!errors.emailInterval}>
                  <TextField
                    label="Minutes *"
                    type="number"
                    value={formData.emailInterval}
                    onChange={(e) =>
                      handleChange("emailInterval", Number(e.target.value) || 0)
                    }
                    fullWidth
                    error={!!errors.emailInterval}
                  />
                  {errors.emailInterval && (
                    <FormHelperText>{errors.emailInterval}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.startDate}>
                  <Typography>Set Campaign Start Date *</Typography>
                  <DesktopDatePicker
                    value={formData.startDate}
                    onChange={(value) => handleChange("startDate", value)}
                    slotProps={{
                      textField: { error: !!errors.startDate },
                    }}
                  />
                  {errors.startDate && (
                    <FormHelperText>{errors.startDate}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.maxLeads}>
                  <Typography>Max Number Of New Leads Per Day *</Typography>
                  <TextField
                    type="number"
                    value={formData.maxLeads}
                    onChange={(e) =>
                      handleChange("maxLeads", Number(e.target.value) || 0)
                    }
                    fullWidth
                    error={!!errors.maxLeads}
                  />
                  {errors.maxLeads && (
                    <FormHelperText>{errors.maxLeads}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent="flex-end">
        <Button
          onClick={handleSaveClick}
          disabled={isSaveDisabled}

          style={{
            color: isSaveDisabled ? "Black" : "white",
            background: isSaveDisabled ? "#878484" : "var(--theme-color)",
            opacity: isSaveDisabled ? 0.6 : 1,
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
