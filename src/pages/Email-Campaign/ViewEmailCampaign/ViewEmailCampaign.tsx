import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
} from "../EmailCampaign.styled";
import ViewPerformanceEmailCampaign from "./ViewPerformanceEmailCampaign";
import ViewLeadListEmailCampaign from "./ViewLeadListEmailCampaign";
import ViewSequencesEmailCampaign from "./ViewSequencesEmailCampaign";

const ViewEmailCampaign = () => {
  const [activeTab, setActiveTab] = useState<string>("performance");
  const [campaignId, setCampaignId] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      setCampaignId(id);
    }
  }, [location.search]);

  const handleTabChange = (_: any, newValue: string) => {
    const validTabs = ["performance", "lead_list", "sequences"];
    setActiveTab(validTabs.includes(newValue) ? newValue : "performance");
  };

  return (
    <ContentContainer>
      <CustomTabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <CustomTab label="Performance" value="performance" />
        <CustomTab label="Lead List" value="lead_list" />
        <CustomTab label="Sequences" value="sequences" />
      </CustomTabs>

      {activeTab === "performance" && <ViewPerformanceEmailCampaign />}
      {activeTab === "lead_list" && (
        <ViewLeadListEmailCampaign campaignId={campaignId} />
      )}
      {activeTab === "sequences" && <ViewSequencesEmailCampaign />}
    </ContentContainer>
  );
};

export default ViewEmailCampaign;
