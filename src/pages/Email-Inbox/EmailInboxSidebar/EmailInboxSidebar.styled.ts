import { styled } from "@mui/material/styles";
import { Box, ListItem, List, Typography } from "@mui/material";

interface SidebarItemProps {
  active?: boolean;
  online?: boolean;
}

export const SidebarContainer = styled(Box)`
  width: 210px;
  height: 100vh;
  background-color: var(--background-light);
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
  flex-shrink: 0;
`;

export const StatusIndicator = styled("div", {
  shouldForwardProp: (prop) => prop !== "online",
})<SidebarItemProps>(({ online }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: online ? "#4caf50" : "var(--background-light)",
}));

export const SidebarItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<SidebarItemProps>(({ active }) => ({
  "&:hover": {
    backgroundColor: "var(--theme-color)",
    cursor: "pointer",
  },
  backgroundColor: active ? "var(--theme-color)" : "transparent",
  position: "relative",
  padding: "8px 16px",
  borderRadius: "8px",
}));

export const Count = styled(Typography)(`
  marginLeft: 'auto';
  color: '#757575';
  background: var(--theme-color);
  border-radius: 12px;
  width: 18px;
  height: 24px;
  align-items: center;
  display: flex;
  justify-content: center;
`);

export const EmailInboxContainer = styled(Box)`
  width: 100%;
  height: 85vh; /* Full screen height */
  display: flex;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: row;
  overflow: hidden; /* Prevent parent from scrolling */
`;

export const EmailInboxList = styled(List)`
  width: 25%;
  height: 100%;
  overflow-y: auto; /* Enable scrolling */
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const EmailInboxArea = styled(Box)`
  flex: 1; /* Take remaining space */
  height: 100%;
  overflow-y: auto; /* Enable scrolling */
  padding: 16px;
`;