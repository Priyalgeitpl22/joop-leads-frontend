import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { Check, HelpCircle, Info } from "lucide-react";
import { formatDateTime } from "../../../../utils/utils";
import {
  PerformanceContainer,
  PerformanceGrid,
  PerformanceSection,
  PercentageDisplay,
  ProgressBarContainer,
  ProgressBarFill,
  StatsList,
  StatItem,
  ViewLink,
  SectionTitle,
  TriggerInfo,
  SendingPriorityList,
  PriorityItem,
  PriorityNote,
  ScoreDisplay,
  ScoreLabel,
  CheckList,
  CheckItem,
  SenderAccountsSection,
  SenderAccountsTitle,
} from "./Performance.styled";

interface PerformanceProps {
  campaignStats: {
    completedPercentage?: number;
    totalLeads?: number;
    uniqueLeads?: number;
    leadsYetToStart?: number;
    leadsInProgress?: number;
    leadsCompleted?: number;
    blockedLeads?: number;
    status?: string;
    nextSequenceTrigger?: string;
    newLeadsPercentage?: number;
    followUpPercentage?: number;
    sendingScore?: number;
  };
  senderAccounts?: Array<{
    email: string;
    status: string;
  }>;
  onViewTriggerLogs?: () => void;
  onViewDetailAnalytics?: () => void;
}

const Performance: React.FC<PerformanceProps> = ({
  campaignStats,
  senderAccounts = [],
  onViewTriggerLogs,
  onViewDetailAnalytics,
}) => {
  const {
    completedPercentage = 0,
    totalLeads = 0,
    uniqueLeads = 0,
    leadsYetToStart = 0,
    leadsInProgress = 0,
    leadsCompleted = 0,
    blockedLeads = 0,
    status = "ACTIVE",
    nextSequenceTrigger,
    newLeadsPercentage = 0,
    followUpPercentage = 100,
    sendingScore = 10,
  } = campaignStats || {};

  const checklistItems = [
    { label: "No Email Sent Time Discrepancy", passed: true },
    { label: "No Emails Disconnected", passed: true },
    { label: "No Email Reassociation Pending", passed: true },
    { label: "No Email CNAME not verified", passed: true },
    { label: "No Email DNS not verified", passed: true },
  ];

  return (
    <PerformanceContainer>
      <PerformanceGrid>
        {/* Left Section - Campaign Stats */}
        <PerformanceSection>
          <PercentageDisplay>
            {/* {completedPercentage?.toFixed(2)}% <span>of Campaign Completed</span> */}
            <span>of Campaign Completed</span>
          </PercentageDisplay>
          <ProgressBarContainer>
            <ProgressBarFill percentage={completedPercentage} />
          </ProgressBarContainer>

          <StatsList>
            <StatItem>
              <span className="label">Total No. of Leads</span>
              <span className="value">{totalLeads}</span>
            </StatItem>
            <StatItem>
              <span className="label">
                Unique Leads
                <Tooltip title="Number of unique email addresses">
                  <IconButton size="small" sx={{ padding: 0, marginLeft: "4px" }}>
                    <HelpCircle size={14} color="#999" />
                  </IconButton>
                </Tooltip>
              </span>
              <span className="value">{uniqueLeads || totalLeads}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads Yet to be started</span>
              <span className="value">{leadsYetToStart}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads in progress</span>
              <span className="value">{leadsInProgress}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads completed</span>
              <span className="value">{leadsCompleted}</span>
            </StatItem>
            <StatItem>
              <span className="label">Blocked Leads</span>
              <span className="value">{blockedLeads}</span>
            </StatItem>
          </StatsList>

          <Box mt={2}>
            <ViewLink onClick={onViewDetailAnalytics}>View Detail Analytics</ViewLink>
          </Box>
        </PerformanceSection>

        {/* Middle Section - Trigger Info */}
        <PerformanceSection>
          <SectionTitle>Trigger Info</SectionTitle>
          <TriggerInfo>
            <div className="label">Next Trigger on</div>
            <div className="value">
              {status === "COMPLETED"
                ? "Campaign Completed"
                : status === "PAUSED"
                ? "Campaign Paused"
                : nextSequenceTrigger
                ? formatDateTime(nextSequenceTrigger)
                : "Not Scheduled"}
            </div>
          </TriggerInfo>

          <ViewLink onClick={onViewTriggerLogs}>View Trigger Logs</ViewLink>

          <Box mt={4}>
            <SectionTitle>Sending Pattern Priority</SectionTitle>
            <SendingPriorityList>
              <PriorityItem>
                <span className="name">New Leads</span>
                <span className="percentage">({newLeadsPercentage}%)</span>
              </PriorityItem>
              <PriorityItem>
                <span className="name">Follow up Leads</span>
                <span className="percentage">({followUpPercentage}%)</span>
              </PriorityItem>
            </SendingPriorityList>

            <PriorityNote>
              New Leads & Follow up leads counts are based on your{" "}
              <a href="#campaign-settings">campaign settings</a>.
            </PriorityNote>
          </Box>
        </PerformanceSection>

        {/* Right Section - Sending Efficiency Score */}
        <PerformanceSection>
          <ScoreDisplay>
            <span className="score">{sendingScore}</span>
            <span className="total">/10 of sending efficiency score</span>
            <Tooltip title="Score based on email delivery and engagement metrics">
              <IconButton size="small" sx={{ padding: 0, marginLeft: "4px" }}>
                <HelpCircle size={14} color="#999" />
              </IconButton>
            </Tooltip>
          </ScoreDisplay>

          <ScoreLabel>Excellent - Sending Volume</ScoreLabel>

          <CheckList>
            {checklistItems.map((item, index) => (
              <CheckItem key={index} passed={item.passed}>
                <div className="left">
                  <div className="icon">
                    <Check size={12} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <Tooltip title="More info">
                  <IconButton size="small" sx={{ padding: 0 }}>
                    <Info size={14} color="#bdbdbd" />
                  </IconButton>
                </Tooltip>
              </CheckItem>
            ))}
          </CheckList>
        </PerformanceSection>
      </PerformanceGrid>

      {/* Sender Email Accounts Section */}
      {senderAccounts.length > 0 && (
        <SenderAccountsSection>
          <SenderAccountsTitle>Sender Email Accounts To Check</SenderAccountsTitle>
          {senderAccounts.map((account, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={1}>
              <span>{account.email}</span>
              <span style={{ color: account.status === "active" ? "#4caf50" : "#f44336" }}>
                {account.status}
              </span>
            </Box>
          ))}
        </SenderAccountsSection>
      )}
    </PerformanceContainer>
  );
};

export default Performance;
