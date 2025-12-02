import styled from "styled-components";
import { Box, Table, TableContainer, TableHead } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  overflow: hidden;
  border: 1px solid var(--border-grey);
  border-radius: 10px
  height: 100% !important;
`;

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
`;

export const StyledTableHead = styled(TableHead)`
  background: var(--background-slate);
  & th {
    color: #35495c;
    font-weight: 500;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid var(--border-grey);
  }
`;

export const TableHeadingCell = styled.th`
  padding: 12px;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
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
  font-size: 14px;
  font-weight: 500;
`;

export const ContentContainer = styled(Box)`
  width: 100%;
  display: flex;
  border-radius: 10px;
  background: var(--background-color);
  position: relative;
  flex-direction: column;
  height: 100% !important;
  overflow: hidden;
  padding:1rem;
`;