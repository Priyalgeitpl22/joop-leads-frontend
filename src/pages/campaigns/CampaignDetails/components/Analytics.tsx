import React from 'react';
import { Share2, LayoutGrid, Info } from 'lucide-react';
import {
  AnalyticsContainer,
  SectionCard,
  SectionHeader,
  SectionTitleGroup,
  SectionTitle,
  SectionSubtitle,
  HeaderActions,
  IconActionButton,
  ShareButton,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  InfoIconButton,
} from './Analytics.styled';

export interface AnalyticsData {
  totalLeadsContacted?: number;
  uniqueReplied?: number;
  uniqueRepliedOOO?: number;
  uniquePositiveReplies?: number;
  uniqueOpened?: number;
  uniqueOpenedPercent?: number;
  dataFromDate?: string;
}

interface AnalyticsProps {
  analyticsData?: AnalyticsData;
  onShare?: () => void;
}

// Mock data for testing
const mockAnalyticsData: AnalyticsData = {
  totalLeadsContacted: 199,
  uniqueReplied: 0,
  uniqueRepliedOOO: 0,
  uniquePositiveReplies: 0,
  uniqueOpened: 130,
  uniqueOpenedPercent: 65.33,
  dataFromDate: '14 Dec, 01:39 am',
};

export const Analytics: React.FC<AnalyticsProps> = ({
  analyticsData = mockAnalyticsData,
  onShare,
}) => {
  const {
    totalLeadsContacted = 0,
    uniqueReplied = 0,
    uniqueRepliedOOO = 0,
    uniquePositiveReplies = 0,
    uniqueOpened = 0,
    uniqueOpenedPercent,
    dataFromDate = '',
  } = analyticsData;

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      console.log('Share analytics');
      // TODO: Implement share functionality
    }
  };

  return (
    <AnalyticsContainer>
      {/* Overall Email Reach Section */}
      <SectionCard>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionTitle>Overall Email Reach</SectionTitle>
            <SectionSubtitle>
              The data is from {dataFromDate} till now
            </SectionSubtitle>
          </SectionTitleGroup>
          <HeaderActions>
            <IconActionButton title="View Options">
              <LayoutGrid size={20} />
            </IconActionButton>
            <ShareButton onClick={handleShare}>
              <Share2 size={18} />
              Share
            </ShareButton>
          </HeaderActions>
        </SectionHeader>

        <StatsGrid>
          <StatCard $borderColor="#6366f1">
            <StatValue>{totalLeadsContacted}</StatValue>
            <StatLabel>Total Leads Contacted</StatLabel>
          </StatCard>

          <StatCard $borderColor="#14b8a6">
            <StatValue>{uniqueReplied}</StatValue>
            <StatLabel>
              Unique Replied
              <InfoIconButton
                title="Total unique leads who replied to your emails"
                onClick={(e) => e.stopPropagation()}
              >
                <Info size={14} />
              </InfoIconButton>
            </StatLabel>
          </StatCard>

          <StatCard $borderColor="#14b8a6">
            <StatValue>{uniqueRepliedOOO}</StatValue>
            <StatLabel>
              Unique Replied w/OOO
              <InfoIconButton
                title="Unique replies excluding Out of Office responses"
                onClick={(e) => e.stopPropagation()}
              >
                <Info size={14} />
              </InfoIconButton>
            </StatLabel>
          </StatCard>

          <StatCard $borderColor="#22c55e">
            <StatValue>{uniquePositiveReplies}</StatValue>
            <StatLabel>
              Unique Positive Replies
              <InfoIconButton
                title="Unique leads who replied positively to your emails"
                onClick={(e) => e.stopPropagation()}
              >
                <Info size={14} />
              </InfoIconButton>
            </StatLabel>
          </StatCard>

          <StatCard $borderColor="#a78bfa">
            <StatValue>
              {uniqueOpened}
              {uniqueOpenedPercent !== undefined && uniqueOpenedPercent > 0 && (
                <span className="percent"> ({uniqueOpenedPercent.toFixed(2)}%)</span>
              )}
            </StatValue>
            <StatLabel>
              Unique Opened
              <InfoIconButton
                title="Total unique leads who opened your emails"
                onClick={(e) => e.stopPropagation()}
              >
                <Info size={14} />
              </InfoIconButton>
            </StatLabel>
          </StatCard>
        </StatsGrid>
      </SectionCard>
    </AnalyticsContainer>
  );
};

export default Analytics;

