import { styled } from "@mui/material/styles";
import { Box, List, ListItem } from "@mui/material";

export const EmailInboxListContainer = styled(Box)({
  width: "28%",
  borderRight: "1px solid #ddd",
  padding: "10px",
  height: "100vh",
  overflowY: "auto",
});

export const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f8f9fa",
});

export const SearchInput = styled("input")({
  border: "none",
  outline: "none",
  background: "transparent",
  flex: 1,
});

export const EmailInboxListHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  borderBottom: "1px solid #eee",
});

export const HeaderTitle = styled(Box)({
  fontSize: "18px",
  fontWeight: "bold",
});

export const HeaderIcons = styled(Box)({
  display: "flex",
  gap: "10px",
  "& svg": {
    cursor: "pointer",
    color: "#777",
  },
});

export const AccountList = styled(List)({
  padding: 0,
});

export const AccountItem = styled(ListItem)({
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  padding: "10px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  transition: "background 0.2s",
  borderRadius: "8px",
  marginBottom: "5px",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#f1f3f5",
  },
});

export const AccountAvatar = styled(Box)({
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "rgb(9 16 115)",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "15px",
});

export const AccountDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
  "& strong": {
    fontSize: "15px",
  },
  "& div": {
    fontSize: "15px",
    color: "#777",
  },
});
