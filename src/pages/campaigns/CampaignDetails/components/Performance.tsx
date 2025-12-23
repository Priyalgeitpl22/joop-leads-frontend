import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { HelpCircle } from "lucide-react";
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
} from "./Performance.styled";
import { formatDateTime } from "../../../../utils";
import type { Campaign } from "../../../../interfaces";

interface PerformanceProps {
  campaign: Campaign;
  // senderAccounts?: Array<{
  //   email: string;
  //   status: string;
  // }>;
  onViewTriggerLogs?: () => void;
}

const Performance: React.FC<PerformanceProps> = ({
  campaign,
  // senderAccounts = [],
  onViewTriggerLogs,
}) => {

  return (
    <PerformanceContainer>
      <PerformanceGrid>
        <PerformanceSection>
          <PercentageDisplay>
            {campaign.campaignStats?.completedPercentage}% <span>of Campaign Completed</span>
          </PercentageDisplay>
          <ProgressBarContainer>
            <ProgressBarFill percentage={campaign.campaignStats?.completedPercentage || 0} />
          </ProgressBarContainer>

          <StatsList>
            <StatItem>
              <span className="label">Total No. of Leads</span>
              <span className="value">{campaign.campaignStats?.totalLeads || 0}</span>
            </StatItem>
            <StatItem>
              <span className="label">
                Unique Leads
                <Tooltip title="Number of unique email addresses">
                  <IconButton
                    size="small"
                    sx={{ padding: 0, marginLeft: "4px" }}
                  >
                    <HelpCircle size={14} color="#999" />
                  </IconButton>
                </Tooltip>
              </span>
              <span className="value">{campaign.campaignStats?.totalLeads || 0}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads Yet to be started</span>
              <span className="value">{campaign.campaignStats?.leadsPending || 0}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads in progress</span>
              <span className="value">{campaign.campaignStats?.leadsPending || 0}</span>
            </StatItem>
            <StatItem>
              <span className="label">Leads completed</span>
              <span className="value">{campaign.campaignStats?.leadsCompleted || 0}</span>
            </StatItem>
            <StatItem>
              <span className="label">Blocked Leads</span>
              <span className="value">{campaign.campaignStats?.leadsBounced || 0}</span>
            </StatItem>
          </StatsList>
        </PerformanceSection>

        <PerformanceSection>
          <SectionTitle>Trigger Info</SectionTitle>
          <TriggerInfo>
            <div className="label">Next Trigger on</div>
            <div className="value">
              {campaign.nextTrigger
                ? formatDateTime(campaign.nextTrigger)
                : "Not Scheduled"}
            </div>
          </TriggerInfo>

          <ViewLink onClick={onViewTriggerLogs}>View Trigger Logs</ViewLink>

          <Box mt={4}>
            <SectionTitle>Sending Pattern Priority</SectionTitle>
            <SendingPriorityList>
              <PriorityItem>
                <span className="name">New Leads</span>
                <span className="percentage">({100 - campaign.sendingPriority}%)</span>
              </PriorityItem>
              <PriorityItem>
                <span className="name">Follow up Leads</span>
                <span className="percentage">({campaign.sendingPriority}%)</span>
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
            <span className="score">{"N/A"}</span>
            <span className="total">/10 of sending efficiency score</span>
            <Tooltip title="Score based on email delivery and engagement metrics">
              <IconButton size="small" sx={{ padding: 0, marginLeft: "4px" }}>
                <HelpCircle size={14} color="#999" />
              </IconButton>
            </Tooltip>
          </ScoreDisplay>

          <ScoreLabel>Excellent - Sending Volume</ScoreLabel>

          <CheckList>
            {/* {checklistItems.map((item, index) => (
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
            ))} */}
          </CheckList>
        </PerformanceSection>
      </PerformanceGrid>

      {/* {senderAccounts.length > 0 && (
        <SenderAccountsSection>
          <SenderAccountsTitle>
            Sender Email Accounts To Check
          </SenderAccountsTitle>
          {senderAccounts.map((account, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={1}>
              <span>{account.email}</span>
              <span
                style={{
                  color: account.status === "active" ? "#4caf50" : "#f44336",
                }}
              >
                {account.status}
              </span>
            </Box>
          ))}
        </SenderAccountsSection>
      )} */}
    </PerformanceContainer>
  );
};

export default Performance;
