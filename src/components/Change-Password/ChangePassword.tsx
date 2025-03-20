import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  ChangePasswordCard,
  IllustrationSection,
  FormSection,
  StyledButton,
} from "./ChangePassword.styled";
import { RootState, AppDispatch } from "../../redux/store/store";
import { changePassword } from "../../redux/slice/authSlice";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../../utils/PasswordInput";
import { validatePassword } from "../../utils/Validation";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);


  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "existingPassword" && !value.trim()) {
      error = "Current password is required.";
    } else if (name === "newPassword") {
      if (!value.trim()) {
        error = "New password is required.";
      } else if (!validatePassword(value)) {
        error =
          "Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
      }
    } else if (name === "confirmPassword") {
      if (!value.trim()) {
        error = "Please confirm your new password.";
      } else if (value !== formData.newPassword) {
        error = "Passwords do not match.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);


    if (isSubmitted) validateField(name, value);
  };

  const isFormValid = () => {
    return (
      formData.existingPassword.trim() !== "" &&
      formData.newPassword.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      !Object.values(errors).some((error) => error) // Ensures no errors exist
    );
  };

  const handleChangePassword = async () => {
    setIsSubmitted(true);

    Object.keys(formData).forEach((key) =>
      validateField(key, formData[key as keyof typeof formData])
    );


    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fix errors before proceeding.");
      return;
    }

    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      const response = await dispatch(
        changePassword({
          email: user.email,
          existingPassword: formData.existingPassword,
          newPassword: formData.newPassword,
        })
      ).unwrap();

      if (response) {
        toast.success("Password updated successfully!");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <PageContainer>
      <Toaster position="top-right" />
      <ChangePasswordCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Auth illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection>
        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1} color="var(--border-color)">
            Change Password
          </Typography>
          <Typography variant="body1" mb={3}>
            Please enter your current password and choose a new password.
          </Typography>

          <PasswordInput
            label="Existing Password *"
            name="existingPassword"
            value={formData.existingPassword}
            onChange={handleInputChange}
            error={!!errors.existingPassword}
            helperText={errors.existingPassword}
          />

          <PasswordInput
            label="New Password *"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          <PasswordInput
            label="Confirm Password *"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <StyledButton
            variant="contained"
            onClick={handleChangePassword}
            disabled={!isFormValid()}

          >
            Change Password
          </StyledButton>
        </FormSection>
      </ChangePasswordCard>
    </PageContainer>
  );
};

export default ChangePassword;
