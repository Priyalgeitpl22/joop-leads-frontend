import { useCallback, useEffect, useMemo, useState } from "react";
import { EmailAccountsDialogContainer } from "../SetupStep.styled";
import {
  DataTable,
  type Column,
} from "../../../../../components/common/DataTable/DataTable";
import type { Account } from "../../../../../types";
import { inboxService } from "../../../../../services/inbox.service";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";

interface Props {
  selectedSenderAccounts: Account[] | [];
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
  const selectedIds = useMemo(
    () => selectedSenderAccounts.map((acc) => acc._id || '').filter(Boolean),
    [selectedSenderAccounts]
  );
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const columns: Column[] = [
    { key: "name", label: "Name", searchable: true, sortable: true },
    { key: "email", label: "Email", searchable: true, sortable: true },
    { key: "minDelaySeconds", label: "Time Gap", sortable: true },
    { key: "dailyLimit", label: "Daily Limit", sortable: true },
    { key: "warmupStatus", label: "Warmup Status", sortable: true },
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
          warmupStatus: account.warmup?.enabled ? 'On' : 'Off',
        }))}
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
