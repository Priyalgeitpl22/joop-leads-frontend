import React, { useState } from "react";
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
import Grid from "@mui/material/Grid2";

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  handleSave: (data: any) => void;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
  campaignId,
  handleSave,
}) => {
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
    selectedEmailAccounts: EmailAccounts;
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
            {daysOfWeek?.map((day) => (
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
            <Grid sx={{ minWidth: "710px" }} container spacing={2}>
              <Grid size={4}>
                <MobileTimePicker
                  label="From"
                  value={formData.startTime}
                  onChange={(value) => handleChange("startTime", value)}
                />
              </Grid>
              <Grid size={4}>
                <MobileTimePicker
                  label="To"
                  value={formData.endTime}
                  onChange={(value) => handleChange("endTime", value)}
                />
              </Grid>
              <Grid size="grow">
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
        <Button onClick={() => {handleSave({ schedule_settings: formData });
          onClose();}}>
          Save
        </Button>
      </CustomDialogFooter>
    </Dialog>
  );
};

export default ScheduleCampaignDialog;
