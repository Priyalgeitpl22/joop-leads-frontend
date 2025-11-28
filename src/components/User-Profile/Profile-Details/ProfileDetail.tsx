import React, { useEffect, useRef, useState } from "react";
import { Dialog, TextField, Box, FormHelperText } from "@mui/material";
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
import { updateUserDetails } from "../../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Loader";
import { Button, SecondaryButton } from "../../../styles/global.styled";

interface ProfileDetailProps {
  open: boolean;
  onClose: () => void;
  userData?: any;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState({
    name: userData?.fullName || "",
    email: userData?.email || "",
    role: userData?.role || "",
  });

  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    userData?.profilePicture || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setFormData({
      name: userData?.fullName || "",
      email: userData?.email || "",
      role: userData?.role || "",
    });
    setPreview(userData?.profilePicture || null);
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    const newErrors = { name: "", email: "" };

    if (!trimmedName) {
      newErrors.name = "Name cannot be empty!";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address!";
    }

    if (newErrors.name || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("id", userData?.id || "");
    formDataToSend.append("name", trimmedName);
    formDataToSend.append("email", trimmedEmail);
    formDataToSend.append("role", formData.role);

    if (newProfilePicture) {
      formDataToSend.append("profilePicture", newProfilePicture);
    }

    try {
      await dispatch(updateUserDetails({ userData: formDataToSend })).unwrap();
      toast.success("User details updated successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update user details!");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.fullName || "",
      email: userData?.email || "",
      role: userData?.role || "",
    });
    setNewProfilePicture(null);
    setPreview(userData?.profilePicture || null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          backgroundColor: "var(--background-color)",
        }}
      ></Box>
      <DialogHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {preview ? (
              <ProfileImage src={preview} alt="User profile" />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 80,color: "var(--primary-dark)" }}/>
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
          <StyledTitle variant="h6">{formData.name || "User"}</StyledTitle>
          <StyledEmail>{formData.email}</StyledEmail>
        </Box>
      </DialogHeader>

      <DialogBody dividers>
        <FieldWrapper>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={Boolean(errors.name)}
          />
          {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={Boolean(errors.email)}
          />
          {errors.email && (
            <FormHelperText error>{errors.email}</FormHelperText>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            name="role"
            value={formData.role}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000", // for disabled text
              },
            }}
            disabled
          />
        </FieldWrapper>
      </DialogBody>

      <DialogFooter>
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogFooter>
      {loading && <Loader />}
      <Toaster />
    </Dialog>
  );
};

export default ProfileDetail;
