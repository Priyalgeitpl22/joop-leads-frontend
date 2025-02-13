// src/components/UserProfile/ProfileDetail.tsx
import React, { useState, useEffect, useRef } from "react";
import { Dialog, TextField, Button, Box } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";

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

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      {/* Header Area: Display profile image with edit icon overlay */}
      <DialogHeader>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:'center', width:'100%' }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {newProfilePicture || userData?.profilePicture ? (
              <ProfileImage
                src={newProfilePicture || userData?.profilePicture}
                alt="User profile"
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 80 }} />
            )}
            <EditIcon
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
                padding: "2px",
              }}
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Box>
          <StyledTitle variant="h6">{userData?.fullName || "User"}</StyledTitle>
          <StyledEmail>{userData?.email}</StyledEmail>
        </Box>
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
      </DialogBody>

      {/* Footer (Actions) */}
      <DialogFooter>
        <Button variant="outlined" onClick={handleCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{backgroundColor:'#66bfbe', fontWeight:600}} onClick={handleSave}>
          Save changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ProfileDetail;
