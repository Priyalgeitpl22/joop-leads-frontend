import { Grid2, Tooltip, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
} from "recharts";
import {
  ContentContainer,
  MetricCard,
  GraphContainer,
  SideCard,
} from "./home.styled";

const metricStyles = [
  { label: "Total Leads", value: 60, borderColor: "var(--title-color)" },
  { label: "Total Sent", value: 16, borderColor: "var(--success-color)" },
  { label: "Unique Replied", value: 42, borderColor: "var(--warning-color)" },
  { label: "Positive Replies", value: 64, borderColor: "var(--icon-selected)" },
  { label: "Unique Bounced", value: 18, borderColor: "var(--error-color)" },
];

const data = [
  { name: "1", today: 10, yesterday: 5 },
  { name: "5", today: 30, yesterday: 20 },
  { name: "10", today: 50, yesterday: 30 },
  { name: "15", today: 40, yesterday: 45 },
  { name: "20", today: 60, yesterday: 50 },
];

const Home = () => {
  return (
    <ContentContainer>
      <Grid2 container spacing={2}>
        {metricStyles.map((metric) => (
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }} key={metric.label}>
            <MetricCard borderColor={metric.borderColor}>
              <Box display="flex" alignItems="center">
                <Box>{metric.label}</Box>
                <Tooltip title={`Info about ${metric.label}`}>
                  <InfoOutlinedIcon
                    fontSize="small"
                    style={{ marginLeft: 4, color: "var(--info-color)" }}
                  />
                </Tooltip>
              </Box>
              <Box fontSize="xx-large">
                <b>{metric.value}</b>
              </Box>
            </MetricCard>
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <GraphContainer>
            <Box>Leads Overview</Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="today"
                  stroke="var(--primary-color)"
                  fill="#c7ddf7"
                />
                <Area
                  type="monotone"
                  dataKey="yesterday"
                  stroke="var(--text-light)"
                  fill="var(--border-grey)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GraphContainer>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <SideCard>
            <Box>
              <strong>Booked:</strong>{" "}
              <span style={{ color: "var(--primary-color)" }}>321</span>
            </Box>
            <Box>
              <strong>Delivered:</strong> 05
            </Box>
            <Box>
              <strong>Accepted:</strong> 5
            </Box>
            <Box>
              <strong>Rejected:</strong> 0
            </Box>
            <Box>
              <strong>Over Delivered:</strong> 01
            </Box>
            <Box>
              <strong>Remaining:</strong> 317
            </Box>
          </SideCard>
        </Grid2>
      </Grid2>
    </ContentContainer>
  );
};

export default Home;
