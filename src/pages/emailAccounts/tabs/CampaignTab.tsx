import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { campaignSenderService } from '../../../services/campaign.sender.service';
import {
  CampaignContainer,
  TableContainer,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  StatusBadge,
  EmptyState,
  LoadingContainer,
  Spinner,
} from './CampaignTab.styled';

interface CampaignTabProps {
  accountId: string;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export const CampaignTab: React.FC<CampaignTabProps> = ({ accountId }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!accountId) return;

      setIsLoading(true);
      try {
        const response = await campaignSenderService.getAllCampaignSenders(accountId);
        setCampaigns(response as unknown as Campaign[] || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
    }, [accountId]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${day}, ${time}`;
  };

  if (isLoading) {
    return (
      <CampaignContainer>
        <TableContainer>
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        </TableContainer>
      </CampaignContainer>
    );
  }

  if (campaigns.length === 0) {
    return (
      <CampaignContainer>
        <TableContainer>
          <EmptyState>
            <Mail size={48} />
            <h3>No Campaigns Found</h3>
            <p>This email account is not associated with any campaigns yet.</p>
          </EmptyState>
        </TableContainer>
      </CampaignContainer>
    );
  }

  return (
    <CampaignContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeadCell>Campaign Name</TableHeadCell>
              <TableHeadCell>Campaign Status</TableHeadCell>
              <TableHeadCell>Time Added</TableHeadCell>
            </tr>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>
                  <StatusBadge $status={campaign.status?.toLowerCase()}>
                    {campaign.status}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDate(campaign.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CampaignContainer>
  );
};

export default CampaignTab;

