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
import { useDispatch } from "react-redux";
import { getCampaignById } from "../../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../../redux/store/store";
import { IEmailCampaign } from "../NewCampaign/interfaces";

const ViewEmailCampaign = () => {
  const [activeTab, setActiveTab] = useState<string>("performance");
  const [campaignId, setCampaignId] = useState<string>("");
  const [campaign, setCampaign] = useState<IEmailCampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      setLoading(true);
      setCampaignId(id);
      fetchCampaignDetails(id);
    }
  }, [location.search]);

  const handleTabChange = (_: any, newValue: string) => {
    const validTabs = ["performance", "lead_list", "sequences"];
    setActiveTab(validTabs.includes(newValue) ? newValue : "performance");
  };

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      setCampaign(response.campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContainer style={{height: "100%"}}>
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

      {/* Show loading indicator while fetching campaign */}
      {loading ? (
        <p>Loading campaign details...</p>
      ) : (
        <>
          {activeTab === "performance" && campaign && (
            <ViewPerformanceEmailCampaign campaignStats={campaign.campaignStats} />
          )}
          {activeTab === "lead_list" && campaign && (
            <ViewLeadListEmailCampaign leads={campaign.contacts} />
          )}
          {activeTab === "sequences" && campaign && (
            <ViewSequencesEmailCampaign campaignId={campaignId} />
          )}
        </>
      )}
    </ContentContainer>
  );
};

export default ViewEmailCampaign;
