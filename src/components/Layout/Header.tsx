import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import UserProfileMenu from '../User-Profile/UserProfile';

interface HeaderProps {
    title: string  | undefined;
    subtitle: string | undefined; 
    isDarkMode: boolean;
    onMenuToggle: () => void;
    userProfile?: {
      name?: string;
      email?: string;
      avatar?: string;
    };
    drawerOpen: boolean;
    drawerWidth: number;
    miniDrawerWidth: number;
  }

  const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    isDarkMode,
    onMenuToggle,
    drawerOpen,
    drawerWidth,
    miniDrawerWidth,
  }) => {
  const [_, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : miniDrawerWidth}px)` },
            marginLeft: {
            sm: `${drawerOpen ? drawerWidth : miniDrawerWidth}px`
            },
            bgcolor: '#ffffff',
            color: '#000000',
            boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            borderBottom: isDarkMode ? 'none' : '1px solid #e8e8e8',
            height: '72px',
            zIndex: theme.zIndex.drawer + 1,
        }}
    >
      <Toolbar sx={{ height: '72px !important' }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '14px', md:'16px' },
              color: "black !important",
              opacity:"0.8"
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
            variant="body2"
            sx={{
                fontSize: {xs: '12px',md:'14px'},
                color: "gray",
            }}
            >
            {subtitle}
            </Typography>
        )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            }}
            onClick={handleMenuOpen}
          >
            <UserProfileMenu />
          </Box>

         
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
