import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  DialogActions,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { CreateContactsAccount, CreateContactsAccountPayload } from "../../../redux/slice/contactSlice";
interface EmailCampaignDialogProps {
  open: boolean;
  onClose: () => void;
}

const ContactsAccountDialogBox: React.FC<EmailCampaignDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();



  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    linkedin_profile:"",
    campaign_id:"",
    website: "",
    location: "",
    orgId: "",
    file_name: "",
    blocked: false,
    unsubscribed: false,
    active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = () => {
    const payload: CreateContactsAccountPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      company_name: formData.company_name,
      website: formData.website,
      linkedin_profile: formData.linkedin_profile,
      campaign_id: formData.campaign_id,
      location: formData.location,
      orgId: formData.orgId,
      file_name: formData.file_name,
      blocked: formData.blocked,
      unsubscribed: formData.unsubscribed,
      active: formData.active,
      
    };
  dispatch(CreateContactsAccount(payload))
  .unwrap()
  .then((url: any) => {
    onClose();
  })
  .catch((error: any) => {
  });
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 2 }}
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
        Add Contact Account
      </DialogTitle>
     <DialogContent>
     <form onSubmit={handleSubmit}>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" fontWeight="bold">
            Contact Form
          </Typography>
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            type="email"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Linkedin Profile"
            name="linkedin_profile"
            value={formData.linkedin_profile}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Campaign Id"
            name="campaign_id"
            value={formData.campaign_id}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Organization ID"
            name="orgId"
            value={formData.orgId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="File Name"
            name="file_name"
            value={formData.file_name}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.blocked}
                onChange={handleChange}
                name="blocked"
              />
            }
            label="Blocked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.unsubscribed}
                onChange={handleChange}
                name="unsubscribed"
              />
            }
            label="Unsubscribed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.active}
                onChange={handleChange}
                name="active"
              />
            }
            label="Active"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsAccountDialogBox;

