import styled from "styled-components";
import { Box, TableCell, TableRow, Select } from "@mui/material";

export const InboxContainer = styled(Box)`
  width: 100%;
`;

export const InboxCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
`;

export const InboxHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FilterLabel = styled.span`
  font-size: 12px;
  color: #888;
`;

export const StyledSelect = styled(Select)`
  min-width: 100px;
  height: 36px;
  font-size: 14px;

  .MuiSelect-select {
    padding: 8px 12px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #e0e0e0;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #6366f1;
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
  white-space: nowrap;
`;

export const StyledTableRow = styled(TableRow)`
  vertical-align: top;

  &:hover {
    background: #fafafa;
  }
`;

export const StyledTableCell = styled(TableCell)`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
`;

// Lead Name Cell
export const LeadNameCell = styled.div`
  display: flex;
  gap: 12px;
  min-width: 250px;
`;

export const LeadAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
`;

export const LeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LeadName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const LeadDetail = styled.span`
  font-size: 13px;
  color: #666;
  
  strong {
    color: #444;
  }
`;

export const EmailLink = styled.span`
  color: #1a1a2e;
`;

// Message Sent Cell
export const MessageCell = styled.div`
  max-width: 400px;
`;

export const MessageSubject = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
`;

export const MessageBody = styled.div`
  font-size: 13px;
  color: #444;
  line-height: 1.6;
  
  p {
    margin: 0 0 12px 0;
  }
`;

export const MessageSignature = styled.div`
  font-size: 13px;
  color: #444;
  margin-top: 12px;
`;

export const MessageLink = styled.a`
  color: #6366f1;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-top: 4px;
  font-size: 13px;

  &:hover {
    opacity: 0.8;
  }
`;

// Reply Details Cell
export const ReplyCell = styled.div`
  min-width: 150px;
  color: #666;
  font-size: 13px;
`;

// Status Cell
export const StatusCell = styled.div`
  min-width: 100px;
`;

export const StatusBadge = styled.span<{ status?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "replied":
        return "#e8f5e9";
      case "opened":
        return "#e3f2fd";
      case "clicked":
        return "#fff3e0";
      case "bounced":
        return "#ffebee";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "replied":
        return "#2e7d32";
      case "opened":
        return "#1565c0";
      case "clicked":
        return "#ef6c00";
      case "bounced":
        return "#c62828";
      default:
        return "#757575";
    }
  }};
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
