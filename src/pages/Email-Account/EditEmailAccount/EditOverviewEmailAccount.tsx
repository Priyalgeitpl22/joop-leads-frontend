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
  NoteBorder,
  NoteBox,
  NoteContent,
  OutboundHeader,
  OverviewContainer,
  OverviewSummary,
  PerformanceHeader,
  PieStat,
  PieStats,
  SectionTitle,
  StatusCard,
  TwoColumn,
} from "./EditOverviewEmailAccount.styled";
import { Box } from "@mui/material";

interface MetricCard {
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

const EditOverviewEmailAccount = () => {
  const metrics: MetricCard[] = [
    { value: "150", label: "Warmup emails sent", color: "#6366f1" },
    { value: "149", label: "Landed in inbox", color: "var(--success-color)" },
    { value: "1", label: "Saved from spam", color: "var(--error-color)" },
    { value: "23", label: "Emails received", color: "var(--warning-color)" },
  ];

  const barChartData: ChartDataItem[] = [
    { name: "20 Nov", sent: 19, replied: 5, savedFromSpam: 0 },
    { name: "21 Nov", sent: 18, replied: 5, savedFromSpam: 0 },
    { name: "22 Nov", sent: 13, replied: 4, savedFromSpam: 0 },
    { name: "23 Nov", sent: 31, replied: 8, savedFromSpam: 0 },
    { name: "24 Nov", sent: 19, replied: 7, savedFromSpam: 0 },
    { name: "25 Nov", sent: 22, replied: 4, savedFromSpam: 0 },
    { name: "26 Nov", sent: 25, replied: 8, savedFromSpam: 0 },
    { name: "27 Nov", sent: 3, replied: 0, savedFromSpam: 0 },
  ];

  const pieData = [
    { name: "Landed in inbox", value: 149 },
    { name: "Saved from spam", value: 1 },
  ];

  return (
    <OverviewContainer>
      <OverviewSummary>
        <SectionTitle>Summary (last 7 days)</SectionTitle>
        <MetricsGrid>
          {metrics.map((metric) => (
            <MetricCard>
              <div style={{ color: metric.color }}>{metric.value}</div>
              <div>{metric.label}</div>
            </MetricCard>
          ))}
        </MetricsGrid>
      </OverviewSummary>

      <TwoColumn>
        <div>
          <SectionTitle>Email Performance</SectionTitle>
          <StatusCard>
            <PerformanceHeader>
              <span>Super</span>
            </PerformanceHeader>
            <p>99% of your warmup emails landed in inbox</p>
          </StatusCard>
        </div>

        <div>
          <OutboundHeader>
            <h3>Outbound Status</h3>
            <AlertCircle size={20} />
          </OutboundHeader>
          <StatusCard>
            <CheckCircle2 size={20} />
            <div>
              <p>2 weeks warm-up period successfully done</p>
              <p>
                2 weeks of warm-up period is successfully done, you could start
                to use the mailbox for outbound purpose.
              </p>
            </div>
          </StatusCard>
        </div>
      </TwoColumn>

      <NoteBox>
        <NoteBorder></NoteBorder>
        <NoteContent>
          <p>
            <strong>Note:</strong> Auto-adjust warmup activated. You will be
            sending a maximum of 10 warmup mails per day
          </p>
        </NoteContent>
      </NoteBox>

      <ChartsContainer>
        <ChartBox>
          <h3>Inbox vs Spam</h3>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill="var(--success-color)" />
                <Cell fill="var(--error-color)" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <PieStats>
            <PieStat>
              <div style={{ background: "var(--success-color)" }}></div>
              <div>
                <p>99% (149)</p>
                <p>Landed from inbox</p>
              </div>
            </PieStat>
            <PieStat>
              <div style={{ background: "var(--error-color)" }}></div>
              <div>
                <p>1% (1)</p>
                <p>Saved from spam</p>
              </div>
            </PieStat>
          </PieStats>
        </ChartBox>

        <ChartBox>
          <h3>Warmup email sent</h3>
          <Box mt={3}>
            <ResponsiveContainer width="100%" height={370}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
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
    </OverviewContainer>
  );
};

export default EditOverviewEmailAccount;
