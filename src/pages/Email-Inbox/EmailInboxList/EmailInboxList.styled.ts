import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Typography } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';

export const EmailInboxListContainer = styled(Box)({
  width: "100%",
  height: "100%",
  backgroundColor: "var(--text-white)",
  borderRight: "1px solid #ddd",
  padding: "0px 10px",
  marginTop: "5px",
  transition: "width 0.3s ease-in-out",
  overflowY: "auto",
});

export const EmailInboxHeading = styled(Box)({
  display: "flex",
  position: "sticky",
  top: 0,
  paddingTop: "5px",
  background: "var(--icon-light)",
  zIndex: 10,
  justifyContent: "space-between",
  gap: "2%",
  borderBottom: "1px solid #eee",
});

export const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 5px;
  flex-grow: 1;
  margin-bottom: 10px;
  width: 80%;
  gap: 10px;
  height: 35px;

  input {
    background: none;
    border: none;
    outline: none;
    color: var(--theme-color);
    flex-grow: 1;
    font-size: 14px;

    &::placeholder {
      color: #94a3b8;
    }
  }

  svg {
    color: var(--border-color);
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    display: block;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
    @media (max-width: 480px) {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 1024px) {
    max-width: 270px;
    height: 38px;
  }

  @media (max-width: 768px) {
    max-width: 250px;
    height: 35px;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
    height: 32px;
    padding: 6px 8px;
    gap: 6px;
  }
`;

export const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid var(--input-border)",
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
  alignItems: "center",

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
  overflowY: "auto",
  maxHeight: "calc(100vh - 120px)",
  marginTop: "5px",
  
  // Popup mode adjustments
  "&.popup-mode": {
    maxHeight: "320px",
    marginTop: "0px",
  },
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
  background: "var(--primary-gradient)",
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

export const NoAccount = styled(Box)`
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


export const ReloadIcon = styled(CachedIcon, {
  shouldForwardProp: (prop) => prop !== "loading",
})<{ loading?: boolean }>(({ loading }) => ({
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  ...(loading && {
    animation: "spin 1s linear infinite",
    cursor: "not-allowed",
  }),
  "@keyframes spin": {
    "0%": { transform: "rotate(360deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
}));

// New styled components for account selector
export const AccountSelectorDivider = styled(Box)`
  padding: 8px 16px;
  margin-top: 8px;
`;

export const AccountSelectorText = styled(Typography)`
  color: #666;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;