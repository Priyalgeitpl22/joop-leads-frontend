import { Box, Button, styled } from "@mui/material";

export const DialogBox = styled(Box)({
  width: "100%",
  height: "80px",
  backgroundColor: "white",
});

export const DialogBoxHead = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  mt: -5,
});

export const ButtonDisabled = styled(Button)({
  fontWeight: "600",
  width: "fit-content",
  padding: "12px 30px",
  border: "none",
  borderRadius: "6px",
  color: "var(--text-white)",
  background: "#d1d5db",
  fontSize: "16px",
  whiteSpace: "nowrap",
  textTransform: "none",

  "&.Mui-disabled": {
    cursor: "not-allowed !important",
    pointerEvents: "auto !important",
  },
});