import React, { useState } from "react";
import { Table, TableHead, TableBody, Typography, MenuItem } from "@mui/material";
import { Download, Mail } from "lucide-react";
import {
  InboxContainer,
  InboxCard,
  InboxHeader,
  DownloadButton,
  FilterGroup,
  FilterLabel,
  StyledSelect,
  TableContainer,
  HeaderCell,
  StyledTableRow,
  StyledTableCell,
  LeadNameCell,
  LeadAvatar,
  LeadInfo,
  LeadName,
  LeadDetail,
  EmailLink,
  MessageCell,
  MessageSubject,
  MessageBody,
  MessageSignature,
  MessageLink,
  ReplyCell,
  StatusCell,
  StatusBadge,
  EmptyState,
} from "./Inbox.styled";

interface InboxMessage {
  id: string;
  leadName: string;
  leadEmail: string;
  emailSequence: string;
  fromEmail: string;
  toEmail: string;
  sentOn: string;
  subject: string;
  body: string;
  signature?: string;
  links?: { text: string; url: string }[];
  replyDetails?: string;
  status?: string;
}

interface InboxProps {
  messages?: InboxMessage[];
  onDownloadCsv?: () => void;
}

// Test data
const testMessages: InboxMessage[] = [
  {
    id: "1",
    leadName: "Rahul Sharma",
    leadEmail: "rahulbitm87@gmail.com",
    emailSequence: "",
    fromEmail: "chandan@goldeneaglelabs.com",
    toEmail: "rahulbitm87@gmail.com",
    sentOn: "Dec 17, 2025, 7:01 PM GMT+5:30",
    subject: "Hey Rahul",
    body: `Curious, are you still piecing together your team?

We work with decision makers who want real momentum, but don't want to hire in-house or babysit devs.

Golden Eagle spins up fast (≤2 weeks), with senior engineers + a PM to run the build. No hand-holding required.

Open to see how it compares to your setup? Just reply "interested" if you'd like to hear more.`,
    signature: "Regards\nChandan",
    links: [
      { text: "Book a call", url: "#" },
      { text: "Visit Us", url: "#" },
    ],
  },
  {
    id: "2",
    leadName: "Junaid Ahmad",
    leadEmail: "junaid@example.com",
    emailSequence: "",
    fromEmail: "chandan@goldeneaglelabs.com",
    toEmail: "junaid@example.com",
    sentOn: "Dec 17, 2025, 7:02 PM GMT+5:30",
    subject: "Hey Junaid Ahmad",
    body: `Curious, are you still piecing together your team?

We work with decision makers who want real momentum, but don't want to hire in-house or babysit devs.`,
    signature: "Regards\nChandan",
    links: [
      { text: "Book a call", url: "#" },
      { text: "Visit Us", url: "#" },
    ],
  },
  {
    id: "3",
    leadName: "Priya Gupta",
    leadEmail: "priya@techcorp.com",
    emailSequence: "",
    fromEmail: "chandan@goldeneaglelabs.com",
    toEmail: "priya@techcorp.com",
    sentOn: "Dec 17, 2025, 7:03 PM GMT+5:30",
    subject: "Hey Priya",
    body: `Curious, are you still piecing together your team?

We work with decision makers who want real momentum, but don't want to hire in-house or babysit devs.`,
    signature: "Regards\nChandan",
    links: [
      { text: "Book a call", url: "#" },
    ],
  },
];

const Inbox: React.FC<InboxProps> = ({
  messages = testMessages,
  onDownloadCsv,
}) => {
  const [campaignSequence, setCampaignSequence] = useState("All");
  const [sequenceStatus, setSequenceStatus] = useState("All");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <InboxContainer>
      <InboxCard>
        <InboxHeader>
          <DownloadButton onClick={onDownloadCsv}>
            <Download size={16} />
            Download as CSV
          </DownloadButton>
          <FilterGroup>
            <FilterLabel>Campaign Sequence</FilterLabel>
            <StyledSelect
              value={campaignSequence}
              onChange={(e) => setCampaignSequence(e.target.value as string)}
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1">Sequence 1</MenuItem>
              <MenuItem value="2">Sequence 2</MenuItem>
              <MenuItem value="3">Sequence 3</MenuItem>
            </StyledSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Sequence Status</FilterLabel>
            <StyledSelect
              value={sequenceStatus}
              onChange={(e) => setSequenceStatus(e.target.value as string)}
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
              <MenuItem value="opened">Opened</MenuItem>
              <MenuItem value="clicked">Clicked</MenuItem>
              <MenuItem value="replied">Replied</MenuItem>
              <MenuItem value="bounced">Bounced</MenuItem>
            </StyledSelect>
          </FilterGroup>
        </InboxHeader>

        {messages && messages.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <HeaderCell>Lead Name</HeaderCell>
                  <HeaderCell>Message Sent</HeaderCell>
                  <HeaderCell>Reply Details</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {messages.map((message) => (
                  <StyledTableRow key={message.id}>
                    <StyledTableCell>
                      <LeadNameCell>
                        <LeadAvatar>{getInitials(message.leadName)}</LeadAvatar>
                        <LeadInfo>
                          <LeadName>{message.leadName}</LeadName>
                          {message.emailSequence && (
                            <LeadDetail>
                              Email Sequence: <strong>{message.emailSequence}</strong>
                            </LeadDetail>
                          )}
                          <LeadDetail>
                            From: <EmailLink>{message.fromEmail}</EmailLink>
                          </LeadDetail>
                          <LeadDetail>
                            To: <EmailLink>{message.toEmail}</EmailLink>
                          </LeadDetail>
                          <LeadDetail>Sent on: {message.sentOn}</LeadDetail>
                        </LeadInfo>
                      </LeadNameCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <MessageCell>
                        <MessageSubject>{message.subject}</MessageSubject>
                        <MessageBody>
                          {message.body.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </MessageBody>
                        {message.signature && (
                          <MessageSignature>
                            {message.signature.split("\n").map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </MessageSignature>
                        )}
                        {message.links && message.links.length > 0 && (
                          <div>
                            {message.links.map((link, i) => (
                              <MessageLink key={i} href={link.url}>
                                {link.text}
                              </MessageLink>
                            ))}
                          </div>
                        )}
                      </MessageCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <ReplyCell>
                        {message.replyDetails || ""}
                      </ReplyCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusCell>
                        {message.status && (
                          <StatusBadge status={message.status}>
                            {message.status}
                          </StatusBadge>
                        )}
                      </StatusCell>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyState>
            <Mail size={48} />
            <Typography variant="h6">No messages found</Typography>
            <Typography color="textSecondary">
              Messages will appear here once emails are sent
            </Typography>
          </EmptyState>
        )}
      </InboxCard>
    </InboxContainer>
  );
};

export default Inbox;
