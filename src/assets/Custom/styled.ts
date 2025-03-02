import { styled, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  max-width: 100%;
  overflow-y: auto;
  background-color: white;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTableHead = styled(TableHead)`
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const StyledTableHeadCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  background-color: var(--background-color);
  height: 50px; /* Adjust the height of header cells */
  padding: 12px; /* Adjust padding */
`;

export const StyledTableRow = styled(TableRow)`
  height: 10px; /* Adjust row height */
`;

export const StyledTableCell = styled(TableCell)`
  padding: 10px; /* Adjust padding inside cells */
  font-size: 14px;
`;
