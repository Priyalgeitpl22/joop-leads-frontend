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
  borderRadius: "8px",
  padding: "16px",
  boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
  maxHeight: "500px",
  overflowY: "auto",
  color: "#333",
  fontSize: "16px",
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
  '& a': {
    color: '#0066cc',
    textDecoration: 'underline',
  },
  '& table': {
    borderCollapse: 'collapse',
    maxWidth: '100%',
    overflowX: 'auto',
    display: 'block',
  },
  '& th, & td': {
    border: '1px solid #ddd',
    padding: '8px',
  }
}))

export const DialogBoxData = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
  marginTop: "10px",
}));