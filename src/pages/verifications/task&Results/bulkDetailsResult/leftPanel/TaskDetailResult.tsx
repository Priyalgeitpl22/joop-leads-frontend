import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  CardContainer,
  Header,
  TaskTitle,
  InfoGrid,
  InfoColumn,
  SectionTitle,
  ContentWrapper,
  ChartWrapper,
  LegendWrapper,
  LegendItem,
  ColorBox,
  CenterLabel,
} from "./TaskDetailResult.styled";
import {
  emailVerificationService,
  type BatchDetails,
  type BatchStatistics,
} from "../../../../../services/email.verification.service";

const CHART_CATEGORIES = [
  { key: "safe", name: "Safe (Valid)", color: "#6DBE45" },
  { key: "role", name: "Role (Valid)", color: "#9BBE3F" },
  { key: "catchAll", name: "Catch All", color: "#F5B400" },
  { key: "disposable", name: "Disposable", color: "#F7A400" },
  { key: "inboxFull", name: "Inbox Full", color: "#F57C00" },
  { key: "spamTrap", name: "Spam Trap", color: "#F4511E" },
  { key: "disabled", name: "Disabled", color: "#FF3B30" },
  { key: "invalid", name: "Invalid", color: "#E53935" },
  { key: "unknown", name: "Unknown", color: "#9E9E9E" },
];

function formatDate(value: string | undefined): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? value : d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return value;
  }
}

function buildChartData(stats: BatchStatistics | null, batch: BatchDetails | null): { name: string; value: number; color: string }[] {
  const stat = stats as Record<string, unknown> | null;
  if (stat && typeof stat === "object") {
    const hasBreakdown = CHART_CATEGORIES.some((c) => c.key in stat && typeof (stat as Record<string, number>)[c.key] === "number");
    if (hasBreakdown) {
      return CHART_CATEGORIES.map((c) => ({
        name: c.name,
        value: Number((stat as Record<string, number>)[c.key]) || 0,
        color: c.color,
      }));
    }
  }
  const total = batch?.totalEmails ?? stat?.total ?? 0;
  const verified = batch?.verifiedCount ?? stat?.verified ?? 0;
  const unverified = Math.max(0, Number(total) - Number(verified));
  return [
    { name: "Verified", value: Number(verified), color: "#6DBE45" },
    { name: "Unverified", value: unverified, color: "#9E9E9E" },
  ];
}

const TaskDetailResult = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [batch, setBatch] = useState<BatchDetails | null>(null);
  const [statistics, setStatistics] = useState<BatchStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      emailVerificationService.getBatchDetails(taskId),
      emailVerificationService.getBatchStatistics(taskId),
    ])
      .then(([details, stats]) => {
        if (!cancelled) {
          setBatch(details);
          setStatistics(stats);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const ax = err as { response?: { data?: { message?: string } }; message?: string };
          const msg = ax?.response?.data?.message ?? ax?.message;
          setError(typeof msg === "string" ? msg : "Failed to load task details");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const chartData = buildChartData(statistics, batch);
  const total = chartData.reduce((acc, item) => acc + item.value, 0);
  const progressPercent = batch?.totalEmails ? Math.round(((batch?.verifiedCount ?? 0) / batch.totalEmails) * 100) : 0;

  if (loading) {
    return (
      <CardContainer>
        <ContentWrapper>
          <p>Loading task details...</p>
        </ContentWrapper>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <ContentWrapper>
          <p style={{ color: "var(--color-error, #dc2626)" }}>{typeof error === "string" ? error : "Something went wrong"}</p>
        </ContentWrapper>
      </CardContainer>
    );
  }

  const startedAt = batch?.createdAt;
  const finishedAt = batch?.updatedAt;
  let runtimeMinutes: string | number = "—";
  if (startedAt && finishedAt) {
    const ms = new Date(finishedAt).getTime() - new Date(startedAt).getTime();
    if (!Number.isNaN(ms)) runtimeMinutes = (ms / 60000).toFixed(2);
  }

  return (
    <CardContainer>
      <Header>
        <TaskTitle>Task: {batch?.fileName ?? batch?.name ?? taskId ?? "—"}</TaskTitle>

        <InfoGrid>
          <InfoColumn>
            <p>
              <strong>Task ID:</strong> {batch?.reoonTaskId ?? taskId ?? "—"}
            </p>
            <p>
              <strong>Status:</strong> {batch?.status ?? "—"}
            </p>
            <p>
              <strong>Progress:</strong> {batch?.verifiedCount ?? 0}/{batch?.totalEmails ?? 0} ({progressPercent}%)
            </p>
          </InfoColumn>

          <InfoColumn>
            <p>
              <strong>Started:</strong> {formatDate(startedAt)}
            </p>
            <p>
              <strong>Finished:</strong> {formatDate(finishedAt)}
            </p>
            <p>
              <strong>Runtime:</strong> {runtimeMinutes} minutes
            </p>
          </InfoColumn>
        </InfoGrid>
      </Header>

      <SectionTitle>Results Analysis</SectionTitle>

      <ContentWrapper>
        <ChartWrapper>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <CenterLabel>
            <span>total</span>
            <h2>{total}</h2>
          </CenterLabel>
        </ChartWrapper>

        <LegendWrapper>
          {chartData.map((item, index) => (
            <LegendItem key={index}>
              <ColorBox color={item.color} />
              {item.name}: {item.value}
            </LegendItem>
          ))}
        </LegendWrapper>
      </ContentWrapper>
    </CardContainer>
  );
};

export default TaskDetailResult;
