import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  IconButton,
  DialogActions,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { CreateContactsAccount, CreateContactsAccountPayload } from "../../../redux/slice/contactSlice";
import toast from "react-hot-toast";
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
    linkedin_profile: "",
    website: "",
    location: "",
    orgId: "",
  });
  const [formErrors, setFormErrors] = useState({
    first_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (open) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        company_name: "",
        linkedin_profile: "",
        website: "",
        location: "",
        orgId: "",
      });
    }
  }, [open])

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name.replace("_", " ")} is required`;
    } else if (name === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
      error = "Invalid email format";
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const isFormValid = () => {
    const errors: any = {};
    Object.keys(formErrors).forEach((field) => {
      errors[field] = validateField(field, formData[field as keyof typeof formData]);
    });
    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const payload: CreateContactsAccountPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      company_name: formData.company_name,
      website: formData.website,
      linkedin_profile: formData.linkedin_profile,
      location: formData.location,
      orgId: formData.orgId,
    };

    dispatch(CreateContactsAccount(payload))
      .unwrap()
      .then(() => {

        onClose();
      })
      .catch(() => {
      });
    try {
      const res = await dispatch(CreateContactsAccount(payload)).unwrap();
      toast.success(res.message || 'Contact created successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create contact. Please try again.');
    } finally {
      setLoading(false);
    }
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
        Add Lead Account
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>

              <TextField
                label="First Name *"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.first_name}
                helperText={formErrors.first_name}

              />
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                fullWidth


              />
              <TextField
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                type="email"
                error={!!formErrors.email}
                helperText={formErrors.email}


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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "var(--theme-color)", cursor: !isFormValid ? "not-allowed" : "pointer" }} disabled={!isFormValid

            }>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsAccountDialogBox;
