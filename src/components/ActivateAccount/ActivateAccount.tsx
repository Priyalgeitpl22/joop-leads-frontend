import { useState } from "react";
import { Typography } from "@mui/material";
import { PageContainer, AuthCard, IllustrationSection, FormSection, StyledTextField, StyledButton } from "./activateAccount.styled"; // Import styled components

const ActivateAccount = () => {
  const [password, setPassword] = useState("");

  const handleSubmitPassword = () => {
    console.log("Reset link sent to:", password);
  };


  return (
    <PageContainer>
      <AuthCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Forgot Password Illustration"
          />
        </IllustrationSection>

        <FormSection>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Activate Account
              </Typography>
              <Typography variant="body1" color="black" mb={3}>
                Enter your new password to activate your account.
              </Typography>

              <StyledTextField
                label="New Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <StyledButton fullWidth onClick={handleSubmitPassword}>
                Activate Account
              </StyledButton>
        </FormSection>
      </AuthCard>
    </PageContainer>
  );
};

export default ActivateAccount;
