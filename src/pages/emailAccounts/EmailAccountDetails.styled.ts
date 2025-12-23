import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const PageContainer = styled.div`
  padding: 0;
  min-height: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-right: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Tab = styled.button<{ $isActive?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-bottom: -1px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const EmailDisplay = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const ContentContainer = styled.div`
  min-height: 400px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// Keep for backwards compatibility but not used
export const DetailsHeader = styled.div`
  display: none;
`;

export const DetailsTitle = styled.div`
  display: none;
`;
