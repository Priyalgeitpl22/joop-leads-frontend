import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "var(--disable-color)",
          "&.Mui-checked": {
            color: "var(--border-color)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "14px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: 50,
          backgroundColor: "black",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "white",
          },
          "&.Mui-focused": {
            backgroundColor: "blue",
            borderColor: "var(--theme-color-dark)",
          },
          "&.Mui-disabled": {
            backgroundColor: "var(--disable-background)",
            color: "var(--disable-color)",
            cursor: "not-allowed",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 700,
          transition: "background-color 0.2s ease-in-out",

          "&:hover": {
            backgroundColor: "var(--accent-color)",
          },

          "&.Mui-selected": {
            backgroundColor: "var(--selected)",
            color: "white",

            "&:hover": {
              backgroundColor: "var(--accent-color)",
            },
          },

          "&:active": {
            backgroundColor: "var(--accent-color)",
            color: "white",
          },

          "&.Mui-focusVisible": {
            backgroundColor: "#cce5ff",
            outline: "2px solid #007bff",
          },

          "&.Mui-disabled": {
            backgroundColor: "#e0e0e0",
            color: "#a0a0a0",
            cursor: "not-allowed",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--theme-color-dark)",
          "&.Mui-focused": {
            color: "var(--active-color) !important",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "var(--text-color)"
        }
      },
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#333",
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontSize: "2rem",
            fontWeight: 600,
            color: "#444",
          },
        },
        {
          props: { variant: "h3" },
          style: {
            fontSize: "1.75rem",
            fontWeight: 600,
          },
        },
        {
          props: { variant: "h4" },
          style: {
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#666",
          },
        },
        {
          props: { variant: "h5" },
          style: {
            fontSize: "16px",
            fontWeight: 600,
          },
        },
        {
          props: { variant: "h6" },
          style: {
            fontSize: "16px",
            fontWeight: 500,
            color: "#000115",
            lineHeight: "21px",
            marginBottom: "5px"
          },
        },
        {
          props: { variant: "body1" },
          style: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
          },
        },
        {
          props: { variant: "body2" },
          style: {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "var(--text-black)"
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            fontSize: "1rem",
            fontWeight: 500,
            color: "#444",
          },
        },
        {
          props: { variant: "subtitle2" },
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        },
        {
          props: { variant: "caption" },
          style: {
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#777",
          },
        },
        {
          props: { variant: "overline" },
          style: {
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#999",
          },
        },
        {
          props: { variant: "button" },
          style: {
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#007bff",
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          backgroundColor: "var(--input-bg)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "var(--input-text)",
          backgroundColor: "var(--input-bg)",
          "& fieldset": {
            borderColor: "var(--theme-color-dark)",
          },
          "&:hover fieldset": {
            borderColor: "var(--theme-color-dark)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--theme-color-dark) !important",
          },
          "&.Mui-disabled": {
            backgroundColor: "var(--input-disabled-bg)",
            color: "var(--input-disabled-text)",
          },
        },
        input: {
          "::placeholder": {
            color: "var(--input-placeholder)",
            opacity: 1,
          },
          "&:focus": {
            borderColor: "var(--theme-color-dark) !important",
          },
        },
      },
    },
  },
});

export default theme;
