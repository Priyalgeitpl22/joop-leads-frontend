import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { Share2, LayoutGrid, Info } from "lucide-react";
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
} from "./Analytics.styled";

interface AnalyticsProps {
  analyticsData?: {
    totalLeadsContacted?: number;
    uniqueReplied?: number;
    uniqueRepliedOOO?: number;
    dataFromDate?: string;
  };
  onShare?: () => void;
}

// Test data
const testAnalyticsData = {
  totalLeadsContacted: 199,
  uniqueReplied: 0,
  uniqueRepliedOOO: 0,
  dataFromDate: "14 Dec, 01:39 am",
};

const Analytics: React.FC<AnalyticsProps> = ({
  analyticsData = testAnalyticsData,
  onShare,
}) => {
  const {
    totalLeadsContacted = 0,
    uniqueReplied = 0,
    uniqueRepliedOOO = 0,
    dataFromDate = "",
  } = analyticsData;

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
            <IconActionButton>
              <LayoutGrid size={20} />
            </IconActionButton>
            <ShareButton onClick={onShare}>
              <Share2 size={18} />
              Share
            </ShareButton>
          </HeaderActions>
        </SectionHeader>

        <StatsGrid>
          <StatCard borderColor="#6366f1">
            <StatValue>{totalLeadsContacted}</StatValue>
            <StatLabel>Total Leads Contacted</StatLabel>
          </StatCard>
          <StatCard borderColor="#14b8a6">
            <StatValue>{uniqueReplied}</StatValue>
            <StatLabel>
              Unique Replied
              <Tooltip title="Total unique leads who replied to your emails">
                <IconButton size="small" sx={{ padding: 0 }}>
                  <Info size={14} className="info-icon" />
                </IconButton>
              </Tooltip>
            </StatLabel>
          </StatCard>
          <StatCard borderColor="#22c55e">
            <StatValue>{uniqueRepliedOOO}</StatValue>
            <StatLabel>
              Unique Replied w/OOO
              <Tooltip title="Unique replies excluding Out of Office responses">
                <IconButton size="small" sx={{ padding: 0 }}>
                  <Info size={14} className="info-icon" />
                </IconButton>
              </Tooltip>
            </StatLabel>
          </StatCard>
        </StatsGrid>
      </SectionCard>
    </AnalyticsContainer>
  );
};

export default Analytics;
