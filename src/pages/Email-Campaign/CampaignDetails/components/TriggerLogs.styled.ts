import styled from "styled-components";
import { Box, TableCell, TableRow } from "@mui/material";

export const TriggerLogsContainer = styled(Box)`
  width: 100%;
`;

export const SectionCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const TriggerLogsHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const TriggerLogsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 14px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
`;

export const HeaderCell = styled(TableCell)`
  font-size: 13px;
  font-weight: 500;
  color: #888;
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background: #fafafa;
  }
`;

export const DateTimeCell = styled.div`
  font-size: 14px;
  color: #1a1a2e;
`;

export const StatusDataCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  width: fit-content;
  background: ${(props) => {
    switch (props.status) {
      case "Completed":
        return "#e8f5e9";
      case "Scheduled":
        return "#e3f2fd";
      case "Failed":
        return "#ffebee";
      case "In Progress":
        return "#fff3e0";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "Completed":
        return "#2e7d32";
      case "Scheduled":
        return "#1565c0";
      case "Failed":
        return "#c62828";
      case "In Progress":
        return "#ef6c00";
      default:
        return "#757575";
    }
  }};
`;

export const StatusDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusDetailItem = styled.div`
  font-size: 13px;
  color: #444;
  
  span {
    color: #1a1a2e;
    font-weight: 500;
  }
`;

export const TimezoneCell = styled.div`
  font-size: 14px;
  color: #1a1a2e;
`;

export const ActivityLogLink = styled.a`
  color: #6366f1;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
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

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: #666;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;
