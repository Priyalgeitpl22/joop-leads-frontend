import React, { useEffect, useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  TriggerLogsContainer,
  SectionCard,
  SectionHeader,
  TriggerLogsHeader,
  TriggerLogsTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  StatusDataCell,
  StatusDetails,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  Pagination,
  PaginationInfo,
  PaginationButtons,
  PaginationButton,
  TextCell,
} from './TriggerLogs.styled';
import { fetchTriggerLogs, fetchUpcomingTriggers } from '../../../../store/slices/campaignSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../store';
import { convertUtcToTimezone } from '../../../../utils/date';
import { StatusBadge } from "../../../../styles/GlobalStyles";
import { SectionHeaderTitle } from "../../../../styles/GlobalStyles";

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

  const getNextTriggerDateTime = (nextTriggerAt: string, timezone: string) => {
    return convertUtcToTimezone(nextTriggerAt, timezone, "DD MMM YYYY, hh:mm A");
  };

  return (
    <TriggerLogsContainer>
      {upcomingTriggers && upcomingTriggers.logs && upcomingTriggers.logs.length > 0 && (
        <SectionCard>
          <SectionHeader>
            <SectionHeaderTitle>Upcoming Triggers</SectionHeaderTitle>
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
                    <TextCell>{getNextTriggerDateTime(log.nextTriggerAt, log.timezone) || 'N/A'}</TextCell>
                  </TableCell>
                  <TableCell>
                    <StatusBadge $status={log.status.toLowerCase()}>{log.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <TextCell>{log.timezone || 'N/A'}</TextCell>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TriggerLogsTable>
        </SectionCard>
      )}

      <SectionCard>
        <TriggerLogsHeader>
          <SectionHeaderTitle>Last 20 Triggers Status</SectionHeaderTitle>
        </TriggerLogsHeader>

        {triggerLogs && triggerLogs.logs && triggerLogs.logs.length > 0 ? (
          <>
            <TriggerLogsTable>
              <TableHeader>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Status Data</TableHeaderCell>
                <TableHeaderCell>Timezone Of Trigger</TableHeaderCell>
                <TableHeaderCell $width="30%">Activity Log</TableHeaderCell>
              </TableHeader>
              <tbody>
                {triggerLogs && triggerLogs.logs && triggerLogs.logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <TextCell>{convertUtcToTimezone(log.createdAt, log.timezone, "DD MMM YYYY, hh:mm A") || 'N/A'}</TextCell>
                    </TableCell>
                    <TableCell>
                      <StatusDataCell>
                        <StatusBadge $status={log.status}>{log.status}</StatusBadge>
                        <StatusDetails>
                          {log.newLeadEmails !== undefined && (
                            <TextCell >
                              New Leads Count: <span>{log.newLeadEmails}</span>
                            </TextCell>
                          )}
                          {log.followUpEmails !== undefined && (
                            <TextCell>
                              No. of Email Send: <span>{log.followUpEmails}</span>
                            </TextCell>
                          )}
                          {log.totalEmailsSent !== undefined && (
                            <TextCell>
                              Total Eligible Email Accounts: <span>{log.totalEmailsSent}</span>
                            </TextCell>
                          )}
                        </StatusDetails>
                      </StatusDataCell>
                    </TableCell>
                    <TableCell>
                      <TextCell>{log.timezone || 'N/A'}</TextCell>
                    </TableCell>
                    <TableCell>
                      <TextCell>{log.activityLog || 'N/A'}</TextCell>
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

