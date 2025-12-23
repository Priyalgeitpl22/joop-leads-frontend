import React, { useState } from 'react';
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
  StatusBadge,
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
  campaignLeads?: CampaignLead[];
  totalCount?: number;
  onExport?: () => void;
}

export const LeadList: React.FC<LeadListProps> = ({
  campaignLeads,
  totalCount,
  onExport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const filteredLeads = campaignLeads?.filter(
    (lead: CampaignLead) =>
      `${lead?.lead?.firstName} ${lead?.lead?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead?.lead?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      // TODO: Implement export functionality
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
          <LeadListTitle>
            Lead List <span>({totalCount || campaignLeads?.length || 0})</span>
          </LeadListTitle>

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

        {filteredLeads?.length && filteredLeads?.length > 0 ? (
          <LeadListTable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Lead Details</TableHeaderCell>
                <TableHeaderCell>Other Details</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {filteredLeads?.map((lead: CampaignLead) => (
                <React.Fragment key={lead?.id}>
                  <TableRow>
                    <LeadDetailsCell>
                      <CheckboxInput
                        type="checkbox"
                        checked={selectedLeads.has(lead?.id)}
                        onChange={() => handleSelectLead(lead?.id)}
                      />
                      <LeadInfo>
                        <LeadName>
                          {lead?.lead?.firstName} {lead?.lead?.lastName}
                        </LeadName>
                        <LeadEmail>
                          <Mail size={14} />
                          {lead?.lead?.email}
                        </LeadEmail>
                      </LeadInfo>
                    </LeadDetailsCell>
                    <OtherDetailsCell>
                      <OtherDetailsList>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Linkedin size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{lead?.lead?.linkedinUrl || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Globe size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{lead?.lead?.website || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Mail size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{lead?.lead?.email || '--'}</OtherDetailText>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Lock size={16} />
                          </OtherDetailIcon>
                          <OtherDetailText>{lead?.lead?.isBlocked ? 'Blocked' : 'Unlocked'}</OtherDetailText>
                        </OtherDetailItem>
                      </OtherDetailsList>
                    </OtherDetailsCell>
                    <StatusCell>
                      <StatusBadge $status={lead?.status || ''}>{lead?.status || ''}</StatusBadge>
                    </StatusCell>
                  </TableRow>
                  <TableRow $isDetailRow>
                    <TableCell colSpan={3}>
                      <SequenceSection>
                        <SequenceLabel>Sequence Status:</SequenceLabel>
                        {renderSequenceSteps(lead?.currentSequenceStep || 0, lead?.campaign?.sequences?.length || 0)}
                      </SequenceSection>
                      <EmailAccountSection>
                        <EmailAccountLabel>Email Account Used:</EmailAccountLabel>
                        <EmailAccountValue>{lead?.lead?.email || '--'}</EmailAccountValue>
                      </EmailAccountSection>
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
            <EmptyStateTitle>No campaignLeads found</EmptyStateTitle>
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

