import styled from "@emotion/styled";
import { Box, Tab, TableBody, TableCell, TableRow, Tabs } from "@mui/material";
import { MuiColorInput } from "mui-color-input";

export const EmailCampaignContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
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
  font-family: monospace;
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

export const CustomTabs = styled(Tabs)`
  min-height: 40px;
  padding: 5px 5px 0px 5px;
  background: var(--background-secondary);

  .MuiTabs-indicator {
    background-color: #33475b;
    height: 4px;
    border-radius: 4px;
  }
`;

export const SectionHeader = styled(Box)`
  min-height: 40px;
  padding: 12px;
  background: var(--background-secondary);

  .MuiTabs-indicator {
    background-color: #33475b;
    height: 4px;
    border-radius: 4px;
  }
`;

export const CustomTab = styled(Tab)`
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  color: #33475b;
  padding: 8px 16px;
  min-height: 40px;
  transition: all 0.3s ease-in-out;

  &.Mui-selected {
    color: #33475b;
    font-weight: bold;
  }

  &:hover {
    color: #33475b;
    opacity: 0.8;
  }
`;

export const ContentContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
`;

export const CustomTableBody = styled(TableBody)(({ }) => ({
  backgroundColor: "var(--background-primary)",
  // "& .MuiTableRow-root": {
  //   "&:nth-of-type(even)": {
  //     backgroundColor: "var(--background-secondary)",
  //   },
  //   "&:hover": {
  //     backgroundColor: "var(--hover-color)", 
  //   },
  // },
  "& .MuiTableCell-root": {
    padding: "12px",
    borderBottom: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  },
}));

export const CustomTableRow = styled(TableRow)(({ }) => ({
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

  // "&.Mui-selected, &.Mui-selected:hover": {
  //   backgroundColor: "var(--selected-color) !important",
  //   color: "white",
  // },
}));

export const CustomTableCell = styled(TableCell)(({ }) => ({
  fontSize: "14px",
  fontWeight: "500",
  color: "red",
  padding: "12px 16px",
  height: "80px",
  alignItems: "center",
  justifyContent: "center",
  
  "&:first-of-type": {
    fontWeight: "bold",
  },

  "&:last-of-type": {
    textAlign: "right",
  },

  "&.MuiTableCell-root": {
    borderBottom: "1px solid var(--border-color)",
  },
}));
