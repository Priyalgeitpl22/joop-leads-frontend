import styled from "@emotion/styled";
import {
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { motion } from "framer-motion";

export const ContactsContainer = styled.div`
  border:2px solid red
  width: 98%;
  // height: 98%;
  display: flex;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: var(--white-fade-gradient);
  border-radius: 8px;
}
`;
export const ContactsHeader = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: var(--background-secondary);
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #35495c;
  display: flex;
`;

export const CreateContact = styled(motion.button)`
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
export const ContactTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
`;

export const StyledTableContainer = styled(TableContainer)`
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
  background-color: var(--background-color)
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
  height: 40px;
  background: var(--background-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  padding: 5px;
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
