import React, { useEffect } from "react";
import { Download } from "lucide-react";
import {
  SequencesContainer,
  SequencesCard,
  SequencesHeader,
  SequencesTitle,
  HeaderActions,
  ActionButton,
} from "./Sequences.styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { DataTable } from "../../../../components/common";
import { getSequenceAnalytics } from "../../../../store/slices/campaignSlice";
import type { AppDispatch } from "../../../../store";

interface SequencesProps {
  campaignId: string;
  onShowEmailAccountPerformance?: () => void;
  onDownloadCsv?: () => void;
}

export const Sequences: React.FC<SequencesProps> = ({
  campaignId,
  onShowEmailAccountPerformance,
  onDownloadCsv,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sequenceAnalytics, isLoadingSequenceAnalytics, errorSequenceAnalytics } = useSelector((state: RootState) => state.campaign);
  const columns = [
    { key: "emailType", label: "Email" },
    { key: "sent", label: "Sent" },
    { key: "opened", label: "Opened" },
    { key: "clicked", label: "Clicked" },
    { key: "replied", label: "Replied" },
    // { key: "positiveReplies", label: "Positive Replies" },
    { key: "bounced", label: "Bounced" },
    // { key: "senderBounced", label: "Sender Bounced" },
    { key: "unsubscribed", label: "Unsubscribed" },
  ];

  useEffect(() => {
    if (sequenceAnalytics?.length === 0 && !errorSequenceAnalytics) {
      dispatch(getSequenceAnalytics(campaignId));
    }
  }, [campaignId]);

  const handleShowEmailAccountPerformance = () => {
    if (onShowEmailAccountPerformance) {
      onShowEmailAccountPerformance();
    } else {
      // TODO: Navigate to email account performance page
    }
  };

  const handleDownloadCsv = () => {
    if (onDownloadCsv) {
      onDownloadCsv();
    } else {
      console.log("Download CSV");
      // TODO: Implement CSV download
    }
  };

  return (
    <SequencesContainer>
      <SequencesCard>
        <SequencesHeader>
          <SequencesTitle>Sequences</SequencesTitle>
          <HeaderActions>
            <ActionButton
              $variant="primary"
              onClick={handleShowEmailAccountPerformance}
            >
              Show Email Account Performance
            </ActionButton>
            <ActionButton onClick={handleDownloadCsv}>
              <Download size={16} />
              Download as CSV
            </ActionButton>
          </HeaderActions>
        </SequencesHeader>

        <DataTable
          columns={columns}
          searchable={false}
          showHeader={false}
          data={sequenceAnalytics as unknown as Record<string, unknown>[]}
          loading={isLoadingSequenceAnalytics}
        />

        {/* {isLoadingSequenceAnalytics ? (
          <TableContainer>
            <SequencesTable>
              <TableHeader>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Sent</TableHeaderCell>
                <TableHeaderCell>Opened</TableHeaderCell>
                <TableHeaderCell>Clicked</TableHeaderCell>
                <TableHeaderCell>Replied</TableHeaderCell>
                <TableHeaderCell>Positive Replies</TableHeaderCell>
                <TableHeaderCell>Bounced</TableHeaderCell>
                <TableHeaderCell>Sender Bounced</TableHeaderCell>
                <TableHeaderCell>Unsubscribed</TableHeaderCell>
              </TableHeader>
              <tbody>
                {sequences.map((seq, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <SequenceName>
                        {seq.seqNumber}. {seq.type.toUpperCase()}
                      </SequenceName>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#6366f1">
                          {seq.emailSends?.length || 0}
                        </MetricValue>
                        <ColumnLabel>Sent</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricWithPercent>
                          <MetricValue $color="#8b5cf6">
                            {seq.emailSends?.filter((emailSend) =>
                              emailSend.events?.some(
                                (event) => event.type === EventType.OPENED
                              )
                            ).length || 0}
                          </MetricValue>
                        </MetricWithPercent>
                        <ColumnLabel>Opened</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#fbbf24">2</MetricValue>
                        <ColumnLabel>Clicked</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#06b6d4">
                          {seq.emailSends?.filter((emailSend) =>
                            emailSend.events?.some(
                              (event) => event.type === EventType.REPLIED
                            )
                          ).length || 0}
                        </MetricValue>
                        <ColumnLabel>Replied</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#10b981">
                          {seq.emailSends?.filter((emailSend) =>
                            emailSend.events?.some(
                              (event) => event.type === EventType.REPLIED
                            )
                          ).length || 0}
                        </MetricValue>
                        <ColumnLabel>Positive Replies</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#f87171">
                          {seq.emailSends?.filter((emailSend) =>
                            emailSend.events?.some(
                              (event) => event.type === EventType.BOUNCED
                            )
                          ).length || 0}
                        </MetricValue>
                        <ColumnLabel>Bounced</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#ef4444">
                          {seq.emailSends?.filter((emailSend) =>
                            emailSend.events?.some(
                              (event) => event.type === EventType.BOUNCED
                            )
                          ).length || 0}
                        </MetricValue>
                        <ColumnLabel>Sender Bounced</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                    <TableCell>
                      <MetricCell>
                        <MetricValue $color="#64748b">
                          {seq.emailSends?.filter((emailSend) =>
                            emailSend.events?.some(
                              (event) => event.type === EventType.UNSUBSCRIBED
                            )
                          ).length || 0}
                        </MetricValue>
                        <ColumnLabel>Unsubscribed</ColumnLabel>
                      </MetricCell>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </SequencesTable>
          </TableContainer>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <Mail size={48} />
            </EmptyStateIcon>
            <EmptyStateTitle>No sequences found</EmptyStateTitle>
            <EmptyStateDescription>
              Create email sequences to automate your outreach
            </EmptyStateDescription>
          </EmptyState>
        )} */}
      </SequencesCard>
    </SequencesContainer>
  );
};

export default Sequences;
