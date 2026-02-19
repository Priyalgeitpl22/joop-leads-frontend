import { useParams } from "react-router-dom";
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

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Safe (Valid)", value: 4, color: "#6DBE45" },
  { name: "Role (Valid)", value: 0, color: "#9BBE3F" },
  { name: "Catch All", value: 0, color: "#F5B400" },
  { name: "Disposable", value: 0, color: "#F7A400" },
  { name: "Inbox Full", value: 0, color: "#F57C00" },
  { name: "Spam Trap", value: 0, color: "#F4511E" },
  { name: "Disabled", value: 0, color: "#FF3B30" },
  { name: "Invalid", value: 0, color: "#E53935" },
  { name: "Unknown", value: 0, color: "#9E9E9E" },
];

const total = data.reduce((acc, item) => acc + item.value, 0);

const TaskDetailResult = () => {
  const { taskId } = useParams<{ taskId: string }>();

  return (
    <CardContainer>
      <Header>
        <TaskTitle>Task: test-leads.csv</TaskTitle>

        <InfoGrid>
          <InfoColumn>
            <p>
              <strong>Task ID:</strong> {taskId}
            </p>
            <p>
              <strong>Status:</strong> Completed
            </p>
            <p>
              <strong>Progress:</strong> 4/4 (100%)
            </p>
          </InfoColumn>

          <InfoColumn>
            <p>
              <strong>Started:</strong> 17-Feb-2026, 11:38:44
            </p>
            <p>
              <strong>Finished:</strong> 17-Feb-2026, 11:38:49
            </p>
            <p>
              <strong>Runtime:</strong> 0.06 minutes
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
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
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
          {data.map((item, index) => (
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
