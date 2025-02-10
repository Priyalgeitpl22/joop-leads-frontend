import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Avatar,
  InputLabel,
  FormControl,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createAgent} from "../../../../redux/slice/agentsSlice"; 
import {
  DialogContainer,
  TabPanel,
  FormGroup,
  AvatarWrapper,
  AvailabilityContainer,
} from "./AgentDialog.styled";
import {AppDispatch, RootState} from '../../../../redux/store/store';

interface Availability {
  day: string;
  from: string;
  to: string;
}

export interface Agent {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  timezone: string;
  availability: Availability[];
}

interface AgentDialogProps {
  open: boolean;
  onClose: () => void;
  agent?: Agent | null;
}

const defaultAgent: Agent = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  timezone: "UTC -05:00 Eastern Time",
  availability: [{ day: "Monday", from: "09:00", to: "17:00" }],
};

const AgentDialog: React.FC<AgentDialogProps> = ({ open, onClose, agent }) => {
  const [tab, setTab] = useState<number>(0);
  const [formData, setFormData] = useState<Agent>(defaultAgent);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {user} = useSelector((state:RootState)=>state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    } else {
      setFormData(defaultAgent);
    }
  }, [agent]);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, { day: "Monday", from: "", to: "" }],
    }));
  };

  const handleAvailabilityChange = (index: number, field: keyof Availability, value: string) => {
    setFormData((prev) => {
      const updatedAvailability = prev.availability.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );
      return { ...prev, availability: updatedAvailability };
    });
  };

  const handleSave = () => {
    const payload = {
      email: formData.email,
      fullName: formData.name,
      phone: formData.phone,
      orgId: user!.orgId,
      profilePicture: selectedFile || undefined,
    };

    dispatch(createAgent(payload) as any)
      .unwrap()
      .then(() => {
        console.log("Agent created successfully");
        window.location.reload();
      })
      .catch((error : any) => {
        console.error("Error creating agent:", error);
      });

    setFormData(defaultAgent);
    setTab(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContainer>
        <DialogTitle>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Personal Details" />
            <Tab label="Schedule" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          {tab === 0 && (
            <TabPanel key={tab}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AvatarWrapper>
                  <Avatar src={formData.avatar} sx={{ width: 80, height: 80 }} />
                  <IconButton component="label">
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setFormData((prev) => ({
                            ...prev,
                            avatar: URL.createObjectURL(file),
                          }));
                        }
                      }}
                    />
                    <AddAPhoto />
                  </IconButton>
                </AvatarWrapper>
                <FormGroup>
                  <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth />
                  <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
                  <TextField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth />
                </FormGroup>
              </motion.div>
            </TabPanel>
          )}
          {tab === 1 && (
            <TabPanel key={tab}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Time Zone</InputLabel>
                  <Select name="timezone" value={formData.timezone} onChange={handleSelectChange}>
                    <MenuItem value="UTC -05:00 Eastern Time">UTC -05:00 Eastern Time</MenuItem>
                    <MenuItem value="UTC -08:00 Pacific Time">UTC -08:00 Pacific Time</MenuItem>
                  </Select>
                </FormControl>
                <AvailabilityContainer>
                  {formData.availability.map((slot, index) => (
                    <div key={index} className="availability-row">
                      <Select
                        value={slot.day}
                        onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                      >
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                      </Select>
                      <TextField
                        type="time"
                        value={slot.from}
                        onChange={(e) => handleAvailabilityChange(index, "from", e.target.value)}
                      />
                      <TextField
                        type="time"
                        value={slot.to}
                        onChange={(e) => handleAvailabilityChange(index, "to", e.target.value)}
                      />
                    </div>
                  ))}
                  <Button onClick={handleAddAvailability}>+ Add Hours</Button>
                </AvailabilityContainer>
              </motion.div>
            </TabPanel>
          )}
        </DialogContent>
        <DialogActions>
          {tab === 0 ? (
            <Button variant="contained" onClick={() => setTab(1)}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </DialogActions>
      </DialogContainer>
    </Dialog>
  );
};

export default AgentDialog;
