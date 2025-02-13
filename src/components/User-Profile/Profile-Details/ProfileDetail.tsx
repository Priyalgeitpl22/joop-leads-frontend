// src/components/UserProfile/ProfileDetail.tsx
import React, { useState, useEffect } from "react";
import { Dialog, TextField, Button, Typography, Box } from "@mui/material";
import {
  DialogHeader,
  StyledTitle,
  StyledEmail,
  DialogBody,
  DialogFooter,
  FieldWrapper,
  ProfileImage,
} from "./profileDetail.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: string;
  profilePicture?: string;
}

interface ProfileDetailProps {
  open: boolean;
  onClose: () => void;
  userData: UserData | null;
}

interface FormData {
  name: string;
  email: string;
  role: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  open,
  onClose,
  userData,
}) => {
  // Form fields (excluding the profile picture) are stored here
  const initialFormState: FormData = {
    name: userData?.fullName || "",
    email: userData?.email || "",
    role: userData?.role || "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  // Separate state for the new profile photo preview
  const [newProfilePicture, setNewProfilePicture] = useState<string>("");

  // Reset form when dialog opens or userData changes
  useEffect(() => {
    setFormData({
      name: userData?.fullName || "",
      email: userData?.email || "",
      role: userData?.role || "",
    });
    setNewProfilePicture("");
  }, [userData, open]);

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change for profile photo preview (only for the new image)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setNewProfilePicture(previewUrl);
    }
  };

  // When saving, log the combined data; the final profile picture is the new one if available, otherwise the original.
  const handleSave = () => {
    const finalData = {
      ...formData,
      profilePicture: newProfilePicture || userData?.profilePicture || "",
    };
    console.log("Form Data:", finalData);
    onClose();
  };

  // On cancel, clear the new image preview and reset text fields.
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
    });
    setNewProfilePicture("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Grey Box above header */}
      <Box sx={{ width: "100%", height: "80px", backgroundColor: "#dddddd" }}></Box>

      {/* Header Area: Always displays the original profile image from userData */}
      <DialogHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {userData?.profilePicture ? (
            <ProfileImage src={userData.profilePicture} alt="User profile" />
          ) : (
            <AccountCircleIcon />
          )}
          <StyledTitle variant="h6">{userData?.fullName || "User"}</StyledTitle>
          <StyledEmail>{userData?.email}</StyledEmail>
        </div>
      </DialogHeader>

      {/* Form Fields */}
      <DialogBody dividers>
        <FieldWrapper>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            name="role"
            value={formData.role}
            disabled
          />
        </FieldWrapper>

        <FieldWrapper>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Profile photo
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Show preview of new image if available */}
            {newProfilePicture && (
              <ProfileImage
                src={newProfilePicture}
                alt="Preview"
                style={{ width: "50px", height: "50px" }}
              />
            )}
            <Button variant="outlined" component="label">
              Upload Pic
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        </FieldWrapper>
      </DialogBody>

      {/* Footer (Actions) */}
      <DialogFooter>
        <Button variant="outlined" onClick={handleCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ProfileDetail;
