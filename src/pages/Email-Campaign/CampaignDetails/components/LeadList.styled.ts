import styled from "styled-components";
import { Box, Paper, TableCell, TableRow, TableContainer } from "@mui/material";

export const LeadListContainer = styled(Box)`
  width: 100%;
`;

export const LeadListCard = styled(Paper)`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: none;
  overflow: hidden;
`;

export const LeadListHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeadListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;

  span {
    font-weight: 400;
    color: #666;
    margin-left: 8px;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;

  input {
    border: none;
    outline: none;
    font-size: 14px;
    width: 200px;

    &::placeholder {
      color: #999;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
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

export const StyledTableContainer = styled(TableContainer)`
  max-height: calc(100vh - 400px);
  overflow-y: auto;
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 14px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderCell = styled(StyledTableCell)`
  font-weight: 600;
  color: #1a1a2e;
  background: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background: #f8f9fa;
  }
`;

export const LeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const LeadName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const LeadEmail = styled.span`
  font-size: 13px;
  color: #666;
`;

export const LeadCompany = styled.span`
  font-size: 14px;
  color: #444;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "active":
        return "#e8f5e9";
      case "completed":
        return "#e3f2fd";
      case "blocked":
        return "#ffebee";
      case "unsubscribed":
        return "#fff3e0";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "active":
        return "#2e7d32";
      case "completed":
        return "#1565c0";
      case "blocked":
        return "#c62828";
      case "unsubscribed":
        return "#ef6c00";
      default:
        return "#757575";
    }
  }};
`;

export const SequenceStatus = styled.span`
  font-size: 13px;
  color: #666;
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

