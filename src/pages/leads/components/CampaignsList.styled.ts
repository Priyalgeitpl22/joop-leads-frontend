import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CampaignCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const CampaignInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CampaignIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const CampaignTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CampaignName = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CampaignMeta = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'active':
      case 'inprogress':
        return `
          background: ${theme.colors.success.main}15;
          color: ${theme.colors.success.main};
        `;
      case 'completed':
        return `
          background: ${theme.colors.primary.main}15;
          color: ${theme.colors.primary.main};
        `;
      case 'paused':
      case 'stopped':
        return `
          background: ${theme.colors.warning.main}15;
          color: ${theme.colors.warning.main};
        `;
      case 'blocked':
      case 'unsubscribed':
        return `
          background: ${theme.colors.error.main}15;
          color: ${theme.colors.error.main};
        `;
      default:
        return `
          background: ${theme.colors.background.tertiary};
          color: ${theme.colors.text.secondary};
        `;
    }
  }}
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
`;

export const ProgressSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProgressText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number; $isActive: boolean }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ $isActive, theme }) => 
    $isActive 
      ? `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.primary.light})`
      : theme.colors.success.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
  
  ${({ $isActive }) => $isActive && `
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite linear;
  `}
`;

export const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ActivityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ActivityIcon = styled.div<{ $variant?: string }>`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'sent':
        return `background: ${theme.colors.primary.main}15; color: ${theme.colors.primary.main};`;
      case 'opened':
        return `background: ${theme.colors.success.main}15; color: ${theme.colors.success.main};`;
      case 'clicked':
        return `background: ${theme.colors.warning.main}15; color: ${theme.colors.warning.main};`;
      case 'replied':
        return `background: #8b5cf615; color: #8b5cf6;`;
      default:
        return `background: ${theme.colors.background.tertiary}; color: ${theme.colors.text.tertiary};`;
    }
  }}
`;

export const ActivityLabel = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActivityValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const ViewButton = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary.main};
  transition: gap 0.2s ease;

  ${CampaignCard}:hover & {
    gap: 8px;
  }
`;

