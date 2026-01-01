import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, Users, Mail, Linkedin, Globe, Lock, Check, Circle } from 'lucide-react';
import {
  LeadListContainer,
  LeadListCard,
  LeadListHeader,
  LeadListTitle,
  SearchBox,
  SearchIcon,
  SearchInput,
  ActionButtons,
  ActionButton,
  LeadListTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  LeadDetailsCell,
  CheckboxInput,
  LeadInfo,
  LeadName,
  LeadEmail,
  OtherDetailsCell,
  OtherDetailsList,
  OtherDetailItem,
  OtherDetailIcon,
  OtherDetailText,
  StatusCell,
  SequenceSection,
  SequenceLabel,
  SequenceSteps,
  SequenceStepCompleted,
  SequenceStepActive,
  SequenceStepPending,
  EmailAccountSection,
  EmailAccountLabel,
  EmailAccountValue,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from './LeadList.styled';
import type { CampaignLead } from '../../../../interfaces';
import campaignService from '../../../../services/campaign.service';
import { StatusBadge } from "../../../../styles/GlobalStyles";
import { SectionHeaderTitle } from "../../../../styles/GlobalStyles";
export interface LeadListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin?: string;
  website?: string;
  emailProvider?: string;
  lockStatus?: string;
  status: 'active' | 'inprogress' | 'completed' | 'blocked' | 'unsubscribed';
  currentSequence: number;
  totalSequences: number;
  emailAccountUsed: string;
}

interface LeadListProps {
  campaignId: string;
  totalCount?: number;
  onExport?: () => void;
}

export const LeadList: React.FC<LeadListProps> = ({
  campaignId,
  totalCount,
  onExport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [campaignLeads, setCampaignLeads] = useState<CampaignLead[]>([]);

  useEffect(() => {
    campaignService.getLeadsGroupedBySender(campaignId).then((response) => {
      setCampaignLeads(response.data?.groupedLeads || []);
    });
  }, [campaignId]);

  const handleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Export campaignLeads');
    }
  };

  const renderSequenceSteps = (currentSequence: number, totalSequences: number) => {
    const steps = [];
    for (let i = 1; i <= totalSequences; i++) {
      if (i < currentSequence) {
        steps.push(
          <SequenceStepCompleted key={i}>
            <Check size={12} />
            {i}. Email
          </SequenceStepCompleted>
        );
      } else if (i === currentSequence) {
        steps.push(
          <SequenceStepActive key={i}>
            <Circle size={12} fill="currentColor" />
            {i}. Email
          </SequenceStepActive>
        );
      } else {
        steps.push(
          <SequenceStepPending key={i}>
            {i}. Email
          </SequenceStepPending>
        );
      }
    }
    return <SequenceSteps>{steps}</SequenceSteps>;
  };

  return (
    <LeadListContainer>
      <LeadListCard>
        <LeadListHeader>
          <SectionHeaderTitle>Lead List</SectionHeaderTitle>

          <ActionButtons>
            <SearchBox>
              <SearchIcon>
                <Search size={16} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search campaignLeads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>
            <ActionButton>
              <Filter size={16} />
              Filter
            </ActionButton>
            <ActionButton onClick={handleExport}>
              <Download size={16} />
              Export
            </ActionButton>
          </ActionButtons>
        </LeadListHeader>

        {campaignLeads?.length && campaignLeads?.length > 0 ? (
          <LeadListTable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Lead Details</TableHeaderCell>
                <TableHeaderCell>Other Details</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {campaignLeads?.map((campaignLead: any) => (
                <React.Fragment key={campaignLead?.lead.id}>
                  <TableRow>
                    <LeadDetailsCell>
                      <CheckboxInput
                        type="checkbox"
                        checked={selectedLeads.has(campaignLead?.lead.id)}
                        onChange={() => handleSelectLead(campaignLead?.lead.id)}
                      />
                      <LeadInfo>
                        <LeadName>
                          {campaignLead?.lead.firstName} {campaignLead?.lead.lastName}
                        </LeadName>
                        <LeadEmail>
                          <Mail size={14} />
                          {campaignLead?.lead.email}
                        </LeadEmail>
                      </LeadInfo>
                    </LeadDetailsCell>
                    <OtherDetailsCell>
                      <OtherDetailsList>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Linkedin size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{campaignLead?.lead.linkedinUrl || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Globe size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{campaignLead?.lead.website || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Mail size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{campaignLead?.lead.email || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Lock size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{campaignLead?.lead.isBlocked ? 'Blocked' : 'Unlocked'}</OtherDetailText>
                        </OtherDetailItem>
                      </OtherDetailsList>
                    </OtherDetailsCell>
                    <StatusCell>
                      <StatusBadge $status={campaignLead?.leadStatus || ''}>{campaignLead?.leadStatus || ''}</StatusBadge>
                    </StatusCell>
                  </TableRow>
                  <TableRow $isDetailRow>
                    <TableCell colSpan={3}>
                      <SequenceSection>
                        <SequenceLabel>Sequence Status:</SequenceLabel>
                        {renderSequenceSteps(campaignLead?.currentSequenceStep || 0, campaignLead.totalSequences || 0)}
                      </SequenceSection>
                      {campaignLead?.senders?.map((sender: any) => (
                        <EmailAccountSection key={sender.senderEmail}>
                          <EmailAccountLabel>Email Account Used:</EmailAccountLabel>
                          <EmailAccountValue>{sender.senderEmail}</EmailAccountValue>
                        </EmailAccountSection>
                      ))}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </tbody>
          </LeadListTable>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <Users size={48} />
            </EmptyStateIcon>
            <EmptyStateTitle>No campaign Leads found</EmptyStateTitle>
            <EmptyStateDescription>
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Add campaignLeads to your campaign to see them here'}
            </EmptyStateDescription>
          </EmptyState>
        )}
      </LeadListCard>
    </LeadListContainer>
  );
};

export default LeadList;

