import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { emailAccountService } from "../../services/email.account.service";
import type { Account } from "../../types/emailAccount.types";
import { EmailAccountType } from "../../types/emailAccount.types";
import { AddAccountDialog, SmtpDialog, OutlookDialog } from "./components";
import {
  PageContainer,
  TabsContainer,
  TabsList,
  Tab,
  TabsActions,
  AddButton,
} from "./EmailAccounts.styled";
import DataTable from "../../components/common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import senderAccountService from "../../services/sender.account.service";
import { deleteEmailAccount, fetchEmailAccounts } from "../../store/slices/emailAccountSlice";
import toast from "react-hot-toast";
import { campaignSenderService } from "../../services/campaign.sender.service";
import DeleteDialog from "../common/DeleteDialog";
import { Dialog } from "../../components/common";

type TabType = "accounts";

export const EmailAccounts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState<TabType>("accounts");
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  const checkOauthSuccess = async () => {
    const params = new URLSearchParams(window.location.search);
    const oauthSuccess = params.get("auth_success");
    const accountEmail = params.get("account");

    if (oauthSuccess && accountEmail) {
      const response = await emailAccountService.getEmailAccountByEmail(
        accountEmail
      );
      await senderAccountService.createSenderAccount(response);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  useEffect(() => {
    if (!currentUser?.orgId) return;

    const load = async () => {
      setIsLoading(true);
      await checkOauthSuccess();
      const accounts = await emailAccountService.getEmailAccounts(
        currentUser.orgId
      );
      setFilteredAccounts(accounts);
      setIsLoading(false);
    };

    load();
  }, [currentUser?.orgId]);

  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [isSmtpDialogOpen, setIsSmtpDialogOpen] = useState(false);
  const [isOutlookDialogOpen, setIsOutlookDialogOpen] = useState(false);
  const [accountHasActiveCampaign, setAccountHasActiveCampaign] =
    useState(false);
  const [activeCampaignNames, setActiveCampaignNames] = useState<string[]>([]);

  const handleAddAccount = () => {
    setIsAddAccountDialogOpen(true);
  };

  const getTypeIcon = (type: string) => {
    const iconStyle = { display: "flex", alignItems: "center", gap: "8px" };
    
    switch (type) {
      case EmailAccountType.GMAIL:
        return (
          <span style={iconStyle}>
            <img src="/Images/mail.png" alt="Gmail" width={20} height={20} />
            Gmail
          </span>
        );
      case EmailAccountType.OUTLOOK:
        return (
          <span style={iconStyle}>
            <img src="/Images/outlook.webp" alt="Outlook" width={20} height={20} />
            Outlook
          </span>
        );
      case EmailAccountType.IMAP:
        return (
          <span style={iconStyle}>
            <img src="/Images/imap.png" alt="IMAP" width={20} height={20} />
            IMAP
          </span>
        );
      case EmailAccountType.SMTP:
        return (
          <span style={iconStyle}>
            <img src="/Images/smtp.png" alt="SMTP" width={20} height={20} />
            SMTP
          </span>
        );
      default:
        return type;
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email Address" },
    { 
      key: "type", 
      label: "Type",
      render: (value: unknown) => getTypeIcon(value as string),
    },
    { key: "state", label: "State" },
    { key: "dailyLimit", label: "Daily Limit" },
    { key: "warmupEnabled", label: "Warmup Enabled" },
    { key: "reputation", label: "Reputation" },
  ];

  const handleRowClick = (row: Record<string, unknown>) => {
    navigate(`/accounts/${row.id || row._id}`);
  };

  const handleEditAccount = (row: Record<string, unknown>) => {
    navigate(`/accounts/${row.id || row._id}`);
  };

  const handleDeleteClick = async (account: Account & { id?: string }) => {
    if (!account?.id) return;

    try {
      const campaigns = await campaignSenderService.getAllCampaignSenders(
        account.id,
      );

      const activeCampaigns = campaigns.filter((c) =>
        ["SCHEDULED", "ACTIVE", "PAUSED"].includes(c.status),
      );

      if (activeCampaigns.length > 0) {
        setAccountHasActiveCampaign(true);
        setActiveCampaignNames(activeCampaigns.map((c) => c.name));
      } else {
        setAccountHasActiveCampaign(false);
        setActiveCampaignNames([]);
      }

      setAccountToDelete(account);
      setDeleteAccountDialogOpen(true);
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to check campaigns");
    }
  };

  const handleConfirmDeleteAccount = async () => {
    if (!accountToDelete) return;

    try {
      if (!accountToDelete?._id) {
        toast.error("Cannot delete: account ID is missing");
        return;
      }
      await dispatch(deleteEmailAccount(accountToDelete._id)).unwrap();
      toast.success("Account deleted successfully");
      setDeleteAccountDialogOpen(false);
      setAccountToDelete(null);
      const result = await dispatch(
        fetchEmailAccounts(currentUser!.orgId),
      ).unwrap();
      setFilteredAccounts(result);
    } catch (error) {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to delete account");
    }
  };

  const handleCancelDeleteAccount = () => {
    setDeleteAccountDialogOpen(false);
    setAccountToDelete(null);
  };

  return (
    <PageContainer>
      <TabsContainer>
        <TabsList>
          <Tab
            $isActive={activeTab === "accounts"}
            onClick={() => setActiveTab("accounts")}
          >
            Email Accounts ({filteredAccounts?.length})
          </Tab>
        </TabsList>

        <TabsActions>
          <AddButton onClick={handleAddAccount}>Add Account</AddButton>
        </TabsActions>
      </TabsContainer>
      <DataTable
        columns={columns}
        data={(filteredAccounts || []).map((account) => ({
          ...account,
          senderId: account.id,
          id: account._id,
          name: account.name,
          email: account.email,
          type: account.type,
          state: account.state,
          timeGap: account.time_gap,
          dailyLimit: account.limit,
          warmupEnabled: account.warmup?.enabled ? "Yes" : "No",
          reputation: account.warmup?.reputation || 0,
        }))}
        loading={isLoading}
        searchable={true}
        searchPlaceholder="Search Email Account"
        searchKeys={["name", "email"]}
        showRowActions
        onRowClick={handleRowClick}
        onEdit={handleEditAccount}
        onDelete={(row) => handleDeleteClick(row as unknown as Account)}
      />

      <AddAccountDialog
        open={isAddAccountDialogOpen}
        onClose={() => setIsAddAccountDialogOpen(false)}
        onOpenSmtp={() => setIsSmtpDialogOpen(true)}
        onOpenOutlook={() => setIsOutlookDialogOpen(true)}
      />

      <SmtpDialog
        open={isSmtpDialogOpen}
        onClose={() => setIsSmtpDialogOpen(false)}
        onAccountCreated={(newAccount) => {
          const account = newAccount as Account;
          setFilteredAccounts((prev) => [...prev, account]);
        }}
      />

      <OutlookDialog
        open={isOutlookDialogOpen}
        onClose={() => setIsOutlookDialogOpen(false)}
      />

      {deleteAccountDialogOpen && !accountHasActiveCampaign && (
        <DeleteDialog
          isOpen={deleteAccountDialogOpen}
          onConfirm={handleConfirmDeleteAccount}
          onClose={handleCancelDeleteAccount}
          message="Are you sure you want to delete this account?"
        />
      )}

      {deleteAccountDialogOpen && accountHasActiveCampaign && (
        <Dialog
          isOpen={deleteAccountDialogOpen}
          onClose={handleCancelDeleteAccount}
          title="Cannot Delete Account"
          footer={<button onClick={handleCancelDeleteAccount}>OK</button>}
        >
          <p>
            This account cannot be deleted because it is associated with active
            campaigns:
          </p>

          <ul>
            <strong>
              {activeCampaignNames.map((name, index) => (
                <span key={name}>
                  {name}
                  {index < activeCampaignNames.length - 1 && <br />}
                </span>
              ))}
            </strong>
          </ul>
        </Dialog>
      )}
    </PageContainer>
  );
};

export default EmailAccounts;
