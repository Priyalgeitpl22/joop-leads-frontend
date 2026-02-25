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
  PauseCircle,
  StopCircle,
  Edit3,
  Info,
  Trash,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { changeCampaignStatus, fetchCampaigns, renameCampaign, searchCampaigns } from "../../store/slices/campaignSlice";
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
  CampaignDetails,
  CampaignName,
  CampaignMeta,
  MetaSeparator,
  CampaignStats,
  StatItem,
  StatValue,
  StatLabel,
  CampaignWrapper,
} from "./Campaigns.styled";
import type { Campaign, CampaignStatus } from "../../interfaces";
import CircularProgressWithStatus from "../../components/common/CircularProgress";
import { OptionsMenu, Dialog, Button, Input, AlertChip } from "../../components/common";
import { deleteCampaign } from "../../store/slices/campaignSlice";
import { toast } from "react-hot-toast";
import { getStoppedReasonLabel } from "../../utils/labels";

export const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { campaigns, isLoading } = useAppSelector((state) => state.campaign);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [campaignToRename, setCampaignToRename] = useState<Campaign | null>(null);
  const [newName, setNewName] = useState<string>("");
  const isSearching = searchQuery.trim().length > 0;
  
  const handleDeleteClick = (campaign: Campaign) => {
    setCampaignToDelete(campaign);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (campaignToDelete) {
      dispatch(deleteCampaign(campaignToDelete.id));
    }
    setDeleteDialogOpen(false);
    setCampaignToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCampaignToDelete(null);
  };

  const handleRenameClick = (campaign: Campaign) => {
    setCampaignToRename(campaign);
    setRenameDialogOpen(true);
  };

  const handleCancelRename = () => {
    setRenameDialogOpen(false);
    setCampaignToRename(null);
  };

  const handleConfirmRename = async () => {
    if (campaignToRename) {
      const result = await dispatch(renameCampaign({ id: campaignToRename.id, name: newName }));
      if (result.payload) {
        setRenameDialogOpen(false);
        setCampaignToRename(null);
        setNewName("");
        toast.success("Campaign renamed successfully");
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleCreateCampaign = () => {
    navigate(`/campaign/new`);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      setSearchQuery(value);
      const trimmedQuery = value.trim();
      if (trimmedQuery === "") {
        dispatch(fetchCampaigns());
      } else {
        await dispatch(searchCampaigns(trimmedQuery)).unwrap();
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
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

  if (isLoading && campaigns.length === 0 && !isSearching) {
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
  if (campaigns.length === 0 && !isSearching) {
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
        {campaigns.length === 0 && isSearching ? (
          <CampaignWrapper>
            No campaigns match your search.
          </CampaignWrapper>
        ) : (
          campaigns.map((campaign: Campaign) => (
            <CampaignRow key={campaign.id}>
              <CampaignInfo>
                <CircularProgressWithStatus
                  value={campaign?.completedPercentage || 0}
                />
                <CampaignDetails>
                  <CampaignName to={`/campaigns/${campaign.id}`}>
                    {campaign?.name || "Untitled Campaign"}
                    <ExternalLink size={14} />
                  </CampaignName>
                  <CampaignMeta>
                    {/* <StatusBadge $status={campaign?.status}> */}
                    {campaign?.status || "DRAFT"}
                    {/* </StatusBadge> */}
                    <MetaSeparator>|</MetaSeparator>
                    <span>
                      Scheduled At:{" "}
                      {formatDate(campaign?.scheduledAt || new Date())}
                    </span>
                    <MetaSeparator>|</MetaSeparator>
                    <span>{campaign?.sequences?.length || 0} sequences</span>
                  </CampaignMeta>
                  {campaign?.status === 'STOPPED' && (
                    <AlertChip variant="warning">
                      {getStoppedReasonLabel(campaign?.stoppedReason || 'Unknown')}
                    </AlertChip>
                  )}
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
                <OptionsMenu
                  items={[
                  campaign.status === 'PAUSED' 
                    ? { id: 'resume', label: 'Resume Campaign', icon: <PlayCircle size={18} />, onClick: () => dispatch(changeCampaignStatus({ id: campaign.id, status: 'ACTIVE' as CampaignStatus })) } 
                    : { id: 'pause', label: 'Pause Campaign', icon: <PauseCircle size={18} />, onClick: () => dispatch(changeCampaignStatus({ id: campaign.id, status: 'PAUSED' as CampaignStatus })) },
                  { id: 'stop', label: 'Stop Campaign', icon: <StopCircle size={18} />, onClick: () => dispatch(changeCampaignStatus({ id: campaign.id, status: 'STOPPED' as CampaignStatus })) },
                  { id: 'delete', label: 'Delete Campaign', icon: <Trash size={18} />, danger: true, onClick: () => handleDeleteClick(campaign) },
                  'divider',
                  { id: 'rename', label: 'Rename', icon: <Edit3 size={18} />, onClick: () => handleRenameClick(campaign) },
                  { id: 'details', label: 'View Details', icon: <Info size={18} />, onClick: () => navigate(`/campaigns/${campaign.id}`) },
                  ]}
                  position="right"
                />
              </CampaignStats>
            </CampaignRow>
        )))}
      </CampaignTable>

      <Dialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        title="Delete Campaign"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{campaignToDelete?.name}</strong>? 
          This action cannot be undone.
        </p>
      </Dialog>

      <Dialog
        isOpen={renameDialogOpen}
        onClose={handleCancelRename}
        title="Rename Campaign"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={handleCancelRename}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmRename}>Confirm</Button>
          </>
        }
      >
        <p>
          Enter the new name for <strong>{campaignToRename?.name}</strong>:
          <Input type="text" value={newName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} placeholder="New Name" />
        </p>
      </Dialog>
    </PageContainer>
  );
};

export default Campaigns;
