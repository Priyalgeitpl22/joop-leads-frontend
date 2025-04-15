import { Box, styled } from "@mui/material";

export const DialogBox = styled(Box)({
  width: "100%",
  height: "80px",
  backgroundColor: "var(--theme-color-light)",
})

export const DialogBoxHead = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  mt: -5,
})