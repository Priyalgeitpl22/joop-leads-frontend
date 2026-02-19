import styled, { css } from "styled-components";

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

export const VerificationContent = styled.div`
  min-height: 70vh;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const BackButton = styled.div`
  display: flex;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.sm}
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

export const TabsActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const StatusBadge = styled.span<{ $status?: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-transform: capitalize;

  ${({ $status }) => {
    switch ($status?.toLowerCase()) {
      case "pending":
      case "invalid":
        return css`
          background: ${({ theme }) => theme.colors.background.tertiary};
          color: ${({ theme }) => theme.colors.error.dark};
        `;
      case "completed":
      case "safe":
        return css`
          background: ${({ theme }) => theme.colors.background.tertiary};
          color: ${({ theme }) => theme.colors.success.dark};
        `;
      default:
        return css`
          background: ${({ theme }) => theme.colors.background.tertiary};
          color: ${({ theme }) => theme.colors.sidebar.active};
        `;
    }
  }}
`;