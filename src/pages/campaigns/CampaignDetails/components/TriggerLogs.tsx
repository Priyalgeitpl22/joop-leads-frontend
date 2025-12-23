import React, { useEffect, useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  TriggerLogsContainer,
  SectionCard,
  SectionHeader,
  SectionTitle,
  TriggerLogsHeader,
  TriggerLogsTitle,
  TriggerLogsTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  DateTimeCell,
  StatusDataCell,
  StatusBadge,
  StatusDetails,
  StatusDetailItem,
  TimezoneCell,
  ActivityLogLink,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  Pagination,
  PaginationInfo,
  PaginationButtons,
  PaginationButton,
} from './TriggerLogs.styled';
import { fetchTriggerLogs, fetchUpcomingTriggers } from '../../../../store/slices/campaignSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../store';
import { convertUtcToTimezone } from '../../../../utils/date';

export interface Logs {
  id: string;
  activityLog: string;
  campaignId: string;
  createdAt: string;
  durationMs: number
  followUpEmails: number;
  newLeadEmails: number;
  nextTriggerAt: string;
  status: string;
  timezone: string;
  totalEmailsSent: number;
  triggeredAt: string;
}

export interface TriggersResponse {
  limit: number;
  offset: number;
  total: number;
  logs: Logs[];
}

export interface TriggerLogsResponse {
  limit: number;
  offset: number;
  total: number;
  logs: Logs[];
}

interface TriggerLogsProps {
  campaignId: string;
}

export const TriggerLogs: React.FC<TriggerLogsProps> = ({ campaignId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const { triggerLogs, upcomingTriggers, isLoading } = useSelector((state: RootState) => state.campaign) as unknown as { triggerLogs: TriggerLogsResponse, upcomingTriggers: TriggersResponse, isLoading: boolean };
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    dispatch(fetchTriggerLogs(campaignId));
    dispatch(fetchUpcomingTriggers(campaignId));
  }, [campaignId]);

  useEffect(() => {
    if (!isLoading) {
      console.log('campaignId', campaignId);
      console.log('triggerLogs', triggerLogs);
      console.log('upcomingTriggers', upcomingTriggers);
    }
  }, [isLoading, triggerLogs, upcomingTriggers]);

  const handleActivityLogClick = (logId: string) => {
    console.log('Check activity log:', logId);
  };

  const getNextTriggerDateTime = (nextTriggerAt: string, timezone: string) => {
    return convertUtcToTimezone(nextTriggerAt, timezone, "DD MMM YYYY, hh:mm A");
  };

  return (
    <TriggerLogsContainer>
      {/* Upcoming Triggers Section */}
      {upcomingTriggers && upcomingTriggers.logs && upcomingTriggers.logs.length > 0 && (
        <SectionCard>
          <SectionHeader>
            <SectionTitle>Upcoming Triggers</SectionTitle>
          </SectionHeader>
          <TriggerLogsTable>
            <TableHeader>
              <TableHeaderCell>Date & Time</TableHeaderCell>
              <TableHeaderCell>Status Data</TableHeaderCell>
              <TableHeaderCell>Timezone Of Trigger</TableHeaderCell>
            </TableHeader>
            <tbody>
              {upcomingTriggers && upcomingTriggers.logs && upcomingTriggers.logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <DateTimeCell>{getNextTriggerDateTime(log.nextTriggerAt, log.timezone)}</DateTimeCell>
                  </TableCell>
                  <TableCell>
                    <StatusBadge $status={log.status}>{log.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <TimezoneCell>{log.timezone}</TimezoneCell>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TriggerLogsTable>
        </SectionCard>
      )}

      {/* Last 20 Triggers Status Section */}
      <SectionCard>
        <TriggerLogsHeader>
          <TriggerLogsTitle>Last 20 Triggers Status</TriggerLogsTitle>
        </TriggerLogsHeader>

        {triggerLogs && triggerLogs.logs && triggerLogs.logs.length > 0 ? (
          <>
            <TriggerLogsTable>
              <TableHeader>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Status Data</TableHeaderCell>
                <TableHeaderCell>Timezone Of Trigger</TableHeaderCell>
                <TableHeaderCell>Activity Log</TableHeaderCell>
              </TableHeader>
              <tbody>
                {triggerLogs && triggerLogs.logs && triggerLogs.logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <DateTimeCell>{convertUtcToTimezone(log.createdAt, log.timezone, "DD MMM YYYY, hh:mm A")}</DateTimeCell>
                    </TableCell>
                    <TableCell>
                      <StatusDataCell>
                        <StatusBadge $status={log.status}>{log.status}</StatusBadge>
                        <StatusDetails>
                          {log.newLeadEmails !== undefined && (
                            <StatusDetailItem>
                              New Leads Count: <span>{log.newLeadEmails}</span>
                            </StatusDetailItem>
                          )}
                          {log.followUpEmails !== undefined && (
                            <StatusDetailItem>
                              No. of Email Send: <span>{log.followUpEmails}</span>
                            </StatusDetailItem>
                          )}
                          {log.totalEmailsSent !== undefined && (
                            <StatusDetailItem>
                              Total Eligible Email Accounts: <span>{log.totalEmailsSent}</span>
                            </StatusDetailItem>
                          )}
                        </StatusDetails>
                      </StatusDataCell>
                    </TableCell>
                    <TableCell>
                      <TimezoneCell>{log.timezone}</TimezoneCell>
                    </TableCell>
                    <TableCell>
                      <ActivityLogLink onClick={() => handleActivityLogClick(log.id)}>
                        Check Activity Log
                      </ActivityLogLink>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </TriggerLogsTable>

            {triggerLogs && triggerLogs.logs && triggerLogs.logs.length > 20 && (
              <Pagination>
                <PaginationInfo>
                  Showing {triggerLogs.logs.length} of {triggerLogs.logs.length} logs
                </PaginationInfo>
                <PaginationButtons>
                  <PaginationButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </PaginationButton>
                  <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
                    <ChevronRight size={16} />
                  </PaginationButton>
                </PaginationButtons>
              </Pagination>
            )}
          </>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <Clock size={48} />
            </EmptyStateIcon>
            <EmptyStateTitle>No trigger logs yet</EmptyStateTitle>
            <EmptyStateDescription>
              Trigger logs will appear here once your campaign starts sending emails
            </EmptyStateDescription>
          </EmptyState>
        )}
      </SectionCard>
    </TriggerLogsContainer>
  );
};

export default TriggerLogs;

