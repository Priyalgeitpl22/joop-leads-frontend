import styled from "@emotion/styled";
import { TableCell, Box } from "@mui/material";

export const TableHeadingCell = styled(TableCell)(({ }) => ({
  fontWeight: "bold",
}))

export const TableDataCell = styled(TableCell)(({}) => ({
  fontSize: "14px",
}));

export const WarmUpBlock = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin-top: 2%;
  margin-bottom: 3%;
`;

export const WarmupLabel = styled.label`
  display: flex; 
  align-items: center; 
  gap: 8px;
`;

export const WarmUpHeading = styled.div `
  display: flex,
  align-items: center,
  gap: 10px,
`;

export const WarmupBox = styled(Box)
`  padding: 20px;
`;