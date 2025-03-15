import { styled } from "@mui/material/styles";
import { Box, List, ListItem } from "@mui/material";

export const EmailInboxListContainer = styled(Box)({
  width: "28%",
  minWidth: "250px",
  borderRight: "1px solid #ddd",
  padding: "0px 10px 10px 10px",
  marginTop: "5px",
  height: "100%",
  overflowY: "auto",
  backgroundColor: "var(--text-white)",
  transition: "width 0.3s ease-in-out",

  "@media (max-width: 1024px)": {
    width: "35%",
  },
  "@media (max-width: 768px)": {
    width: "45%",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    borderRight: "none",
    height: "auto",
  },
});

export const EmailInboxHeading = styled(Box)({
  position: "sticky",
  display: "flex",
  top: 0,
  background: "#fff",
  zIndex: 10,
  justifyContent: "space-between",
  gap: "6%",
  borderBottom: "1px solid #eee",
})

export const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f8f9fa",
  width: "60%",
});

export const SearchInput = styled("input")({
  border: "none",
  outline: "none",
  background: "transparent",
  flex: 1,
  fontSize: "14px",
  padding: "5px",

  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
});

export const EmailInboxListHeader = styled(Box)({
  // display: "flex",
  // justifyContent: "space-between",
  alignItems: "center",
  marginTop: "8px",
  marginBottom: "10px",
  // borderBottom: "1px solid #eee",
  paddingBottom: "5px",

  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export const HeaderTitle = styled(Box)({
  fontSize: "18px",
  fontWeight: "bold",

  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
});

export const HeaderIcons = styled(Box)({
  display: "flex",
  gap: "10px",

  "& svg": {
    cursor: "pointer",
    color: "#777",
  },

  "@media (max-width: 600px)": {
    gap: "5px",
  },
});

export const AccountList = styled(List)({
  padding: 0,
  overflowY: "auto",
  maxHeight: "calc(100vh - 120px)",
  marginTop: "5px",
});

export const AccountItem = styled(ListItem)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  transition: "background 0.2s",
  borderRadius: "8px",
  marginBottom: "5px",
  backgroundColor: "var(--icon-light)",
  '&[data-selected="true"]': {
    backgroundColor: "var(--background-hover)",
    fontWeight: "bold",
  },

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },

  "@media (max-width: 600px)": {
    padding: "8px",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
});

export const AccountAvatar = styled(Box)({
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "rgb(9 16 115)",
  color: "var(--icon-light)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "15px",
  flexShrink: 0,

  "@media (max-width: 600px)": {
    width: "30px",
    height: "30px",
    fontSize: "13px",
  },
});

export const AccountDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",

  "& strong": {
    fontSize: "15px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",

    "@media (max-width: 600px)": {
      maxWidth: "150px",
      fontSize: "14px",
    },
  },

  "& div": {
    fontSize: "14px",
    color: "#777",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",

    "@media (max-width: 600px)": {
      maxWidth: "150px",
      fontSize: "12px",
    },
  },
});
