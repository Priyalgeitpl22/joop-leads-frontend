import styled from "@emotion/styled";
import { IconButton, TableCell, TableContainer, TableHead } from "@mui/material";
import { motion } from "framer-motion";

export const DialogContainer = styled.div`
  min-height: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f9fc;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

export const TabPanel = styled(motion.div)`
  padding: 24px;
  background: var(--background-light);
  border-radius: 12px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  justify-content: center;
`;

export const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .availability-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

export const SenderAccountTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
`;

export const StyledTableContainer = styled(TableContainer)`
  max-width: 100% !important;
  overflow-y: auto;
  background-color: white;
 
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const StyledTableHead = styled(TableHead)`
  background-color: white;
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

