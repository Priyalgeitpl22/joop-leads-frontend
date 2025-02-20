import styled from "@emotion/styled";
import {
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { motion } from "framer-motion";

export const EmailAccountsContainer = styled.div`
  width: 98%;
  height: 98%;
  display: flex;
  // border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: var(--white-fade-gradient);
  padding: 16px;
  border-radius: 8px;
}
`;
export const EmailAccountHeader = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #35495c;
  display: flex;
`;

// export const AccountButton = styled(motion.button)`
//   background: #6e58f1;
//   border-radius: 3px;
//   color: white;
// `;

export const CreateEmailAccount = styled(motion.button)`
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--theme-color), var(--theme-color));
  color: #ffffff;
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
export const EmailAccountTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
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
  background-color: #fafafa;
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
  margin-right: 8px;
  &:hover {
    color: #3e5164;
  }
`;

export const CustomForwardIcon = styled(IconButton)`
  padding: 0px
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
