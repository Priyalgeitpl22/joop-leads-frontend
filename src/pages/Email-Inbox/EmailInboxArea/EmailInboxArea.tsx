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
import { Reply, ReplyAll, Trash2, Search } from "lucide-react";
import {
  getAllAccountMailBox,
  searchEmails,
  setCurrentPage,
} from "../../../redux/slice/emailInboxSlice";
import EmailInboxAreaDialog from "./EmailInboxAreaDialog";

const extractPreviewText = (htmlContent: string): string => {
  if (!htmlContent) return "";

  try {
    let cleanedHtml = htmlContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_match, dec) => {
        if (dec >= 32 && dec <= 126) {
          return String.fromCharCode(dec);
        }
        return "";
      })
      .replace(/&[a-zA-Z0-9]+;/g, "")
      .replace(/[\u200B-\u200F\u2028-\u202F\u205F-\u206F\u3000\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const words = cleanedHtml.split(/\s+/).filter((word) => {
      return !(
        /^\d+$/.test(word) ||
        /^\d+px$/.test(word) ||
        /^#[0-9a-f]{3,6}$/i.test(word) ||
        /^rgba?\(.*\)$/.test(word)
      );
    });

    return words.slice(0, 30).join(" ") + "...";
  } catch (e) {
    console.error("Error extracting preview text:", e);
    return "Unable to generate preview...";
  }
};

const EmailInboxArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

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
  const lastFetchTimestamp = useSelector(
    (state: RootState) => state.emailInbox.lastFetchTimestamp
  );

  console.log("lastFetchTimestamp--->>>>", lastFetchTimestamp);

  const messagesPerPage = 10;
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  // const toggleMessageBody = (messageId: string) => {
  //   setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  // };

  console.log("setExpandedMessageId", setExpandedMessageId);
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
  const messagesToShow = isSearchDone ? searchResults : mailboxMessages;

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  return (
    <EmailInboxMessagesContainer>
      {loading && searchTerm.trim().length === 0 ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : messagesToShow.length === 0 && !searchTerm.trim() ? (
        <>
          {Array.isArray(lastFetchTimestamp) &&
          lastFetchTimestamp.length === 0 ? (
            <EmailInboxMessagesBox>
              <div style={{ fontSize: "18px" }}>Fetching...</div>
            </EmailInboxMessagesBox>
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
        </>
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

          <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
            {messagesToShow.map((message: any) => {
              const isExpanded = expandedMessageId === message._id;
              return (
                <EmailInboxMessagesHeading
                  key={message._id}
                  onClick={() => handleMessageClick(message)}
                >
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
                  <InboxMessageBody isExpanded={isExpanded}>
                    {isExpanded ? (
                      <div dangerouslySetInnerHTML={{ __html: message.body }} />
                    ) : (
                      extractPreviewText(message.body)
                    )}
                  </InboxMessageBody>
                </EmailInboxMessagesHeading>
              );
            })}
          </div>

          <TotalPageCount>
            <div>
              Total Messages:{" "}
              {searchTerm.trim().length > 0
                ? searchResults.length
                : totalMessages}
            </div>
            {!searchTerm.trim() && totalMessages > messagesPerPage && (
              <EmailPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
          </TotalPageCount>
        </div>
      )}
      {selectedMessage && (
        <EmailInboxAreaDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          message={selectedMessage}
        />
      )}
    </EmailInboxMessagesContainer>
  );
};

export default EmailInboxArea;
