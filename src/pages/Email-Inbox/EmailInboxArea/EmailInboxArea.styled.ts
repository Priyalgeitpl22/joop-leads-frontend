import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Pagination, Divider } from "@mui/material";

export const EmailInboxContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "100%",
  backgroundColor: "var(--background-light)",
});

export const EmailInboxHeader = styled(Box)({
  padding: "12px",
  borderBottom: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const EmailInboxMessages = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
});

export const ReassignmentNote = styled(Typography)({
  color: "#757575",
  fontSize: "0.875rem",
  textAlign: "center",
  margin: "16px 0",
  padding: "8px",
  backgroundColor: "#fafafa",
  borderRadius: "8px",
});

export const EmailInboxInputContainer = styled(Box)({
  padding: "16px",
  backgroundColor: "var(--background-light)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#ccc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--theme-color-dark)",
    },
  },
});

export const QuickReplyButton = styled(Button)({
  marginRight: "8px",
  marginBottom: "8px",
  borderColor: "#e0e0e0",
  color: "#000",
});

export const PlaceholderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "-webkit-fill-available",
  textAlign: "center",
  background: "var(--background-light)f",
});
export const EmailInboxMessagesContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative; /* Ensure child elements are positioned relative to this */
  padding: 9px 20px 0px 20px;
  overflow: hidden; /* Prevents scrollbars from affecting layout */

  > div {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px; /* Ensures spacing from scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 8px;
    }
  }
`;
export const BotMessage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "8px",
  marginBottom: "24px",
});

export const BotMessageBubble = styled(Box)({
  backgroundColor: "var(--theme-color)",
  color: "black",
  padding: "12px 16px",
  borderRadius: "12px",
  wordWrap: "break-word",
  maxWidth: "80%",
});

export const UserMessage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "8px",
});

export const UserMessageBubble = styled(Box)({
  backgroundColor: "#e9ecef",
  color: "#000000",
  padding: "12px",
  borderRadius: "12px",
  maxWidth: "80%",
  wordWrap: "break-word",
});

export const EmailInboxMessagesBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
})

export const EmailInboxMessagesHeading = styled(Box)({
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
});

export const EmailPagination = styled(Pagination)({
  "& .Mui-selected": {
    backgroundColor: "var(--theme-color) !important",
    color: "#fff !important",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export const InboxMessageBody = styled(Box)<{ isExpanded: boolean }>(
  ({ isExpanded }) => ({
    marginTop: "10px",
    cursor: "pointer",
    overflow: "hidden",
    color: isExpanded ? "black" : "#444343",
    fontSize: "15px",
    maxHeight: isExpanded ? "none" : "100px",
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& a': {
      color: '#0066cc',
      textDecoration: 'underline',
    },
    '& div': {
      whiteSpace: 'normal'
    }
  })
);

export const TotalPageCount = styled(Box)`
  border-top: 1px solid #ddd;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  // z-index: 10;
`;

export const NoMailboxMessage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f8f9fa",
  color: "#555",
  fontSize: "16px",
  fontWeight: "bold",
  height: "100%",
  width: "100%",
});

export const EmailInboxListHeader = styled(Box)({
  alignItems: "center",
  color: "var(--active-color)",
  textAlign: "center",
  paddingBottom: "9px",
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

export const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 5px;
  flex-grow: 1;
  margin-bottom: 1px;
  width: 100%;
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