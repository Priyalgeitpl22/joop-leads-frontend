import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { emailAccountService } from "../../services/email.account.service";
import type { Account } from "../../types/emailAccount.types";
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

type TabType = "accounts";

export const EmailAccounts: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState<TabType>("accounts");
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAddAccount = () => {
    setIsAddAccountDialogOpen(true);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email Address" },
    { key: "type", label: "Type" },
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

  const handleDeleteAccount = async (row: Record<string, unknown>) => {
    setIsLoading(true);
    await emailAccountService.deleteEmailAccount(row.id as string);
    await senderAccountService.deleteSenderAccount(row.id as string);
    setFilteredAccounts((prev) => prev.filter((account) => account._id !== row.id));
    setIsLoading(false);
  };

  return (
    <PageContainer>
      <TabsContainer>
        <TabsList>
          <Tab
            $isActive={activeTab === "accounts"}
            onClick={() => setActiveTab("accounts")}
          >
            Email Accounts ({filteredAccounts.length})
          </Tab>
        </TabsList>

        <TabsActions>
          <AddButton onClick={handleAddAccount}>Add Account</AddButton>
        </TabsActions>
      </TabsContainer>
      <DataTable
        columns={columns}
        data={filteredAccounts.map((account) => ({
          ...account,
          id: account._id,
          name: account.name,
          email: account.email,
          type: account.type,
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
        onDelete={handleDeleteAccount}
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
    </PageContainer>
  );
};

export default EmailAccounts;
