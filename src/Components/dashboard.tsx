// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemText, Divider, Box, CssBaseline } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <List>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/settings">
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', padding: 3, marginTop: 8 }}
      >
        <Typography variant="h4">Welcome to the Dashboard</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
