import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  ChangePasswordCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
} from "./ChangePassword.styled";
import { RootState, AppDispatch } from "../../redux/store/store";
import { changePassword } from "../../redux/slice/authSlice";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [existingPassword, setExistingPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, passwordChangeSuccess } = useSelector(
    (state: RootState) => state.user
  );

  const handleChangePassword = () => {
    if (!existingPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }

    dispatch(
      changePassword({
        email: user.email,
        existingPassword,
        newPassword,
      })
    );
  };
  useEffect(() => {
    try {
      if (passwordChangeSuccess) {
        toast.success("Password changed successfully!");
        window.location.assign("/");
        
      }
    } catch (error) {
      toast.error("Error changing password. Please try again.");
    }
  }, [passwordChangeSuccess]);

  return (
    <PageContainer>
      <ChangePasswordCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Auth illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection>
        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Change Password
          </Typography>
          <Typography variant="body1" mb={3}>
            Please enter your current password and choose a new password.
          </Typography>
          <StyledTextField
            fullWidth
            label="Existing Password"
            variant="outlined"
            type="password"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
            margin="normal"
          />
          <StyledTextField
            fullWidth
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <StyledTextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />

          <StyledButton
            variant="contained"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </StyledButton>
        </FormSection>
      </ChangePasswordCard>
      <Toaster />
    </PageContainer>
  );
};

export default ChangePassword;
