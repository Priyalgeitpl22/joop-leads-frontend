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
      mode: 'light',
      primary: {
        main: '#000000', // Black for primary elements
        light: '#333333',
        dark: '#000000',
      },
      secondary: {
        main: '#ff9800', // Orange for badges and accents
        light: '#ffb74d',
      },
      background: {
        default: '#ffffff', // Pure white background
        paper: '#ffffff', // Pure white for drawer
      },
      text: {
        primary: '#000000', // Black text
        secondary: '#666666', // Dark gray for secondary text
      },
      divider: '#e0e0e0', // Light gray dividers
      action: {
        hover: '#f5f5f5', // Light gray hover
        selected: '#e8e8e8', // Light gray for selected items
        active: '#000000', // Black for active states
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
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            borderRadius: 0,
            margin: 0,
            height: '100%',
            boxShadow: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            color: '#000000',
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
            // height: '80px',
            // minHeight: '80px',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            margin: '4px 8px',
            color: '#000000',
            minHeight: '48px',
            '&.Mui-selected': {
              backgroundColor: '#e8e8e8',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#d0d0d0',
                color: '#000000',
              },
              '& .MuiListItemIcon-root': {
                color: '#000000',
              },
            },
            '&:hover': {
              backgroundColor: '#f5f5f5',
              color: '#000000',
              '& .MuiListItemIcon-root': {
                color: '#000000',
              },
            },
            '& .MuiListItemIcon-root': {
              color: '#666666',
              minWidth: '24px',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#666666',
            padding: '8px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              color: '#000000',
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: '#ff9800',
            color: '#ffffff',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
    },
  });

  // Dark theme - Only sidebar dark, everything else light
  const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Force light mode for main content
      primary: {
        main: '#000000', // Black for primary elements (same as light)
        light: '#333333',
        dark: '#000000',
      },
      secondary: {
        main: '#ff9800', // Orange for badges and accents (same as light)
        light: '#ffb74d',
      },
      background: {
        default: '#ffffff', // White background for body (same as light)
        paper: '#ffffff', // White for header and main content
      },
      text: {
        primary: '#000000', // Black text (same as light)
        secondary: '#666666', // Dark gray for secondary text (same as light)
      },
      divider: '#e0e0e0', // Light gray dividers (same as light)
      action: {
        hover: '#f5f5f5', // Light gray hover (same as light)
        selected: '#e8e8e8', // Light gray for selected items (same as light)
        active: '#000000', // Black for active states (same as light)
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
      // Only sidebar dark styling
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#3b1a53 !important', // Black sidebar
            color: '#ffffff !important', // White text
            // borderRight: '1px solid #333333',
          },
        },
      },
      // Header stays light
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#4b1861 !important', // White header
            color: '#000000 !important', // Black text
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'none',
            // borderBottom: '1px solid #e0e0e0',
          },
        },
      },
      // Sidebar items - white text on black background
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: '#ffffff !important', // White text
            borderRadius: '8px',
            margin: '4px 8px',
            minHeight: '48px',
            '&:hover': {
              backgroundColor: '#6a4b81 !important', // Dark gray hover
              color: '#ffffff !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#6207a3 !important', // Dark gray selected
              color: '#ffffff !important',
            },
            '&.Mui-focusVisible': {
              backgroundColor: '#990aff !important',
              color: '#ffffff !important',
            },
          },
        },
      },
      // Sidebar icons - white
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#ffffff !important', // White icons
            minWidth: '24px',
          },
        },
      },
      // Sidebar text - white
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: '#ffffff !important', // White text
          },
          primary: {
            color: '#ffffff !important', // White text
            fontSize: '14px',
            fontWeight: 500,
          },
        },
      },
      // Keep all other components in light mode
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#666666',
            '&:hover': {
              color: '#000000',
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: '#ff9800',
            color: '#ffffff',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter, sans-serif',
            color: '#000000', // Black text (same as light)
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
            '& .MuiInputBase-root': {
              backgroundColor: '#ffffff !important',
              color: '#000000 !important',
            },
            '& .MuiInputLabel-root': {
              color: '#000000 !important',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0 !important',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
            '& .MuiSelect-select': {
              color: '#000000 !important',
            },
            '& .MuiSvgIcon-root': {
              color: '#000000 !important',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
            '&:hover': {
              backgroundColor: '#f5f5f5 !important',
              color: '#000000 !important',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
            '& .MuiInputBase-input': {
              color: '#000000 !important',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0 !important',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0 !important',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000 !important',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#000000 !important',
            color: '#ffffff !important',
            // '&:hover': {
            //   backgroundColor: '#333333 !important',
            //   color: '#ffffff !important',
            // },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
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
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: '#e0e0e0 !important',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5 !important',
            color: '#000000 !important',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#000000 !important',
            color: '#ffffff !important',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
          },
        },
      },
      MuiStepContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: '#e0e0e0 !important',
          },
          bar: {
            backgroundColor: '#000000 !important',
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: '#e0e0e0 !important',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            '& .MuiSwitch-track': {
              backgroundColor: '#e0e0e0 !important',
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: '#ffffff !important',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
            '&.Mui-checked': {
              color: '#000000 !important',
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
            '&.Mui-checked': {
              color: '#000000 !important',
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#000000 !important',
          },
          track: {
            backgroundColor: '#000000 !important',
          },
          thumb: {
            backgroundColor: '#000000 !important',
          },
        },
      },
      MuiRating: {
        styleOverrides: {
          root: {
            color: '#ff9800 !important',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff !important',
            color: '#000000 !important',
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