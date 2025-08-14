import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import ResponsiveLayout from './ResponsiveLayout';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import CampaignIcon from "@mui/icons-material/Campaign";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import { Add, Help, Logout, Settings } from "@mui/icons-material";
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserProfileMenu from '../User-Profile/UserProfile';

// Define the interface for navigation items
interface NavigationItem {
  title?: string;
  icon: React.ReactElement;
  path: string;
  hasBadge?: boolean;
  badgeCount?: number;
  isThemeToggle?: boolean;
}

const drawerWidth = 240;
const miniDrawerWidth = 65;

interface MiniDrawerProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ 
  children, 
  onThemeToggle, 
  isDarkMode 
}) => {
  const [open, setOpen] = useState(true);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    { title: 'Dashboard', icon: <AssessmentIcon sx={{ color: 'inherit' }} />, path: '/' },
    { title: 'Email Campaigns', icon: <CampaignIcon sx={{ color: 'inherit' }} />, path: '/email-campaign/all' },
    { title: 'Email Accounts', icon: <ContactMailIcon sx={{ color: 'inherit' }} />, path: '/email-accounts' },
    { title: 'All Leads', icon: <PersonIcon sx={{ color: 'inherit' }} />, path: '/all-leads' },
    { title: 'Master Inbox', icon: <ArchiveIcon sx={{ color: 'inherit' }} />, path: '/inbox' },
    { title: 'Users', icon: <AccountBoxIcon sx={{ color: 'inherit' }} />, path: '/user' },
    { 
      title: isDarkMode ? 'Light Mode' : 'Dark Mode', 
      icon: isDarkMode ? <Brightness7 sx={{ color: 'inherit' }} /> : <Brightness4 sx={{ color: 'inherit' }} />, 
      path: '/theme-toggle', 
      isThemeToggle: true 
    },
  ];

  const navigateButtons: NavigationItem[] = [
    { title: '', icon: <Settings sx={{ color: 'inherit' }} />, path: '/setting' },
    { title: '', icon: <Help sx={{ color: 'inherit' }} />, path: '/help' },
    { title: '', icon: <Add sx={{ color: isDarkMode ? '#ffffff' : '#000000', }} />, path: '/add', hasBadge: true, badgeCount: 2 },
    { title: '', icon: <Logout sx={{ color: 'inherit' }} />, path: '/logout' },
  ];

  // Auto-collapse on mobile
  useEffect(() => {
    if (isVerySmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isVerySmallScreen]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/login');
    handleUserMenuClose();
  };

  const handleNavigation = (path: string, isThemeToggle?: boolean) => {
    if (isThemeToggle) {
      onThemeToggle();
      return;
    }
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
    if (isVerySmallScreen) {
      setOpen(false);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box
        sx={{
          padding: '10px 20px',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          minHeight: '65px',
          bgcolor: isDarkMode ? 'var(--theme-color)' : 'var(--background-color)',
        }}
      >
        {open ? (
          <>
            <CampaignIcon sx={{ fontSize: 24, color: isDarkMode ? '#ffffff' : '#000000' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '1.125rem', 
                  color: isDarkMode ? '#ffffff' : '#000000' 
                }}
              >
                Jooper.ai
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleDrawerToggle}>
              <ChevronLeft sx={{
                color: isDarkMode ? '#ffffff' : '#000000',
                '&:hover': {
                  color: isDarkMode ? '#000000' : '#000000',
                },
              }} />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleDrawerToggle} sx={{ mx: '-0.5rem' }}>
            <MenuIcon sx={{ 
              color: isDarkMode ? '#ffffff' : '#000000', 
              '&:hover': {
                color: isDarkMode ? '#000000' : '#000000',
              },
            }} />
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, py: 1, px: 0 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ mb: 0.5, px: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path, item.isThemeToggle)}
              selected={isActiveRoute(item.path)}
              sx={{
                borderRadius: 1,
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.hasBadge ? (
                  <Badge badgeContent={item.badgeCount} color="warning">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActiveRoute(item.path) ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ display: open ? 'flex' : '' }}>
        {navigateButtons.map((item) => (
          <ListItem key={item.title} sx={{ paddingX: '0px', paddingBottom: '1rem' }}>
            <ListItemButton 
              onClick={() => handleNavigation(item.path, item.isThemeToggle)}
              selected={isActiveRoute(item.path)}
              sx={{
                borderRadius: 1,
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
              >
                {item.hasBadge ? (
                  <Badge badgeContent={item.badgeCount} color="warning">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActiveRoute(item.path) ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)` },
          ml: { sm: `${open ? drawerWidth : miniDrawerWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: isDarkMode ? '#1a1a1a' : 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'divider',
          height: '65px !important',
        }}
      >
        <Toolbar sx={{ height: '65px !important', padding: '0 16px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Empty space to align with sidebar */}
          </Box>

          <UserProfileMenu />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isVerySmallScreen ? 'temporary' : 'permanent'}
        open={open}
        onClose={isVerySmallScreen ? handleDrawerToggle : undefined}
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            bgcolor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
            borderRadius: 0,
            margin: 0,
            height: '100%',
            boxShadow: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginTop: '65px', // Add margin to account for fixed header
        }}
      >
        <ResponsiveLayout>
          <Box
            sx={{
              minHeight: 'calc(100vh - 96px)',
              overflow: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
          >
            {children}
          </Box>
        </ResponsiveLayout>
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>Change Password</MenuItem>
      </Menu>
    </Box>
  );
};

export default MiniDrawer;