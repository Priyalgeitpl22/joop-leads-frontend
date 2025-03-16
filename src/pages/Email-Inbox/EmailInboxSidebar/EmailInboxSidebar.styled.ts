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
  background-color: "var(--text-white)";
  border-right: 1px solid #ddd;
`;

export const EmailInboxContainer = styled(Box)`
  width: 100%;
  height: 76vh;
  display: flex;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: var(--icon-light);
  position: relative;
  flex-direction: row;
  overflow: hidden;
`;
;

export const SidebarHeader = styled(Box)`
  font-size: 18px;
  font-weight: bold;
  // margin-bottom: 8px;
`;

export const EmailInboxListHeader = styled(Box)({
  alignItems: "center",
  marginTop: "5px",
  marginBottom: "8px",
  paddingBottom: "5px",

  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

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
  backgroundColor: active ? "var(--background-hover)" : "transparent",
  color: active ? "rgb(9 16 115)" : "var(--input-text)",
  fontWeight: active ? "bold" : "normal",
  transition: "background 0.2s",
  "&:hover": { backgroundColor: "var(--background-hover)" },
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

export const EmailInbox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: var(--white-fade-gradient);
  border-radius: 8px;
`;

export const EmailInboxHeader = styled(Box)`
  background: var(--background-secondary);
  padding: 16px;
`;