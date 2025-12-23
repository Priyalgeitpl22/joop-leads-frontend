import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, Send, Mail, Reply, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmailAccounts } from '../../store/slices/emailAccountSlice';
import {
  fetchMailboxes,
  fetchEmailThreads,
  fetchThreadMessages,
  searchEmails,
  markThreadAsRead,
  sendReply,
  setSelectedAccount,
  setSelectedMailbox,
  setCurrentPage,
  setAppliedFilters,
  clearFilters,
  clearThreadMessages,
} from '../../store/slices/inboxSlice';
import type { IEmailThread, IThreadMessage, IReplyPayload } from '../../services/inbox.service';
import type { Account } from '../../types/emailAccount.types';
import * as S from './Inbox.styled';

const MESSAGES_PER_PAGE = 10;

const filterConfig = [
  { key: 'allReplies', label: 'All Replies' },
  { key: 'repliedToCampaigns', label: 'Replied to Campaigns' },
  { key: 'unreadOnly', label: 'Unread Only' },
  { key: 'repliedWithin7Days', label: 'Replied within 7 days' },
  { key: 'byUser', label: 'By User' },
] as const;

type FilterKey = (typeof filterConfig)[number]['key'];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getInitials = (name: string) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Inbox: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { accounts } = useAppSelector((state) => state.emailAccount);
  const {
    mailboxMessages,
    threadMessages,
    searchResults,
    selectedAccountId,
    selectedMailboxId,
    currentPage,
    totalMessages,
    loading,
    threadLoading,
    searchLoading,
    appliedFilters,
  } = useAppSelector((state) => state.inbox);

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [accountSearchQuery, setAccountSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Record<FilterKey, boolean>>({
    allReplies: false,
    repliedToCampaigns: false,
    unreadOnly: false,
    repliedWithin7Days: false,
    byUser: false,
  });
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const accountPopupRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedAccount = useMemo(
    () => accounts.find((acc: Account) => acc._id === selectedAccountId),
    [accounts, selectedAccountId]
  );

  const filteredAccounts = useMemo(() => {
    if (!accountSearchQuery.trim()) return accounts;
    const query = accountSearchQuery.toLowerCase();
    return accounts.filter(
      (acc: Account) =>
        acc.name?.toLowerCase().includes(query) || acc.email?.toLowerCase().includes(query)
    );
  }, [accounts, accountSearchQuery]);

  const messagesToShow = useMemo(() => {
    return searchQuery.trim() && !searchLoading ? searchResults : mailboxMessages;
  }, [searchQuery, searchLoading, searchResults, mailboxMessages]);

  const totalPages = Math.ceil(totalMessages / MESSAGES_PER_PAGE);

  // Load email accounts on mount
  useEffect(() => {
    if (currentUser?.orgId) {
      dispatch(fetchEmailAccounts(currentUser.orgId));
    }
  }, [dispatch, currentUser?.orgId]);

  // Set first account as selected
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccountId) {
      const firstAccountId = accounts[0]._id;
      dispatch(setSelectedAccount(firstAccountId || null));
    }
  }, [accounts, selectedAccountId, dispatch]);

  // Load mailboxes and threads when account is selected
  useEffect(() => {
    if (!selectedAccountId) return;

    const loadData = async () => {
      try {
        const mailboxes = await dispatch(fetchMailboxes(selectedAccountId)).unwrap();
        if (mailboxes.length > 0 && !selectedMailboxId) {
          dispatch(setSelectedMailbox(mailboxes[0]._id));
        }
        await dispatch(
          fetchEmailThreads({
            accountId: selectedAccountId,
            page: 1,
            limit: MESSAGES_PER_PAGE,
          })
        );
      } catch (error) {
        console.error('Failed to load inbox data:', error);
      }
    };

    loadData();
  }, [selectedAccountId, dispatch, selectedMailboxId]);

  // Load thread messages when thread is selected
  useEffect(() => {
    if (selectedThreadId && selectedAccountId) {
      dispatch(
        fetchThreadMessages({
          accountId: selectedAccountId,
          threadId: selectedThreadId,
        })
      );
    }
  }, [selectedThreadId, selectedAccountId, dispatch]);

  // Sync filter options with applied filters
  useEffect(() => {
    if (showFilterMenu) {
      const newOptions = { ...filterOptions };
      filterConfig.forEach(({ key }) => {
        newOptions[key] = appliedFilters.includes(key);
      });
      setFilterOptions(newOptions);
    }
  }, [appliedFilters, showFilterMenu]);

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountPopupRef.current &&
        !accountPopupRef.current.contains(event.target as Node)
      ) {
        setShowAccountPopup(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountSelect = async (accountId: string) => {
    setSelectedThreadId(null);
    dispatch(clearThreadMessages());
    dispatch(setSelectedAccount(accountId));
    setShowAccountPopup(false);
  };

  const handleThreadSelect = async (thread: IEmailThread) => {
    setSelectedThreadId(thread.threadId);
    setIsReplying(false);
    setReplyContent('');

    if (thread.flags?.includes('UNREAD')) {
      dispatch(markThreadAsRead(thread.threadId));
    }
  };

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (value.trim() && selectedAccountId && selectedMailboxId) {
        searchTimeoutRef.current = setTimeout(() => {
          dispatch(
            searchEmails({
              accountId: selectedAccountId,
              mailboxId: selectedMailboxId,
              search: value.trim(),
              page: 1,
              limit: MESSAGES_PER_PAGE,
            })
          );
        }, 500);
      }
    },
    [dispatch, selectedAccountId, selectedMailboxId]
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (selectedAccountId) {
      dispatch(
        fetchEmailThreads({
          accountId: selectedAccountId,
          page,
          limit: MESSAGES_PER_PAGE,
          filters: appliedFilters,
        })
      );
    }
  };

  const handleFilterChange = (key: FilterKey) => {
    setFilterOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyFilters = () => {
    const selected = Object.entries(filterOptions)
      .filter(([, value]) => value)
      .map(([key]) => key);

    dispatch(setAppliedFilters(selected));

    if (selectedAccountId) {
      dispatch(
        fetchEmailThreads({
          accountId: selectedAccountId,
          page: 1,
          limit: MESSAGES_PER_PAGE,
          filters: selected,
        })
      );
    }

    setShowFilterMenu(false);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      allReplies: false,
      repliedToCampaigns: false,
      unreadOnly: false,
      repliedWithin7Days: false,
      byUser: false,
    });
    dispatch(clearFilters());

    if (selectedAccountId) {
      dispatch(
        fetchEmailThreads({
          accountId: selectedAccountId,
          page: 1,
          limit: MESSAGES_PER_PAGE,
          filters: [],
        })
      );
    }

    setShowFilterMenu(false);
  };

  const handleRemoveFilter = (filter: string) => {
    const updatedFilters = appliedFilters.filter((f) => f !== filter);
    dispatch(setAppliedFilters(updatedFilters));

    if (selectedAccountId) {
      dispatch(
        fetchEmailThreads({
          accountId: selectedAccountId,
          page: 1,
          limit: MESSAGES_PER_PAGE,
          filters: updatedFilters,
        })
      );
    }
  };

  const handleSendReply = async () => {
    if (!replyContent.trim() || !selectedAccount || threadMessages.length === 0) return;

    setIsSending(true);
    const lastMessage = threadMessages[threadMessages.length - 1];
    const firstMessage = threadMessages[0];

    const payload: IReplyPayload = {
      accountId: selectedAccount._id || '',
      from: {
        name: selectedAccount.name || 'Unknown',
        address: selectedAccount.email || '',
      },
      to: {
        name: lastMessage.from?.[0]?.name || 'Unknown',
        address: lastMessage.from?.[0]?.address || '',
      },
      emailTemplate: {
        subject: firstMessage.subject || 'No Subject',
        emailBody: replyContent,
      },
      messageId: lastMessage.messageId || '',
      threadId: lastMessage.threadId || '',
    };

    try {
      const result = await dispatch(sendReply(payload)).unwrap();
      if (result.code === 200) {
        toast.success(result.message || 'Reply sent successfully');
        setReplyContent('');
        setIsReplying(false);
      } else {
        toast.error(result.message || 'Failed to send reply');
      }
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Failed to send reply');
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseThread = () => {
    setSelectedThreadId(null);
    dispatch(clearThreadMessages());
    setIsReplying(false);
    setReplyContent('');
  };

  const renderThreadMessage = (message: IThreadMessage, index: number) => (
    <S.MessageCard key={message.id || index}>
      <S.MessageHeader>
        <S.MessageAvatar>
          <S.AccountAvatar $size="sm">
            {getInitials(message.from?.[0]?.name || 'U')}
          </S.AccountAvatar>
        </S.MessageAvatar>
        <S.MessageInfo>
          <div className="sender">{message.from?.[0]?.name || message.from?.[0]?.address || 'Unknown Sender'}</div>
          <div className="date">{formatDate(message.date)}</div>
        </S.MessageInfo>
      </S.MessageHeader>
      <S.MessageRecipient>
        {message.to?.[0]?.name || 'Unknown'} ({message.to?.[0]?.address || 'No Email'})
      </S.MessageRecipient>
      <S.MessageBody dangerouslySetInnerHTML={{ __html: message.body || 'No content available.' }} />
    </S.MessageCard>
  );

  return (
    <S.PageContainer>
      <S.InboxWrapper>
        <S.InboxHeader>
          <h3>Email Inbox</h3>
          <S.AccountSelector>
            <span>({selectedAccount?.email})</span>
            <div style={{ position: 'relative' }} ref={accountPopupRef}>
              <S.AccountButton onClick={() => setShowAccountPopup(!showAccountPopup)}>
                <S.AccountAvatar>
                  {selectedAccount?.name?.[0]?.toUpperCase() || '?'}
                </S.AccountAvatar>
              </S.AccountButton>

              <S.AccountPopup $open={showAccountPopup}>
                <S.AccountPopupHeader>
                  <S.AccountPopupSearch>
                    <Search size={16} />
                    <input
                      placeholder="Search accounts..."
                      value={accountSearchQuery}
                      onChange={(e) => setAccountSearchQuery(e.target.value)}
                    />
                  </S.AccountPopupSearch>
                </S.AccountPopupHeader>
                <S.AccountList>
                  {filteredAccounts.length > 0 ? (
                    <>
                      {selectedAccount && (
                        <S.AccountItem
                          $selected={true}
                          onClick={() => handleAccountSelect(selectedAccount._id || '')}
                        >
                          <S.AccountAvatar>
                            {selectedAccount.name?.[0]?.toUpperCase() || '?'}
                          </S.AccountAvatar>
                          <S.AccountItemDetails>
                            <div className="name">{selectedAccount.name}</div>
                            <div className="email">{selectedAccount.email}</div>
                          </S.AccountItemDetails>
                        </S.AccountItem>
                      )}
                      {filteredAccounts.filter((acc: Account) => acc._id !== selectedAccountId).length >
                        0 && (
                        <>
                          <S.AccountDivider>Select another account</S.AccountDivider>
                          {filteredAccounts
                            .filter((acc: Account) => acc._id !== selectedAccountId)
                            .map((account: Account) => (
                              <S.AccountItem
                                key={account._id}
                                onClick={() => handleAccountSelect(account._id || '')}
                              >
                                <S.AccountAvatar>
                                  {account.name?.[0]?.toUpperCase() || '?'}
                                </S.AccountAvatar>
                                <S.AccountItemDetails>
                                  <div className="name">{account.name}</div>
                                  <div className="email">{account.email}</div>
                                </S.AccountItemDetails>
                              </S.AccountItem>
                            ))}
                        </>
                      )}
                    </>
                  ) : (
                    <S.EmptyState>
                      <p>No accounts found</p>
                    </S.EmptyState>
                  )}
                </S.AccountList>
              </S.AccountPopup>
            </div>
          </S.AccountSelector>
        </S.InboxHeader>

        <S.InboxContent>
          <S.ThreadList $hasSelectedThread={!!selectedThreadId}>
            <S.ThreadListHeader>
              <S.SearchInput>
                <Search size={18} />
                <input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </S.SearchInput>
              <div style={{ position: 'relative' }} ref={filterMenuRef}>
                <S.FilterButton
                  $active={appliedFilters.length > 0}
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter size={18} />
                </S.FilterButton>

                <S.FilterMenu $open={showFilterMenu}>
                  {filterConfig.map(({ key, label }) => (
                    <S.FilterMenuItem key={key}>
                      <input
                        type="checkbox"
                        checked={filterOptions[key]}
                        onChange={() => handleFilterChange(key)}
                      />
                      <span>{label}</span>
                    </S.FilterMenuItem>
                  ))}
                  <S.FilterMenuActions>
                    <S.ActionButton onClick={handleClearFilters}>Cancel</S.ActionButton>
                    <S.ActionButton $variant="primary" onClick={handleApplyFilters}>
                      Apply
                    </S.ActionButton>
                  </S.FilterMenuActions>
                </S.FilterMenu>
              </div>
            </S.ThreadListHeader>

            {appliedFilters.length > 0 && (
              <S.FilterChips>
                {appliedFilters.map((filter) => (
                  <S.FilterChip key={filter}>
                    {filter}
                    <button onClick={() => handleRemoveFilter(filter)}>
                      <X size={12} />
                    </button>
                  </S.FilterChip>
                ))}
              </S.FilterChips>
            )}

            {loading ? (
              <S.SkeletonContainer>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <S.SkeletonItem key={i}>
                    <S.SkeletonLine $width="70%" $height="14px" />
                    <S.SkeletonRow style={{ marginTop: 8 }}>
                      <S.SkeletonAvatar />
                      <S.SkeletonText>
                        <S.SkeletonLine $width="40%" $height="12px" />
                        <S.SkeletonLine $width="60%" $height="10px" />
                      </S.SkeletonText>
                      <S.SkeletonLine $width="50px" $height="10px" />
                    </S.SkeletonRow>
                  </S.SkeletonItem>
                ))}
              </S.SkeletonContainer>
            ) : messagesToShow.length === 0 ? (
              <S.EmptyState>
                <Mail size={40} />
                <h4>No emails found</h4>
                <p>Your inbox is empty or no emails match your search.</p>
              </S.EmptyState>
            ) : (
              <>
                <S.ThreadItems>
                  {messagesToShow.map((thread: IEmailThread) => (
                    <S.ThreadItem
                      key={thread._id}
                      $selected={thread.threadId === selectedThreadId}
                      $unread={thread.flags?.includes('UNREAD')}
                      onClick={() => handleThreadSelect(thread)}
                    >
                      <S.ThreadSubject $unread={thread.flags?.includes('UNREAD')}>
                        {thread.subject || 'No Subject'}
                      </S.ThreadSubject>
                      <S.ThreadMeta>
                        <S.ThreadSender>
                          <S.AccountAvatar $size="sm">
                            {getInitials(thread.from?.[0]?.name || 'U')}
                          </S.AccountAvatar>
                          <div className="info">
                            <span className="name">{thread.from?.[0]?.name || 'Unknown'}</span>
                            <span className="email">{thread.from?.[0]?.address || ''}</span>
                          </div>
                        </S.ThreadSender>
                        <S.ThreadDate>{formatDate(thread.date)}</S.ThreadDate>
                      </S.ThreadMeta>
                      <S.ThreadRecipient>
                        To: <strong>{thread.to?.[0]?.name || 'Unknown'}</strong> (
                        {thread.to?.[0]?.address || ''})
                      </S.ThreadRecipient>
                    </S.ThreadItem>
                  ))}
                </S.ThreadItems>

                {!searchQuery.trim() && totalMessages > MESSAGES_PER_PAGE && (
                  <S.Pagination>
                    <span>Total: {totalMessages} threads</span>
                    <S.PaginationButtons>
                      <S.PageButton
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <ChevronLeft size={16} />
                      </S.PageButton>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <S.PageButton
                            key={page}
                            $active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </S.PageButton>
                        );
                      })}
                      <S.PageButton
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight size={16} />
                      </S.PageButton>
                    </S.PaginationButtons>
                  </S.Pagination>
                )}
              </>
            )}
          </S.ThreadList>

          <S.ThreadDetail $visible={!!selectedThreadId}>
            {selectedThreadId ? (
              <>
                <S.ThreadDetailHeader>
                  <S.CloseButton onClick={handleCloseThread} title="Back to inbox">
                    <ArrowLeft size={18} />
                  </S.CloseButton>
                  <h3>{threadMessages[0]?.subject || 'No Subject'}</h3>
                  <div style={{ width: 36 }} /> {/* Spacer for alignment */}
                </S.ThreadDetailHeader>

                {threadLoading ? (
                  <S.ThreadMessages>
                    {[1, 2].map((i) => (
                      <S.MessageCard key={i}>
                        <S.MessageHeader>
                          <S.SkeletonAvatar style={{ width: 32, height: 32 }} />
                          <S.SkeletonText>
                            <S.SkeletonLine $width="120px" $height="12px" />
                            <S.SkeletonLine $width="80px" $height="10px" />
                          </S.SkeletonText>
                        </S.MessageHeader>
                        <div style={{ padding: 12 }}>
                          <S.SkeletonLine $width="100%" $height="12px" />
                          <S.SkeletonLine $width="90%" $height="12px" />
                          <S.SkeletonLine $width="75%" $height="12px" />
                        </div>
                      </S.MessageCard>
                    ))}
                  </S.ThreadMessages>
                ) : threadMessages.length > 0 ? (
                  <>
                    <S.ThreadMessages>
                      {threadMessages.map((msg, index) => renderThreadMessage(msg, index))}
                    </S.ThreadMessages>

                    <S.ReplyComposer>
                      {isReplying ? (
                        <>
                          <S.ReplyTextarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            autoFocus
                          />
                          <S.ReplyActions>
                            <S.ActionButton onClick={() => setIsReplying(false)}>
                              <X size={14} />
                              Discard
                            </S.ActionButton>
                            <S.ActionButton
                              $variant="primary"
                              onClick={handleSendReply}
                              disabled={!replyContent.trim() || isSending}
                            >
                              {isSending ? 'Sending...' : (
                                <>
                                  <Send size={14} />
                                  Send
                                </>
                              )}
                            </S.ActionButton>
                          </S.ReplyActions>
                        </>
                      ) : (
                        <S.ActionButton
                          $variant="primary"
                          onClick={() => setIsReplying(true)}
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <Reply size={14} />
                          Reply
                        </S.ActionButton>
                      )}
                    </S.ReplyComposer>
                  </>
                ) : (
                  <S.EmptyState>
                    <p>No messages in this thread</p>
                  </S.EmptyState>
                )}
              </>
            ) : (
              <S.EmptyState>
                <Mail size={36} />
                <h4>Select an email</h4>
                <p>Choose an email from the list to view</p>
              </S.EmptyState>
            )}
          </S.ThreadDetail>
        </S.InboxContent>
      </S.InboxWrapper>
    </S.PageContainer>
  );
};

export default Inbox;

