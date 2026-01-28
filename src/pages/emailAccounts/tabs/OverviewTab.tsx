import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useTheme } from 'styled-components';
import { emailAccountService } from '../../../services/email.account.service';
import {
  OverviewContainer,
  SummarySection,
  SectionTitle,
  MetricsGrid,
  MetricCard,
  TwoColumnGrid,
  StatusCard,
  PerformanceCard,
  PerformanceBadge,
  NoteBox,
  ChartsContainer,
  ChartBox,
  PieStats,
  PieStat,
} from './OverviewTab.styled';

interface OverviewTabProps {
  accountId: string;
  emailAccount: any;
}

interface WarmupStats {
  sent: number;
  inbox: number;
  spam: number;
  received: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ accountId, emailAccount }) => {
  const theme = useTheme();
  const [stats, setStats] = useState<WarmupStats>({
    sent: 0,
    inbox: 0,
    spam: 0,
    received: 0,
  });
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const [barChartData, setBarChartData] = useState<{ name: string; sent: number; replied: number }[]>([]);
  const [metrics, setMetrics] = useState<{ name: string; value: number; color: string }[]>([]);
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!accountId) return;
      setIsLoading(true);
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const response = await emailAccountService.getWarmupStats(accountId, startDate, endDate);
        if (response.code === 200 && response.data?.statistics) {
          const { statistics } = response.data;
          setStats({
            sent: statistics.warmupEmailsSent ?? 0,
            inbox: statistics.landedInInbox ?? 0,
            spam: statistics.savedFromSpam ?? 0,
            received: statistics.emailsReceived ?? 0,
          });

          setPieData([
            { name: 'Landed in inbox', value: statistics.landedInInbox ?? 0 },
            { name: 'Saved from spam', value: statistics.savedFromSpam ?? 0 },
          ]);
          setBarChartData([
            { name: startDate.toLocaleDateString(), sent: statistics.warmupEmailsSent ?? 0, replied: statistics.replies ?? 0 },
            { name: endDate.toLocaleDateString(), sent: statistics.warmupEmailsSent ?? 0, replied: statistics.replies ?? 0 },
          ]);
          setMetrics([
            { value: statistics.warmupEmailsSent ?? 0, name: 'Warmup emails sent', color: theme.colors.primary.main },
            { value: statistics.landedInInbox ?? 0, name: 'Landed in inbox', color: theme.colors.success.main },
            { value: statistics.savedFromSpam ?? 0, name: 'Saved from spam', color: theme.colors.error.main },
            { value: statistics.emailsReceived ?? 0, name: 'Emails received', color: theme.colors.warning.main },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch warmup stats:', error);
        // Use default stats
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [accountId]);

  const inboxPercentage = stats.sent > 0 ? Math.round((stats.inbox / stats.sent) * 100) : 0;
  const performanceType = inboxPercentage >= 95 ? 'super' : inboxPercentage >= 80 ? 'good' : 'poor';

  return (
    <OverviewContainer>
      <SummarySection>
        <SectionTitle>Summary (last 7 days)</SectionTitle>
        <MetricsGrid>
          {metrics.map((metric, index) => (
            <MetricCard key={index} $color={metric.color}>
              <div className="value">{metric.value}</div>
              <div className="label">{metric.name}</div>
            </MetricCard>
          ))}
        </MetricsGrid>
      </SummarySection>

      <TwoColumnGrid>
        <PerformanceCard>
          <h3>Email Performance</h3>
          <PerformanceBadge $type={performanceType}>
            {performanceType === 'super' ? 'Super' : performanceType === 'good' ? 'Good' : 'Needs Improvement'}
          </PerformanceBadge>
          <p style={{ color: theme.colors.text.secondary, fontSize: '14px', margin: 0 }}>
            {inboxPercentage}% of your warmup emails landed in inbox
          </p>
        </PerformanceCard>

        <PerformanceCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>Outbound Status</h3>
            <AlertCircle size={20} style={{ color: theme.colors.text.tertiary }} />
          </div>
          <StatusCard $variant="success">
            <CheckCircle2 size={24} className="icon" />
            <div className="content">
              <h4>2 weeks warm-up period successfully done</h4>
              <p>2 weeks of warm-up period is successfully done, you could start to use the mailbox for outbound purpose.</p>
            </div>
          </StatusCard>
        </PerformanceCard>
      </TwoColumnGrid>

      {emailAccount?.warmup?.autoAdjust && (
        <NoteBox>
          <p>
            <strong>Note:</strong> Auto-adjust warmup activated. You will be sending a maximum of {emailAccount?.warmup?.maxPerDay || 10} warmup mails per day
          </p>
        </NoteBox>
      )}

      <ChartsContainer>
        <ChartBox>
          <h3>Inbox vs Spam</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill={theme.colors.success.main} />
                <Cell fill={theme.colors.error.main} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <PieStats>
            <PieStat>
              <div className="indicator" style={{ background: theme.colors.success.main }} />
              <div className="info">
                <div className="value">{inboxPercentage}% ({stats.inbox})</div>
                <div className="label">Landed in inbox</div>
              </div>
            </PieStat>
            <PieStat>
              <div className="indicator" style={{ background: theme.colors.error.main }} />
              <div className="info">
                <div className="value">{100 - inboxPercentage}% ({stats.spam})</div>
                <div className="label">Saved from spam</div>
              </div>
            </PieStat>
          </PieStats>
        </ChartBox>

        <ChartBox>
          <h3>Warmup emails sent</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.light} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" stackId="a" fill={theme.colors.primary.main} name="Sent" />
              <Bar dataKey="replied" stackId="a" fill={theme.colors.secondary.main} name="Replied" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>
    </OverviewContainer>
  );
};

export default OverviewTab;

