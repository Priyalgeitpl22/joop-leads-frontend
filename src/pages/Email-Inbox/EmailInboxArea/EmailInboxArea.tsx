import {memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  EmailInboxMessagesBox,
  EmailInboxMessagesContainer,
  EmailInboxMessagesHeading,
  EmailPagination,
  TotalPageCount,
  NoMailboxMessage,
  EmailInboxListHeader,
  StyledDivider,
  SearchBar,
} from "./EmailInboxArea.styled";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  debounce,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  getAllEmailThreads,
  searchEmails,
  setCurrentPage,
  setAppliedFilters,
  clearFilters,
  markThreadAsRead,
} from "../../../redux/slice/emailInboxSlice";

const filterConfig = [
  { key: "allReplies", label: "All Replies" },
  { key: "repliedToCampaigns", label: "Replied to Campaigns" },
  { key: "unreadOnly", label: "Unread Only" },
  { key: "repliedWithin7Days", label: "Replied within 7 days" },
  { key: "byUser", label: "By User" },
] as const;

type FilterKey = typeof filterConfig[number]["key"];
type FilterOptions = Record<FilterKey, boolean>;

interface Message {
  _id: string;
  subject: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  date: string;
  body: string;
  threadId: string;
  flags?: string[];
}

interface EmailInboxAreaProps {
  onMessageSelect?: (message: string) => void;
  selectedMessage?: string | null;
}

