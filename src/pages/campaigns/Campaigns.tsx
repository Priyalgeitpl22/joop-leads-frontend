import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Mail,
  PlayCircle,
  ExternalLink,
  Filter,
  ChevronDown,
  Send,
  MailOpen,
  MessageSquare,
  ThumbsUp,
  Trash,
  Pencil,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchCampaigns } from "../../store/slices/campaignSlice";
import {
  PageContainer,
  PageHeader,
  HeaderActions,
  SearchBar,
  SearchIcon,
  SearchInput,
  CreateButton,
  EmptyStateContainer,
  EmptyStateIllustration,
  IllustrationCard,
  SubjectLine,
  SubjectInput,
  EmailPreview,
  EmailToolbar,
  ToolbarButton,
  EmailLine,
  ChartContainer,
  ChartSvg,
  EnvelopeIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  PrimaryButton,
  LearnMoreLink,
  Skeleton,
  SkeletonList,
  SkeletonRow,
  TabsContainer,
  TabsList,
  TabsActions,
  Tab,
  ColumnDropdown,
  FilterButton,
  CampaignTable,
  CampaignRow,
  CampaignInfo,
  CampaignIconBadge,
  CampaignDetails,
  CampaignName,
  CampaignMeta,
  StatusBadge,
  MetaSeparator,
  CampaignStats,
  StatItem,
  StatValue,
  StatLabel,
  ActionIconButton,
} from "./Campaigns.styled";
import type { Campaign } from "../../interfaces";
import { deleteCampaign } from "../../store/slices/campaignSlice";
import { CircularProgress, Box, Typography } from "@mui/material";

export const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {campaigns, isLoading} = useAppSelector((state) => state.campaign);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleCreateCampaign = () => {
    navigate(`/campaign/new`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateValue: Date | string) => {
    const date = new Date(dateValue);
    const datePart = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} | ${timePart}`;
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <Skeleton $width="200px" $height="32px" />
          <HeaderActions>
            <Skeleton $width="280px" $height="44px" />
            <Skeleton $width="180px" $height="44px" />
          </HeaderActions>
        </PageHeader>
        <SkeletonList>
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonRow key={i}>
              <Skeleton $width="200px" $height="16px" />
              <Skeleton $width="80px" $height="24px" />
              <Skeleton $width="60px" $height="14px" />
              <Skeleton $width="60px" $height="14px" />
              <Skeleton $width="60px" $height="14px" />
              <Skeleton $width="100px" $height="14px" />
              <Skeleton $width="80px" $height="32px" />
            </SkeletonRow>
          ))}
        </SkeletonList>
      </PageContainer>
    );
  }

  // Empty state
  if (campaigns.length === 0) {
    return (
      <PageContainer>
        <EmptyStateContainer>
          <EmptyStateIllustration>
            <IllustrationCard>
              <SubjectLine>
                <span>Subject</span>
                <SubjectInput />
              </SubjectLine>

              <EmailToolbar>
                <ToolbarButton />
                <ToolbarButton $active />
              </EmailToolbar>

              <EmailPreview>
                <EmailLine />
                <EmailLine />
                <EmailLine />
                <EmailLine />
                <EmailLine $width="60%" />
                <div style={{ marginTop: "8px" }} />
                <EmailLine />
              </EmailPreview>

              <ChartContainer>
                <ChartSvg viewBox="0 0 80 50">
                  <path d="M 5 40 Q 20 35 30 30 T 50 20 T 75 10" />
                  <circle cx="30" cy="30" r="4" />
                  <circle cx="50" cy="20" r="4" />
                  <circle cx="65" cy="15" r="4" />
                  <circle cx="75" cy="10" r="4" />
                </ChartSvg>
              </ChartContainer>

              <EnvelopeIcon>
                <Mail />
              </EnvelopeIcon>
            </IllustrationCard>
          </EmptyStateIllustration>

          <EmptyStateTitle>
            Start automating your email campaign
          </EmptyStateTitle>
          <EmptyStateDescription>
            Send emails that grab your leads attention, at scale. Click the
            button below and watch your sales 🚀.
          </EmptyStateDescription>

          <EmptyStateActions>
            <PrimaryButton onClick={handleCreateCampaign}>
              <Plus size={20} />
              Create my first Campaign
            </PrimaryButton>

            <LearnMoreLink href="#" target="_blank">
              <PlayCircle size={18} />
              Learn more about campaign creation
            </LearnMoreLink>
          </EmptyStateActions>
        </EmptyStateContainer>
      </PageContainer>
    );
  }

  // Campaign list view
  return (
    <PageContainer>
      <TabsContainer>
        <TabsList>
          <Tab
            $isActive={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All Campaigns ({campaigns.length})
          </Tab>
        </TabsList>

        <TabsActions>
          <ColumnDropdown>
            <MailOpen size={16} />
            Email Sent, Opened...
            <ChevronDown size={14} />
          </ColumnDropdown>
          <FilterButton>
            <Filter size={18} />
          </FilterButton>
          <SearchBar>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
              placeholder="Search Campaigns"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <CreateButton onClick={handleCreateCampaign}>
            <Plus size={20} />
            Create Campaign
          </CreateButton>
        </TabsActions>
      </TabsContainer>

      <CampaignTable>
        {campaigns.map((campaign: Campaign) => (
          <CampaignRow key={campaign.id}>
            <CampaignInfo>
              <CampaignIconBadge>
                {campaign?.status === "ACTIVE" ? (
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={campaign?.campaignStats?.completedPercentage || 0} 
                      size={40}
                      sx={{ color: '#22c55e' }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '10px', color: '#666' }}>
                        {`${Math.round(campaign?.campaignStats?.completedPercentage || 0)}%`}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Pencil size={20} />
                )}
              </CampaignIconBadge>
              <CampaignDetails>
                <CampaignName to={`/campaigns/${campaign.id}`}>
                  {campaign?.name || "Untitled Campaign"}
                  <ExternalLink size={14} />
                </CampaignName>
                <CampaignMeta>
                  <StatusBadge $status={campaign?.status}>
                    {campaign?.status || "DRAFT"}
                  </StatusBadge>
                  <MetaSeparator>|</MetaSeparator>
                  <span>
                    Scheduled At: {formatDate(campaign?.scheduledAt || new Date())}
                  </span>
                  <MetaSeparator>|</MetaSeparator>
                  <span>{campaign?.sequences?.length || 0} sequences</span>
                </CampaignMeta>
              </CampaignDetails>
            </CampaignInfo>

            <CampaignStats>
              <StatItem>
                <StatValue>{campaign?.analytics?.sentCount || 0}</StatValue>
                <StatLabel>
                  <Send size={12} />
                  Sent
                </StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{campaign?.analytics?.openedCount || 0}</StatValue>
                <StatLabel>
                  <MailOpen size={12} />
                  Opened
                </StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{campaign?.analytics?.repliedCount || 0}</StatValue>
                <StatLabel>
                  <MessageSquare size={12} />
                  Replied
                </StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{campaign?.analytics?.repliedCount || 0}</StatValue>
                <StatLabel>
                  <ThumbsUp size={12} />
                  Positive Reply
                </StatLabel>
              </StatItem>
              <ActionIconButton onClick={() => dispatch(deleteCampaign(campaign.id))}>
                <Trash color="red" size={16} />
              </ActionIconButton>
            </CampaignStats>
          </CampaignRow>
        ))}
      </CampaignTable>
    </PageContainer>
  );
};

export default Campaigns;
