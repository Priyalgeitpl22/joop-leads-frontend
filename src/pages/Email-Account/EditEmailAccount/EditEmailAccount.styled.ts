import styled from "@emotion/styled";
import { TableCell, Box } from "@mui/material";

export const TableHeadingCell = styled(TableCell)(({ }) => ({
  fontWeight: "bold",
}))

export const TableDataCell = styled(TableCell)(({}) => ({
  fontSize: "14px",
}));

export const WarmUpBlock = styled.div`
  border: 1px solid var(--border-grey);
  border-radius:10px;
  padding:1rem;
  margin-top: 1%;
  margin-bottom: 2%;
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
border:1px solid var(--border-grey);
border-radius:10px;
color:var(--text-secondary)
`;