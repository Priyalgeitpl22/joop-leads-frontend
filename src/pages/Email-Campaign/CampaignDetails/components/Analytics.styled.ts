import styled from "styled-components";
import { Box } from "@mui/material";

export const AnalyticsContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Overall Email Reach Section
export const SectionCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #6366f1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    background: #f5f5ff;
  }
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #6366f1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    background: #f5f5ff;
  }
`;

// Stats Cards
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ borderColor: string }>`
  background: #f0faf8;
  border-radius: 8px;
  padding: 20px 24px;
  border-left: 4px solid ${(props) => props.borderColor};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const StatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #444;

  .info-icon {
    color: #999;
    cursor: pointer;
  }
`;
