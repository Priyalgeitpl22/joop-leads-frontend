import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
  Pencil,
  PlayCircle,
  PauseCircle,
  AlertTriangle,
  BarChart3,
  Send,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

import { DashboardDetails } from "../../redux/slice/dashboardSlice";
import { AppDispatch, RootState } from "../../redux/store/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(DashboardDetails());
  }, [dispatch]);

  const metrics = [
    {
      label: "Total Leads",
      value: dashboardData?.total_leads || 0,
      color: "#00BCD4",
      bgColor: "#E0F7FA",
      borderColor: "#B2EBF2",
      icon: <BarChart3 size={22} />,
    },
    {
      label: "Total Sent",
      value: dashboardData?.total_sent_count || 0,
      color: "#FFA726",
      bgColor: "#FFE0B2",
      borderColor: "#FFB74D",
      icon: <Send size={22} />,
    },
    {
      label: "Total Completed",
      value: dashboardData?.total_completed_campaigns || 0,
      color: "#66BB6A",
      bgColor: "#E8F5E9",
      borderColor: "#A5D6A7",
      icon: <CheckCircle2 size={22} />,
    },
    {
      label: "Total Scheduled",
      value: dashboardData?.total_scheduled_campaigns || 0,
      color: "#AB47BC",
      bgColor: "#F3E5F5",
      borderColor: "#CE93D8",
      icon: <CalendarCheck size={22} />,
    },
  ];

  const statusMetrics = [
    {
      label: "Total Draft",
      value: dashboardData?.total_drafted_campaigns || 0,
      color: "#EC407A",
      bgColor: "#FCE4EC",
      icon: <Pencil size={22} />,
    },
    {
      label: "Total Running",
      value: dashboardData?.total_running_campaigns || 0,
      color: "#00BCD4",
      bgColor: "#E0F7FA",
      icon: <PlayCircle size={22} />,
    },
    {
      label: "Total Paused",
      value: dashboardData?.total_paused_campaigns || 0,
      color: "#FF7043",
      bgColor: "#FFEBEE",
      icon: <PauseCircle size={22} />,
    },
    {
      label: "Total Bounced",
      value: dashboardData?.total_bounced_count || 0,
      color: "#EF5350",
      bgColor: "#FFEBEE",
      icon: <AlertTriangle size={22} />,
    },
  ];

  const graphData = dashboardData?.graph_data || [];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundColor: "blue",
        }}
      >
        <CircularProgress sx={{ color: "#667eea" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#FEE2E2",
            border: "1px solid #FECACA",
            borderRadius: "12px",
          }}
        >
          <Typography color="error">Error: {error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#F9FAFB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 3,
          }}
        >
          {metrics.map((m) => (
            <Box
              key={m.label}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 18px)" },
                minWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
              }}
            >
              <Card
                sx={{
                  background: "#FFFFFF",
                  border: `2px solid ${m.borderColor}`,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    borderColor: m.color,
                  },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontWeight: 500,
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {m.label}
                    </Typography>

                    <Typography
                      sx={{ fontSize: "20px", opacity: 0.8, color: m.color }}
                    >
                      {m.icon}
                    </Typography>
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {m.value.toLocaleString()}
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{ color: m.color }}
                  >
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="caption" sx={{ fontSize: "12px" }}>
                      Updated today
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "78% 20%",
            gap: 3,
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: "70%", md: 0 },
            }}
          >
            <Card
              sx={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "16px" }}>
                  Leads Overview
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  Performance metrics over time
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={graphData}>
                    <defs>
                      <linearGradient
                        id="colorToday"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#667eea"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#667eea"
                          stopOpacity={0}
                        />
                      </linearGradient>

                      <linearGradient
                        id="colorYesterday"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#E5E7EB"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E5E7EB"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E5E7EB"
                      vertical={false}
                    />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />

                    <ChartTooltip
                      contentStyle={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="today"
                      stroke="#667eea"
                      fill="url(#colorToday)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="yesterday"
                      stroke="#D1D5DB"
                      fill="url(#colorYesterday)"
                      strokeWidth={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1" },
              minWidth: { xs: "25%", md: 0 },
            }}
          >
            <Stack spacing={2}>
              {statusMetrics.map((m) => (
                <Card
                  key={m.label}
                  sx={{
                    background: "#FFFFFF",
                    border: `2px solid ${m.bgColor}`,
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", fontWeight: 500 }}
                        >
                          {m.label}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, color: m.color }}
                        >
                          {m.value.toLocaleString()}
                        </Typography>
                      </Box>

                      <Typography sx={{ fontSize: "32px", opacity: 0.7 }}>
                        {m.icon}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
