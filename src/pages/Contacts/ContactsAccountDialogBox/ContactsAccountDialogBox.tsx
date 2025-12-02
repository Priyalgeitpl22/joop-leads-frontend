import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  IconButton,
  FormControl,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  CreateContactsAccount,
  CreateContactsAccountPayload,
  fetchContacts,
  getCampaignListById,
  UpdateContactAccount,
} from "../../../redux/slice/contactSlice";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { validateEmail } from "../../../utils/Validation";
import PhoneNumberField from "../../../assets/Custom/PhoneNumberField";
import { ModernInput } from "./ContactsAccountDialog.styled";

interface ContactsAccountDialogProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
}

const ContactsAccountDialogBox: React.FC<ContactsAccountDialogProps> = ({
  open,
  onClose,
  selectedId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

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
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && selectedId) {
      dispatch(getCampaignListById({ id: selectedId }))
        .then((res) => {
          if (res.payload && typeof res.payload === "object" && "first_name" in res.payload) {
            const payload = res.payload;
            setFormData({
              first_name: payload.first_name ?? "",
              last_name: payload.last_name ?? "",
              email: payload.email ?? "",
              phone_number: payload.phone_number ?? "",
              company_name: payload.company_name ?? "",
              linkedin_profile: payload.linkedin_profile ?? "",
              website: payload.website ?? "",
              location: payload.location ?? "",
              orgId: payload.orgId ?? user?.orgId ?? "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching contact:", error);
        });
    } else if (open && !selectedId) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        company_name: "",
        linkedin_profile: "",
        website: "",
        location: "",
        orgId: user?.orgId ?? "",
      });
      setFormErrors({
        first_name: "",
        email: "",
        phone_number: "",
      });
    }
  }, [open, selectedId, dispatch, user?.orgId]);

  const validateField = (name: string, value: string | null | undefined) => {
    let error = "";
    const stringValue = value ?? "";
    if (!stringValue.trim()) {
      error = `${name.replace("_", " ")} is required`;
    } else if (name === "email" && !validateEmail(stringValue)) {
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
    const errors: { first_name: string; email: string; phone_number: string } = {
      first_name: "",
      email: "",
      phone_number: "",
    };
    errors.first_name = validateField("first_name", formData.first_name ?? "");
    errors.email = validateField("email", formData.email ?? "");
    errors.phone_number = validateField("phone_number", formData.phone_number ?? "");
    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all the required fields");
      return
    };
    setLoading(true);

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

    try {
      let res;
      if (selectedId) {
        res = await dispatch(
          UpdateContactAccount({ id: selectedId, data: payload })
        ).unwrap();
        toast.success(res.message || "Contact updated successfully!");
      } else {
        res = await dispatch(CreateContactsAccount(payload)).unwrap();
        toast.success(res.message || "Contact created successfully!");
      }

      dispatch(fetchContacts());
      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errorMessage);
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
          padding: "12px 24px",
          color: "#35495c",
        }}
      >
        {selectedId ? "Edit Lead" : "Add Lead Account"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ paddingX: 0 }}>
            <Box display="flex" flexDirection="column" gap={2}>

              {/* Row: First + Last Name */}
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <ModernInput
                  label="First Name *"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                />

                <ModernInput
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Box>

              {/* Email */}
              <ModernInput
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                error={!!formErrors.email}
                helperText={formErrors.email}
                fullWidth
              />

              {/* Phone Number */}
              <FormControl fullWidth error={!!formErrors.phone_number}>
                <PhoneNumberField
                  value={formData.phone_number}
                  onChange={(value: string) => {
                    setFormData((prev) => ({ ...prev, phone_number: value }));
                    setFormErrors((prevErrors) => ({
                      ...prevErrors,
                      phone_number: validateField("phone_number", value),
                    }));
                  }}
                />
                {!!formErrors.phone_number && (
                  <FormHelperText>{formErrors.phone_number}</FormHelperText>
                )}
              </FormControl>

              {/* Row: Company + Location */}
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <ModernInput
                  label="Company Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />

                <ModernInput
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Box>

              {/* Row: LinkedIn + Website */}
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <ModernInput
                  label="LinkedIn Profile"
                  name="linkedin_profile"
                  value={formData.linkedin_profile}
                  onChange={handleChange}
                />

                <ModernInput
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "var(--primary-gradient)",
                    cursor: !isFormValid ? "not-allowed" : "pointer",
                  }}
                  disabled={!isFormValid || loading}
                >
                  {loading ? <Loader /> : selectedId ? "Update" : "Submit"}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </form>
      </DialogContent>
    </Dialog>

  );
};

export default ContactsAccountDialogBox;
