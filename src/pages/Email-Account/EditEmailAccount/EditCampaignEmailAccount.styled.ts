import styled from "styled-components";
import {
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 90vh;
`;

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  width: 100%;
`;

export const StyledTableHead = styled(TableHead)`
  background: #f4f6f8;
  & th {
    color: #333;
    font-weight: bold;
    padding: 12px;
    text-align: left;
    text-transform: uppercase;
    border-bottom: 2px solid var(--border-grey);
  }
`;

export const TableHeadingCell = styled.th`
  padding: 16px;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
  color: #333;
  border-bottom: 2px solid var(--border-grey);
`;

export const TableDataCell = styled.td`
  padding: 16px;
  font-size: 14px;
  text-align: left;
  color: #555;
  border-bottom: 1px solid var(--border-grey);
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
  font-size: 16px;
  font-weight: bold;
`;