import {
  Grid2,
  Tooltip,
  Box,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ContentContainer, MetricCard, metricStyles, SideCard } from "./home.styled";

const Home = () => {
  return (
    <ContentContainer>
      <SideCard>
        <div>20</div>
        <div>Total Leads Reached</div>
      </SideCard>

      <Grid2 container spacing={2} paddingLeft={3}>
        {metricStyles.map((metric) => (
          <Grid2 size={ {xs:6, sm:4}} key={metric.label}>
            <MetricCard
              style={{ backgroundColor: metric.color }}
              borderColor={metric.borderColor}
            >
              <Box display="flex" alignItems="center">
                <div>{metric.label}</div>
                <Tooltip title={`Info about ${metric.label}`}>
                  <InfoOutlinedIcon
                    fontSize="small"
                    style={{ marginLeft: 4, color: "#757575" }}
                  />
                </Tooltip>
              </Box>
              <div>
                {metric.value}
              </div>
            </MetricCard>
          </Grid2>
        ))}
      </Grid2>
    </ContentContainer>
  );
};

export default Home;
