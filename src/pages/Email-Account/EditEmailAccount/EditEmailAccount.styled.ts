import styled from "@emotion/styled";
import { TableCell, Box } from "@mui/material";

export const TableHeadingCell = styled(TableCell)(({ }) => ({
  fontWeight: "bold",
}))

export const TableDataCell = styled(TableCell)(({ }) => ({
  fontSize: "14px",
}));

export const WarmUpBlock = styled.div`
  border: 1px solid var(--border-grey);
  border-radius: 10px;
  padding: 5px;
  display: flex;
`;

export const WarmupLabel = styled.label`
  display: flex; 
  align-items: center; 
  gap: 5px;
`;

export const WarmUpHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const WarmupBox = styled(Box)`
  border: 1px solid var(--border-grey);
  border-radius: 10px;
  padding: 5px;
  color:var(--text-secondary);
  height: 100%;
`;

export const InfoText = styled.div`
  padding: 5px;
  color: var(--text-secondary);
  font-size: 12px;
`;

export const HeadingText = styled.div`
  padding: 5px;
  
  h3 {
    color: #464646;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    color: var(--text-secondary);
    font-size: 12px;
  }
`;

export const SettingBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;

export const SettingBlock2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
`;