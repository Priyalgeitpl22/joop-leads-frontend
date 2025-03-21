import styled from "styled-components";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

export const StyledTable = styled(Table)`
  background: var(--icon-light);
`;

export const StyledTableHead = styled(TableHead)`
  background: #f4f6f8;
  & th {
    color: #333;
    font-weight: bold;
    padding: 12px;
    text-align: left;
  }
`;

export const StyledTableRow = styled(TableRow)`
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--theme-color));
  }
`;

export const TableHeadingCell = styled.th`
  padding: 16px;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
  color: #333;
`;

export const TableDataCell = styled.td`
  padding: 16px;
  font-size: 14px;
  text-align: left;
  color: #555;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const NoDataContainer = styled.td`
  text-align: center;
  color: #888;
  padding: 20px;
`;
