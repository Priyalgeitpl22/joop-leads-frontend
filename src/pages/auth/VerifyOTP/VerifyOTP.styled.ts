import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(165deg, 
    #f8fafc 0%, 
    #e2e8f0 50%,
    #f1f5f9 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  overflow: hidden;
  border-radius: 0 24px 24px 0;
  margin: ${({ theme }) => theme.spacing.lg};
  margin-right: 0;

  @media (max-width: 900px) {
    min-height: 300px;
    border-radius: 0 0 24px 24px;
    margin: ${({ theme }) => theme.spacing.md};
    margin-bottom: 0;
  }
`;

export const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
    animation: ${floatAnimation} 4s ease-in-out infinite;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  position: relative;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xxl} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const EmailHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const OTPInputContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const OTPInput = styled.input<{ $hasValue?: boolean; $hasError?: boolean }>`
  width: 56px;
  height: 64px;
  text-align: center;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 2px solid ${({ $hasError, $hasValue, theme }) =>
    $hasError
      ? theme.colors.error.main
      : $hasValue
        ? theme.colors.primary.main
        : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 4px ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error.main + '20' : theme.colors.primary.main + '20'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 56px;
    font-size: 20px;
  }
`;

export const VerifyButton = styled.button`
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.text.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
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

export const Timer = styled.div<{ $isExpired?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $isExpired, theme }) =>
    $isExpired ? theme.colors.text.tertiary : theme.colors.error.main};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ResendContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.tertiary};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.xl};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.error.main};
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

