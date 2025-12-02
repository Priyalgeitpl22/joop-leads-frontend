import styled from "@emotion/styled";
import { Box, TableBody, TableCell, TableRow } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { MuiColorInput } from "mui-color-input";

export const EmailCampaignContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 0px 10px;
  // height: calc(100vh - 150px);
  // position: relative;
  // overflow: hidden;
`;

export const Section = styled.section`
  background: var(--surface);
  border-radius: 8px;
  padding: 0px 10px;
  border: 1px solid var(--border);
`;

export const ColorGrid = styled.div`
  display: flex;
  gap: 16px;
`;

export const ColorOption = styled.button<{
  color: string;
  isSelected: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => (props.isSelected ? "var(--background-light)" : "transparent")};
  outline: 3px solid
    ${(props) => (props.isSelected ? props.color : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth transition */
  transform: ${(props) =>
    props.isSelected ? "scale(1.1)" : "scale(1)"}; /* Slight scaling effect */
  box-shadow: ${(props) =>
    props.isSelected ? `0 0 10px ${props.color}` : "none"}; /* Glow effect */
`;

export const CustomMuiColorInput = styled(MuiColorInput)({
  width: "130px",
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "10px",
  },
  "& .MuiInputBase-input": {
    color: "#000",
  },
});

export const TableCellHead = styled(TableCell)({
  fontWeight: "bold",
  color: "#35495c",
  padding: "16px !important",
  borderBottom:"1px solid var(--border-dark) !important"
});

export const CheckAccessibility = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  color: #3e5164;
  cursor: pointer;
  background: none;
`;

export const TrackingCode = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: none;
  border-radius: 4px;
  color: #3e5164;
  cursor: pointer;
  background: none;
`;

export const CodeInput = styled.textarea`
  padding: 8px 12px;
  border: 1px solid var(--border-dark);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  width: 800px;
  height: 470px;
  font-size: 14px;
  white-space: pre-wrap;
  resize: none;
`;

export const ColorCheckBox = styled.input`
  width: 24px;
  height: 24px;
  border: 1px solid var(--border-dark);
  cursor: pointer;
  background: blue;

  &:checked {
    background-color: var(--background-light);
  }
`;

export const SaveButton = styled.button`
  font-weight: semibold;
  width: 100px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  color: var(--background-light);
  background-color: var(--theme-color);
  cursor: pointer;
  font-size: 16px;

  :hover {
    background-color: var(--theme-color);
    opacity: 0.8;
  }
`;

export const CopyButton = styled.button`
  font-weight: bold;
  border: none;
  border-radius: 6px;
  color: var(--background-light);
  background-color: var(--theme-color);
  cursor: pointer;
  font-size: 16px;
  margin: 8px 6px;

  :hover {
    background-color: var(--theme-color);
    opacity: 0.8;
  }
`;

// Re-export CustomTabs, CustomTab, and TabsHeader from the component
export { CustomTabs, CustomTab } from "../../components/CustomTabs/CustomTabs";
export { default as TabsHeader } from "../../components/CustomTabs/TabsHeader";
export type { TabsHeaderProps, TabItem } from "../../components/CustomTabs/TabsHeader";

export const BackButton = styled(ArrowLeft)`
  font-size: 20px;
  font-weight: 500;
  text-transform: none;
  color: #33475b;
  padding: 5px;
  height: 30px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

export const SectionHeader = styled(Box)`
  padding: 12px 0px;
  .MuiTabs-indicator {
   display:none;
  }
`;

export const ContentContainer = styled(Box)`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  border-radius: 10px;
  background: white;
  position: relative;
  flex-direction: column;
  // margin-top:3rem;
  padding: 10px;
`;

export const ScrollableContent = styled("div")`
  flex: 1;
  overflow-y: auto;
`;

export const CustomTableBody = styled(TableBody)(() => ({
  backgroundColor: "var(--background-primary)",
  "& .MuiTableCell-root": {
    padding: "12px",
    borderBottom: "1px solid var(--border-color-sec)",
    color: "var(--text-primary)",
  },
}));

export const CustomTableRow = styled(TableRow)(() => ({
  height: "80px",
  borderRadius: 0,
  overflowX: "auto",

  "&:nth-of-type(even)": {
    backgroundColor: "var(--background-secondary)", // Alternate row color
  },

  "&:hover": {
    // backgroundColor: "var(--hover-color)", // Hover effect
    cursor: "pointer",
  },

  // Example of styling a paragraph inside TableRow
  "& p": {
    fontSize: "12px",
    color: "var(--disable-color)",
    fontWeight: 400,
    margin: 0,
    whiteSpace: "nowrap"
  },

  "& h6": {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--title-color-secondary)",
    margin: 0,
  },

  // "&.Mui-selected, &.Mui-selected:hover": {
  //   backgroundColor: "var(--selected-color) !important",
  //   color: "white",
  // },
}));

export const CustomTableCell = styled(TableCell)(() => ({
  fontSize: "12px",
  fontWeight: "500",
  color: "var(--error-color)",
  padding: "12px 16px",
  height: "80px",
  alignItems: "center",
  justifyContent: "center",

  "&:first-of-type": {
    fontWeight: "bold",
  },

  "&:last-of-type": {
    textAlign: "start",
  },

  "&.MuiTableCell-root": {
    borderBottom: "1px solid var(--border-color-sec)",
  },
}));