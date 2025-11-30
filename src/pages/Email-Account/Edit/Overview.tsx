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
} from "recharts";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  ChartBox,
  ChartsContainer,
  MetricCard,
  MetricsGrid,
  NoteBox,
  NoteContent,
  OverviewSummary,
  PerformanceHeader,
  PieStat,
  PieStats,
  PieStatBar,
  PieStatContent,
  PieStatNumbers,
  PieStatLabel,
  StatusCard,
  TwoColumn,
  SectionSubTitle,
} from "./styled";
import { Box, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import { Container, ReloadButton } from "../../../styles/global.styled";
import {
  EmailAccount,
  trackDeliveryStatus,
  WarmUpStatsStatistics,
  getWarmupStats as getWarmupStatsAction,
} from "../../../redux/slice/emailAccountSlice";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import toast from "react-hot-toast";

interface MetricCardData {
  value: string | number;
  label: string;
  color: string;
}

interface ChartDataItem {
  name: string;
  sent: number;
  replied: number;
  savedFromSpam: number;
}

interface RecentEmail {
  date?: string | Date;
  createdAt?: string | Date;
  sent?: boolean;
  replied?: boolean;
  savedFromSpam?: boolean;
  status?: string;
  type?: string;
  hasReply?: boolean;
  fromSpam?: boolean;
  [key: string]: unknown;
}

const COLORS = {
  inbox: "var(--success-color)",
  spam: "var(--error-color)",
};

const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

const EmailAccountOverview = ({
  emailAccount,
}: {
  emailAccount: EmailAccount;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const warmUpStats = useSelector(
    (state: RootState) => state.emailAccount?.warmUpStats
  );
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<WarmUpStatsStatistics | null>(
    warmUpStats?.statistics || null
  );

  const metrics: MetricCardData[] = useMemo(() => {
    if (!statistics) {
      return [
        { value: 0, label: "Warmup emails sent", color: "#6366f1" },
        { value: 0, label: "Landed in inbox", color: COLORS.inbox },
        { value: 0, label: "Saved from spam", color: COLORS.spam },
        { value: 0, label: "Emails received", color: "var(--warning-color)" },
      ];
    }

    return [
      {
        value: formatNumber(statistics.warmupEmailsSent || 0),
        label: "Warmup emails sent",
        color: "#6366f1",
      },
      {
        value: formatNumber(statistics.landedInInbox || 0),
        label: "Landed in inbox",
        color: COLORS.inbox,
      },
      {
        value: formatNumber(statistics.savedFromSpam || 0),
        label: "Saved from spam",
        color: COLORS.spam,
      },
      {
        value: formatNumber(statistics.emailsReceived || 0),
        label: "Emails received",
        color: "var(--warning-color)",
      },
    ];
  }, [statistics]);

  const barChartData: ChartDataItem[] = useMemo(() => {
    if (!statistics) {
      return [];
    }

    const recentEmails = (warmUpStats?.recentEmails || []) as RecentEmail[];

    // If we have recent emails, group them by date
    if (recentEmails.length > 0) {
      const groupedByDate = recentEmails.reduce(
        (acc: Record<string, ChartDataItem>, email: RecentEmail) => {
          try {
            const date = new Date(email.date || email.createdAt || Date.now());
            const dateKey = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });

            if (!acc[dateKey]) {
              acc[dateKey] = {
                name: dateKey,
                sent: 0,
                replied: 0,
                savedFromSpam: 0,
              };
            }

            // Count emails based on their properties
            acc[dateKey].sent +=
              email.sent || email.status === "sent" || email.type === "sent"
                ? 1
                : 0;
            acc[dateKey].replied +=
              email.replied || email.status === "replied" || email.hasReply
                ? 1
                : 0;
            acc[dateKey].savedFromSpam +=
              email.savedFromSpam || email.status === "saved" || email.fromSpam
                ? 1
                : 0;
          } catch {
            // Skip invalid dates
          }

          return acc;
        },
        {}
      );

      const sortedData = Object.values(groupedByDate)
        .sort((a, b) => {
          try {
            return new Date(a.name).getTime() - new Date(b.name).getTime();
          } catch {
            return 0;
          }
        })
        .slice(-7);

      // Return sorted data if we have any, otherwise fall through to totals
      if (sortedData.length > 0) {
        return sortedData;
      }
    }

    // Fallback: Create daily breakdown from totals
    const totalSent = statistics.warmupEmailsSent || 0;
    const totalReplied = statistics.replies || 0;
    const totalSavedFromSpam = statistics.savedFromSpam || 0;

    // If we have data, create a simple daily breakdown for the last 7 days
    if (totalSent > 0 || totalReplied > 0 || totalSavedFromSpam > 0) {
      const days = [];
      const today = new Date();

      // Generate last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });

        // Distribute totals across days (simple average)
        const avgSent = Math.round(totalSent / 7);
        const avgReplied = Math.round(totalReplied / 7);
        const avgSaved = Math.round(totalSavedFromSpam / 7);

        days.push({
          name: dateKey,
          sent: i === 0 ? totalSent - avgSent * 6 : avgSent, // Put remainder on last day
          replied: i === 0 ? totalReplied - avgReplied * 6 : avgReplied,
          savedFromSpam: i === 0 ? totalSavedFromSpam - avgSaved * 6 : avgSaved,
        });
      }

      return days;
    }

    return [];
  }, [statistics, warmUpStats?.recentEmails]);

  const pieData = useMemo(() => {
    if (!statistics) {
      return [
        { name: "Landed in inbox", value: 0 },
        { name: "Saved from spam", value: 0 },
      ];
    }

    const inboxCount = statistics.landedInInbox || 0;
    const spamCount = statistics.savedFromSpam || 0;

    return [
      { name: "Landed in inbox", value: inboxCount },
      { name: "Saved from spam", value: spamCount },
    ];
  }, [statistics]);

  const pieStats = useMemo(() => {
    if (!statistics) {
      return {
        inboxPercentage: 0,
        inboxCount: 0,
        spamPercentage: 0,
        spamCount: 0,
      };
    }

    const inboxCount = statistics.landedInInbox || 0;
    const spamCount = statistics.savedFromSpam || 0;
    const total = inboxCount + spamCount;

    return {
      inboxPercentage: calculatePercentage(inboxCount, total),
      inboxCount,
      spamPercentage: calculatePercentage(spamCount, total),
      spamCount,
    };
  }, [statistics]);

  const fetchWarmupStats = useCallback(async () => {
    if (!emailAccount?._id) return;

    try {
      setLoading(true);
      const response = await dispatch(
        getWarmupStatsAction({
          id: emailAccount._id,
          startDate: null,
          endDate: null,
        })
      ).unwrap();
      setStatistics(response.statistics);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Failed to get warmup stats";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [emailAccount?._id, dispatch]);

  useEffect(() => {
    if (emailAccount?._id) {
      fetchWarmupStats();
    }
  }, [emailAccount?._id, fetchWarmupStats]);

  const handleTrackDeliveryStatus = async () => {
    if (!emailAccount?._id) return;

    setLoading(true);
    try {
      await dispatch(
        trackDeliveryStatus({ id: emailAccount._id || "", hours: 24 })
      ).unwrap();
      toast.success("Delivery status tracked successfully");
      // Refresh stats after tracking
      await fetchWarmupStats();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Failed to track delivery status";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <OverviewSummary>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <SectionSubTitle>Summary (last 7 days)</SectionSubTitle>
          <ReloadButton onClick={handleTrackDeliveryStatus}>
            {loading ? <CircularProgress size={20} /> : <RefreshOutlinedIcon />}
          </ReloadButton>
        </div>
        <MetricsGrid>
          {metrics.map((metric, index) => (
            <MetricCard key={index}>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <div
                  style={{
                    color: metric.color,
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {metric.value}
                </div>
              )}
              <div style={{ fontSize: "12px", fontWeight: "500" }}>
                {metric.label}
              </div>
            </MetricCard>
          ))}
        </MetricsGrid>
      </OverviewSummary>

      <TwoColumn>
        <div>
          <SectionSubTitle>Email Performance</SectionSubTitle>
          <StatusCard>
            <PerformanceHeader>
              <span>Super</span>
            </PerformanceHeader>
            <p>
              {statistics?.emailPerformance || 0}% of your warmup emails landed
              in inbox
            </p>
          </StatusCard>
        </div>

        <div>
          <SectionSubTitle
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            Outbound Status
            <AlertCircle size={14} />
          </SectionSubTitle>
          <StatusCard>
            <CheckCircle2 size={14} />
            <div>
              <p>
                {statistics?.outboundStatus?.delivered
                  ? `${statistics.outboundStatus.delivered} weeks warm-up period successfully done`
                  : "Warm-up period in progress Continue the warm-up process to improve your email deliverability."}
              </p>
            </div>
          </StatusCard>
        </div>
      </TwoColumn>

      <NoteBox>
        <NoteContent>
          <p>
            <strong>Note:</strong> Auto-adjust warmup activated. You will be
            sending a maximum of 10 warmup mails per day
          </p>
        </NoteContent>
      </NoteBox>

      <ChartsContainer>
        <ChartBox>
          <SectionSubTitle>Inbox vs Spam</SectionSubTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                minWidth: isMobile ? "100%" : "150px",
              }}
            >
              <ResponsiveContainer width="100%" height={isMobile ? 250 : 120}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 50 : 40}
                    outerRadius={isMobile ? 80 : 60}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill="var(--success-color)" />
                    <Cell fill="var(--error-color)" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                paddingTop: isMobile ? "20px" : "0",
              }}
            >
              <PieStats>
                <PieStat>
                  <PieStatBar color="var(--success-color)" />
                  <PieStatContent>
                    <PieStatNumbers color="var(--success-color)">
                      <span className="percentage">
                        {pieStats.inboxPercentage}%
                      </span>
                      <span className="count">({pieStats.inboxCount})</span>
                    </PieStatNumbers>
                    <PieStatLabel>Landed from inbox</PieStatLabel>
                  </PieStatContent>
                </PieStat>
                <PieStat>
                  <PieStatBar color="var(--error-color)" />
                  <PieStatContent>
                    <PieStatNumbers color="var(--error-color)">
                      <span className="percentage">
                        {pieStats.spamPercentage}%
                      </span>
                      <span className="count">({pieStats.spamCount})</span>
                    </PieStatNumbers>
                    <PieStatLabel>Saved from spam</PieStatLabel>
                  </PieStatContent>
                </PieStat>
              </PieStats>
            </Box>
          </Box>
        </ChartBox>

        <ChartBox>
          <SectionSubTitle>Warmup email sent</SectionSubTitle>
          <Box mt={3}>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 125}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: isMobile ? 12 : 10 }} />
                <YAxis tick={{ fontSize: isMobile ? 12 : 10 }} />
                <Tooltip />
                <Legend 
                  wrapperStyle={{ fontSize: isMobile ? "14px" : "11px" }}
                  iconSize={isMobile ? 14 : 12}
                />
                <Bar dataKey="sent" stackId="a" fill="#3b82f6" name="Sent" />
                <Bar
                  dataKey="replied"
                  stackId="a"
                  fill="#ec4899"
                  name="Replied"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </ChartBox>
      </ChartsContainer>
    </Container>
  );
};

export default EmailAccountOverview;
