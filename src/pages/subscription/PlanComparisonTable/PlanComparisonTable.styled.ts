import styled from "styled-components";

const primaryMain = ({ theme }: { theme: { colors: { primary: { main: string } | string } } }) =>
  typeof theme.colors.primary === "object" ? theme.colors.primary.main : theme.colors.primary;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.tertiary};
  vertical-align: top;
`;

export const ThPlan = styled(Th)<{ $selected?: boolean }>`
  text-align: center;
  min-width: 140px;
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: pointer;
  ${({ $selected, theme }) =>
    $selected &&
    `
    border-top: 2px solid ${primaryMain({ theme })};
    border-left: 2px solid ${primaryMain({ theme })};
    border-right: 2px solid ${primaryMain({ theme })};
    border-bottom: none;
  `}
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  vertical-align: middle;
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const TdLabel = styled(Td)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.secondary};
  white-space: nowrap;
`;

export const TdCell = styled(Td)<{ $selected?: boolean; $isLastRow?: boolean }>`
  text-align: center;
  min-width: 120px;
  pointer-events: auto;
  cursor: pointer;
  ${({ $selected, $isLastRow, theme }) =>
    $selected &&
    `
    border-left: 2px solid ${primaryMain({ theme })};
    border-right: 2px solid ${primaryMain({ theme })};
    border-top: none;
    ${$isLastRow ? `border-bottom: 2px solid ${primaryMain({ theme })};` : "border-bottom: none;"}
  `}
`;

export const PlanHeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const PlanName = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlanPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${primaryMain};
  font-weight: 600;
`;

export const ChooseButton = styled.button<{ $selected?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  cursor: pointer;
  background: ${({ $selected, theme }) =>
    $selected ? primaryMain({ theme }) : theme.colors.background.tertiary};
  color: ${({ $selected, theme }) =>
    $selected ? "#fff" : theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => primaryMain({ theme })};
    color: #fff;
  }
`;

export const CellValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CellAddon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AddonButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  pointer-events: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${primaryMain};
  }
`;

export const AddonButtonAdded = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 500;
  color: #fff;
  background: ${primaryMain};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  pointer-events: auto;

  &:hover {
    opacity: 0.9;
  }
`;

export const AddonsSummaryBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 600;
  color: ${primaryMain};
  background: #f1ecff;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const CellSubtext = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: block;
  margin-top: 2px;
`;

export const LabelWithInfo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.border.main};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;
  font-weight: 600;
  cursor: help;
`;
