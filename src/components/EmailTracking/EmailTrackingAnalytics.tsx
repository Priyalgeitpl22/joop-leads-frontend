import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  CircularProgress, 
  useTheme 
} from '@mui/material';
import { getAccountAnalytics, TrackingAnalytics } from '../../services/emailTrackingService';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSnackbar } from 'notistack';

interface EmailTrackingAnalyticsProps {
  accountId: string;
}

const EmailTrackingAnalytics: React.FC<EmailTrackingAnalyticsProps> = ({ accountId }) => {
  const [analytics, setAnalytics] = useState<TrackingAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    if (accountId) {
      fetchAnalytics();
    }
  }, [accountId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAccountAnalytics(accountId);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      enqueueSnackbar('Failed to load email analytics', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box p={3}>
        <Typography color="text.secondary">No analytics data available</Typography>
      </Box>
    );
  }

  const openRatePercentage = Math.round((analytics.avgOpenRate || 0) * 100);
  const replyRatePercentage = Math.round((analytics.avgReplyRate || 0) * 100);
  const inboxPlacementRate = analytics.totalSent > 0 
    ? Math.round(((analytics.totalSent - analytics.totalInSpam) / analytics.totalSent) * 100)
    : 0;

  // Data for first pie chart (email status)
  const emailStatusData = [
    { id: 0, value: analytics.totalOpened, label: 'Opened', color: theme.palette.success.main },
    { id: 1, value: analytics.totalSent - analytics.totalOpened, label: 'Not Opened', color: theme.palette.grey[400] },
  ];

  // Data for second pie chart (spam vs inbox)
  const spamInboxData = [
    { id: 0, value: analytics.totalSent - analytics.totalInSpam, label: 'Inbox', color: theme.palette.primary.main },
    { id: 1, value: analytics.totalInSpam, label: 'Spam', color: theme.palette.error.main },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Emails Sent
              </Typography>
              <Typography variant="h4">{analytics.totalSent}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Open Rate
              </Typography>
              <Typography variant="h4">{openRatePercentage}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Reply Rate
              </Typography>
              <Typography variant="h4">{replyRatePercentage}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Inbox Placement
              </Typography>
              <Typography variant="h4">{inboxPlacementRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Email Opens
              </Typography>
              {analytics.totalSent > 0 ? (
                <Box height={200}>
                  <PieChart
                    series={[
                      {
                        data: emailStatusData,
                        highlightScope: { fade: 'global', highlight: 'item' }
                      },
                    ]}
                    height={200}
                  />
                </Box>
              ) : (
                <Typography color="text.secondary">No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Inbox vs Spam
              </Typography>
              {analytics.totalSent > 0 ? (
                <Box height={200}>
                  <PieChart
                    series={[
                      {
                        data: spamInboxData,
                        highlightScope: { fade: 'global', highlight: 'item' }
                      },
                    ]}
                    height={200}
                  />
                </Box>
              ) : (
                <Typography color="text.secondary">No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Email Stats Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Opened
                  </Typography>
                  <Typography variant="h6">{analytics.totalOpened}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Replied
                  </Typography>
                  <Typography variant="h6">{analytics.totalReplied}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total In Spam
                  </Typography>
                  <Typography variant="h6">{analytics.totalInSpam}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Moved From Spam
                  </Typography>
                  <Typography variant="h6">{analytics.totalMovedFromSpam}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailTrackingAnalytics; 