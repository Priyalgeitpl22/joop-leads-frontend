import React from "react";
import { Table, TableHead, TableBody, Typography } from "@mui/material";
import { Download, Mail } from "lucide-react";
import {
  SequencesContainer,
  SequencesCard,
  SequencesHeader,
  SequencesTitle,
  HeaderActions,
  ActionButton,
  TableContainer,
  HeaderCell,
  StyledTableRow,
  StyledTableCell,
  SequenceName,
  MetricCell,
  MetricValue,
  MetricWithPercent,
  ColumnLabel,
  EmptyState,
} from "./Sequences.styled";

interface SequenceStats {
  name: string;
  sent: number;
  opened: number;
  openedPercent?: number;
  clicked: number;
  replied: number;
  positiveReplies: number;
  bounced: number;
  senderBounced: number;
  unsubscribed: number;
}

interface SequencesProps {
  sequences?: SequenceStats[];
  onShowEmailAccountPerformance?: () => void;
  onDownloadCsv?: () => void;
}

// Test data
const testSequences: SequenceStats[] = [
  {
    name: "1. EMAIL",
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    positiveReplies: 0,
    bounced: 0,
    senderBounced: 0,
    unsubscribed: 0,
  },
  {
    name: "2. EMAIL",
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    positiveReplies: 0,
    bounced: 0,
    senderBounced: 0,
    unsubscribed: 0,
  },
  {
    name: "3. EMAIL",
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    positiveReplies: 0,
    bounced: 0,
    senderBounced: 0,
    unsubscribed: 0,
  },
];

const Sequences: React.FC<SequencesProps> = ({
  sequences = testSequences,
  onShowEmailAccountPerformance,
  onDownloadCsv,
}) => {
  return (
    <SequencesContainer>
      <SequencesCard>
        <SequencesHeader>
          <SequencesTitle>Sequence Breakup</SequencesTitle>
          <HeaderActions>
            <ActionButton variant="primary" onClick={onShowEmailAccountPerformance}>
              Show Email Account Performance
            </ActionButton>
            <ActionButton onClick={onDownloadCsv}>
              <Download size={16} />
              Download as CSV
            </ActionButton>
          </HeaderActions>
        </SequencesHeader>

        {sequences && sequences.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <HeaderCell>Sequences</HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell></HeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {sequences.map((seq, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <SequenceName>{seq.name}</SequenceName>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#6366f1">{seq.sent}</MetricValue>
                        <ColumnLabel>Sent</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricWithPercent>
                          <MetricValue color="#8b5cf6">{seq.opened}</MetricValue>
                          {seq.openedPercent !== undefined && seq.openedPercent > 0 && (
                            <span className="percent">({seq.openedPercent}%)</span>
                          )}
                        </MetricWithPercent>
                        <ColumnLabel>Opened</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#14b8a6">{seq.clicked}</MetricValue>
                        <ColumnLabel>Clicked</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#f59e0b">{seq.replied}</MetricValue>
                        <ColumnLabel>Replied</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#ec4899">{seq.positiveReplies}</MetricValue>
                        <ColumnLabel>Positive Replies</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#ef4444">{seq.bounced}</MetricValue>
                        <ColumnLabel>Bounced</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#f97316">{seq.senderBounced}</MetricValue>
                        <ColumnLabel>Sender Bounced</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MetricCell>
                        <MetricValue color="#64748b">{seq.unsubscribed}</MetricValue>
                        <ColumnLabel>Unsubscribed</ColumnLabel>
                      </MetricCell>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyState>
            <Mail size={48} />
            <Typography variant="h6">No sequences found</Typography>
            <Typography color="textSecondary">
              Create email sequences to automate your outreach
            </Typography>
          </EmptyState>
        )}
      </SequencesCard>
    </SequencesContainer>
  );
};

export default Sequences;
