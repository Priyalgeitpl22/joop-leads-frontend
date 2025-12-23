import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary}ee;
  backdrop-filter: blur(4px);
  z-index: 9999;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Spinner = styled.div<{ $size: string }>`
  width: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '24px';
      case 'lg':
        return '56px';
      default:
        return '40px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '24px';
      case 'lg':
        return '56px';
      default:
        return '40px';
    }
  }};
  border: 3px solid ${({ theme }) => theme.colors.border.main};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoaderText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  text,
}) => {
  const content = (
    <LoaderContainer>
      <Spinner $size={size} />
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );

  if (fullScreen) {
    return <LoaderOverlay>{content}</LoaderOverlay>;
  }

  return content;
};

export default Loader;

