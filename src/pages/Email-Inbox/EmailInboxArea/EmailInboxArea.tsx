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
  EmailInboxListHeader,
  StyledDivider,
  SearchBar,
} from "./EmailInboxArea.styled";
import { Avatar, CircularProgress } from "@mui/material";
import { Reply, ReplyAll, Trash2 } from "lucide-react";
import {
  getAllAccountMailBox,
  searchEmails,
  setCurrentPage,
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";

const EmailInboxArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null
  );

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
  const searchLoading = useSelector(
    (state: RootState) => state.emailInbox.searchLoading
  );
  const searchResults = useSelector(
    (state: RootState) => state.emailInbox.searchResults
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() && selectedAccountId && selectedMailboxId) {
      dispatch(
        searchEmails({
          accountId: selectedAccountId,
          mailboxId: selectedMailboxId,
          search: value.trim(),
          page: 1,
          limit: messagesPerPage,
        })
      );
    } else if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllAccountMailBox({
          accountId: selectedAccountId,
          mailBoxId: selectedMailboxId,
          page: currentPage,
          limit: messagesPerPage,
        })
      );
    }
  };

  const showSearchResults = searchTerm.trim().length > 0;
  const isSearchDone = showSearchResults && !searchLoading;

  const messagesToShow = isSearchDone
    ? searchResults
    :  mailboxMessages
      ;

  return (
    <EmailInboxMessagesContainer>
      {loading && searchTerm.trim().length === 0 ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : messagesToShow.length === 0 && searchTerm.trim().length === 0 ? (
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
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <EmailInboxListHeader>
            <SearchBar>
              <Search />
              <input
                placeholder="Search Email"
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchBar>
          </EmailInboxListHeader>

          <StyledDivider />

          {messagesToShow.length > 0 ? (
            <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
              {messagesToShow.map((message: any) => {
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
                        <Reply />
                        <ReplyAll />
                        <Trash2 />
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

          <TotalPageCount>
            <div>
              Total Messages:{" "}
              {searchTerm.trim().length > 0
                ? searchResults.length
                : totalMessages}
            </div>
            {searchTerm.trim().length === 0 &&
              totalMessages > messagesPerPage && (
                <EmailPagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              )}
          </TotalPageCount>
        </div>
      )}
    </EmailInboxMessagesContainer>
  );
};

export default EmailInboxArea;
