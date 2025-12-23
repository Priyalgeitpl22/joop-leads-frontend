import React from 'react';
import { Outlet } from 'react-router-dom';
import { Zap } from 'lucide-react';
import {
  AuthContainer,
  AuthCard,
  IllustrationSection,
  FormSection,
  Logo,
  LogoIcon,
  LogoText,
  IllustrationImage,
  IllustrationTitle,
  IllustrationSubtitle,
} from './AuthLayout.styled';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthContainer>
      <AuthCard>
        <IllustrationSection>
          <Logo>
            <LogoIcon>
              <Zap size={24} />
            </LogoIcon>
            <LogoText>Jooper Leads</LogoText>
          </Logo>
          <IllustrationImage>
            <img 
              src="/great-learning.gif" 
              alt="Email automation illustration"
            />
          </IllustrationImage>
          <IllustrationTitle>Intelligent Email Automation</IllustrationTitle>
          <IllustrationSubtitle>
            Supercharge your outreach with AI-powered campaigns that convert
          </IllustrationSubtitle>
        </IllustrationSection>
        <FormSection>
          {children || <Outlet />}
        </FormSection>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthLayout;

