import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  Settings,
  AccountCircle,
} from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
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
    userProfile = { name: 'John Doe', email: 'john@example.com' },
    drawerOpen,
    drawerWidth,
    miniDrawerWidth,
  }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/login');
    handleMenuClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleMenuClose();
  };

  return (
    <AppBar
        position="fixed"
        sx={{
            width: {
            sm: `calc(100% - ${drawerOpen ? drawerWidth : miniDrawerWidth}px)`
            },
            marginLeft: {
            sm: `${drawerOpen ? drawerWidth : miniDrawerWidth}px`
            },
            bgcolor: isDarkMode ? '#1e1e2e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            borderBottom: isDarkMode ? 'none' : '1px solid #e8e8e8',
            height: '72px',
            zIndex: theme.zIndex.drawer + 1,
            padding: "10px"
        }}
    >
      <Toolbar sx={{ height: '72px !important' }}>
        {/* Menu Toggle Button for Mobile */}
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
              fontSize: { xs: '1rem', md:'1.25rem' },
              color: "black",
              opacity:"0.8"
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
            variant="body2"
            sx={{
                fontSize: {xs: '0.75rem' ,md:'1rem'},
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
            {/* <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isDarkMode ? '#ffffff' : '#1a1a1a',
                  lineHeight: 1.2,
                }}
              >
                {userProfile?.name || 'User'}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: isDarkMode ? '#b0b0b0' : '#666666',
                  lineHeight: 1.2,
                }}
              >
                {userProfile?.email || 'user@example.com'}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#6366f1',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              src={userProfile?.avatar}
            >
              {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar> */}
            <UserProfileMenu />
          </Box>

         
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