const EmailInboxAreaComponent: React.FC<EmailInboxAreaProps> = ({ onMessageSelect, selectedMessage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    allReplies: false,
    repliedToCampaigns: false,
    unreadOnly: false,
    repliedWithin7Days: false,
    byUser: false,
  });
  const appliedFilters = useSelector((state: RootState) => state.emailInbox.appliedFilters);

  const selectedMailboxId = useSelector((state: RootState) => state.emailInbox.selectedMailboxId);
  const selectedAccountId = useSelector((state: RootState) => state.emailInbox.selectedAccountId);
  const totalMessages = useSelector((state: RootState) => state.emailInbox.totalMessages);
  const mailboxMessages = useSelector((state: RootState) => state.emailInbox.mailboxMessages);
  const currentPage = useSelector((state: RootState) => state.emailInbox.currentPage);
  const loading = useSelector((state: RootState) => state.emailInbox.loading);
  const searchLoading = useSelector((state: RootState) => state.emailInbox.searchLoading);
  const searchResults = useSelector((state: RootState) => state.emailInbox.searchResults);

  const messagesPerPage = 10;
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  // Sync filterOptions with appliedFilters when popup opens or appliedFilters changes
  useEffect(() => {
    if (anchorEl) {
      const newFilterOptions = { ...filterOptions };
      filterConfig.forEach((config) => {
        newFilterOptions[config.key] = appliedFilters.includes(config.key);
      });
      setFilterOptions(newFilterOptions);
    }
  }, [appliedFilters, anchorEl]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllEmailThreads({
          accountId: selectedAccountId,
          page,
          limit: messagesPerPage,
          filters: appliedFilters,
        })
      );
    }
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
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
      }
    }, 500),
    [dispatch, selectedAccountId, selectedMailboxId, messagesPerPage]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const showSearchResults = searchTerm.trim().length > 0;
  const isSearchDone = showSearchResults && !searchLoading;

  const messagesToShow = useMemo(() => {
    return isSearchDone ? searchResults : mailboxMessages;
  }, [isSearchDone, searchResults, mailboxMessages]);
  

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filter: FilterKey) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleApplyFilters = () => {
    const selectedFilters = Object.entries(filterOptions)
      .filter(([_, value]) => value)
      .map(([key]) => key as FilterKey);

    dispatch(setAppliedFilters(selectedFilters));

    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllEmailThreads({
          accountId: selectedAccountId,
          page: currentPage,
          limit: messagesPerPage,
          filters: selectedFilters,
        })
      );
    }

    handleFilterClose();
  };

  const handleCancelFilters = () => {
    setFilterOptions({
      allReplies: false,
      repliedToCampaigns: false,
      unreadOnly: false,
      repliedWithin7Days: false,
      byUser: false,
    });
    dispatch(clearFilters());

    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllEmailThreads({
          accountId: selectedAccountId,
          page: currentPage,
          limit: messagesPerPage,
          filters: [],
        })
      );
    }

    handleFilterClose();
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const updatedFilters = appliedFilters.filter((filter) => filter !== filterToRemove);
    dispatch(setAppliedFilters(updatedFilters));

    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAllEmailThreads({
          accountId: selectedAccountId,
          page: currentPage,
          limit: messagesPerPage,
          filters: updatedFilters,
        })
      );
    }
  };

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
            style={{ width: "80px", height: "80px", marginBottom: "10px", opacity: 0.6 }}
          />
          No mail found.
        </NoMailboxMessage>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" , padding: "5px"}}>
          <EmailInboxListHeader>
            <SearchBar>
              <Search />
              <input placeholder="Search Email" value={searchTerm} onChange={onSearchChange} />
            </SearchBar>
            <Tooltip title="Filter Emails">
              <Button
                onClick={handleFilterClick}
                sx={{ marginLeft: "10px", color: "#000", border: "1px solid #000" }}
              >
                <FilterAltOutlinedIcon />
              </Button>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleFilterClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {filterConfig.map(({ key, label }) => (
                <MenuItem key={key}>
                  <Checkbox
                    checked={filterOptions[key]}
                    onChange={() => handleFilterChange(key)}
                  />
                  {label}
                </MenuItem>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "20px",
                }}
              >
                <Button
                  onClick={handleCancelFilters}
                  sx={{
                    marginRight: "10px",
                    color: "#000 !important",
                    backgroundColor: "#fff !important",
                    outline: "1px solid #000",
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleApplyFilters}>
                  Apply
                </Button>
              </div>
            </Menu>
          </EmailInboxListHeader>

          {appliedFilters.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                margin: "10px 0",
                overflowX: "auto",
                width: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {appliedFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onDelete={() => handleRemoveFilter(filter)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </div>
          )}

          <StyledDivider />

          {messagesToShow.length > 0 ? (
            <div style={{ flex: 1, overflowY: "auto" }}>
              {messagesToShow.map((message: Message) => (
                <EmailInboxMessagesHeading
                key={message._id}
                isSelected={message?.threadId === selectedMessage}
                isUnread={message?.flags?.includes("UNREAD")}
                onClick={() => {
                  if (onMessageSelect) onMessageSelect(message?.threadId);
                  if (message?.flags?.includes("UNREAD")) {
                    dispatch(markThreadAsRead({ threadId: message.threadId }));
                  }
                }}
              >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h4>{message.subject || "No Subject"}</h4>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
                      <div>
                        <strong>{message.from?.[0]?.name}</strong>
                        <div style={{ fontSize: "15px", color: "#555" }}>
                          {message.from?.[0]?.address || "No Email"}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "15px", color: "#777", marginTop: "5px" }}>
                      Date: {new Date(message.date).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ fontSize: "15px", color: "#777" }}>
                    To: <strong>{message.to?.[0]?.name}</strong> ({message.to?.[0]?.address || "No Email"})
                  </div>
                </EmailInboxMessagesHeading>
              ))}
            </div>
          ) : (
            <NoMailboxMessage>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="No Messages"
                style={{ width: "80px", height: "80px", marginBottom: "10px", opacity: 0.6 }}
              />
              No mail found.
            </NoMailboxMessage>
          )}

          <TotalPageCount>
            <div>
              Total Threads:{" "}
              {searchTerm.trim().length > 0 ? searchResults.length : totalMessages}
            </div>
            {searchTerm.trim().length === 0 && totalMessages > messagesPerPage && (
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

const EmailInboxArea = memo(EmailInboxAreaComponent);

export default EmailInboxArea;