import { HelpCircle } from "lucide-react";
import type { SenderAccount } from "../../../../interfaces";
import {
  SenderAccountsContainer,
  SenderAccountsHeader,
  SenderAccountsTabs,
  SenderAccountsTab,
  SenderAccountsTable,
  SenderAccountsTableHeader,
  SenderAccountsTableHeaderCell,
  SenderAccountsTableRow,
  SenderAccountInfo,
  DailyLimitCell,
  TableCellValue,
} from "../CampaignDetails.styled";

interface SenderAccountsProps {
  senderAccounts: SenderAccount[];
}

const SenderAccounts: React.FC<SenderAccountsProps> = ({ senderAccounts }) => {
  return (
    <SenderAccountsContainer>
      <SenderAccountsHeader>
        <h2>Sender Email Accounts To Check</h2>
      </SenderAccountsHeader>

      <SenderAccountsTabs>
        {senderAccounts.map((account: SenderAccount) => (
          <SenderAccountsTab
            key={account.id}
            $isActive={true}
            $hasWarning={false}
            onClick={() => {}}
          >
            {account.email}
          </SenderAccountsTab>
        ))}
      </SenderAccountsTabs>

      <SenderAccountsTable>
        <SenderAccountsTableHeader>
          <SenderAccountsTableHeaderCell>
            Name & Email
          </SenderAccountsTableHeaderCell>
          <SenderAccountsTableHeaderCell>
            Overall Daily Limit/Day
          </SenderAccountsTableHeaderCell>
          <SenderAccountsTableHeaderCell>
            Campaign Used
            <HelpCircle size={14} />
          </SenderAccountsTableHeaderCell>
          <SenderAccountsTableHeaderCell>
            Minimum Time Gap (min)
          </SenderAccountsTableHeaderCell>
          <SenderAccountsTableHeaderCell>
            Associated Leads
            <HelpCircle size={14} />
          </SenderAccountsTableHeaderCell>
        </SenderAccountsTableHeader>

        {senderAccounts.map((account: SenderAccount) => (
          <SenderAccountsTableRow key={account.id}>
            <SenderAccountInfo>
              <div className="name">{account.name}</div>
              <div className="email">{account.email}</div>
            </SenderAccountInfo>
            <DailyLimitCell>
              <div className="limit-bar">
                <div
                  className="limit-fill"
                  style={{
                    width: `${
                      (account.emailSends?.length || 0 / account.dailyLimit || 0) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="limit-text">
                {account.emailSends?.length || 0}/{account.dailyLimit}
              </div>
            </DailyLimitCell>
            <TableCellValue>{account.emailSends?.length || 0}</TableCellValue>
            <TableCellValue>{account.minDelaySeconds || 0}</TableCellValue>
            <TableCellValue>{account.emailSends?.length || 0}</TableCellValue>
          </SenderAccountsTableRow>
        ))}

        {senderAccounts.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
            No sender accounts found.
          </div>
        )}
      </SenderAccountsTable>
    </SenderAccountsContainer>
  );
};

export default SenderAccounts;
