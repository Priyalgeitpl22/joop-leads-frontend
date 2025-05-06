import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailTrackingAnalytics from '../../components/EmailTracking/EmailTrackingAnalytics';
import EmailWarmupSettings from '../../components/EmailWarmup/EmailWarmupSettings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`email-analytics-tabpanel-${index}`}
      aria-labelledby={`email-analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

interface EmailAnalyticsDialogProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
  accountEmail: string;
}

const EmailAnalyticsDialog: React.FC<EmailAnalyticsDialogProps> = ({
  open,
  onClose,
  accountId,
  accountName,
  accountEmail
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      aria-labelledby="email-analytics-dialog-title"
    >
      <DialogTitle id="email-analytics-dialog-title">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            {accountName} <Typography component="span" variant="body2" color="text.secondary">({accountEmail})</Typography>
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="email analytics tabs">
          <Tab label="Email Tracking" id="email-analytics-tab-0" aria-controls="email-analytics-tabpanel-0" />
          <Tab label="Warmup Settings" id="email-analytics-tab-1" aria-controls="email-analytics-tabpanel-1" />
        </Tabs>
      </Box>

      <DialogContent>
        <TabPanel value={tabValue} index={0}>
          <EmailTrackingAnalytics accountId={accountId} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <EmailWarmupSettings accountId={accountId} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default EmailAnalyticsDialog; 