import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // Mobile specific styles
        ...(isMobile && {
          padding: '10px',
        }),
        // Tablet specific styles
        ...(isTablet && !isMobile && {
          padding: '15px',
        }),
        // Desktop specific styles
        ...(isDesktop && {
          padding: '20px',
          '& .MuiBox-root': {
          },
        }),
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveLayout; 