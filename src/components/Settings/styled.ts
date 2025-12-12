import { Box, styled } from '@mui/system';
import { ListItemButton, Typography } from "@mui/material";

export const SettingsListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 260px;
  background-color: #fff;
  border-right: 1px solid #ddd;
`;

export const SettingsListHeader = styled(Box)`
  padding: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const StyledIconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
`;

export const StyledListItemButton = styled(ListItemButton)`
  margin-bottom: 8px;

  &:hover {
    transform: scale(1.01);
    background-color: #e0e0e0;
  }

  &.Mui-selected {
    background-color: var(--theme-color);

    &:hover {
      background-color: var(--theme-color);
    }
  }
`;

export const SettingsContainer = styled(Box)`
  width: 100%;
  height: 98%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: row;
`;

// Billing Settings Styled Components
export const PageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow-y: auto;
`;

export const PageTitle = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const SectionLabel = styled(Typography)`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  margin-top: 24px;
`;

export const Card = styled(Box)<{ accentColor?: string }>`
  background: #fff;
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  overflow: hidden;
  ${({ accentColor }) =>
    accentColor &&
    `
    border-top: 4px solid ${accentColor};
  `}
`;

export const CardSection = styled(Box)`
  padding: 20px;
`;

export const ClickableRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PlanTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

export const PlanDescription = styled(Typography)`
  font-size: 14px;
  color: var(--text-secondary);
`;

export const RowLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
`;

export const PaymentDate = styled(Typography)`
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
`;

export const PaymentMethod = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const PaymentBadge = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary-color) 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
`;
