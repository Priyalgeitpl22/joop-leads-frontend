import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 0;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const TabsList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Tab = styled.button<{ $isActive?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.main : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const VerificationContent = styled.div<{ $disabled?: boolean }>`
  min-height: 70vh;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ $disabled, theme }) =>
    $disabled && `  
    background: ${theme.colors.background.tertiary};
    color: ${theme.colors.text.tertiary};
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: ${({ theme }) => theme.spacing.md};
`;