import { Dialog } from "@mui/material";
import styled from "styled-components";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 700px;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const DialogContainer = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
  background: ${({theme}) => theme.colors.background.secondary};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconBox = styled.div`
  background: ${({ theme }) => theme.colors.success.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({theme}) => theme.colors.background.primary}
`;

export const TitleSection = styled.div`
  h3 {
    margin: 0;
  }
`;

export const EmailText = styled.div`
  color: ${({ theme }) => theme.colors.sidebar.active};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Badge = styled.div<{ $primary?: boolean }>`
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.background.tertiary : theme.colors.border.main};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Card = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const ValueBadge = styled.div<{ $success?: boolean }>`
  background: ${({ $success, theme }) =>
    $success ? theme.colors.background.tertiary : theme.colors.border.main};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const ScoreBadge = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.secondary.dark};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const MxList = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0
    ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MxItem = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary.main}40;
  }
`;
