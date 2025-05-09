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
  Snackbar
} from '@mui/material';
import {
  getWarmupSettings,
  updateWarmupSettings,
  setupEmailWarmup,
  WarmupSettings
} from '../../services/emailWarmupService';

interface EmailWarmupSettingsProps {
  accountId: string;
}

const EmailWarmupSettings: React.FC<EmailWarmupSettingsProps> = ({ accountId }) => {
  const [settings, setSettings] = useState<WarmupSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyLimit, setDailyLimit] = useState<number>(50);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (accountId) {
      fetchSettings();
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

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      if (!settings) {
        // Create new settings
        const response = await setupEmailWarmup(accountId, enabled, dailyLimit);
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
          setSuccess('Warmup settings updated successfully');
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

            <Grid item xs={12}>
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
            </Grid>
          </Grid>
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