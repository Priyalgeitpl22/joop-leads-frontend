import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 850,
      lg: 1400,
      xl: 1536,
    },
  },
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
          "&:hover": {
            backgroundColor: "none !important",
            cursor: "pointer",
          },
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
            backgroundColor: "var(--theme-color-dark)",
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
          fontSize: "10px",         // Label font size
          color: "var(--theme-color-dark)",
          "&.Mui-focused": {
            color: "var(--active-color) !important",
          },
        },
        shrink: {
          fontSize: "13px",         // Label when it moves up
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
            color: "var(--text-white)",
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
          fontSize: "12px",         // Text inside input
          height: "2px",           // Field height
          width: "100%",
          backgroundColor: "var(--input-bg)",
        },
      },
    },
    
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",         // Text inside input
          height: "42px",           // Field height
        },
        input: {
          padding: "10px 12px",     // Inner padding
          fontSize: "14px",         // Input text size
          "&::placeholder": {
            fontSize: "14px",       // Placeholder size
            opacity: 0.7,
          },
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--theme-color)",
          color: "#fff",
          height: "65px",
          boxShadow: "none",
          cursor: "pointer",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          justifyContent: "center",
          "& .MuiSvgIcon-root": {  // ✅ This correctly targets MUI icons inside buttons
            color: "white !important",
            fontSize: "40px !important"
          },
        },
        colorPrimary: {
          backgroundColor: "#1E88E5",
        },
        colorSecondary: {
          backgroundColor: "#D32F2F",
        },
        positionFixed: {
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1200,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          color: "var(--icon-primary)",
          transition: "0.3s ease-in-out",

          "&:hover": {
            color: "var(--icon-hover)",
          },
          "&:active": {
            color: "var(--icon-active)",
          },
          "&.Mui-selected": {
            color: "var(--icon-selected) !important",
          },
          "&:focus": {
            color: "var(--icon-focus)",
            outline: "2px solid var(--icon-focus-outline)",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          marginBottom: "8px",
          // padding: "10px !important",
          // "& .MuiSvgIcon-root": {
          //   color: "var(--theme-color) !important",
          //   fontSize: "30px !important"
          // },
          // "&:hover": {
          //   backgroundColor: "var(--background-secondary)",
          //   padding: "10px !important"
          // },
          // "&:active": {
          //   backgroundColor: "var(--background-secondary)",
          //   padding: "10px !important"
          // },
          // "&.Mui-selected": {
          //   backgroundColor: "var(--selected) !important",
          //   color: "white",
          //   padding: "10px !important"
          // },
          // "& a": {
          //   textDecoration: "none !important",
          //   color: "inherit !important",
          //   backgroundColor: "transparent !important",
          // },
          // "& a:hover, & a:focus, & a:active, & a.Mui-focusVisible": {
          //   backgroundColor: "transparent !important",
          //   textDecoration: "none !important",
          //   color: "inherit !important",
          //   outline: "none !important",
          // },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#FFFFFF !important",
          // "&:active": {
          //   color: "var(--background-secondary)",
          // },
        },
      },
    },
  },
});

export default theme;
