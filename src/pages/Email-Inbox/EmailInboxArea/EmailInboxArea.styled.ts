import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Pagination } from "@mui/material";

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
  overflow-y: auto; /* Enables vertical scrolling */
  // height: calc(100vh - 60px); /* Adjust height based on header/footer */
  height: "100%";
  padding: 20px;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #c1c1c1 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 8px;
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