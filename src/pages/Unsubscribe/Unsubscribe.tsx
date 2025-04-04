import { Typography } from "@mui/material";
import { FormSection, IllustrationSection, LoginCard, PageContainer, StyledButton } from "../Login/login.styled";

const Unsubscribe = () => {
  return (
    <PageContainer>
      <LoginCard>
        <IllustrationSection>
          <img
            src="/great-learning.gif"
            alt="Email illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="body1" fontWeight="bold" color="black" mb={2}>
            Click here to Unsubscribe...
          </Typography>

          <StyledButton variant="contained">Unsubscribe</StyledButton>
        </FormSection>
      </LoginCard>
    </PageContainer>
  );
}

export default Unsubscribe;