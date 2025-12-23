import React from "react";
import { Table, TableHead, TableBody, Typography, Button } from "@mui/material";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import {
  TriggerLogsContainer,
  SectionCard,
  SectionHeader,
  SectionTitle,
  TriggerLogsHeader,
  TriggerLogsTitle,
  StyledTableCell,
  HeaderCell,
  StyledTableRow,
  DateTimeCell,
  StatusDataCell,
  StatusBadge,
  StatusDetails,
  StatusDetailItem,
  TimezoneCell,
  ActivityLogLink,
  EmptyState,
  Pagination,
  PaginationInfo,
  PaginationButtons,
} from "./TriggerLogs.styled";

interface TriggerLog {
  id: string;
  dateTime: string;
  status: "Completed" | "Scheduled" | "Failed" | "In Progress";
  newLeadsCount?: number;
  emailsSent?: number;
  eligibleEmailAccounts?: number;
  timezone: string;
}

interface TriggerLogsProps {
  upcomingTriggers?: TriggerLog[];
  logs?: TriggerLog[];
  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onCheckActivityLog?: (logId: string) => void;
}

// Test data for upcoming triggers
const testUpcomingTriggers: TriggerLog[] = [
  {
    id: "u1",
    dateTime: "2025-12-18 15:40:00+05:30",
    status: "Scheduled",
    timezone: "Asia/Calcutta",
  },
  {
    id: "u2",
    dateTime: "2025-12-18 15:30:00+05:30",
    status: "Scheduled",
    timezone: "Asia/Calcutta",
  },
  {
    id: "u3",
    dateTime: "2025-12-18 15:20:00+05:30",
    status: "Scheduled",
    timezone: "Asia/Calcutta",
  },
  {
    id: "u4",
    dateTime: "2025-12-18 15:10:00+05:30",
    status: "Scheduled",
    timezone: "Asia/Calcutta",
  },
  {
    id: "u5",
    dateTime: "2025-12-18 15:00:00+05:30",
    status: "Scheduled",
    timezone: "Asia/Calcutta",
  },
];

// Test data for completed triggers
const testLogs: TriggerLog[] = [
  {
    id: "1",
    dateTime: "2025-12-16 19:00:00+05:30",
    status: "Completed",
    newLeadsCount: 4,
    emailsSent: 4,
    eligibleEmailAccounts: 4,
    timezone: "Asia/Calcutta",
  },
  {
    id: "2",
    dateTime: "2025-12-16 18:50:00+05:30",
    status: "Completed",
    newLeadsCount: 4,
    emailsSent: 4,
    eligibleEmailAccounts: 4,
    timezone: "Asia/Calcutta",
  },
  {
    id: "3",
    dateTime: "2025-12-16 18:40:00+05:30",
    status: "Completed",
    newLeadsCount: 4,
    emailsSent: 4,
    eligibleEmailAccounts: 4,
    timezone: "Asia/Calcutta",
  },
  {
    id: "4",
    dateTime: "2025-12-16 18:30:00+05:30",
    status: "Completed",
    newLeadsCount: 4,
    emailsSent: 4,
    eligibleEmailAccounts: 4,
    timezone: "Asia/Calcutta",
  },
  {
    id: "5",
    dateTime: "2025-12-16 18:20:00+05:30",
    status: "Completed",
    newLeadsCount: 4,
    emailsSent: 4,
    eligibleEmailAccounts: 4,
    timezone: "Asia/Calcutta",
  },
];

const TriggerLogs: React.FC<TriggerLogsProps> = ({
  upcomingTriggers = testUpcomingTriggers,
  logs = testLogs,
  totalCount = 0,
  currentPage = 1,
  onPageChange,
  onCheckActivityLog,
}) => {
  return (
    <TriggerLogsContainer>
      {/* Upcoming Triggers Section */}
      {upcomingTriggers && upcomingTriggers.length > 0 && (
        <SectionCard>
          <SectionHeader>
            <SectionTitle>Upcoming Triggers</SectionTitle>
          </SectionHeader>
          <Table>
            <TableHead>
              <StyledTableRow>
                <HeaderCell>Date & Time</HeaderCell>
                <HeaderCell>Status Data</HeaderCell>
                <HeaderCell>Timezone Of Trigger</HeaderCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {upcomingTriggers.map((trigger) => (
                <StyledTableRow key={trigger.id}>
                  <StyledTableCell>
                    <DateTimeCell>{trigger.dateTime}</DateTimeCell>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StatusBadge status={trigger.status}>{trigger.status}</StatusBadge>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TimezoneCell>{trigger.timezone}</TimezoneCell>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      )}

      {/* Last 20 Triggers Status Section */}
      <SectionCard>
        <TriggerLogsHeader>
          <TriggerLogsTitle>Last 20 Triggers Status</TriggerLogsTitle>
        </TriggerLogsHeader>

        {logs && logs.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <HeaderCell>Date & Time</HeaderCell>
                  <HeaderCell>Status Data</HeaderCell>
                  <HeaderCell>Timezone Of Trigger</HeaderCell>
                  <HeaderCell>Activity Log</HeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <StyledTableRow key={log.id}>
                    <StyledTableCell>
                      <DateTimeCell>{log.dateTime}</DateTimeCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusDataCell>
                        <StatusBadge status={log.status}>{log.status}</StatusBadge>
                        <StatusDetails>
                          {log.newLeadsCount !== undefined && (
                            <StatusDetailItem>
                              New Leads Count: <span>{log.newLeadsCount}</span>
                            </StatusDetailItem>
                          )}
                          {log.emailsSent !== undefined && (
                            <StatusDetailItem>
                              No. of Email Send: <span>{log.emailsSent}</span>
                            </StatusDetailItem>
                          )}
                          {log.eligibleEmailAccounts !== undefined && (
                            <StatusDetailItem>
                              Total Eligible Email Accounts: <span>{log.eligibleEmailAccounts}</span>
                            </StatusDetailItem>
                          )}
                        </StatusDetails>
                      </StatusDataCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimezoneCell>{log.timezone}</TimezoneCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActivityLogLink onClick={() => onCheckActivityLog?.(log.id)}>
                        Check Activity Log
                      </ActivityLogLink>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>

            {totalCount > 20 && (
              <Pagination>
                <PaginationInfo>
                  Showing {logs.length} of {totalCount} logs
                </PaginationInfo>
                <PaginationButtons>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onPageChange?.(currentPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </PaginationButtons>
              </Pagination>
            )}
          </>
        ) : (
          <EmptyState>
            <Clock size={48} />
            <Typography variant="h6">No trigger logs yet</Typography>
            <Typography color="textSecondary">
              Trigger logs will appear here once your campaign starts sending emails
            </Typography>
          </EmptyState>
        )}
      </SectionCard>
    </TriggerLogsContainer>
  );
};

export default TriggerLogs;
