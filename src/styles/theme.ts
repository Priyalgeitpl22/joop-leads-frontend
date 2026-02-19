// Theme configuration for the application
// Supports multiple predefined themes with consistent design tokens

// Base design tokens (shared across all themes)
const baseTokens = {
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    half: '50%',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    p80: '80%'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
};

// Neutral colors (shared)
const neutralColors = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
};

// ============================================
// THEME DEFINITIONS
// ============================================

// 1. Indigo Theme (Default)
export const indigoLight = {
  name: 'indigo-light' as const,
  label: 'Indigo Light',
  ...baseTokens,
  colors: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      dark: '#0d9488',
      contrast: '#ffffff',
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      contrast: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrast: '#000000',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrast: '#ffffff',
    },
    neutral: neutralColors,
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#f0f0f0',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#666666',
      tertiary: '#888888',
      inverse: '#ffffff',
    },
    border: {
      light: '#f0f0f0',
      main: '#e0e0e0',
      dark: '#d0d0d0',
    },
    sidebar: {
      background: '#1a1a2e',
      text: '#ffffff',
      hover: '#2a2a3e',
      active: '#6366f1',
    },
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
};

export const indigoDark = {
  ...indigoLight,
  name: 'indigo-dark' as const,
  label: 'Indigo Dark',
  colors: {
    ...indigoLight.colors,
    background: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      tertiary: '#0f3460',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      tertiary: '#707070',
      inverse: '#1a1a2e',
    },
    border: {
      light: '#2a2a3e',
      main: '#3a3a4e',
      dark: '#4a4a5e',
    },
    sidebar: {
      background: '#0f0f1a',
      text: '#ffffff',
      hover: '#1a1a2e',
      active: '#6366f1',
    },
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.6)',
  },
};

// 2. Ocean Theme (Blue/Teal)
export const oceanLight = {
  ...indigoLight,
  name: 'ocean-light' as const,
  label: 'Ocean Light',
  colors: {
    ...indigoLight.colors,
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#0c4a6e',
      text: '#ffffff',
      hover: '#0369a1',
      active: '#0ea5e9',
    },
  },
};

export const oceanDark = {
  ...indigoDark,
  name: 'ocean-dark' as const,
  label: 'Ocean Dark',
  colors: {
    ...indigoDark.colors,
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#082f49',
      text: '#ffffff',
      hover: '#0c4a6e',
      active: '#0ea5e9',
    },
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
    },
  },
};

// 3. Emerald Theme (Green)
export const emeraldLight = {
  ...indigoLight,
  name: 'emerald-light' as const,
  label: 'Emerald Light',
  colors: {
    ...indigoLight.colors,
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      dark: '#0d9488',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#064e3b',
      text: '#ffffff',
      hover: '#065f46',
      active: '#10b981',
    },
  },
};

export const emeraldDark = {
  ...indigoDark,
  name: 'emerald-dark' as const,
  label: 'Emerald Dark',
  colors: {
    ...indigoDark.colors,
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      dark: '#0d9488',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#022c22',
      text: '#ffffff',
      hover: '#064e3b',
      active: '#10b981',
    },
    background: {
      primary: '#0f1f1a',
      secondary: '#1a2f28',
      tertiary: '#2d4a40',
    },
  },
};

// 4. Rose Theme (Pink/Red)
export const roseLight = {
  ...indigoLight,
  name: 'rose-light' as const,
  label: 'Rose Light',
  colors: {
    ...indigoLight.colors,
    primary: {
      main: '#f43f5e',
      light: '#fb7185',
      dark: '#e11d48',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#881337',
      text: '#ffffff',
      hover: '#9f1239',
      active: '#f43f5e',
    },
  },
};

export const roseDark = {
  ...indigoDark,
  name: 'rose-dark' as const,
  label: 'Rose Dark',
  colors: {
    ...indigoDark.colors,
    primary: {
      main: '#f43f5e',
      light: '#fb7185',
      dark: '#e11d48',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#4c0519',
      text: '#ffffff',
      hover: '#881337',
      active: '#f43f5e',
    },
    background: {
      primary: '#1f0a10',
      secondary: '#2d1219',
      tertiary: '#4a1d28',
    },
  },
};

// 5. Amber Theme (Orange/Yellow)
export const amberLight = {
  ...indigoLight,
  name: 'amber-light' as const,
  label: 'Amber Light',
  colors: {
    ...indigoLight.colors,
    primary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrast: '#000000',
    },
    secondary: {
      main: '#ea580c',
      light: '#f97316',
      dark: '#c2410c',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#78350f',
      text: '#ffffff',
      hover: '#92400e',
      active: '#f59e0b',
    },
  },
};

export const amberDark = {
  ...indigoDark,
  name: 'amber-dark' as const,
  label: 'Amber Dark',
  colors: {
    ...indigoDark.colors,
    primary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrast: '#000000',
    },
    secondary: {
      main: '#ea580c',
      light: '#f97316',
      dark: '#c2410c',
      contrast: '#ffffff',
    },
    sidebar: {
      background: '#451a03',
      text: '#ffffff',
      hover: '#78350f',
      active: '#f59e0b',
    },
    background: {
      primary: '#1c1408',
      secondary: '#2a1f0d',
      tertiary: '#3d2d15',
    },
  },
};

// Export all themes
export const themes = {
  'indigo-light': indigoLight,
  'indigo-dark': indigoDark,
  'ocean-light': oceanLight,
  'ocean-dark': oceanDark,
  'emerald-light': emeraldLight,
  'emerald-dark': emeraldDark,
  'rose-light': roseLight,
  'rose-dark': roseDark,
  'amber-light': amberLight,
  'amber-dark': amberDark,
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = typeof indigoLight;

// Theme groups for UI
export const themeGroups = [
  {
    id: 'indigo',
    name: 'Indigo',
    light: 'indigo-light' as ThemeName,
    dark: 'indigo-dark' as ThemeName,
    color: '#6366f1',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    light: 'ocean-light' as ThemeName,
    dark: 'ocean-dark' as ThemeName,
    color: '#0ea5e9',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    light: 'emerald-light' as ThemeName,
    dark: 'emerald-dark' as ThemeName,
    color: '#10b981',
  },
  {
    id: 'rose',
    name: 'Rose',
    light: 'rose-light' as ThemeName,
    dark: 'rose-dark' as ThemeName,
    color: '#f43f5e',
  },
  {
    id: 'amber',
    name: 'Amber',
    light: 'amber-light' as ThemeName,
    dark: 'amber-dark' as ThemeName,
    color: '#f59e0b',
  },
];

// Legacy exports for backward compatibility
export const lightTheme = indigoLight;
export const darkTheme = indigoDark;
export const colors = indigoLight.colors;
