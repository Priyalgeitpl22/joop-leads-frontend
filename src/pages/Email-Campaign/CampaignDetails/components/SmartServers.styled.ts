import styled from "styled-components";
import { Box, Paper } from "@mui/material";

export const SmartServersContainer = styled(Box)`
  width: 100%;
`;

export const SmartServersCard = styled(Paper)`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: none;
  padding: 24px;
`;

export const SmartServersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SmartServersTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const ServersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ServerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
  }
`;

export const ServerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ServerIcon = styled.div<{ active?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.active ? "#e8f5e9" : "#f5f5f5")};
  color: ${(props) => (props.active ? "#4caf50" : "#9e9e9e")};
`;

export const ServerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ServerName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const ServerDescription = styled.span`
  font-size: 13px;
  color: #666;
`;

export const ServerStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusIndicator = styled.span<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => (props.active ? "#e8f5e9" : "#f5f5f5")};
  color: ${(props) => (props.active ? "#2e7d32" : "#757575")};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) => (props.active ? "#4caf50" : "#9e9e9e")};
  }
`;

export const ConfigButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #888;
  gap: 12px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #666;
`;

