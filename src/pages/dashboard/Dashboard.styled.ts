import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 100%;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 4px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface MetricCardProps {
  $variant: 'blue' | 'purple' | 'teal' | 'green' | 'red';
}

const variantColors = {
  blue: { bg: '#eff6ff', border: '#3b82f6', text: '#2563eb', icon: '#3b82f6' },
  purple: { bg: '#faf5ff', border: '#a855f7', text: '#9333ea', icon: '#a855f7' },
  teal: { bg: '#f0fdfa', border: '#14b8a6', text: '#0d9488', icon: '#14b8a6' },
  green: { bg: '#f0fdf4', border: '#22c55e', text: '#16a34a', icon: '#22c55e' },
  red: { bg: '#fef2f2', border: '#ef4444', text: '#dc2626', icon: '#ef4444' },
};

export const MetricCard = styled.div<MetricCardProps>`
  background: ${({ $variant }) => variantColors[$variant].bg};
  border: 1px solid ${({ $variant }) => variantColors[$variant].border}20;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px ${({ $variant }) => variantColors[$variant].border}20;
    transform: translateY(-2px);
  }
`;

export const MetricHeader = styled.div<MetricCardProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  svg {
    width: 18px;
    height: 18px;
    color: ${({ $variant }) => variantColors[$variant].icon};
  }

  span {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .info-icon {
    width: 14px;
    height: 14px;
    opacity: 0.5;
    cursor: help;
  }
`;

export const MetricValue = styled.div<MetricCardProps>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ $variant }) => variantColors[$variant].text};
  line-height: 1;
  margin-bottom: 8px;
`;

export const MetricSubtext = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};

  strong {
    font-weight: 600;
  }
`;

export const ChartSection = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  h2 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }

  .info-icon {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.text.tertiary};
    cursor: help;
  }
`;

export const ChartSubtext = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 350px;

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: ${({ theme }) => theme.colors.border.light};
  }

  .recharts-text {
    fill: ${({ theme }) => theme.colors.text.secondary};
    font-size: 12px;
  }
`;

export const CustomLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const LegendDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.text.tertiary};

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
`;

