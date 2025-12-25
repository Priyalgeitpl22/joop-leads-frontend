import {
  SenderAccountsContainer,
  SenderAccountsHeader,
} from "../CampaignDetails.styled";
import DataTable from "../../../../components/common/DataTable/DataTable";
import { useEffect, useState } from "react";
import { campaignService } from "../../../../services/campaign.service";
import type { CampaignSenderWithStats } from "../../../../interfaces";
import { useNavigate } from 'react-router-dom';
interface SenderAccountsProps {
  campaignId: string;
}

const SenderAccounts: React.FC<SenderAccountsProps> = ({ campaignId }) => {
  const [campaignSenders, setCampaignSenders] = useState<
    CampaignSenderWithStats[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    { key: "name", label: "Name" },
    { 
      key: "email", 
      label: "Email",
      render: (value: unknown, row: Record<string, unknown>) => (
        <span 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/accounts/${row.id}`);
          }}
          style={{ color: '#0066cc', cursor: 'pointer' }}
        >
          {value as string}
        </span>
      )
    },    { key: "provider", label: "Provider" },
    { key: "dailyLimit", label: "Overall Daily Limit/Day" },
    // { key: "campaignUsed", label: "Campaign Used" },
    { key: "uniqueLeads", label: "Associated Leads" },
  ];

  useEffect(() => {
    const fetchCampaignSenders = async () => {
      setIsLoading(true);
      const data = await campaignService.getCampaignSenders(campaignId);
      setCampaignSenders(data);
      setIsLoading(false);
    };

    fetchCampaignSenders();
  }, [campaignId]);

  return (
    <SenderAccountsContainer>
      <SenderAccountsHeader>
        <h2>Sender Email Accounts To Check</h2>
      </SenderAccountsHeader>

      <DataTable
        columns={columns}
        showHeader={false}
        showCount={true}
        data={campaignSenders.map((sender: CampaignSenderWithStats) => ({
          id: sender.accountId,
          senderId: sender.accountId,
          // accountId: sender.accountId,
          name: sender.name,
          email: sender.email,
          provider: sender.provider,
          dailyLimit: sender.dailyLimit,
          uniqueLeads: sender.stats.uniqueLeads,
        }))}
        loading={isLoading}
      />
    </SenderAccountsContainer>
  );
};

export default SenderAccounts;
