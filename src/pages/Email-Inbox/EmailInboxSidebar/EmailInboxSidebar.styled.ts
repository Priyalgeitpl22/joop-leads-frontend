import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Divider } from "@mui/material";

interface SidebarItemProps {
  active?: boolean;
}

export const SidebarContainer = styled(Box)`
  width: 210px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  background-color: var(--text-white);
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
  color: "var(--active-color)",
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "8px",
  paddingBottom: "5px",
  position: "sticky",
  top: 0,
  backgroundColor: "var(--text-white)",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export const StyledDivider = styled(Divider)`
  margin-bottom: 10px;
`;
export const StyledList = styled(List)({
  maxHeight: "calc(100vh - 80px)",
  overflowY: "auto",
  overflowX: "auto",
  whiteSpace: "nowrap",
});

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<SidebarItemProps>(({ active }) => ({
  flex: "0 0 auto",
  marginRight: "8px",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  border: "1px solid #eee",
  backgroundColor: active ? "var(--background-hover)" : "transparent",
  color: active ? "rgb(9 16 115)" : "var(--input-text)",
  fontWeight: active ? "bold" : "normal",
  transition: "background 0.2s",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },
}));

export const NoMailboxMessage = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--icon-light);
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