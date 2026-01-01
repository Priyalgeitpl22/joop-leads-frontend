import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, MoreHorizontal, Check, ArrowLeft } from "lucide-react";
import {
  TriggerLogs,
  Sequences,
  Analytics,
  LeadList,
  Inbox,
} from "./components";
import {
  PageContainer,
  CampaignHeader,
  HeaderTop,
  HeaderLeft,
  HeaderActions,
  ActionButton,
  CampaignTitle,
  CampaignMeta,
  CampaignTags,
  Tag,
  TabsContainer,
  Tab,
  ContentContainer,
} from "./CampaignDetails.styled";
import type { AppDispatch } from "../../../store";
import { fetchCampaignById } from "../../../store/slices/campaignSlice";
import type { RootState } from "../../../store";
import type { Campaign, CampaignAnalytics } from "../../../interfaces";
import Performance from "./components/Performance";
import SenderAccounts from "./components/SenderAccounts";
import { TIMEZONES } from "../../../constants";
import { useSearchParams } from "react-router-dom";
import { StatusBadge } from "../../../styles/GlobalStyles";

type TabValue =
  | "performance"
  | "analytics"
  | "inbox"
  | "lead_list"
  | "sequences"
  | "trigger_logs"
  | "sender_accounts";

const CampaignDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCampaign } = useSelector((state: RootState) => state.campaign);
  const campaign = currentCampaign as unknown as Campaign;
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as TabValue | null;
  const [activeTab, setActiveTab] = useState<TabValue>(
    tabFromUrl || "performance"
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }
  }, [id, dispatch]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleBack = () => {
    navigate("/campaigns");
  };

  const tabs: { label: string; value: TabValue; count?: number }[] = [
    { label: "Performance", value: "performance" },
    { label: "Analytics", value: "analytics" },
    { label: "Inbox", value: "inbox" },
    {
      label: "Lead List",
      value: "lead_list",
      count: campaign?.leads?.length || 0,
    },
    {
      label: "Sequences",
      value: "sequences",
      count: campaign?.sequences?.length || 0,
    },
    { label: "Trigger logs", value: "trigger_logs" },
    {
      label: "Sender Accounts",
      value: "sender_accounts",
      count: campaign?.sender_accounts?.length || 0,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "performance":
        return <Performance campaign={campaign} onViewTriggerLogs={() => {}} />;
      case "analytics":
        return (
          <Analytics
          analyticsData={campaign.analytics as unknown as CampaignAnalytics}
          />
        );
      case "inbox":
        return (
          <Inbox
            campaignId={id || ""}
            plainText={campaign.sendAsPlainText || false}
            onDownloadCsv={() => {
              console.log("Download Inbox CSV");
            }}
          />
        );
      case "lead_list":
        return (
          <LeadList
            campaignId={id || ""}
          />
        );
      case "sequences":
        return (
          <Sequences
            campaignId={id || ""}
          />
        );
      case "trigger_logs":
        return <TriggerLogs campaignId={id || ""} />;
      case "sender_accounts":
        return <SenderAccounts campaignId={id || ""} />;
      default:
        return null;
    }
  };

  return (
    campaign && (
      <PageContainer>
        {/* Campaign Header */}
        <CampaignHeader>
          <HeaderTop>
            <HeaderLeft>
              <CampaignTitle>
                <button onClick={handleBack}>
                  <ArrowLeft size={18} />
                </button>
                <h1>{campaign?.name || campaign?.name || "Campaign"}</h1>
                <StatusBadge $status={campaign?.status}>
                  {campaign?.status || "DRAFT"}
                </StatusBadge>
              </CampaignTitle>

              <CampaignMeta>
                Scheduled At:{" "}
                {campaign.scheduledAt
                  ? formatDateTime(campaign.scheduledAt || "")
                  : "N/A"}{" "}
                | Next Trigger:{" "}
                {campaign.nextTrigger
                  ? formatDateTime(campaign.nextTrigger || "")
                  : "Not Scheduled"}{" "}
                | Trigger Local Time:{" "}
                {TIMEZONES.find((tz) => tz.value === campaign.timezone)
                  ?.label || "N/A"}
              </CampaignMeta>

              <CampaignTags>
                <Tag>
                  <Check size={14} />
                  {campaign.sendingPriority}% Follow up leads
                </Tag>
              </CampaignTags>
            </HeaderLeft>

            <HeaderActions>
              <ActionButton
                title="Edit Campaign"
                onClick={() => navigate(`/campaign/${id}?edit=true`)}
              >
                <Edit2 size={18} />
              </ActionButton>
              <ActionButton title="More Options">
                <MoreHorizontal size={18} />
              </ActionButton>
            </HeaderActions>
          </HeaderTop>
        </CampaignHeader>

        {/* Tabs Navigation */}
        <TabsContainer>
          {tabs.map((tabItem) => (
            <Tab
              key={tabItem.value}
              $isActive={activeTab === tabItem.value}
              onClick={() => {
                setActiveTab(tabItem.value);
                setSearchParams({ tab: tabItem.value });
              }}
            >
              {tabItem.label}
              {tabItem.count !== undefined && ` (${tabItem.count})`}
            </Tab>
          ))}
        </TabsContainer>

        {/* Tab Content */}
        <ContentContainer>{renderTabContent()}</ContentContainer>
      </PageContainer>
    )
  );
};

export default CampaignDetailsPage;
