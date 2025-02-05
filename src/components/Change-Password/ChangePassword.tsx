import { useState } from "react";
import { Typography } from "@mui/material";
import {
  PageContainer,
  ChangePasswordCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
} from "./ChangePassword.styled";


const ChangePassword = () => {
  // Local state for controlled fields.
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            label="Old Password"
            variant="outlined"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
         <StyledButton variant="contained" >
          Change Password
        </StyledButton>
        </FormSection>
      </ChangePasswordCard>
    </PageContainer>
  );
};

export default ChangePassword;
