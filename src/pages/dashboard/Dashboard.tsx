import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, MailOpen, MessageSquare, ThumbsUp, AlertTriangle, Info, BarChart3 } from 'lucide-react';
import * as S from './Dashboard.styled';

interface MetricData {
  emailsSent: number;
  opened: number;
  replied: number;
  positiveReply: number;
  bounced: number;
  leadsCount: number;
  openRate: number;
  replyRate: number;
  positiveReplyRate: number;
  bounceRate: number;
}

interface ChartDataPoint {
  date: string;
  emailSent: number;
  emailOpened: number;
  replied: number;
  positiveReplied: number;
  bounced: number;
  unsubscribed: number;
}

const CHART_COLORS = {
  emailSent: '#3b82f6',
  emailOpened: '#a855f7',
  replied: '#14b8a6',
  positiveReplied: '#22c55e',
  bounced: '#ef4444',
  unsubscribed: '#f59e0b',
};

const LEGEND_ITEMS = [
  { key: 'emailSent', label: 'Email Sent', color: CHART_COLORS.emailSent },
  { key: 'emailOpened', label: 'Email Opened', color: CHART_COLORS.emailOpened },
  { key: 'replied', label: 'Replied', color: CHART_COLORS.replied },
  { key: 'positiveReplied', label: 'Positive Replied', color: CHART_COLORS.positiveReplied },
  { key: 'bounced', label: 'Bounced', color: CHART_COLORS.bounced },
  { key: 'unsubscribed', label: 'Unsubscribed', color: CHART_COLORS.unsubscribed },
];

// Mock data - replace with actual API call
const mockMetrics: MetricData = {
  emailsSent: 178,
  opened: 108,
  replied: 0,
  positiveReply: 0,
  bounced: 0,
  leadsCount: 178,
  openRate: 60.67,
  replyRate: 0.0,
  positiveReplyRate: 0.0,
  bounceRate: 0.0,
};

const mockChartData: ChartDataPoint[] = [
  { date: '17 Dec', emailSent: 100, emailOpened: 68, replied: 0, positiveReplied: 0, bounced: 0, unsubscribed: 0 },
  { date: '18 Dec', emailSent: 78, emailOpened: 41, replied: 0, positiveReplied: 0, bounced: 0, unsubscribed: 0 },
  { date: '19 Dec', emailSent: 1, emailOpened: 0, replied: 0, positiveReplied: 0, bounced: 0, unsubscribed: 0 },
  { date: '20 Dec', emailSent: 0, emailOpened: 0, replied: 0, positiveReplied: 0, bounced: 0, unsubscribed: 0 },
];

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace with actual API calls
        await new Promise((resolve) => setTimeout(resolve, 800));
        setMetrics(mockMetrics);
        setChartData(mockChartData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatPercent = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <S.PageContainer>
        <S.LoadingContainer>
          <S.Spinner />
        </S.LoadingContainer>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.MetricsGrid>
        <S.MetricCard $variant="blue">
          <S.MetricHeader $variant="blue">
            <Mail />
            <span>Emails Sent</span>
            <Info className="info-icon" />
          </S.MetricHeader>
          <S.MetricValue $variant="blue">{formatNumber(metrics?.emailsSent || 0)}</S.MetricValue>
          <S.MetricSubtext>
            {formatNumber(metrics?.leadsCount || 0)} Leads (Active + Inactive)
          </S.MetricSubtext>
        </S.MetricCard>

        <S.MetricCard $variant="purple">
          <S.MetricHeader $variant="purple">
            <MailOpen />
            <span>Opened</span>
            <Info className="info-icon" />
          </S.MetricHeader>
          <S.MetricValue $variant="purple">{formatNumber(metrics?.opened || 0)}</S.MetricValue>
          <S.MetricSubtext>
            <strong>{formatPercent(metrics?.openRate || 0)}</strong> Open Rate
          </S.MetricSubtext>
        </S.MetricCard>

        <S.MetricCard $variant="teal">
          <S.MetricHeader $variant="teal">
            <MessageSquare />
            <span>Replied</span>
            <Info className="info-icon" />
          </S.MetricHeader>
          <S.MetricValue $variant="teal">{formatNumber(metrics?.replied || 0)}</S.MetricValue>
          <S.MetricSubtext>
            <strong>{formatPercent(metrics?.replyRate || 0)}</strong> Reply Rate
          </S.MetricSubtext>
        </S.MetricCard>

        <S.MetricCard $variant="green">
          <S.MetricHeader $variant="green">
            <ThumbsUp />
            <span>Positive Reply</span>
            <Info className="info-icon" />
          </S.MetricHeader>
          <S.MetricValue $variant="green">{formatNumber(metrics?.positiveReply || 0)}</S.MetricValue>
          <S.MetricSubtext>
            <strong>{formatPercent(metrics?.positiveReplyRate || 0)}</strong> Positive Reply Rate
          </S.MetricSubtext>
        </S.MetricCard>

        <S.MetricCard $variant="red">
          <S.MetricHeader $variant="red">
            <AlertTriangle />
            <span>Bounced</span>
            <Info className="info-icon" />
          </S.MetricHeader>
          <S.MetricValue $variant="red">{formatNumber(metrics?.bounced || 0)}</S.MetricValue>
          <S.MetricSubtext>
            <strong>{formatPercent(metrics?.bounceRate || 0)}</strong> Bounce Rate
          </S.MetricSubtext>
        </S.MetricCard>
      </S.MetricsGrid>

      <S.ChartSection>
        <S.ChartHeader>
          <h2>Email Engagement Metrics</h2>
          <Info className="info-icon" />
        </S.ChartHeader>
        <S.ChartSubtext>The data is displayed in <strong>Etc/GMT(UTC)</strong></S.ChartSubtext>

        {chartData.length === 0 ? (
          <S.EmptyState>
            <BarChart3 />
            <p>No engagement data available</p>
          </S.EmptyState>
        ) : (
          <>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                  />
                  <Bar dataKey="emailSent" fill={CHART_COLORS.emailSent} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="emailOpened" fill={CHART_COLORS.emailOpened} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="replied" fill={CHART_COLORS.replied} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="positiveReplied" fill={CHART_COLORS.positiveReplied} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bounced" fill={CHART_COLORS.bounced} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="unsubscribed" fill={CHART_COLORS.unsubscribed} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </S.ChartContainer>

            <S.CustomLegend>
              {LEGEND_ITEMS.map((item) => (
                <S.LegendItem key={item.key}>
                  <S.LegendDot $color={item.color} />
                  <span>{item.label}</span>
                </S.LegendItem>
              ))}
            </S.CustomLegend>
          </>
        )}
      </S.ChartSection>
    </S.PageContainer>
  );
};

export default Dashboard;

