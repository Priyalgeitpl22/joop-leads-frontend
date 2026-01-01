import React, { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";
import {
  InboxContainer,
  InboxCard,
  InboxHeader,
  DownloadButton,
  FilterGroup,
  FilterLabel,
  StyledSelect,
  LeadNameCell,
  LeadAvatar,
  LeadInfo,
  LeadName,
  LeadDetail,
  EmailLink,
  MessageCell,
  MessageSubject,
  MessageBody,
  ReplyCell,
  StatusCell,
  InboxHeaderTitle,
} from "./Inbox.styled";
import { campaignService } from "../../../../services/campaign.service";
import type { CampaignInbox } from "../../../../interfaces";
import { ActionButtons } from "./LeadList.styled";
import { DataTable } from "../../../../components/common";
import { formatDateWithGMT } from "../../../../utils/date";
import { StatusBadge } from "../../../../styles/GlobalStyles";

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
  plainText: boolean;
  onDownloadCsv?: () => void;
}

export const Inbox: React.FC<InboxProps> = ({ campaignId, plainText, onDownloadCsv }) => {
  const [campaignSequence, setCampaignSequence] = useState("All");
  const [sequenceStatus, setSequenceStatus] = useState("All");
  const [inboxMessages, setInboxMessages] = useState<CampaignInbox[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await campaignService.getCampaignInbox(campaignId);
      setInboxMessages(response.data || []);
    };

    loadData();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDownloadCsv = () => {
    if (onDownloadCsv) {
      onDownloadCsv();
    } else {
      console.log("Download Inbox CSV");
    }
  };

  const columns = [
    {
      key: "leadName",
      label: "Lead Name",
      width: "10%",
      render: (_value: unknown, row: Record<string, unknown>) => {
        const message = row as unknown as CampaignInbox;
        return (
          <LeadNameCell>
            <LeadAvatar>{getInitials(message.lead.name)}</LeadAvatar>
            <LeadInfo>
              <LeadName>{message.lead.name}</LeadName>
              {message.sequenceStep && (
                <LeadDetail>
                  <Mail
                    size={12}
                    style={{
                      display: "inline",
                      marginRight: "4px",
                    }}
                  />
                  Email Sequence: <strong>{message.sequenceStep}</strong>
                </LeadDetail>
              )}
              <LeadDetail>
                From: <EmailLink>{message.sender.email}</EmailLink>
              </LeadDetail>
              <LeadDetail>
                To: <EmailLink>{message.lead.email}</EmailLink>
              </LeadDetail>
              <LeadDetail>
                Sent on: {formatDateWithGMT(message.sentAt)}
              </LeadDetail>
            </LeadInfo>
          </LeadNameCell>
        );
      },
    },
    {
      key: "messageSent",
      label: "Message Sent",
      width: "10%",
      render: (_value: unknown, row: Record<string, unknown>) => {
        const message = row as unknown as CampaignInbox;
        return (
          <MessageCell>
            <MessageSubject>{message.messageSent.subject}</MessageSubject>
            {plainText ? (
              <MessageBody>
                {message.messageSent.body.text.split("\n").map((line, i) => (
                  <p key={i}>{line || "\u00A0"}</p>
                ))}
              </MessageBody>
            ) : (
              <MessageBody dangerouslySetInnerHTML={{ __html: message.messageSent.body.html }} />
            )}
          </MessageCell>
        );
      },
    },
    {
      key: "replyDetails",
      label: "Reply Details",
      width: "10%",
      render: (_value: unknown, row: Record<string, unknown>) => {
        const message = row as unknown as CampaignInbox;
        return <ReplyCell>{message.reply.text || ""}</ReplyCell>;
      },
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      render: (_value: unknown, row: Record<string, unknown>) => {
        const message = row as unknown as CampaignInbox;
        return (
          <StatusCell>
            <StatusBadge
              $status={
                message.status.toLowerCase() === "stopped"
                  ? "Unsubscribed"
                  : message.status
              }
            >
              {message.status.toLowerCase() === "stopped"
                ? "Unsubscribed"
                : message.status.charAt(0) +
                  message.status.slice(1).toLowerCase()}
            </StatusBadge>
          </StatusCell>
        );
      },
    },
  ];

  return (
    <InboxContainer>
      <InboxCard>
        <InboxHeader>
          <InboxHeaderTitle>
            Campaign Inbox ({inboxMessages.length})
          </InboxHeaderTitle>
          <ActionButtons>
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
          </ActionButtons>
        </InboxHeader>

        <DataTable
          columns={columns}
          data={inboxMessages as unknown as Record<string, unknown>[]}
        />
      </InboxCard>
    </InboxContainer>
  );
};

export default Inbox;
