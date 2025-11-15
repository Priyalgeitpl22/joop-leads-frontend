import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Badge,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Campaign,
} from '@mui/icons-material';
import {
  LayoutDashboard,
  Mail,
  MailSearch,
  Users,
  Inbox,
  UserCog,
  Settings,
  LogOut
} from "lucide-react";

import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';

interface NavigationItem {
  title?: string;
  icon: React.ReactElement;
  path: string;
  hasBadge?: boolean;
  badgeCount?: number;
  isThemeToggle?: boolean;
}

interface MiniDrawerProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  pageTitle: string | undefined;
  subTitle:string | undefined;
  userProfile?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

const drawerWidth = 260;
const miniDrawerWidth = 70;

const MiniDrawer: React.FC<MiniDrawerProps> = ({
  children,
  onThemeToggle,
  isDarkMode,
  pageTitle,
  subTitle,
  userProfile,
}) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      path: "/",
    },
    {
      title: "Email Campaigns",
      icon: <MailSearch size={18} />,   // Represents analytics + email
      path: "/email-campaign/all",
    },
    {
      title: "Email Accounts",
      icon: <Mail size={18} />, // Clean inbox/mail icon
      path: "/email-accounts",
    },
    {
      title: "All Leads",
      icon: <Users size={18} />,
      path: "/all-leads",
    },
    {
      title: "Master Inbox",
      icon: <Inbox size={18} />,
      path: "/inbox",
    },
  ];
  
  const navigateButtons: NavigationItem[] = [
    {
      title: "Settings",
      icon: <Settings size={18} />,
      path: "/setting",
    },
    {
      title: "Users",
      icon: <UserCog size={18} />, // Better than SupervisorAccount
      path: "/user",
    },
    {
      title: "Logout",
      icon: <LogOut size={18} />,
      path: "/logout",
    },
  ];
  

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

  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/login');
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column',}}>
      <Box
        sx={{
          padding: open ? '16px 20px' : '12px',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          minHeight: '72px',
          background: isDarkMode
            ? 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            
        }}
      >
        {open ? (
          <>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Campaign sx={{ fontSize: 20, color: '#ffffff' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: isDarkMode ? '#ffffff' : '#1a1a1a',
                  letterSpacing: '0.5px',
                  opacity: 0.8,
                }}
              >
                Jooper.ai
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleDrawerToggle}
              sx={{
                color: isDarkMode ? '#ffffff' : '#1a1a1a',
                '&:hover': {
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <ChevronLeft />
            </IconButton>
          </>
        ) : (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: isDarkMode ? '#ffffff' : '#1a1a1a',
              margin: 'auto',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, px: open ? 1.5 : 0.5, py: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path, item.isThemeToggle)}
              selected={isActiveRoute(item.path)}
              sx={{
                borderRadius: '10px',
                height: "20px",
                justifyContent: open ? 'initial' : 'center',
                color: isActiveRoute(item.path)
                  ? '#6366f1'
                  : isDarkMode
                  ? '#b0b0b0'
                  : '#666666',
                bgcolor: isActiveRoute(item.path)
                  ? isDarkMode
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'rgba(99, 102, 241, 0.08)'
                  : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: isActiveRoute(item.path)
                    ? isDarkMode
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(99, 102, 241, 0.12)'
                    : isDarkMode
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                  color: 'inherit',
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
                    fontWeight: isActiveRoute(item.path) ? 600 : 500,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom Navigation Buttons */}
      <Divider sx={{ bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#e8e8e8' }} />
      <List sx={{ px: open ? 1 : 0.5, py: 1, display: 'flex', justifyContent: "space-evenly" }}>
  {navigateButtons.map((item) => (
    <ListItem key={item.path} disablePadding>
      <Tooltip title={item.title} placement="right" arrow>
        <ListItemButton
          onClick={() => handleNavigation(item.path, item.isThemeToggle)}
          selected={isActiveRoute(item.path)}
          sx={{
            borderRadius: "10px",
            justifyContent: "center", // Always center icon for clean look
            color: isDarkMode ? "#b0b0b0" : "#666666",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: isDarkMode ? "#ffffff" : "#1a1a1a",
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: "#000000",
            }}
          >
            {item.icon}
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  ))}
</List>

    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Drawer
        variant={isVerySmallScreen ? 'temporary' : 'permanent'}
        open={open}
        onClose={isVerySmallScreen ? handleDrawerToggle : undefined}
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          zIndex: 10000,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            bgcolor: isDarkMode ? '#1e1e2e' : '#ffffff',
            borderRight: '1px solid',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
            borderRadius: 0,
            margin: 0,
            height: '100%',
            boxShadow: isDarkMode
              ? '2px 0 8px rgba(0,0,0,0.3)'
              : '2px 0 8px rgba(0,0,0,0.08)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: { sm: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Header Component */}
        <Header
          title={pageTitle}
          subtitle={subTitle}
          isDarkMode={isDarkMode}
          onMenuToggle={handleDrawerToggle}
          userProfile={userProfile}
          drawerOpen={open}
          drawerWidth={drawerWidth}
          miniDrawerWidth={miniDrawerWidth}
        />


        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            overflow: {
              xs: "auto",   // mobile/tablet scroll
              lg: "visible" // desktop NO scroll
            },
            backgroundColor: '#f9fafb',
            marginTop: '72px',
          }}
        >
          <Box
            sx={{
              padding:" 0rem 1.5rem",
              minHeight: 'calc(100vh - 130px)',
              // overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: isDarkMode ? '#1e1e2e' : '#f0f0f0',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: isDarkMode ? '#4a4a6a' : '#d0d0d0',
                borderRadius: '4px',
                '&:hover': {
                  bgcolor: isDarkMode ? '#5a5a7a' : '#b0b0b0',
                },
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
