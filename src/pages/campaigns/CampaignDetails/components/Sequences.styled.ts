import styled from 'styled-components';
import type { Theme } from '../../../../styles/theme';

export const SequencesContainer = styled.div`
  width: 100%;
`;

export const SequencesCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SequencesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const SequencesTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid
    ${({ $variant, theme }) => ($variant === 'primary' ? theme.colors.primary.main : theme.colors.border.main)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary.main : theme.colors.background.primary};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? '#ffffff' : theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
    ${({ $variant, theme }) =>
      $variant !== 'primary' &&
      `
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.background.secondary};
    `}
  }

  &:active {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

export const SequencesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:first-of-type {
    text-align: left;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  vertical-align: middle;

  &:first-of-type {
    text-align: left;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

export const SequenceName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MetricCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const MetricValue = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color || '#6366f1'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  text-decoration: underline;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;

export const MetricWithPercent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .percent {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  }
`;

export const ColumnLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyStateTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  max-width: 400px;
`;

