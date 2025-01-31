import { Typography  } from '@mui/material';
import { Facebook, Linkedin } from 'lucide-react';
import { 
  PageContainer, 
  RegisterCard, 
  IllustrationSection, 
  FormSection, 
  StyledTextField, 
  StyledButton, 
  SocialButtonsContainer, 
  SocialButton, 
} from './register.styled';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink for navigation

function Register() {
  return (
    <PageContainer>
      <RegisterCard>
        <IllustrationSection>
          <img 
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif" 
            alt="Auth illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </IllustrationSection>
        
        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Create an Account
          </Typography>
          <Typography variant="body1" color="black" mb={4}>
            Register with your details
          </Typography>

          <StyledTextField  label="Full Name" variant="outlined" type="text" />
          <StyledTextField label="Email Address" variant="outlined" type="email" />
          <StyledTextField  label="Password" variant="outlined" type="password" />
          <StyledTextField  label="Confirm Password" variant="outlined" type="password" />

          <StyledButton variant="contained" fullWidth >
            REGISTER
          </StyledButton>
          <Typography variant="body2" color="black" align="center" sx={{ my: 2 }}>
            Already have an account? <RouterLink to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Login</RouterLink>
          </Typography>
          <Typography variant="body2" color="black" align="center" sx={{ my: 1 }}>
            OR REGISTER WITH
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
      </RegisterCard>
    </PageContainer>
  );
}

export default Register;
