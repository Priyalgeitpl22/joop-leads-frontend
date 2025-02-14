import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  SelectChangeEvent,
  DialogTitle,
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createAgent, updateAgent } from "../../../../redux/slice/agentsSlice";
import {
  DialogContainer,
  TabPanel,
  FormGroup,
  AvatarWrapper,
  AvailabilityContainer,
} from "./AgentDialog.styled";
import { AppDispatch, RootState } from "../../../../redux/store/store";

interface Availability {
  day: string;
  from: string;
  to: string;
}

interface ScheduleSlot {
  day: string;
  hours: { startTime: string; endTime: string }[];
}
// export interface Agent {
//   id?: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   profilePicture: string;
//   role: string;
//   schedule: {
//     timeZone: string;
//     schedule: ScheduleSlot[];
//   };
// }

export interface Agent {
  id: string;
  fullName: string;
  email: string;
  role: string;
  orgId: string;
  profilePicture: string;
  phone?: string;
  schedule: {
    timeZone: string;
    schedule: ScheduleSlot[];
  };
}
interface AgentDialogProps {
  open: boolean;
  onClose: () => void;
  agent?: Agent | null;
}

const defaultAgent: Agent = {
  fullName: "",
  email: "",
  phone: "",
  profilePicture: "",
  // timezone: "UTC -05:00 Eastern Time",
  role: "Agent",
  schedule: {
    timeZone: "UTC -05:00 Eastern Time",
    schedule: [
      { day: "Monday", hours: [{ startTime: "09:00", endTime: "17:00" }] },
    ],
  },
  id: "",
  orgId: "",
};

const steps = ["Personal Details", "Schedule"];

const AgentDialog: React.FC<AgentDialogProps> = ({ open, onClose, agent }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<Agent>(defaultAgent);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    } else {
      setFormData(defaultAgent);
    }
  }, [agent, open]);

  // General input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(file),
      }));
    }
  };

  // Add a new availability slot
  const handleAddSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        schedule: [
          ...prev.schedule.schedule,
          { day: "Monday", hours: [{ startTime: "", endTime: "" }] },
        ],
      },
    }));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleSlot,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedSchedule = prev.schedule.schedule.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );
      return {
        ...prev,
        schedule: { ...prev.schedule, schedule: updatedSchedule },
      };
    });
  };

  const handleHoursChange = (
    index: number,
    hourIndex: number,
    field: keyof ScheduleSlot["hours"][0],
    value: string
  ) => {
    setFormData((prev) => {
      const updatedSchedule = prev.schedule.schedule.map((slot, i) => {
        if (i === index) {
          const updatedHours = slot.hours.map((hour, hIndex) =>
            hIndex === hourIndex ? { ...hour, [field]: value } : hour
          );
          return { ...slot, hours: updatedHours };
        }
        return slot;
      });

      return {
        ...prev,
        schedule: { ...prev.schedule, schedule: updatedSchedule },
      };
    });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSave = () => {
    const payload = {
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      role: formData.role,
      orgId: user!.orgId,
      aiOrgId: user?.aiOrgId,
      profilePicture: selectedFile || undefined,
      schedule: formData.schedule,
    };

    if (agent) {
      dispatch(updateAgent({ agentId: agent.id ?? "", data: payload }) as any)
        .unwrap()
        .then(() => {
          console.log("Agent updated successfully");
          window.location.reload();
        })
        .catch((error: any) => {
          console.error("Error updating agent:", error);
        });
    } else {
      dispatch(createAgent(payload) as any)
        .unwrap()
        .then(() => {
          console.log("Agent created successfully");
          window.location.reload();
        })
        .catch((error: any) => {
          console.error("Error creating agent:", error);
        });
    }
    setFormData(defaultAgent);
    setActiveStep(0);
    onClose();
  };
  console.log(formData, "formData");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContainer>
        <DialogTitle>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, idx) => (
              <Step key={idx}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent>
          {activeStep === 0 && (
            <TabPanel key={activeStep}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AvatarWrapper>
                  <Avatar
                    src={formData.profilePicture}
                    sx={{
                      width: 80,
                      height: 80,
                      border: "2px solid #6fc8c7",
                    }}
                  />
                  <IconButton component="label" sx={{ color: "#6fc8c7" }}>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <AddAPhoto />
                  </IconButton>
                </AvatarWrapper>
                <FormGroup>
                  <TextField
                    label="Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>User Role</InputLabel>
                    <Select
                      label="User Role"
                      name="role"
                      value={formData.role}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Agent">Agent</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
              </motion.div>
            </TabPanel>
          )}
          {activeStep === 1 && (
            <TabPanel key={activeStep}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Time Zone</InputLabel>
                  <Select
                    label="Time Zone"
                    name="timezone"
                    value={formData.schedule.timeZone}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="UTC -05:00 Eastern Time">
                      UTC -05:00 Eastern Time
                    </MenuItem>
                    <MenuItem value="UTC -08:00 Pacific Time">
                      UTC -08:00 Pacific Time
                    </MenuItem>
                  </Select>
                </FormControl>
                <AvailabilityContainer>
                  <InputLabel>Availability</InputLabel>
                  {formData.schedule.schedule.map((slot, index) => (
                    <div key={index} className="availability-row">
                      <Select
                        value={slot.day}
                        onChange={(e) =>
                          handleScheduleChange(index, "day", e.target.value)
                        }
                        variant="outlined"
                      >
                        <MenuItem value="WeekEnds">WeekEnds</MenuItem>
                        <MenuItem value="WeekDays">WeekDays</MenuItem>
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                        <MenuItem value="Saturday">Saturday</MenuItem>
                        <MenuItem value="Sunday">Sunday</MenuItem>
                      </Select>
                      <TextField
                        type="time"
                        value={slot.hours[0].startTime}
                        onChange={(e) =>
                          handleHoursChange(
                            index,
                            0,
                            "startTime",
                            e.target.value
                          )
                        }
                        variant="outlined"
                      />
                      <TextField
                        type="time"
                        value={slot.hours[0].endTime}
                        onChange={(e) =>
                          handleHoursChange(index, 0, "endTime", e.target.value)
                        }
                        variant="outlined"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={handleAddSchedule}
                    variant="outlined"
                    sx={{
                      width: "150px",
                    }}
                  >
                    + Add Hours
                  </Button>
                </AvailabilityContainer>
              </motion.div>
            </TabPanel>
          )}
        </DialogContent>
        <DialogActions>
          {activeStep === 0 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: "#6fc8c7",
                textTransform: "none",
              }}
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ textTransform: "none", backgroundColor: "#6fc8c7" }}
              >
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </DialogContainer>
    </Dialog>
  );
};

export default AgentDialog;
