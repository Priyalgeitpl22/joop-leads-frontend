import styled from "@emotion/styled";
import {
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { motion } from "framer-motion";

export const LeadssContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  background: white;
  position: relative;
  flex-direction: column;
  padding: 16px;
}
`;
export const LeadsHeader = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

// export const AccountButton = styled(motion.button)`
//   background: var(--theme-color);
//   border-radius: 3px;
//   color: white;
// `;

export const CreateLeads = styled(motion.button)`
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--theme-color), var(--theme-color));
  color: var(--background-light);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, var(--theme-color), #378f8f);
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }
`;
export const LeadsTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
  margin-top: 16px;
`;

export const StyledTableContainer = styled(TableContainer)`
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--theme-color), var(--theme-color));
    opacity: 0.5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--theme-color), #378f8f);
  }
`;

export const StyledTableHead = styled(TableHead)`
  background-color: transparent;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledTableHeadCell = styled(TableCell)`
  color: #282828;
  font-weight: 600;
  font-size: 16px;
  background-color: var(--background-color)
`;
export const StyledTableCell = styled(TableCell)`
  color: #222222;
  font-weight: 500;
  font-size: 16px;
  .MuiSelect-root {
    &::before,
    &::after {
      border: none;
    }
    border-bottom: none;
    :hover:not(.Mui-disabled, .Mui-error):before {
      border-bottom: none !important;
    }
  }
`;

export const StyledWarmup = styled(TableCell)`
  background: #eefbfa;
  color: #35bab2;
  padding: 8px;
  border-radius: 12px;
  border: 0;
`;

export const StyledTableCheckbox = styled(TableCell)`
  margin-top: 3px;
  background: white;
`;

export const StyledReputation = styled(TableCell)`
  background: #6ccb4b;
  color: white;
  padding: 4px;
  border-radius: 13px;
  border: 0;
`;

export const CustomEditIconButton = styled(IconButton)`
  color: var(--theme-color);
  color: black;
  margin-right: 2px;
`;

export const CustomForwardIcon = styled(IconButton)`
  padding: 0px;
`;

export const FilterIcon = styled(IconButton)`
  height: 2em;
`;

export const CustomDangerIcon = styled(IconButton)`
  color: #fbc61e;
`;

export const CustomDeleteIconButton = styled(IconButton)`
  color: #e2575b;
  margin-right: 8px;
  &:hover {
    color: #3e5164;
  }
`;
