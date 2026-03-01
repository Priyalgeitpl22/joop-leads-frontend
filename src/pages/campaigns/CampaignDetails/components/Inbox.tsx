import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import {
  InboxContainer,
  InboxCard,
  InboxHeader,
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
import { DataTable, FilterPanelPopover, SearchBox, type FilterPanelFieldConfig, type FilterPanelValues } from "../../../../components/common";
import { formatDateWithGMT } from "../../../../utils/date";
import { StatusBadge } from "../../../../components/common";
import { getLeadStatusLabel } from "../../../../utils/labels";

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

const filterConfig: FilterPanelFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "sent", label: "Sent" },
    ],
  },
];

export const Inbox: React.FC<InboxProps> = ({
  campaignId,
  plainText,
}) => {
  const [inboxMessages, setInboxMessages] = useState<CampaignInbox[]>([]);
  const [filterValues, setFilterValues] = useState<FilterPanelValues>({
    status: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

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
              <MessageBody
                dangerouslySetInnerHTML={{
                  __html: message.messageSent.body.html,
                }}
              />
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
              {getLeadStatusLabel(message.status)}
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
            <SearchBox
              placeholder="Search campaign inbox..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <FilterPanelPopover
              filters={filterConfig}
              values={filterValues}
              onApply={setFilterValues}
              triggerLabel="Open filters"
            />
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
