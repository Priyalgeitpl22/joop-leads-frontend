import styled from "styled-components";
import { Box } from "@mui/material";

export const PerformanceContainer = styled(Box)`
  width: 100%;
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const PerformanceSection = styled.div`
  padding: 24px;
  border-right: 1px solid ${({ theme }) => theme.colors.border.main};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 1200px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const PercentageDisplay = styled.div`
  font-size: 28px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ProgressBarContainer = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};

  .label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .value {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ViewLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px 0;
`;

export const TriggerInfo = styled.div`
  margin-bottom: 24px;

  .label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const SendingPriorityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PriorityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .name {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .percentage {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const PriorityNote = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 16px;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
  }
`;

export const ScoreDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;

  .score {
    font-size: 32px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .total {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ScoreLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
`;

export const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CheckItem = styled.div<{ passed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.passed ? ({ theme }) => theme.colors.background.secondary : ({ theme }) => theme.colors.background.tertiary)};
    color: ${(props) => (props.passed ? ({ theme }) => theme.colors.primary.main : ({ theme }) => theme.colors.error.main)};
  }

  .info-icon {
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;
  }
`;

export const SenderAccountsSection = styled.div`
  margin-top: 24px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  padding: 24px;
`;

export const SenderAccountsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 20px 0;
`;

