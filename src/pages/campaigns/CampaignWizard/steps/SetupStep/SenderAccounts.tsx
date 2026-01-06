import { useCallback, useEffect, useState } from "react";
import { EmailAccountsDialogContainer } from "./SetupStep.styled";
import {
  DataTable,
  type Column,
} from "../../../../../components/common/DataTable/DataTable";
import { EmailAccountState, EmailAccountType, type Account } from "../../../../../types";
import { inboxService } from "../../../../../services/inbox.service";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";

interface Props {
  selectedSenderAccounts: Account[];
  onSelectionChange: (selectedAccounts: Account[]) => void;
  showSaveButton?: boolean;
  handleSaveSenderAccounts: () => void;
}

export default function SenderAccounts({
  selectedSenderAccounts,
  onSelectionChange,
  showSaveButton = false,
  handleSaveSenderAccounts = () => {},
}: Props) {
  const [senderAccounts, setSenderAccounts] = useState<Account[]>([]);
  const selectedIds = selectedSenderAccounts.map((acc) => acc._id).filter(Boolean);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const getTypeIcon = (type: string) => {
    const iconStyle = { display: "flex", alignItems: "center", gap: "8px" };
    
    switch (type) {
      case EmailAccountType.GMAIL:
        return (
          <span style={iconStyle}>
            <img src="/Images/mail.png" alt="Gmail" width={18} height={18} />
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

  const columns: Column[] = [
    { key: "name", label: "Name", searchable: true, sortable: true },
    { key: "email", label: "Email", searchable: true, sortable: true },
    { key: "minDelaySeconds", label: "Time Gap", sortable: true },
    { 
      key: "type", 
      label: "Type",
      render: (value: unknown) => getTypeIcon(value as string),
    },
    { key: "dailyLimit", label: "Daily Limit", sortable: true },
    { key: "state", label: "State", sortable: true },
    { key: "warmupStatus", label: "Warmup enabled", sortable: true },
  ];

  useEffect(() => {
    const fetchEmailAccounts = async () => {
      if (!currentUser?.orgId) return;
      const emailaccounts = await inboxService.getEmailAccounts(currentUser.orgId);
      setIsLoading(false);
      setSenderAccounts(emailaccounts.data);
    };
    fetchEmailAccounts();
  }, []);

  const handleSelectionChange = useCallback(
    (ids: string[]) => {
      const selectedAccounts = senderAccounts.filter((account: Account) =>
        ids.includes(account._id || "")
      );
      onSelectionChange(selectedAccounts);
    },
    [senderAccounts, onSelectionChange]
  );

  return (
    <EmailAccountsDialogContainer>
      <DataTable
        title="Sender Accounts"
        columns={columns}
        data={senderAccounts.map((account: Account) => ({
          id: account._id || '',
          name: account.name || "",
          email: account.email || "",
          minDelaySeconds: account.time_gap || 0,
          dailyLimit: account.limit || 0,
          state: account.state || '',
          warmupStatus: account.warmup?.enabled ? 'On' : 'Off',
        }))}
        isRowDisabled={(row: Record<string, unknown>) => row.state === EmailAccountState.REAUTH_REQUIRED}
        loading={isLoading}
        searchable
        searchPlaceholder="Search sender accounts..."
        searchKeys={["name", "email"]}
        selectable
        showSaveButton={showSaveButton}
        handleSaveSenderAccounts={handleSaveSenderAccounts}
        selectedRows={selectedIds as string[]}
        onSelectionChange={handleSelectionChange}
        paginated
        pageSize={10}
        sortable
      />
    </EmailAccountsDialogContainer>
  );
}
