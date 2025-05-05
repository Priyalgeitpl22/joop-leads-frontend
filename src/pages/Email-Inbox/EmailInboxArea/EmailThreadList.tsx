import React, { useState, useEffect } from "react";
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
import { Avatar, Badge, CircularProgress, Typography } from "@mui/material";
import { Reply, ReplyAll, Trash2, MessageCircle } from "lucide-react";
import {
  getAccountThreads,
  getThreadMessages,
  setCurrentPage,
  setSelectedThread,
  setViewMode,
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";
import styled from "styled-components";

const ThreadCount = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid white`,
    padding: '0 4px',
    backgroundColor: '#0077B6',
  },
}));

const extractPreviewText = (htmlContent: string): string => {
  if (!htmlContent) return "No content";

  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, " ");
  
  // Decode HTML entities
  const decoded = textContent
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
  
  // Trim and limit length
  const trimmed = decoded.trim();
  return trimmed.length > 120 ? `${trimmed.substring(0, 120)}...` : trimmed;
};

const EmailThreadList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");

  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const threads = useSelector(
    (state: RootState) => state.emailInbox.threads
  );
  const totalThreads = useSelector(
    (state: RootState) => state.emailInbox.totalThreads
  );
  const currentPage = useSelector(
    (state: RootState) => state.emailInbox.currentPage
  );
  const loading = useSelector(
    (state: RootState) => state.emailInbox.threadsLoading
  );
  const searchLoading = useSelector(
    (state: RootState) => state.emailInbox.searchLoading
  );

  // Load threads when component mounts or mailbox changes
  useEffect(() => {
    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAccountThreads({
          accountId: selectedAccountId,
          mailboxId: selectedMailboxId,
          page: currentPage,
          limit: threadsPerPage,
          search: searchTerm
        })
      );
    }
  }, [selectedAccountId, selectedMailboxId, dispatch]);

  const threadsPerPage = 10;
  const totalPages = Math.ceil(totalThreads / threadsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
    if (selectedAccountId) {
      dispatch(
        getAccountThreads({
          accountId: selectedAccountId,
          mailboxId: selectedMailboxId,
          page,
          limit: threadsPerPage,
          search: searchTerm
        })
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedAccountId) {
      if (value.trim().length > 2 || value.trim().length === 0) {
        dispatch(
          getAccountThreads({
            accountId: selectedAccountId,
            mailboxId: selectedMailboxId,
            search: value,
          })
        );
      }
    }
  };

  const handleThreadClick = (threadId: string) => {
    if (selectedAccountId) {
      dispatch(setSelectedThread(threadId));
      dispatch(
        getThreadMessages({
          accountId: selectedAccountId,
          threadId,
          mailboxId: selectedMailboxId,
        })
      );
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  // Filter out threads that don't have a valid latestMessage
  const validThreads = threads.filter(thread => thread && thread.latestMessage);

  return (
    <EmailInboxMessagesContainer>
      {loading && searchTerm.trim().length === 0 ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : validThreads.length === 0 && searchTerm.trim().length === 0 ? (
        <NoMailboxMessage>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="No Threads"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "10px",
              opacity: 0.6,
            }}
          />
          No threads found.
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
                placeholder="Search Threads"
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchBar>
          </EmailInboxListHeader>

          <StyledDivider />

          {validThreads.length > 0 ? (
            <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
              {validThreads.map((thread: any) => {
                // Access the latest message from the thread
                const message = thread.latestMessage;
                
                if (!message) return null;
                
                return (
                  <EmailInboxMessagesHeading
                    key={message._id}
                    onClick={() => handleThreadClick(thread.threadId)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h4>{message.subject || "No Subject"}</h4>
                        {thread.messageCount > 1 && (
                          <ThreadCount badgeContent={thread.messageCount} color="primary" sx={{ ml: 2 }}>
                            <MessageCircle size={16} />
                          </ThreadCount>
                        )}
                      </div>
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
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
                          sx={{ width: 32, height: 32, marginRight: 1 }}
                        />
                        <div>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {message.from?.[0]?.name || message.from?.[0]?.address || "Unknown"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "12px" }}
                          >
                            to{" "}
                            {message.to?.map((recipient: any) => recipient.name || recipient.address).join(", ") ||
                              "No recipient"}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "12px" }}
                      >
                        {formatDate(message.date)}
                      </Typography>
                    </div>

                    <InboxMessageBody isExpanded={false}>
                      {extractPreviewText(message.body)}
                    </InboxMessageBody>
                  </EmailInboxMessagesHeading>
                );
              })}
            </div>
          ) : (
            <NoMailboxMessage>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="No Threads"
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  opacity: 0.6,
                }}
              />
              No threads found.
            </NoMailboxMessage>
          )}

          <TotalPageCount>
            <div>
              Total Threads: {totalThreads}
            </div>
            {totalThreads > threadsPerPage && (
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

export default EmailThreadList; 