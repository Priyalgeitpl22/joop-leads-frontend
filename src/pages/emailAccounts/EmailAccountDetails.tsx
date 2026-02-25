import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { emailAccountService } from "../../services/email.account.service";
import {
  OverviewTab,
  GeneralTab,
  CampaignTab,
  WarmupTab,
  AttentionRequiredTab,
} from "./tabs";
import {
  PageContainer,
  HeaderRow,
  LeftSection,
  BackButton,
  TabsContainer,
  Tab,
  TabAttention,
  EmailDisplay,
  ContentContainer,
  LoadingContainer,
  Spinner,
} from "./EmailAccountDetails.styled";
import { EmailAccountType, EmailAccountState, type Account } from "../../types";

type TabType =
  | "overview"
  | "general"
  | "warmup"
  | "campaign"
  | "attention_required";

export const EmailAccountDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [emailAccount, setEmailAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmailAccountDetails = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const account = await emailAccountService.getEmailAccountById(id);
      setEmailAccount(account);
    } catch (error: unknown) {
      console.error("Failed to fetch email account details:", error);
      toast.error("Failed to load email account details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEmailAccountDetails();
    }
  }, [id, fetchEmailAccountDetails]);

  const showAttentionRequiredTab = emailAccount?.state === EmailAccountState.REAUTH_REQUIRED;

  useEffect(() => {
    if (emailAccount && activeTab === "attention_required" && !showAttentionRequiredTab) {
      setActiveTab("overview");
    }
  }, [emailAccount, activeTab, showAttentionRequiredTab]);

  const handleUpdate = (data?: Account) => {
    if (data) {
      setEmailAccount(data);
    }
  };

  const handleReactivateAccount = async () => {
    try {
      if (!emailAccount?.orgId) return;
      if (emailAccount?.type === EmailAccountType.GMAIL || emailAccount?.type === EmailAccountType.OUTLOOK) {
        const url = await emailAccountService.getGoogleOAuthUrl(
          emailAccount.orgId,
        );
        if (url) window.location.href = url;
      }
    } catch (err) {
      console.error("Error fetching Google OAuth URL:", err);
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      );
    }

    if (!emailAccount) {
      return <div>Email account not found</div>;
    }

    switch (activeTab) {
      case "overview":
        return <OverviewTab accountId={id!} emailAccount={emailAccount} />;
      case "general":
        return (
          <GeneralTab
            accountId={id!}
            emailAccount={emailAccount}
            onUpdate={(data?: Account) => handleUpdate(data)}
          />
        );
      case "warmup":
        return (
          <WarmupTab
            accountId={id!}
            emailAccount={emailAccount as unknown as Account}
            onUpdate={(data?: Account) => handleUpdate(data)}
          />
        );
      case "campaign":
        return <CampaignTab accountId={id!} />;
      case "attention_required":
        return (
          <AttentionRequiredTab
            accountId={id!}
            emailAccount={emailAccount}
            onUpdatePassword={() => setActiveTab("general")}
            onReactivateAccount={() => handleReactivateAccount()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <HeaderRow>
        <LeftSection>
          <BackButton onClick={() => navigate("/accounts")}>
            <ArrowLeft size={20} />
          </BackButton>
          <TabsContainer>
            <Tab
              $isActive={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Tab>
            <Tab
              $isActive={activeTab === "general"}
              onClick={() => setActiveTab("general")}
            >
              General
            </Tab>
            <Tab
              $isActive={activeTab === "warmup"}
              onClick={() => setActiveTab("warmup")}
            >
              Warm Up
            </Tab>
            <Tab
              $isActive={activeTab === "campaign"}
              onClick={() => setActiveTab("campaign")}
            >
              Campaign
            </Tab>
            {showAttentionRequiredTab && (
              <TabAttention
                $isActive={activeTab === "attention_required"}
                onClick={() => setActiveTab("attention_required")}
              >
                Attention Required
              </TabAttention>
            )}
          </TabsContainer>
        </LeftSection>
        {emailAccount && (
          <EmailDisplay>
            {emailAccount.name} ({emailAccount.email})
          </EmailDisplay>
        )}
      </HeaderRow>

      <ContentContainer>{renderTabContent()}</ContentContainer>
    </PageContainer>
  );
};

export default EmailAccountDetails;
