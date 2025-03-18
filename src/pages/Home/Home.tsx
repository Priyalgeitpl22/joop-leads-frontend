import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tooltip, CircularProgress, Grid2 } from "@mui/material";
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
  MetricCard1
} from "./home.styled";
import { DashboardDetails } from "../../redux/slice/dashboardSlice";
import { AppDispatch, RootState } from "../../redux/store/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    console.log("Fetching Dashboard Details...");
    dispatch(DashboardDetails());
  }, [dispatch]);

  const metrics = [
    {
      label: "Total Leads",
      value: dashboardData?.total_leads || 0,
      borderColor: "var(--title-color)",
    },
    {
      label: "Total Sent",
      value: dashboardData?.total_sent_count || 0,
      borderColor: "var(--warning-color)",
    },
    {
      label: "Total Completed",
      value: dashboardData?.total_completed_campaigns || 0,
      borderColor: "var(--success-color)",
    },
    {
      label: "Total Scheduled",
      value: dashboardData?.total_scheduled_campaigns || 0,
      borderColor: "var(--info-color)",
    },
  ];

  const data = [
    { name: "1", today: 10, yesterday: 5 },
    { name: "5", today: 30, yesterday: 20 },
    { name: "10", today: 50, yesterday: 30 },
    { name: "15", today: 40, yesterday: 45 },
    { name: "20", today: 60, yesterday: 50 },
  ];

  return (
    <ContentContainer>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box>Error: {error}</Box>
      ) : (
        <>
          <Grid2 container spacing={2}>
            {metrics.map((metric) => (
              <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={metric.label}>
                <MetricCard borderColor={metric.borderColor}>
                  <Box display="flex" alignItems="center">
                    <strong>{metric.label}</strong>{" "}
                    <Tooltip title={`Info about ${metric.label}`}>
                      <InfoOutlinedIcon
                        fontSize="small"
                        style={{ marginLeft: 4, color: "var(--info-color)" }}
                      />
                    </Tooltip>
                  </Box>
                  <Box>{metric.value}</Box>
                </MetricCard>
              </Grid2>
            ))}
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <GraphContainer>
                <Box>Leads Overview</Box>
                <ResponsiveContainer width="100%" height={330}>
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

            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                {[
                  {
                    label: "Total Draft",
                    value: dashboardData?.total_drafted_campaigns,
                    color: "#df1dd5",
                  },
                  {
                    label: "Total Running",
                    value: dashboardData?.total_running_campaigns,
                    color: "#58b4b0",
                  },
                  {
                    label: "Total Paused",
                    value: dashboardData?.total_paused_campaigns,
                    color: "#ff5722",
                  },
                  {
                    label: "Total Bounced",
                    value: dashboardData?.total_bounced_count,
                    color: "#f34c6f",
                  },
                ].map((metric) => (
                  <MetricCard1
                    key={metric.label}
                    borderColor={metric.color}
                    sx={{ width: "100%" }}
                  >
                    <strong>{metric.label}</strong>
                    <span>{metric.value || 0}</span>
                  </MetricCard1>
                ))}
              </Box>
            </Grid2>
          </Grid2>
        </>
      )}
    </ContentContainer>
  );
};

export default Home;
