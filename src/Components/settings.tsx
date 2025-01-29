// src/components/Settings.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Settings Page</Typography>
      <Typography variant="body1">
        Here you can configure the settings for the chatbot.
      </Typography>
    </Box>
  );
};

export default Settings;
