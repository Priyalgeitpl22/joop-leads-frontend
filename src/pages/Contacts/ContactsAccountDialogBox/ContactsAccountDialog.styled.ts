import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const ModernInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    height: "48px",

    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root": {
    fontSize: "14px",
    color: "#6b7280",
    transform: "translate(14px, 14px) scale(1)",

    "&.Mui-focused": {
      color: "#6366f1",
    },
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.85)",
  },
}));
