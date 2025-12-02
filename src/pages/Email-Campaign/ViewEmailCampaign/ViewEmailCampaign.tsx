import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { ArrowLeft } from "lucide-react";
import { Box, Typography, CircularProgress } from "@mui/material";

const ViewEmailCampaign = () => {
  const [activeTab, setActiveTab] = useState<string>("performance");
  const [campaignId, setCampaignId] = useState<string>("");
  const [campaign, setCampaign] = useState<IEmailCampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const fetchCampaignDetails = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dispatch(getCampaignById(id)).unwrap();
      setCampaign(response.campaign);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      setError("Failed to load campaign details. Please try again.");
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      setCampaignId(id);
      fetchCampaignDetails(id);
    } else {
      setError("Campaign ID is missing. Please select a campaign to view.");
      setLoading(false);
    }
  }, [location.search, fetchCampaignDetails]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    if (newValue === "back") {
      navigate("/email-campaign/all");
      return;
    }
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
          borderColor: "divider",
        }}
      >
        <CustomTab label={<ArrowLeft/>} value="back" />
        <CustomTab label="Performance" value="performance" />
        <CustomTab label="Lead List" value="lead_list" />
        <CustomTab label="Sequences" value="sequences" />
      </CustomTabs>

      {/* Show loading indicator while fetching campaign */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Loading campaign details...</Typography>
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
            gap: 2,
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/email-campaign/all")}
          >
            Go back to campaigns
          </Typography>
        </Box>
      ) : campaign ? (
        <>
          {activeTab === "performance" && (
            <ViewPerformanceEmailCampaign campaignStats={campaign.campaignStats} />
          )}
          {activeTab === "lead_list" && (
            <ViewLeadListEmailCampaign leads={campaign.contacts} />
          )}
          {activeTab === "sequences" && (
            <ViewSequencesEmailCampaign campaignId={campaignId} />
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
            gap: 2,
          }}
        >
          <Typography color="text.secondary">
            No campaign data available.
          </Typography>
        </Box>
      )}
    </ContentContainer>
  );
};

export default ViewEmailCampaign;
