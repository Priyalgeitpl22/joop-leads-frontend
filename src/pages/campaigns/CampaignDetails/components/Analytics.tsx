import React from "react";
import { Info } from "lucide-react";
import {
  AnalyticsContainer,
  SectionCard,
  SectionHeader,
  SectionTitleGroup,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  InfoIconButton,
} from "./Analytics.styled";
import { SectionHeaderTitle } from "../../../../styles/GlobalStyles";
import type { CampaignAnalytics } from "../../../../interfaces";
import EmailAccountConnectivityBanner from "./common/EmailAccountConnectivityBanner";
import { emailAccountService } from "../../../../services/email.account.service";
import type { RootState } from "../../../../store";
import { useAppSelector } from "../../../../store";

interface AnalyticsProps {
  senderAccounts: {
    email: string;
    reason: string;
    senderId: string;
    accountId: string;
  }[];
  analyticsData: CampaignAnalytics;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  senderAccounts,
  analyticsData,
}) => {
  const { currentUser } = useAppSelector((state: RootState) => state.user);

  const handleReactivateAccount = async () => {
    try {
      if (!currentUser?.orgId) return;
      const url = await emailAccountService.getGoogleOAuthUrl(
        currentUser.orgId,
      );
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Error fetching Google OAuth URL:", err);
    }
  };

  return (
    <AnalyticsContainer>
      <EmailAccountConnectivityBanner
        accounts={senderAccounts}
        onReactivate={handleReactivateAccount}
      />
      <SectionCard>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionHeaderTitle>Overall Email Reach</SectionHeaderTitle>
          </SectionTitleGroup>
        </SectionHeader>

        <StatsGrid>
          <StatCard $borderColor="#6366f1">
            <StatValue>{analyticsData.sentCount || 0}</StatValue>
            <StatLabel>Total Leads Contacted</StatLabel>
          </StatCard>

          <StatCard $borderColor="#14b8a6">
            <StatValue>{analyticsData.repliedCount || 0}</StatValue>
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

          <StatCard $borderColor="#22c55e">
            <StatValue>{analyticsData.repliedCount || 0}</StatValue>
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
            <StatValue>{analyticsData.openedCount || 0}</StatValue>
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
