import styled from "styled-components";

const CampaignCard = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #e0e0e0;
  margin-top: 5%!important;
  // width: 80%;
  margin: 5%;
`;

const CampaignSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Percentage = styled.span`
  color: black;
  font-weight: bold;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: #d4edda;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 15px;

  li {
    margin: 5px 0;
    color: #444;
  }
`;

const AnalyticsLink = styled.a`
  color: #6a5acd;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 0 20px;
`;

const TextGray = styled.span`
  color: #888;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const ViewPerformanceEmailCampaign = () => {
  return (
    <CampaignCard>
      <CampaignSection>
        <Title>
          <Percentage>0%</Percentage> of Campaign Completed
        </Title>
        <ProgressBar />

        <StatsList>
          <li>
            Total No. of Leads: <strong>0</strong>
          </li>
          <li>
            Leads Yet to be started: <strong>0</strong>
          </li>
          <li>
            Leads in progress: <strong>0</strong>
          </li>
          <li>
            Leads completed: <strong>0</strong>
          </li>
          <li>
            Blocked Leads: <strong>0</strong>
          </li>
        </StatsList>

        <AnalyticsLink href="#">View Detail Analytics</AnalyticsLink>
      </CampaignSection>

      <Divider />

      <CampaignSection>
        <h3>Trigger Info</h3>
        <p>
          Next Trigger on: <TextGray>--</TextGray>
        </p>
        <AnalyticsLink href="#">View Trigger Logs</AnalyticsLink>

        <h3 style={{ marginTop: "16px" }}>Sending Pattern Priority</h3>
        <p>
          New Leads <TextGray>(0%)</TextGray>
        </p>
        <p>
          Follow up Leads <TextGray>(100%)</TextGray>
        </p>

        <InfoText>
          New Leads & Follow-up leads counts are based on your{" "}
          <AnalyticsLink href="#">campaign settings</AnalyticsLink>.
        </InfoText>
      </CampaignSection>
    </CampaignCard>
  );
};

export default ViewPerformanceEmailCampaign;
