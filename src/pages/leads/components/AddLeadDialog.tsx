import { Dialog } from "@mui/material";
import { ButtonRow, CloseButton, DialogContainer, DialogContent, DialogHeader, DialogSubtitle, DialogTitle, ErrorText, FormGrid, FormGroup, FormSection, HeaderContent, Input, Label, SaveButton } from "./AddLeadDialog.styled";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import type { AppDispatch } from "../../../store";
import { createLead, fetchAllLeads } from "../../../store/slices/leadSlice";

interface AddLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const validatePhone = (phone: string) => {
  const cleanedPhone = phone.trim();

  if (!cleanedPhone) {
    return { isValid: false, message: "Phone number is required" };
  }

  const phoneRegex = /^\+?[1-9]\d{7,14}$/;

  if (!phoneRegex.test(cleanedPhone)) {
    return {
      isValid: false,
      message:
        "Phone number must be 8 to 15 digits and include a valid country code",
    };
  }

  return { isValid: true, message: "" };
};

const AddLeadDialog = ({ isOpen, onClose }: AddLeadDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    website: "",
    orgId: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    website: "",
  });

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      website: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message;
    }

    if (
      formData.linkedinUrl &&
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(formData.linkedinUrl)
    ) {
      newErrors.linkedinUrl = "Invalid LinkedIn URL";
    }

    if (
      formData.website &&
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(formData.website)
    ) {
      newErrors.website = "Invalid website URL";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    sanitizedValue = sanitizedValue.replace(/^\s+/, "");

    if (name === "firstName" || name === "lastName") {
      sanitizedValue = sanitizedValue.replace(/[^A-Za-z\s]/g, "");
    }
    if (name === "phone") {
      sanitizedValue = sanitizedValue.replace(/[^\d+]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "firstName") {
        newErrors.firstName = sanitizedValue.trim()
          ? ""
          : "First name is required";
      }
      if (name === "lastName") {
        newErrors.lastName = sanitizedValue.trim()
          ? ""
          : "Last name is required";
      }
      if (name === "email") {
        if (!sanitizedValue.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
          newErrors.email = "Enter a valid email";
        } else {
          newErrors.email = "";
        }
      }

      return newErrors;
    });
  };

  const handleCreateLead = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await dispatch(createLead(formData)).unwrap();
      toast.success("Lead created successfully");
      onClose();
      await dispatch(fetchAllLeads()).unwrap();
    } catch (error: any) {
      toast.error(error || "Failed to create lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContainer>
        <DialogHeader>
          <HeaderContent>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogSubtitle>
              Fill in the details below to add a new lead to your list.
            </DialogSubtitle>
          </HeaderContent>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>
          <FormSection>
            <FormGrid>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="johndoe@jooper.ai"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="phone"
                  name="phone"
                  placeholder="+1 (555)000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>LinkedIn URL</Label>
                <Input
                  name="linkedinUrl"
                  placeholder="linkedin.com/in/johndoe"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                />
                {errors.linkedinUrl && (
                  <ErrorText>{errors.linkedinUrl}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Website URL</Label>
                <Input
                  name="website"
                  placeholder="example.com"
                  value={formData.website}
                  onChange={handleChange}
                />
                {errors.website && <ErrorText>{errors.website}</ErrorText>}
              </FormGroup>
            </FormGrid>
          </FormSection>

          <ButtonRow style={{ marginTop: "24px" }}>
            <SaveButton
              onClick={handleCreateLead}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </SaveButton>
          </ButtonRow>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

export default AddLeadDialog;
