import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, themeGroups, GlobalStyles } from '../styles';
import type { ThemeName, Theme } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  isDarkMode: boolean;
  themeColor: string;
  setTheme: (name: ThemeName) => void;
  toggleDarkMode: () => void;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Get theme name from color id and dark mode
const getThemeName = (colorId: string, isDark: boolean): ThemeName => {
  const group = themeGroups.find((g) => g.id === colorId) || themeGroups[0];
  return isDark ? group.dark : group.light;
};

// Get color id from theme name
const getThemeColor = (themeName: ThemeName): string => {
  const group = themeGroups.find((g) => g.light === themeName || g.dark === themeName);
  return group?.id || themeGroups[0].id;
};

// Check if theme is dark
const isThemeDark = (themeName: ThemeName): boolean => {
  return themeName.endsWith('-dark');
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize from localStorage or system preference
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('themeName') as ThemeName;
    if (saved && themes[saved]) {
      return saved;
    }
    
    // Check system preference for dark mode
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'indigo-dark' : 'indigo-light';
  });

  const theme = themes[themeName];
  const isDarkMode = isThemeDark(themeName);
  const themeColor = getThemeColor(themeName);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('themeName', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  // Set specific theme
  const setTheme = useCallback((name: ThemeName) => {
    if (themes[name]) {
      setThemeName(name);
    }
  }, []);

  // Toggle between light and dark mode (keeping same color)
  const toggleDarkMode = useCallback(() => {
    const newThemeName = getThemeName(themeColor, !isDarkMode);
    setThemeName(newThemeName);
  }, [themeColor, isDarkMode]);

  // Set theme color (keeping same light/dark mode)
  const setThemeColor = useCallback((color: string) => {
    const newThemeName = getThemeName(color, isDarkMode);
    setThemeName(newThemeName);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ 
      theme: theme as Theme, 
      themeName, 
      isDarkMode, 
      themeColor,
      setTheme, 
      toggleDarkMode,
      setThemeColor,
    }}>
      <StyledThemeProvider theme={theme as Theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext) as ThemeContextType;
