import { SetStateAction, useState } from "react";
import { ContentContainer, CustomTab, CustomTabs } from "../EmailCampaign.styled";
import ViewPerformanceEmailCampaign from "./ViewPerformanceEmailCampaign";
import ViewLeadListEmailCampaign from "./ViewLeadListEmailCampaign";
import ViewSequencesEmailCampaign from "./ViewSequencesEmailCampaign";

const ViewEmailCampaign = () => {
  const [activeTab, setActiveTab] = useState<string>("performance");

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    const validTabs = ["performance", "lead_list", "sequences"];
    setActiveTab(validTabs.includes(newValue as string) ? newValue : "performance");
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

      {activeTab === "performance" && <ViewPerformanceEmailCampaign/>}
      {activeTab === "lead_list" && <ViewLeadListEmailCampaign />}
      {activeTab === "sequences" && <ViewSequencesEmailCampaign />}
    </ContentContainer>
  );
}

export default ViewEmailCampaign;