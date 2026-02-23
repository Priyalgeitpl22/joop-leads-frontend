import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  max-width: 100%;
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: 600;
  color: ${({ theme }) =>
    typeof theme.colors.primary === 'object' ? theme.colors.primary.main : theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid
    ${({ theme }) =>
      typeof theme.colors.primary === 'object' ? theme.colors.primary.main : theme.colors.primary};
`;

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const SectionLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

export const CurrentPlanRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PlanName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) =>
    typeof theme.colors.primary === 'object' ? theme.colors.primary.main : theme.colors.primary};
`;

export const CancelInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const UsageStatsHeading = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const UsageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const UsageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const UsageLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 8px;
  background: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => Math.min(100, $percent)}%;
  background: ${({ theme }) =>
    typeof theme.colors.primary === 'object' ? theme.colors.primary.main : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

export const UsageBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
`;
