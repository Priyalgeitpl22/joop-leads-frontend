import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { EmailInboxMessagesBox, EmailInboxMessagesContainer, EmailInboxMessagesHeading } from "./EmailInboxArea.styled";
import { Avatar, CircularProgress } from "@mui/material";
import { Reply, ReplyAll, Trash2 } from "lucide-react";

const EmailInboxArea: React.FC = () => {
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const mailboxMessages = useSelector(
    (state: RootState) => state.emailInbox.mailboxMessages
  );
  const loading = useSelector((state: RootState) => state.emailInbox.loading);

  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null
  );

  const toggleMessageBody = (messageId: string) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  };

  return (
    <EmailInboxMessagesContainer>
      {loading ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : selectedMailboxId && mailboxMessages?.length > 0 ? (
        <div>
          {mailboxMessages.map((message: any) => {
            const isExpanded = expandedMessageId === message._id;
            return (
              <EmailInboxMessagesHeading
                key={message._id}>
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
                      // marginBottom: "5px",
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

                <div
                  onClick={() => toggleMessageBody(message._id)}
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                    whiteSpace: isExpanded ? "normal" : "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: isExpanded ? "black" : "#444343",
                    fontSize: "15px",
                  }}
                >
                  {isExpanded
                    ? message.body
                    : message.body.split("\n").slice(0, 10).join("\n") + " ..."}
                </div>
              </EmailInboxMessagesHeading>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            color: "#555",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
            height: "100%",
            width: "100%",
          }}
        >
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
        </div>
      )}
    </EmailInboxMessagesContainer>
  );
};

export default EmailInboxArea;
