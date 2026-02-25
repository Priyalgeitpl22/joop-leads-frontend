import styled from "styled-components";

export const CardContainer = styled.div`
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TaskTitle = styled.h3`
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  margin-left: auto;
  margin-right: auto;
`;

export const InfoGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoColumn = styled.div`
  p {
    margin: ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const SectionTitle = styled.h4`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

export const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const ColorBox = styled.div<{ color: string }>`
  width: ${({ theme }) => theme.spacing.md};
  height: ${({ theme }) => theme.spacing.md};
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;
