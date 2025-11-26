import { Divider } from "@mui/material";
import { formatDateTime } from "../../../utils/utils";
import {
  CampaignCard,
  CampaignSection,
  Percentage,
  StatsList,
  TextGray,
} from "./ViewLeadListCampaign.styled";
import { useEffect } from "react";
import LinearWithValueLabel from "../../../../src/assets/Custom/linearProgressBar";
import Loader from "../../../components/Loader";

interface ViewPerformanceEmailCampaignProps {
  campaignStats: any;
}

const ViewPerformanceEmailCampaign: React.FC<
  ViewPerformanceEmailCampaignProps
> = ({ campaignStats }) => {
  useEffect(() => {
    console.log("Campaign Stats:", campaignStats);
  }, [campaignStats]);

  // ✅ Show "Loading..." when campaignStats is undefined or null
  if (!campaignStats) {
    return <Loader />;
  }

  return (
    <CampaignCard>
      <CampaignSection>
        <h3 style={{ marginBottom: "10px" }}>
          <Percentage>
            {campaignStats.completedPercentage || "0%"} % of campaign completed
          </Percentage>
        </h3>
        <LinearWithValueLabel value={campaignStats.completedPercentage} />
        <StatsList style={{ marginTop: "24px" }}>
          <li>
            Total No. of Leads: <strong>{campaignStats.totalLeads || 0}</strong>
          </li>
          <li>
            Leads Yet to be started:{" "}
            <strong>{campaignStats.leadsYetToStart || 0}</strong>
          </li>
          <li>
            Leads in progress:{" "}
            <strong>{campaignStats.leadsInProgress || 0}</strong>
          </li>
          <li>
            Leads completed:{" "}
            <strong>{campaignStats.leadsCompleted || 0}</strong>
          </li>
          <li>
            Blocked Leads: <strong>0</strong>
          </li>
        </StatsList>

      </CampaignSection>

      <Divider />

      <CampaignSection style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ marginBottom: "6px" }}>Campaign Status:</h3>
        <p style={{ marginBottom: "16px" }}>
          <TextGray>{campaignStats.status || "Unknown"}</TextGray>
        </p>
        <h3 style={{ marginBottom: "16px" }}>Trigger Info:</h3>
        <p>Next Trigger on: </p>
        <TextGray>
          {campaignStats.status === "COMPLETED"
            ? "Campaign Completed"
            : campaignStats.status === "PAUSED"
              ? "Campaign Paused"
              : campaignStats.nextSequenceTrigger
                ? formatDateTime(campaignStats.nextSequenceTrigger)
                : "Not Scheduled"}
        </TextGray>

        {/* <AnalyticsLink href="#">View Trigger Logs</AnalyticsLink> */}
      </CampaignSection>
    </CampaignCard>
  );
};

export default ViewPerformanceEmailCampaign;
