import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Clock, 
  Mail, 
  MousePointer, 
  MessageSquare, 
  // ChevronRight,
  Pause,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import {
  Container,
  CampaignCard,
  CardHeader,
  CampaignInfo,
  CampaignIcon,
  CampaignTitle,
  CampaignName,
  CampaignMeta,
  CardBody,
  ProgressSection,
  ProgressLabel,
  ProgressText,
  ProgressBar,
  ProgressFill,
  ActivityGrid,
  ActivityItem,
  ActivityIcon,
  ActivityLabel,
  ActivityValue,
} from './CampaignsList.styled';
import { campaignService } from '../../../services/campaign.service';
import type { Lead } from '../../../interfaces';
import { StatusBadge } from '../../../styles/GlobalStyles';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
    case 'inprogress':
      return <Send size={12} />;
    case 'completed':
      return <CheckCircle2 size={12} />;
    case 'paused':
    case 'stopped':
      return <Pause size={12} />;
    case 'blocked':
      return <XCircle size={12} />;
    case 'unsubscribed':
      return <AlertCircle size={12} />;
    default:
      return <Clock size={12} />;
  }
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'Never';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: 'Active',
    inprogress: 'In Progress',
    completed: 'Completed',
    paused: 'Paused',
    stopped: 'Stopped',
    blocked: 'Blocked',
    unsubscribed: 'Unsubscribed',
    pending: 'Pending'
  };
  return labels[status] || status;
};

interface CampaignsListProps {
  lead: Lead;
  campaignId: string;
}

interface CampaignLead {
  id: string;
  name: string;
  totalSteps: number;
  currentSequenceStep: number;
  status: string;
  createdAt: string;
  lastSentAt: string;
  lastOpenedAt: string;
  lastClickedAt: string;
  lastRepliedAt: string;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ lead, campaignId }) => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<CampaignLead[]>([]);

  useEffect(() => {
    const leadId = lead?.id;
    if (!leadId) return;

    campaignService.getCampaignsByLead(leadId)
      .then((response) => {
        setCampaigns(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
      });
  }, [lead?.id]);

  const handleCampaignClick = () => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <Container>
      {campaigns?.map((campaign) => {
        const totalSteps = campaign?.totalSteps || 0;
        const progress = Math.min((campaign?.currentSequenceStep / totalSteps) * 100, 100);
        const isActive = ['active', 'inprogress'].includes(campaign?.status);

        return (
          <CampaignCard 
            key={campaign.id}
            onClick={() => handleCampaignClick()}
          >
            <CardHeader>
              <CampaignInfo>
                <CampaignIcon>
                  <Send size={18} />
                </CampaignIcon>
                <CampaignTitle>
                  <CampaignName>
                    {campaign?.name || 'Unnamed Campaign'}
                  </CampaignName>
                  <CampaignMeta>
                    Added {formatDate(campaign?.createdAt)}
                  </CampaignMeta>
                </CampaignTitle>
              </CampaignInfo>
              <StatusBadge $status={campaign?.status}>
                {getStatusIcon(campaign?.status)}
                {getStatusLabel(campaign?.status)}
              </StatusBadge>
            </CardHeader>

            <CardBody>
              <ProgressSection>
                <ProgressLabel>
                  <ProgressText>Sequence Progress</ProgressText>
                  <ProgressText>
                    Step {campaign?.currentSequenceStep} of {totalSteps}
                  </ProgressText>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill $progress={progress} $isActive={isActive} />
                </ProgressBar>
              </ProgressSection>

              <ActivityGrid>
                <ActivityItem>
                  <ActivityIcon $variant="sent">
                    <Mail size={14} />
                  </ActivityIcon>
                  <ActivityLabel>Sent</ActivityLabel>
                  <ActivityValue>
                    {campaign?.lastSentAt ? formatDate(campaign?.lastSentAt) : '—'}
                  </ActivityValue>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $variant="opened">
                    <Mail size={14} />
                  </ActivityIcon>
                  <ActivityLabel>Opened</ActivityLabel>
                  <ActivityValue>
                    {campaign?.lastOpenedAt ? formatDate(campaign?.lastOpenedAt) : '—'}
                  </ActivityValue>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $variant="clicked">
                    <MousePointer size={14} />
                  </ActivityIcon>
                  <ActivityLabel>Clicked</ActivityLabel>
                  <ActivityValue>
                    {campaign?.lastClickedAt ? formatDate(campaign?.lastClickedAt) : '—'}
                  </ActivityValue>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $variant="replied">
                    <MessageSquare size={14} />
                  </ActivityIcon>
                  <ActivityLabel>Replied</ActivityLabel>
                  <ActivityValue>
                    {campaign?.lastRepliedAt ? formatDate(campaign?.lastRepliedAt) : '—'}
                  </ActivityValue>
                </ActivityItem>
              </ActivityGrid>
            </CardBody>

            {/* <CardFooter>
              <FooterInfo>
                <Clock size={12} />
                {campaignLead.nextSendAt 
                  ? `Next email: ${formatDate(campaignLead.nextSendAt)}`
                  : 'No scheduled emails'}
              </FooterInfo>
              <ViewButton>
                View Campaign
                <ChevronRight size={14} />
              </ViewButton>
            </CardFooter> */}
          </CampaignCard>
        );
      })}
    </Container>
  );
};

export default CampaignsList;
