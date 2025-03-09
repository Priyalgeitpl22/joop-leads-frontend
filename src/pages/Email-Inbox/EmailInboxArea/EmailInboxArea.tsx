import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { EmailInboxMessagesContainer } from "./EmailInboxArea.styled";
import { Avatar, CircularProgress } from "@mui/material";

const EmailInboxArea: React.FC = () => {
  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const mailboxMessages = useSelector(
    (state: RootState) => state.emailInbox.mailboxMessages
  );
  const loading = useSelector((state: RootState) => state.emailInbox.loading);
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);

  const selectedAccount = accounts.find(
    (account) => account._id === selectedAccountId
  );

  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null
  );

  const toggleMessageBody = (messageId: string) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  };

  return (
    <EmailInboxMessagesContainer>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : selectedMailboxId && mailboxMessages?.length > 0 ? (
        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                background: "#dedede",
                marginBottom: "3%",
                borderRadius: "5px",
                padding: "2%",
              }}
            >
              <div>
                <b>
                  <span className="text-gray-700 font-bold">
                    {selectedAccount
                      ? selectedAccount.name
                      : "No Account Selected"}
                  </span>
                </b>
                <span style={{ margin: "15px", fontSize: "14px" }}>
                  ✅ Completed
                </span>
              </div>

              <div>
                <select style={{ height: "30px", cursor: "pointer" }}>
                  <option>Do not Contact</option>
                  <option>Information Request</option>
                  <option>Out of Office</option>
                  <option>Wrong Person</option>
                  <option>Interested</option>
                  <option>Meeting Request</option>
                  <option>Not Interested</option>
                </select>
              </div>
            </div>
          </div>

          {mailboxMessages.map((message: any) => {
            const isExpanded = expandedMessageId === message._id;
            return (
              <div
                key={message._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
                  <div>
                    <strong>{message.from?.[0]?.name}</strong>
                    <div style={{ fontSize: "14px", color: "#555" }}>
                      {message.from?.[0]?.address || "No Email"}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "14px", color: "#777" }}>
                  To: <strong>{message.to?.[0]?.name}</strong> (
                  {message.to?.[0]?.address || "No Email"})
                </div>

                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {message.subject || "No Subject"}
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
                  }}
                >
                  {isExpanded
                    ? message.body
                    : message.body.split("\n")[0] + " ..."}
                </div>

                <div
                  style={{ fontSize: "14px", color: "#777", marginTop: "5px" }}
                >
                  Date: {new Date(message.date).toLocaleString()}
                </div>
              </div>
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
