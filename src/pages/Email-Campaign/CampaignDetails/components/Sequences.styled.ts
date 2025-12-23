import styled from "styled-components";
import { Box, TableCell, TableRow } from "@mui/material";

export const SequencesContainer = styled(Box)`
  width: 100%;
`;

export const SequencesCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SequencesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const SequencesTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button<{ variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid ${(props) => (props.variant === "primary" ? "#6366f1" : "#e0e0e0")};
  border-radius: 8px;
  background: ${(props) => (props.variant === "primary" ? "#6366f1" : "white")};
  color: ${(props) => (props.variant === "primary" ? "white" : "#6366f1")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    ${(props) =>
      props.variant !== "primary" &&
      `
      border-color: #6366f1;
      background: #f5f5ff;
    `}
  }
`;

// Table Styles
export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const HeaderCell = styled(TableCell)`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  background: #fafafa;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;

  &:first-of-type {
    padding-left: 24px;
  }
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background: #fafafa;
  }
`;

export const StyledTableCell = styled(TableCell)`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;

  &:first-of-type {
    text-align: left;
    padding-left: 24px;
  }
`;

export const SequenceName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
`;

export const MetricCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const MetricValue = styled.span<{ color?: string }>`
  color: ${(props) => props.color || "#6366f1"};
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;

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
    color: #666;
    font-size: 13px;
  }
`;

export const ColumnLabel = styled.div`
  font-size: 12px;
  color: #888;
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

// Legacy styles (keeping for backwards compatibility)
export const SequencesList = styled.div`
  padding: 16px;
`;

export const SequenceItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: ${(props) => (props.active ? "#f5f5ff" : "#f8f9fa")};
  border-radius: 8px;
  border: 1px solid ${(props) => (props.active ? "#6366f1" : "#e0e0e0")};
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SequenceNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  margin-right: 16px;
  flex-shrink: 0;
`;

export const SequenceContent = styled.div`
  flex: 1;
`;

export const SequenceType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const SequenceTypeBadge = styled.span<{ type: string }>`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.type) {
      case "Email":
        return "#e3f2fd";
      case "Follow Up":
        return "#fff3e0";
      case "Manual":
        return "#f3e5f5";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "Email":
        return "#1565c0";
      case "Follow Up":
        return "#ef6c00";
      case "Manual":
        return "#7b1fa2";
      default:
        return "#757575";
    }
  }};
`;

export const SequenceDelay = styled.span`
  font-size: 12px;
  color: #666;
`;

export const SequenceSubject = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 8px;
`;

export const SequencePreview = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const SequenceStats = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
`;

export const SequenceStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .value {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
  }

  .label {
    font-size: 12px;
    color: #666;
  }
`;

export const SequenceActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;
