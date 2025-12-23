import React, { useState } from "react";
import { Table, TableHead, TableBody, Typography } from "@mui/material";
import { Search, Download, Filter, Users } from "lucide-react";
import {
  LeadListContainer,
  LeadListCard,
  LeadListHeader,
  LeadListTitle,
  SearchBox,
  ActionButtons,
  ActionButton,
  StyledTableContainer,
  StyledTableCell,
  HeaderCell,
  StyledTableRow,
  LeadInfo,
  LeadName,
  LeadEmail,
  LeadCompany,
  StatusBadge,
  SequenceStatus,
  EmptyState,
  Pagination,
  PaginationInfo,
} from "./LeadList.styled";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: string;
  currentSequence: string;
  lastActivity: string;
}

interface LeadListProps {
  leads?: Lead[];
  totalCount?: number;
}

const LeadList: React.FC<LeadListProps> = ({ leads = [], totalCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusType = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "active";
      case "completed":
        return "completed";
      case "blocked":
        return "blocked";
      case "unsubscribed":
        return "unsubscribed";
      default:
        return "active";
    }
  };

  return (
    <LeadListContainer>
      <LeadListCard>
        <LeadListHeader>
          <LeadListTitle>
            Lead List <span>({totalCount || leads.length})</span>
          </LeadListTitle>

          <ActionButtons>
            <SearchBox>
              <Search size={16} color="#999" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>
            <ActionButton>
              <Filter size={16} />
              Filter
            </ActionButton>
            <ActionButton>
              <Download size={16} />
              Export
            </ActionButton>
          </ActionButtons>
        </LeadListHeader>

        <StyledTableContainer>
          {filteredLeads.length > 0 ? (
            <Table>
              <TableHead>
                <StyledTableRow>
                  <HeaderCell>Lead</HeaderCell>
                  <HeaderCell>Company</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                  <HeaderCell>Current Sequence</HeaderCell>
                  <HeaderCell>Last Activity</HeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <StyledTableRow key={lead.id}>
                    <StyledTableCell>
                      <LeadInfo>
                        <LeadName>
                          {lead.firstName} {lead.lastName}
                        </LeadName>
                        <LeadEmail>{lead.email}</LeadEmail>
                      </LeadInfo>
                    </StyledTableCell>
                    <StyledTableCell>
                      <LeadCompany>{lead.company}</LeadCompany>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusBadge status={getStatusType(lead.status)}>
                        {lead.status}
                      </StatusBadge>
                    </StyledTableCell>
                    <StyledTableCell>
                      <SequenceStatus>{lead.currentSequence}</SequenceStatus>
                    </StyledTableCell>
                    <StyledTableCell>
                      <SequenceStatus>{lead.lastActivity}</SequenceStatus>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState>
              <Users size={48} />
              <Typography variant="h6">No leads found</Typography>
              <Typography color="textSecondary">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "Add leads to your campaign to see them here"}
              </Typography>
            </EmptyState>
          )}
        </StyledTableContainer>

        {filteredLeads.length > 0 && (
          <Pagination>
            <PaginationInfo>
              Showing {filteredLeads.length} of {totalCount || leads.length} leads
            </PaginationInfo>
          </Pagination>
        )}
      </LeadListCard>
    </LeadListContainer>
  );
};

export default LeadList;

