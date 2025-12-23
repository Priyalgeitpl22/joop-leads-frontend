import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, CircularProgress, Typography, Box, Tooltip } from "@mui/material";
import { ArrowLeft, Edit2, MoreHorizontal } from "lucide-react";
import { AppDispatch } from "../../../redux/store/store";
import { getCampaignById } from "../../../redux/slice/emailCampaignSlice";
import { CustomTabs } from "../../../components/CustomTabs/CustomTabs";
import { formatDateTime } from "../../../utils/utils";
import {
  Performance,
  Analytics,
  Inbox,
  LeadList,
  Sequences,
  TriggerLogs,
  SmartServers,
} from "./components";
import {
  CampaignDetailsContainer,
  CampaignHeader,
  CampaignTitle,
  StatusBadge,
  CampaignMeta,
  CampaignTags,
  Tag,
  TabsContainer,
  ContentContainer,
  BackButton,
  HeaderActions,
  IconButton,
} from "./CampaignDetails.styled";
import type { RootState } from "../../../redux/store/store";
import type { Campaign } from "../../../interfaces";

type TabValue =
  | "performance"
  | "analytics"
  | "inbox"
  | "lead_list"
  | "sequences"
  | "trigger_logs"
  | "smart_servers";

const CampaignDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("performance");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCampaign } = useSelector((state: RootState) => state.emailCampaign);
  const campaign = selectedCampaign as unknown as Campaign;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      dispatch(getCampaignById(id));
    } else {
      setError("Campaign ID is missing. Please select a campaign to view.");
      setLoading(false);
    }
  }, [location.search, dispatch]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate("/email-campaign/all");
  };

  const handleViewTriggerLogs = () => {
    setActiveTab("trigger_logs");
  };

  const handleViewDetailAnalytics = () => {
    setActiveTab("analytics");
  };

  const renderTabContent = () => {
    if (!campaign) return null;

    switch (activeTab) {
      case "performance":
        return (
          <Performance
            campaignStats={campaign.campaign_stats}
            senderAccounts={campaign.sender_accounts}
            onViewTriggerLogs={handleViewTriggerLogs}
            onViewDetailAnalytics={handleViewDetailAnalytics}
          />
        );
      case "analytics":
        return (
          <Analytics
            analyticsData={
              campaign.analytics_count as IAnalyticsCount
                ? {
                    totalLeadsContacted: campaign.analytics_count?.sent_count || 0,
                    uniqueReplied: campaign.analytics_count?.replied_count || 0,
                    uniqueRepliedOOO: campaign.analytics_count?.replied_ooo_count || 0,
                    dataFromDate: campaign.createdAt
                      ? new Date(campaign.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "",
                  }
                : undefined
            }
            onShare={() => console.log("Share")}
          />
        );
      case "inbox":
        return (
          <Inbox
            messages={
              campaign.campaignStats?.inboxMessages?.length > 0
                ? campaign.campaignStats.inboxMessages.map((msg: any) => ({
                    id: msg.id,
                    leadName: `${msg.first_name || ""} ${msg.last_name || ""}`.trim(),
                    leadEmail: msg.to_email,
                    emailSequence: msg.sequence_name || "",
                    fromEmail: msg.from_email,
                    toEmail: msg.to_email,
                    sentOn: msg.sent_at,
                    subject: msg.subject,
                    body: msg.body,
                    signature: msg.signature,
                    links: msg.links,
                    replyDetails: msg.reply_details,
                    status: msg.status,
                  }))
                : undefined
            }
            onDownloadCsv={() => console.log("Download Inbox CSV")}
          />
        );
      case "lead_list":
        return (
          <LeadList
            leads={campaign.contacts?.map((contact: any) => ({
              id: contact.id,
              firstName: contact.first_name,
              lastName: contact.last_name,
              email: contact.email,
              company: contact.company_name,
              status: contact.blocked ? "blocked" : contact.unsubscribed ? "unsubscribed" : "active",
              currentSequence: `Sequence ${contact.current_sequence || 1}`,
              lastActivity: contact.last_activity || "N/A",
            }))}
            totalCount={campaign.contacts?.length || 0}
          />
        );
      case "sequences":
        return (
          <Sequences
            sequences={
              campaign.sequences?.length > 0
                ? campaign.sequences.map((seq: any, index: number) => ({
                    name: `${index + 1}. ${(seq.seq_type || "EMAIL").toUpperCase()}`,
                    sent: seq.stats?.sent || 0,
                    opened: seq.stats?.opened || 0,
                    openedPercent: seq.stats?.sent
                      ? ((seq.stats?.opened || 0) / seq.stats.sent) * 100
                      : 0,
                    clicked: seq.stats?.clicked || 0,
                    replied: seq.stats?.replied || 0,
                    positiveReplies: seq.stats?.positive_replies || 0,
                    bounced: seq.stats?.bounced || 0,
                    senderBounced: seq.stats?.sender_bounced || 0,
                    unsubscribed: seq.stats?.unsubscribed || 0,
                  }))
                : undefined
            }
            onShowEmailAccountPerformance={() => console.log("Show Email Account Performance")}
            onDownloadCsv={() => console.log("Download Sequences CSV")}
          />
        );
      case "trigger_logs":
        return (
          <TriggerLogs
            upcomingTriggers={
              campaign.campaignStats?.upcomingTriggers?.length > 0
                ? campaign.campaignStats.upcomingTriggers.map((trigger: any) => ({
                    id: trigger.id,
                    dateTime: trigger.triggered_at || trigger.dateTime,
                    status: "Scheduled",
                    timezone: trigger.timezone || "Asia/Calcutta",
                  }))
                : undefined
            }
            logs={
              campaign.campaignStats?.triggerLogs?.length > 0
                ? campaign.campaignStats.triggerLogs.map((log: any) => ({
                    id: log.id,
                    dateTime: log.triggered_at || log.dateTime,
                    status: log.status || "Completed",
                    newLeadsCount: log.new_leads_count,
                    emailsSent: log.emails_sent,
                    eligibleEmailAccounts: log.eligible_email_accounts,
                    timezone: log.timezone || "Asia/Calcutta",
                  }))
                : undefined
            }
            onCheckActivityLog={(logId) => console.log("Check activity log:", logId)}
          />
        );
      case "smart_servers":
        return <SmartServers servers={[]} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <CampaignDetailsContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Loading campaign details...</Typography>
        </Box>
      </CampaignDetailsContainer>
    );
  }

  if (error) {
    return (
      <CampaignDetailsContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 2,
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleBack}
          >
            Go back to campaigns
          </Typography>
        </Box>
      </CampaignDetailsContainer>
    );
  }

  return (
    <CampaignDetailsContainer>
      {/* Campaign Header */}
      <CampaignHeader>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <BackButton onClick={handleBack}>
              <ArrowLeft size={16} />
              Back to Campaigns
            </BackButton>
            <CampaignTitle>
              <h1>{campaign?.campaign_name || "Campaign"}</h1>
              <StatusBadge status={campaign?.status}>{campaign?.status}</StatusBadge>
            </CampaignTitle>
            <CampaignMeta>
              Created At: {campaign?.createdAt ? formatDateTime(campaign.createdAt) : "N/A"} |
              Next Trigger: {campaign?.campaignStats?.nextSequenceTrigger ? formatDateTime(campaign.campaignStats.nextSequenceTrigger) : "Not Scheduled"} |
              Trigger Local Time: {campaign?.triggerLocalTime || "N/A"}
            </CampaignMeta>
            <CampaignTags>
              <Tag variant="success">
                {campaign?.followUpPercentage || 100}% Follow up leads
              </Tag>
              {campaign?.hasWebhooks && <Tag variant="success">Webhooks</Tag>}
            </CampaignTags>
          </Box>
          <HeaderActions>
            <Tooltip title="Edit Campaign">
              <IconButton>
                <Edit2 size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="More Options">
              <IconButton>
                <MoreHorizontal size={18} />
              </IconButton>
            </Tooltip>
          </HeaderActions>
        </Box>
      </CampaignHeader>

      {/* Tabs Navigation */}
      <TabsContainer>
        <CustomTabs
          value={activeTab}
          onChange={handleTabChange}
          tabGap={8}
          tabPadding="12px 20px"
          tabFontSize={14}
          indicatorColor="#6366f1"
          tabSelectedColor="#6366f1"
        >
          <Tab label="Performance" value="performance" />
          <Tab label="Analytics" value="analytics" />
          <Tab label="Inbox" value="inbox" />
          <Tab
            label={`Lead List (${campaign?.contacts?.length || 0})`}
            value="lead_list"
          />
          <Tab label="Sequences" value="sequences" />
          <Tab label="Trigger Logs" value="trigger_logs" />
          <Tab label="SmartServers" value="smart_servers" />
        </CustomTabs>
      </TabsContainer>

      {/* Tab Content */}
      <ContentContainer>{renderTabContent()}</ContentContainer>
    </CampaignDetailsContainer>
  );
};

export default CampaignDetails;

