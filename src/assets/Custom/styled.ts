import { Box, MenuItem, styled, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export const UserProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
`

export const ProfileNameContainer = styled(Box)`
  flex-direction: column;
  display: flex;
  align-items: flex-end;  // Align text to the right
  justify-content: center;
  text-align: right;
  white-space: nowrap; // Prevents text from breaking into two lines
  overflow: hidden;
  text-overflow: ellipsis; // Adds "..." if text overflows
  margin-right: 10px;
`;

export const UserName = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  color: var(--theme-color-light);
  text-align: right;
`
export const UserRole = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  color: var(--theme-color-light);
  text-align: right;
`
export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &:hover {
    background-color: #f1f1f1;
  }
`;
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
