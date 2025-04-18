import styled from "styled-components";
import {
  Box,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const DialogSubject = styled(DialogTitle)(({}) => ({
  fontWeight: "500px",
  fontSize: "20px",
  background: "var(--background-color)",
  padding: "16px 24px",
  borderBottom: "1px solid #e0e0e0",
  position: "relative",
}));

export const DialogContentBox = styled(DialogContent)(({}) => ({
  padding: "25px",
  background: "#fff",
}));

export const DialogBody = styled(Box)(({}) => ({
  backgroundColor: "#f9f9f9",
  borderRadius: "2px",
  padding: "3px",
  boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
  maxHeight: "400px",
  overflowY: "auto",
  whiteSpace: "pre-wrap",
  lineHeight: 1.7,
  color: "#333",
  fontSize: "16px",
}))

export const DialogBoxData = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
  marginTop: "10px",
}));