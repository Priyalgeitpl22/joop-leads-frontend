import { TableBody, TableCell, TableContainer } from "@mui/material";
import styled from "styled-components";

export const CustomTableContainer = styled(TableContainer)`
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const CustomTableBody = styled(TableBody)`
  background-color: var(--icon-light);
`;

export const CustomTableCell = styled(TableCell)`
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--border-grey);
  transition: background 0.3s ease;

  &:hover {
    background: var(--background-hover);
  }
`;

export const HeaderCell = styled(TableCell)`
  font-weight: bold;
  color: var(--text-secondary);
  background: var(--theme-color-light);
  padding: 14px;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const LeadInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--secondary-color);
  font-size: 14px;
`;

export const SequenceStatus = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
`;

export const StatusBadge = styled.div<{ active?: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.active ? "#28a745" : "#777")};
  background: ${(props) => (props.active ? "#e9f7ec" : "#f0f0f0")};
  padding: 6px 12px;
  border-radius: 16px;
  text-align: center;
  display: inline-block;
  min-width: 80px;
`;

export const ActiveStatus = styled.span`
  color: var(--success-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const InactiveStatus = styled.span`
  color: var(--error-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`