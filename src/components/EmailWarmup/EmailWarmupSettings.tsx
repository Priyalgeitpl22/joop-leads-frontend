import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  FormControlLabel,
  CircularProgress,
  Divider,
  Alert,
  Snackbar,
  Tabs,
  Tab
} from '@mui/material';
import {
  getWarmupSettings,
  updateWarmupSettings,
  setupEmailWarmup,
  WarmupSettings,
  getWarmupConfig,
  updateWarmupConfig,
  WarmupConfig
} from '../../services/emailWarmupService';

interface EmailWarmupSettingsProps {
  accountId: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`warmup-tabpanel-${index}`}
      aria-labelledby={`warmup-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const EmailWarmupSettings: React.FC<EmailWarmupSettingsProps> = ({ accountId }) => {
  const [settings, setSettings] = useState<WarmupSettings | null>(null);
  const [config, setConfig] = useState<WarmupConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyLimit, setDailyLimit] = useState<number>(50);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [useCustomTemplate, setUseCustomTemplate] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (accountId) {
      fetchSettings();
      fetchWarmupConfig();
    }
  }, [accountId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await getWarmupSettings(accountId);
      
      if (response.success && response.data) {
        setSettings(response.data);
        setDailyLimit(response.data.dailyLimit);
        setEnabled(response.data.isEnabled);
      } else {
        // Default values for new setup
        setDailyLimit(50);
        setEnabled(false);
      }
    } catch (error) {
      console.error('Error fetching warmup settings:', error);
      setError('Failed to load warmup settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchWarmupConfig = async () => {
    try {
      const response = await getWarmupConfig(accountId);
      if (response.success && response.data) {
        setConfig(response.data);
        setSubject(response.data.subject || '');
        setBody(response.data.body || '');
        setUseCustomTemplate(response.data.isActive || false);
      }
    } catch (error) {
      console.error('Error fetching warmup config:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      if (!settings) {
        // Create new settings
        const response = await setupEmailWarmup(
          accountId, 
          enabled, 
          dailyLimit, 
          useCustomTemplate ? subject : undefined, 
          useCustomTemplate ? body : undefined
        );
        if (response.success) {
          setSettings(response.data || null);
          setSuccess('Email warmup has been set up successfully');
        } else {
          setError(response.error || 'Failed to set up email warmup');
        }
      } else {
        // Update existing settings
        const response = await updateWarmupSettings(accountId, {
          isEnabled: enabled,
          dailyLimit
        });
        
        if (response.success) {
          setSettings(response.data || null);
          
          // Also update the warmup content if changed
          await updateWarmupContent();
        } else {
          setError(response.error || 'Failed to update warmup settings');
        }
      }
    } catch (error) {
      console.error('Error saving warmup settings:', error);
      setError('An error occurred while saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateWarmupContent = async () => {
    try {
      const response = await updateWarmupConfig(accountId, {
        subject,
        body,
        isActive: useCustomTemplate
      });
      
      if (response.success) {
        setConfig(response.data || null);
        setSuccess('Warmup settings updated successfully');
      } else {
        setError(response.error || 'Failed to update warmup content');
      }
    } catch (error) {
      console.error('Error updating warmup content:', error);
      setError('An error occurred while saving content');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Email Warmup Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Warm up your email address to improve deliverability. The system will gradually increase 
            the number of emails sent per day to build trust with email providers.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Tabs value={tabValue} onChange={handleTabChange} aria-label="warmup settings tabs">
            <Tab label="General Settings" />
            <Tab label="Email Content" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={enabled}
                      onChange={(e) => setEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable Email Warmup"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Daily Email Limit"
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(Number(e.target.value))}
                  fullWidth
                  InputProps={{ inputProps: { min: 10, max: 200 } }}
                  helperText="Maximum number of warmup emails to send per day (10-200)"
                  disabled={!enabled}
                />
              </Grid>

              {settings && (
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Warmup Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Total Sent
                        </Typography>
                        <Typography variant="body1">
                          {settings.totalSent}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Total Replied
                        </Typography>
                        <Typography variant="body1">
                          {settings.totalReplied}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Current Daily Count
                        </Typography>
                        <Typography variant="body1">
                          {settings.currentDailyCount}/{settings.dailyLimit}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Warmup Started
                        </Typography>
                        <Typography variant="body1">
                          {new Date(settings.startDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Customize the subject and body of the warmup emails. If left empty, system defaults will be used.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useCustomTemplate}
                      onChange={(e) => setUseCustomTemplate(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Use Custom Email Template"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                  helperText="Custom subject line for warmup emails"
                  disabled={!useCustomTemplate}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  fullWidth
                  multiline
                  rows={6}
                  helperText="Custom body content for warmup emails"
                  disabled={!useCustomTemplate}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : 'Save Settings'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmailWarmupSettings; 