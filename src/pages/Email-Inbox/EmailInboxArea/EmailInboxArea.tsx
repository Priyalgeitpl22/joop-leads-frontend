import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  EmailInboxMessagesBox,
  EmailInboxMessagesContainer,
  EmailInboxMessagesHeading,
  EmailPagination,
  TotalPageCount,
  NoMailboxMessage,
  InboxMessageBody,
} from "./EmailInboxArea.styled";
import { Avatar, CircularProgress } from "@mui/material";
import { Reply, ReplyAll, Trash2 } from "lucide-react";
import {
  getAllAccountMailBox,
  setCurrentPage,
} from "../../../redux/slice/emailInboxSlice";

const EmailInboxArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const totalMessages = useSelector(
    (state: RootState) => state.emailInbox.totalMessages
  );
  const mailboxMessages = useSelector(
    (state: RootState) => state.emailInbox.mailboxMessages
  );
  const currentPage = useSelector(
    (state: RootState) => state.emailInbox.currentPage
  );
  const loading = useSelector((state: RootState) => state.emailInbox.loading);

  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null
  );

  const messagesPerPage = 10;
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  const toggleMessageBody = (messageId: string) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllAccountMailBox({
          accountId: selectedAccountId,
          mailBoxId: selectedMailboxId,
          page,
          limit: messagesPerPage,
        })
      );
    }
  };

  return (
    <EmailInboxMessagesContainer>
      {loading ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : mailboxMessages.length > 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
            {mailboxMessages.map((message: any) => {
              const isExpanded = expandedMessageId === message._id;
              return (
                <EmailInboxMessagesHeading key={message._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <h4>{message.subject || "No Subject"}</h4>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <div>
                        <Reply />
                      </div>
                      <div>
                        <ReplyAll />
                      </div>
                      <div>
                        <Trash2 />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
                      <div>
                        <strong>{message.from?.[0]?.name}</strong>
                        <div style={{ fontSize: "15px", color: "#555" }}>
                          {message.from?.[0]?.address || "No Email"}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#777",
                        marginTop: "5px",
                      }}
                    >
                      Date: {new Date(message.date).toLocaleString()}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#777",
                      marginBottom: "20px",
                    }}
                  >
                    To: <strong>{message.to?.[0]?.name}</strong> (
                    {message.to?.[0]?.address || "No Email"})
                  </div>

                  <InboxMessageBody
                    isExpanded={isExpanded}
                    onClick={() => toggleMessageBody(message._id)}
                  >
                    {isExpanded
                      ? message.body
                      : message.body.split("\n").slice(0, 10).join("\n") +
                        " ..."}
                  </InboxMessageBody>
                </EmailInboxMessagesHeading>
              );
            })}
          </div>
          <TotalPageCount>
            <div>Total Messages : {totalMessages}</div>
            {totalMessages > messagesPerPage && (
              <EmailPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
          </TotalPageCount>
        </div>
      ) : (
        <NoMailboxMessage>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="No Messages"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "10px",
              opacity: 0.6,
            }}
          />
          No mail found.
        </NoMailboxMessage>
      )}
    </EmailInboxMessagesContainer>
  );
};

export default EmailInboxArea;
