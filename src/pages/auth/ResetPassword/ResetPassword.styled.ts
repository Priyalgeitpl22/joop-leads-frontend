import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(165deg, 
    #0f172a 0%, 
    #1e293b 50%,
    #0f172a 100%
  );
  padding: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 70%,
      ${({ theme }) => theme.colors.primary.main}15 0%,
      transparent 50%
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -30%;
    width: 80%;
    height: 80%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.secondary.main}10 0%,
      transparent 50%
    );
  }

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.xl};
    min-height: auto;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const BrandSection = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main} 0%, 
    ${({ theme }) => theme.colors.primary.dark} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary.main}40;
`;

export const LogoText = styled.span`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  letter-spacing: 0.5px;
`;

export const Tagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: rgba(255, 255, 255, 0.7);
  max-width: 360px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const IllustrationSection = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xxl} 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const IllustrationIcon = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main}20 0%, 
    ${({ theme }) => theme.colors.primary.main}10 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.light};
  animation: ${floatAnimation} 3s ease-in-out infinite;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  svg {
    width: 80px;
    height: 80px;
  }
`;

export const IllustrationText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  max-width: 300px;
  line-height: 1.6;
`;

export const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  svg {
    color: ${({ theme }) => theme.colors.success.light};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormContainer = styled.div`
  max-width: 440px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const InputWrapper = styled.div<{ $hasError?: boolean; $isValid?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1.5px solid ${({ $hasError, $isValid, theme }) => 
    $hasError 
      ? theme.colors.error.main 
      : $isValid 
        ? theme.colors.success.main
        : theme.colors.border.main
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error.main : theme.colors.primary.main
    };
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error.main + '15' : theme.colors.primary.main + '15'
    };
  }
`;

export const InputIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InputValidationIcon = styled.span<{ $isValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${({ theme }) => theme.spacing.md};
  color: ${({ $isValid, theme }) => 
    $isValid ? theme.colors.success.main : theme.colors.error.main
  };
`;

export const PasswordToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main} 0%, 
    #4f46e5 50%,
    #7c3aed 100%
  );
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary.main}40;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonContent = styled.span<{ $isLoading?: boolean }>`
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
`;

const dotPulse = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ButtonLoader = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: ${dotPulse} 1.2s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error.main};
  margin-top: 4px;
`;

export const BackToLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PasswordRequirements = styled.ul`
  margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
  padding: 0 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  
  li {
    margin-bottom: 2px;
    
    &.valid {
      color: ${({ theme }) => theme.colors.success.main};
    }
    
    &.invalid {
      color: ${({ theme }) => theme.colors.error.main};
    }
  }
`;

