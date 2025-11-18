import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Light theme - Clean white background with black text
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#000000", // Black for primary elements
        light: "#333333",
        dark: "#000000",
      },
      secondary: {
        main: "#0d47a1", // Orange for badges and accents
        light: "#ffb74d",
      },
      background: {
        default: "#ffffff", // Pure white background
        paper: "#ffffff", // Pure white for drawer
      },
      text: {
        primary: "#000000", // Black text
        secondary: "#666666", // Dark gray for secondary text
      },
      divider: "#e0e0e0", // Light gray dividers
      action: {
        hover: "#f5f5f5", // Light gray hover
        selected: "#e8e8e8", // Light gray for selected items
        active: "#000000", // Black for active states
      },
    },
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
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
            borderRadius: 0,
            margin: 0,
            height: "100%",
            boxShadow: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            // height: '80px',
            // minHeight: '80px',
          },
        },
      },
       MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            color: "#000000 !important",
            padding: "2px 8px",
            minHeight: "36px",
            "&.Mui-selected": {
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important",
              color: "#ffffff !important",
              "& .MuiListItemIcon-root": {
                color: "#ffffff !important",
              },
              "&:hover": {
                color: "#ffffff !important",
              },
            },
            "&:hover": {
              // backgroundColor: "#f5f5f5 !important",
              color: "#000000",
              "& .MuiListItemIcon-root": {
                color: "#000000",
              },
            },
            "& .MuiListItemIcon-root": {
              color: "#00000 !important",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#000000",
            padding: "8px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#000000",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: "#ff9800",
            color: "#ffffff",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Inter, sans-serif",
          },
        },
      },
    },
  });

  // Dark theme - Only sidebar dark, everything else light
   const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#000000", // Black for primary elements
        light: "#333333",
        dark: "#000000",
      },
      secondary: {
        main: "#0d47a1", // Orange for badges and accents
        light: "#ffb74d",
      },
      background: {
        default: "#ffffff", // Pure white background
        paper: "#ffffff", // Pure white for drawer
      },
      text: {
        primary: "#000000", // Black text
        secondary: "#666666", // Dark gray for secondary text
      },
      divider: "#e0e0e0", // Light gray dividers
      action: {
        hover: "#f5f5f5", // Light gray hover
        selected: "#e8e8e8", // Light gray for selected items
        active: "#000000", // Black for active states
      },
    },
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
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
            borderRadius: 0,
            margin: 0,
            height: "100%",
            boxShadow: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            // height: '80px',
            // minHeight: '80px',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            color: "#000000 !important",
            padding: "2px 8px",
            minHeight: "36px",
            "&.Mui-selected": {
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important",
              color: "#ffffff !important",
              "& .MuiListItemIcon-root": {
                color: "#ffffff !important",
              },
              "&:hover": {
                color: "#ffffff !important",
              },
            },
            "&:hover": {
              // backgroundColor: "#f5f5f5 !important",
              color: "#000000",
              "& .MuiListItemIcon-root": {
                color: "#000000",
              },
            },
            "& .MuiListItemIcon-root": {
              color: "#00000 !important",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#000000",
            padding: "8px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#000000",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: "#ff9800",
            color: "#ffffff",
          },
        },
      },
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 