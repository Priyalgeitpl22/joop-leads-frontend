import styled from 'styled-components';

export const OverviewContainer = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummarySection = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MetricCard = styled.div<{ $color?: string }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .value {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ $color }) => $color || 'inherit'};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatusCard = styled.div<{ $variant?: 'success' | 'warning' | 'error' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  background: ${({ $variant, theme }) => 
    $variant === 'success' ? `${theme.colors.success.main}10` :
    $variant === 'warning' ? `${theme.colors.warning.main}10` :
    $variant === 'error' ? `${theme.colors.error.main}10` :
    theme.colors.background.secondary};
  border-left: 4px solid ${({ $variant, theme }) => 
    $variant === 'success' ? theme.colors.success.main :
    $variant === 'warning' ? theme.colors.warning.main :
    $variant === 'error' ? theme.colors.error.main :
    theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  .icon {
    color: ${({ $variant, theme }) => 
      $variant === 'success' ? theme.colors.success.main :
      $variant === 'warning' ? theme.colors.warning.main :
      $variant === 'error' ? theme.colors.error.main :
      theme.colors.primary.main};
    flex-shrink: 0;
  }

  .content {
    flex: 1;

    h4 {
      font-size: ${({ theme }) => theme.typography.fontSize.md};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      color: ${({ theme }) => theme.colors.text.primary};
      margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    }

    p {
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
      margin: 0;
    }
  }
`;

export const PerformanceCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }
`;

export const PerformanceBadge = styled.span<{ $type?: 'super' | 'good' | 'poor' }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ $type, theme }) => 
    $type === 'super' ? theme.colors.success.main :
    $type === 'good' ? theme.colors.warning.main :
    theme.colors.error.main};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const NoteBox = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.warning.main}15;
  border-left: 4px solid ${({ theme }) => theme.colors.warning.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.primary};

    strong {
      color: ${({ theme }) => theme.colors.warning.dark};
    }
  }
`;

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartBox = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }
`;

export const PieStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const PieStat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  .indicator {
    width: 16px;
    height: 16px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  .info {
    .value {
      font-size: ${({ theme }) => theme.typography.fontSize.md};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      color: ${({ theme }) => theme.colors.text.primary};
    }

    .label {
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

