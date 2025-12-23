import React, { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import {
  InboxContainer,
  InboxCard,
  InboxHeader,
  DownloadButton,
  FilterGroup,
  FilterLabel,
  StyledSelect,
  InboxTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
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
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from './Inbox.styled';

export interface InboxMessage {
  id: string;
  leadName: string;
  leadEmail: string;
  emailSequence?: string;
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
  campaignId: string;
  messages?: InboxMessage[];
  onDownloadCsv?: () => void;
}

// Mock data for testing
const mockMessages: InboxMessage[] = [
  {
    id: '1',
    leadName: 'Rahul Sharma',
    leadEmail: 'rahulbitm87@gmail.com',
    emailSequence: '',
    fromEmail: 'chandan@goldeneaglelabs.com',
    toEmail: 'rahulbitm87@gmail.com',
    sentOn: 'Dec 17, 2025, 7:01 PM GMT+5:30',
    subject: 'Hey Rahul',
    body: `Curious, are you still piecing together your team?

We work with decision makers who want real momentum, but don't want to hire in-house or babysit devs.

Golden Eagle spins up fast (≤2 weeks), with senior engineers + a PM to run the build. No hand-holding required.

Open to see how it compares to your setup? Just reply "interested" if you'd like to hear more.`,
    signature: 'Regards\nChandan',
    links: [
      { text: 'Book a call', url: '#' },
      { text: 'Visit Us', url: '#' },
    ],
  },
  {
    id: '2',
    leadName: 'Junaid Ahmad',
    leadEmail: 'junaid@example.com',
    emailSequence: '',
    fromEmail: 'chandan@goldeneaglelabs.com',
    toEmail: 'junaid@example.com',
    sentOn: 'Dec 17, 2025, 7:02 PM GMT+5:30',
    subject: 'Hey Junaid Ahmad',
    body: `Curious, are you still piecing together your team?

We work with decision makers who want real momentum, but don't want to hire in-house or babysit devs.`,
    signature: 'Regards\nChandan',
    links: [
      { text: 'Book a call', url: '#' },
      { text: 'Visit Us', url: '#' },
    ],
  },
];

export const Inbox: React.FC<InboxProps> = ({
  messages: propMessages,
  onDownloadCsv,
}) => {
  const [messages] = useState<InboxMessage[]>(propMessages || mockMessages);
  const [campaignSequence, setCampaignSequence] = useState('All');
  const [sequenceStatus, setSequenceStatus] = useState('All');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDownloadCsv = () => {
    if (onDownloadCsv) {
      onDownloadCsv();
    } else {
      console.log('Download Inbox CSV');
      // TODO: Implement CSV download
    }
  };

  return (
    <InboxContainer>
      <InboxCard>
        <InboxHeader>
          <DownloadButton onClick={handleDownloadCsv}>
            <Download size={16} />
            Download as CSV
          </DownloadButton>
          <FilterGroup>
            <FilterLabel>Campaign Sequence</FilterLabel>
            <StyledSelect
              value={campaignSequence}
              onChange={(e) => setCampaignSequence(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1">Sequence 1</option>
              <option value="2">Sequence 2</option>
              <option value="3">Sequence 3</option>
            </StyledSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Sequence Status</FilterLabel>
            <StyledSelect
              value={sequenceStatus}
              onChange={(e) => setSequenceStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="sent">Sent</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="replied">Replied</option>
              <option value="bounced">Bounced</option>
            </StyledSelect>
          </FilterGroup>
        </InboxHeader>

        {messages && messages.length > 0 ? (
          <InboxTable>
            <TableHeader>
              <TableHeaderCell>Lead Name</TableHeaderCell>
              <TableHeaderCell>Message Sent</TableHeaderCell>
              <TableHeaderCell>Reply Details</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableHeader>
            <tbody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <LeadNameCell>
                      <LeadAvatar>{getInitials(message.leadName)}</LeadAvatar>
                      <LeadInfo>
                        <LeadName>{message.leadName}</LeadName>
                        {message.emailSequence && (
                          <LeadDetail>
                            <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
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
                  </TableCell>
                  <TableCell>
                    <MessageCell>
                      <MessageSubject>{message.subject}</MessageSubject>
                      <MessageBody>
                        {message.body.split('\n').map((line, i) => (
                          <p key={i}>{line || '\u00A0'}</p>
                        ))}
                      </MessageBody>
                      {message.signature && (
                        <MessageSignature>
                          {message.signature.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </MessageSignature>
                      )}
                      {message.links && message.links.length > 0 && (
                        <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {message.links.map((link, i) => (
                            <MessageLink key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.text}
                            </MessageLink>
                          ))}
                        </div>
                      )}
                    </MessageCell>
                  </TableCell>
                  <TableCell>
                    <ReplyCell>{message.replyDetails || ''}</ReplyCell>
                  </TableCell>
                  <TableCell>
                    <StatusCell>
                      {message.status && (
                        <StatusBadge $status={message.status}>{message.status}</StatusBadge>
                      )}
                    </StatusCell>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </InboxTable>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <Mail size={48} />
            </EmptyStateIcon>
            <EmptyStateTitle>No messages found</EmptyStateTitle>
            <EmptyStateDescription>
              Messages will appear here once emails are sent
            </EmptyStateDescription>
          </EmptyState>
        )}
      </InboxCard>
    </InboxContainer>
  );
};

export default Inbox;

