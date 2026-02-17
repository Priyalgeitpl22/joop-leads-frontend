import styled, { keyframes } from 'styled-components';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  // max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main} 0%, 
    #4f46e5 50%,
    #7c3aed 100%
  );
  padding: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xl};
  min-height: 180px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const AvatarSection = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const AvatarWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 4px solid ${({ theme }) => theme.colors.background.primary};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.main}20;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 48px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const AvatarUploadButton = styled.label`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }

  input {
    display: none;
  }
`;

export const HeaderInfo = styled.div`
  color: white;
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const UserEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0 0 8px 0;
  opacity: 0.9;
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  backdrop-filter: blur(10px);
`;

export const ProfileBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const InputWrapper = styled.div<{ $hasError?: boolean; $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme, $disabled }) => 
    $disabled ? theme.colors.background.tertiary : theme.colors.background.primary
  };
  border: 1.5px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error.main : theme.colors.border.main
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
  height: 48px;
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
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error.main};
  margin-top: 4px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border.main};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: transparent;
          border: 1.5px solid ${theme.colors.border.main};
          color: ${theme.colors.text.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.background.tertiary};
            border-color: ${theme.colors.border.dark};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error.main};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.error.dark};
          }
        `;
      default:
        return `
          background: ${theme.colors.primary.main};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.dark};
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
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
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: ${({ theme }) => theme.spacing.sm};

  span {
    width: 5px;
    height: 5px;
    background: currentColor;
    border-radius: 50%;
    animation: ${dotPulse} 1.2s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
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

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.main}10;
  border: 1px solid ${({ theme }) => theme.colors.primary.main}30;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    line-height: 1.5;
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SkeletonPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export const Skeleton = styled.div<{ $width?: string; $height?: string }>`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
  animation: ${SkeletonPulse} 1.5s ease-in-out infinite;
`;

