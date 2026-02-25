import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { campaignSenderService } from '../../../services/campaign.sender.service';
import type { CampaignSender } from '../../../interfaces';
import {
  CampaignContainer,
  TableContainer,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
  LoadingContainer,
  Spinner,
} from './CampaignTab.styled';
import { StatusBadge } from '../../../components/common';
import { getCampaignStatusLabel } from '../../../utils/labels';

interface CampaignTabProps {
  accountId: string;
}

export const CampaignTab: React.FC<CampaignTabProps> = ({ accountId }) => {
  const [campaigns, setCampaigns] = useState<CampaignSender[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!accountId) return;

      setIsLoading(true);
      try {
        const response = await campaignSenderService.getAllCampaignSenders(accountId);
        setCampaigns(response || []);
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
            {campaigns.map((campaignSender) => (
              <TableRow key={campaignSender.id}>
                <TableCell>{campaignSender.name || 'Unnamed Campaign'}</TableCell>
                <TableCell>
                  <StatusBadge $status={campaignSender.campaign?.status || ''}>
                    {getCampaignStatusLabel(campaignSender.campaign?.status || '')}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDate(campaignSender.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CampaignContainer>
  );
};

export default CampaignTab;

