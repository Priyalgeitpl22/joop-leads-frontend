import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Divider } from "@mui/material";

interface SidebarItemProps {
  active?: boolean;
}

export const SidebarContainer = styled(Box)`
  width: 12%;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  border-right: 1px solid #ddd;
`;

export const EmailInboxContainer = styled(Box)`
  width: 100%;
  height: 85vh;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: row;
  overflow: hidden;`
;

export const SidebarHeader = styled(Box)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledDivider = styled(Divider)`
  margin-bottom: 10px;
`;

export const StyledList = styled(List)`
  padding-top: 15px;
`;

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<SidebarItemProps>(({ active }) => ({
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  borderBottom: "1px solid #eee",
  backgroundColor: active ? "#f1f3f5" : "transparent",
  color: active ? "rgb(9 16 115)" : "#333",
  fontWeight: active ? "bold" : "normal",
  transition: "background 0.2s",
  "&:hover": { backgroundColor: "#f1f3f5" },
}));

export const NoMailboxMessage = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #555;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  height: 100%;
  width: 100%;
`;
