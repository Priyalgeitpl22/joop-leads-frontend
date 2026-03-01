import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Linkedin,
  Globe,
  Lock,
  Check,
  Circle,
} from "lucide-react";
import {
  LeadListContainer,
  LeadListCard,
  LeadListHeader,
  ActionButtons,
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
} from "./LeadList.styled";
import type { CampaignLead } from "../../../../interfaces";
import campaignService from "../../../../services/campaign.service";
import {
  StatusBadge,
  type FilterPanelFieldConfig,
  FilterPanelPopover,
  SearchBox,
  type FilterPanelValues,
} from "../../../../components/common";
import { SectionHeaderTitle } from "../../../../styles/GlobalStyles";
import { LinkField } from "../../../leads/components/LeadDetailsPanel.styled";
import { LeadStatus } from "../../../../types/enums";
export interface LeadListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin?: string;
  website?: string;
  emailProvider?: string;
  lockStatus?: string;
  status: "active" | "inprogress" | "completed" | "blocked" | "unsubscribed";
  currentSequence: number;
  totalSequences: number;
  emailAccountUsed: string;
}

interface LeadListProps {
  campaignId: string;
}

const filterConfig: FilterPanelFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: LeadStatus.PENDING, label: "Pending" },
      { value: LeadStatus.SENT, label: "Sent" },
      { value: LeadStatus.OPENED, label: "Opened" },
      { value: LeadStatus.CLICKED, label: "Clicked" },
      { value: LeadStatus.REPLIED, label: "Replied" },
      { value: LeadStatus.BOUNCED, label: "Bounced" },
    ],
    placeholder: "All statuses",
  },
  // {
  //   key: "sequence",
  //   label: "Sequence",
  //   type: "multi",
  //   options: campaign?.sequences?.map((sequence) => ({ value: sequence.id, label: sequence.name })),
  //   placeholder: "All sequences",
  // },
];

export const LeadList: React.FC<LeadListProps> = ({ campaignId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [campaignLeads, setCampaignLeads] = useState<CampaignLead[]>([]);
  const [filterValues, setFilterValues] = useState<FilterPanelValues>({
    status: null,
  });

  useEffect(() => {
    campaignService
      .getLeadsGroupedBySender(campaignId, filterValues)
      .then((response) => {
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

  const renderSequenceSteps = (
    currentSequence: number,
    totalSequences: number,
  ) => {
    const steps = [];
    for (let i = 1; i <= totalSequences; i++) {
      if (i < currentSequence) {
        steps.push(
          <SequenceStepCompleted key={i}>
            <Check size={12} />
            {i}. Email
          </SequenceStepCompleted>,
        );
      } else if (i === currentSequence) {
        steps.push(
          <SequenceStepActive key={i}>
            <Circle size={12} fill="currentColor" />
            {i}. Email
          </SequenceStepActive>,
        );
      } else {
        steps.push(
          <SequenceStepPending key={i}>{i}. Email</SequenceStepPending>,
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
              <SearchBox
                placeholder="Search campaign leads..."
                value={searchQuery}
                onChange={setSearchQuery}
                minWidth="250px"
              />
            <FilterPanelPopover
              filters={filterConfig}
              values={filterValues}
              onApply={setFilterValues}
              triggerLabel="Open filters"
            />
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
                          {campaignLead?.lead.firstName}{" "}
                          {campaignLead?.lead.lastName}
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
                          {campaignLead?.lead.linkedinUrl ? (
                            <LinkField
                              href={campaignLead?.lead.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span
                                style={{
                                  flex: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {campaignLead?.lead.linkedinUrl}
                              </span>
                            </LinkField>
                          ) : (
                            <OtherDetailText>--</OtherDetailText>
                          )}
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Globe size={16} />
                          </OtherDetailIcon>
                          {campaignLead?.lead.website ? (
                            <LinkField
                              href={campaignLead?.lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span
                                style={{
                                  flex: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {campaignLead?.lead.website}
                              </span>
                            </LinkField>
                          ) : (
                            <OtherDetailText>--</OtherDetailText>
                          )}
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Mail size={16} />
                          </OtherDetailIcon>
                          <LinkField
                            href={`/accounts/${campaignLead?.lead.email}`}
                          >
                            {campaignLead?.lead.email || "--"}
                          </LinkField>
                        </OtherDetailItem>
                        <OtherDetailItem>
                          <OtherDetailIcon>
                            <Lock size={16} />
                          </OtherDetailIcon>
                          <StatusBadge
                            $status={
                              campaignLead?.lead.isBlocked
                                ? "blocked"
                                : "active"
                            }
                          >
                            {campaignLead?.lead.isBlocked
                              ? "Blocked"
                              : "Active"}
                          </StatusBadge>
                        </OtherDetailItem>
                      </OtherDetailsList>
                    </OtherDetailsCell>
                    <StatusCell>
                      <StatusBadge $status={campaignLead?.leadStatus || ""}>
                        {campaignLead?.leadStatus || ""}
                      </StatusBadge>
                    </StatusCell>
                  </TableRow>
                  <TableRow $isDetailRow>
                    <TableCell colSpan={3}>
                      <SequenceSection>
                        <SequenceLabel>Sequence Status:</SequenceLabel>
                        {renderSequenceSteps(
                          campaignLead?.currentSequenceStep || 0,
                          campaignLead.totalSequences || 0,
                        )}
                      </SequenceSection>
                      {campaignLead?.senders?.map((sender: any) => (
                        <EmailAccountSection key={sender.senderEmail}>
                          <EmailAccountLabel>
                            Email Account Used:
                          </EmailAccountLabel>
                          <EmailAccountValue>
                            {sender.senderEmail}
                          </EmailAccountValue>
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
                ? "Try adjusting your search criteria"
                : "Add campaignLeads to your campaign to see them here"}
            </EmptyStateDescription>
          </EmptyState>
        )}
      </LeadListCard>
    </LeadListContainer>
  );
};

export default LeadList;
