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

interface ScheduleCampaignProps {
  open: boolean;
  onClose: () => void;
}

const ScheduleCampaignDialog: React.FC<ScheduleCampaignProps> = ({
  open,
  onClose,
}) => {
  const [timeZone, setTimeZone] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs().hour(9).minute(0)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(
    dayjs().hour(18).minute(0)
  );
  const [emailInterval, setEmailInterval] = useState(20);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [maxLeads, setMaxLeads] = useState(100);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayChange = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
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
          sx={{
            padding: "12px 15px",
            fontWeight: "bold",
            marginTop: "30px",
          }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <InputLabel>Choose Time Zone</InputLabel>
            <FormControl fullWidth>
              <Select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
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
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            <Typography>Time Period Between Sequences</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid>
                  <MobileTimePicker
                    label="From"
                    value={startTime}
                    onChange={setStartTime}
                  />
                </Grid>
                <Grid>
                  <MobileTimePicker
                    label="To"
                    value={endTime}
                    onChange={setEndTime}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Minutes"
                    type="number"
                    value={emailInterval}
                    onChange={(e) => setEmailInterval(Number(e.target.value))}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <Typography
              variant="body2"
              sx={{
                backgroundColor: "#F8F9FC",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Our AI introduces a 30 to 60-second variance trigger, adding a
              human touch to enhance deliverability.
            </Typography>

            <Typography>Set Campaign Start Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
              />
            </LocalizationProvider>

            <Typography>
              Max Number Of New Leads Reached Per Day Per Campaign
            </Typography>
            <TextField
              type="number"
              value={maxLeads}
              onChange={(e) => setMaxLeads(Number(e.target.value))}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              // disabled={!timeZone || selectedDays.length === 0 || !startDate}
              sx={{ width: "20%", background: "#6e58f1", color: "white" }}
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
