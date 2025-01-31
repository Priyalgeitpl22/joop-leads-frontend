import { Typography } from '@mui/material';
import { Facebook, Linkedin } from 'lucide-react';
import {
  PageContainer,
  LoginCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  SocialButtonsContainer,
  SocialButton,
  ForgotPasswordLink,
} from './login.styled';
import { Link as RouterLink } from 'react-router-dom'; 

function Login() {
  return (
    <PageContainer>
      <LoginCard>
        <IllustrationSection>
          <img 
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif" 
            alt="Login illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </IllustrationSection>
        
        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Welcome!
          </Typography>
          <Typography variant="body1" color="black" mb={4}>
            Sign in to your Account
          </Typography>

          <StyledTextField fullWidth label="Email Address" variant="outlined" type="email" />
          <StyledTextField fullWidth label="Password" variant="outlined" type="password" />

          <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>

          <StyledButton variant="contained" fullWidth>
            SIGN IN
          </StyledButton>

          <Typography variant="body2" color="black" align="center" sx={{ my: 2 }}>
            Don't have an account? <RouterLink to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>Register</RouterLink>
          </Typography>

          <Typography variant="body2" color="black" align="center" sx={{ my: 1 }}>
            OR LOGIN WITH
          </Typography>

          <SocialButtonsContainer>
            <SocialButton>
              <Facebook size={24} color="#4267B2" />
            </SocialButton>
            <SocialButton>
              <img 
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                style={{ width: 24, height: 24 }}
              />
            </SocialButton>
            <SocialButton>
              <Linkedin size={24} color="#0077B5" />
            </SocialButton>
          </SocialButtonsContainer>
        </FormSection>
      </LoginCard>
    </PageContainer>
  );
}

export default Login;
