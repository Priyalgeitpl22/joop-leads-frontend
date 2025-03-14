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

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [existingPassword, setExistingPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleChangePassword = async () => {
    if (!existingPassword && !newPassword && !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    const errorMessage =
      !existingPassword ? "Please enter existing password." :
        !newPassword ? "Please enter new password." :
          !confirmPassword ? "Please enter confirm password." :
            newPassword !== confirmPassword ? "New password and confirm password do not match!" :
              null;



    if (errorMessage) {
      toast.error(errorMessage);

      return;
    }

    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      await dispatch(
        changePassword({
          email: user.email,
          existingPassword,
          newPassword,
        })
      ).unwrap();
      toast.success("Password updated successfully!");
      navigate("/");
      window.location.reload();
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
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Change Password
          </Typography>
          <Typography variant="body1" mb={3}>
            Please enter your current password and choose a new password.
          </Typography>
          <PasswordInput
            label="Existing Password"
            name="existingPassword"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton variant="contained" onClick={handleChangePassword}>
            Change Password
          </StyledButton>
        </FormSection>
      </ChangePasswordCard>
    </PageContainer>
  );
};

export default ChangePassword;
