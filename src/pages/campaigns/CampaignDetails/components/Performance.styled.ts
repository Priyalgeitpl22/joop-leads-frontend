import styled from "styled-components";
import { Box } from "@mui/material";

export const PerformanceContainer = styled(Box)`
  width: 100%;
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const PerformanceSection = styled.div`
  padding: 24px;
  border-right: 1px solid #e0e0e0;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 1200px) {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const PercentageDisplay = styled.div`
  font-size: 28px;
  font-weight: 300;
  color: #1a1a2e;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #666;
  }
`;

export const ProgressBarContainer = styled.div`
  height: 8px;
  background: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
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
  color: #444;

  .label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #666;
  }

  .value {
    font-weight: 600;
    color: #1a1a2e;
  }
`;

export const ViewLink = styled.a`
  color: #6366f1;
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
  color: #1a1a2e;
  margin: 0 0 16px 0;
`;

export const TriggerInfo = styled.div`
  margin-bottom: 24px;

  .label {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: #1a1a2e;
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
    color: #444;
  }

  .percentage {
    color: #666;
  }
`;

export const PriorityNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 16px;
  line-height: 1.5;

  a {
    color: #6366f1;
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
    color: #4caf50;
  }

  .total {
    font-size: 14px;
    color: #666;
  }
`;

export const ScoreLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
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
  color: #444;

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
    background: ${(props) => (props.passed ? "#e8f5e9" : "#ffebee")};
    color: ${(props) => (props.passed ? "#4caf50" : "#f44336")};
  }

  .info-icon {
    color: #bdbdbd;
    cursor: pointer;
  }
`;

export const SenderAccountsSection = styled.div`
  margin-top: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 24px;
`;

export const SenderAccountsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 20px 0;
`;

