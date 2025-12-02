import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import EmailInboxArea from "./EmailInboxArea/EmailInboxArea";
import EmailInboxAreaDialog from "./EmailInboxArea/EmailInboxAreaDialog";
import EmailInboxList from "./EmailInboxList/EmailInboxList";
import {
  EmailInboxContainer,
  EmailInboxHeader,
  EmailInbox,
  AccountSelectorContainer,
  AccountSelectorButton,
  AccountAvatar,
  PopupContainer,
  PopupPaper,
} from "./EmailInboxSidebar/EmailInboxSidebar.styled";
import {
  setSelectedAccount,
  getAllMailBox,
  getAllEmailThreads,
  setSelectedMailbox,
  reloadAccountMailboxes,
  reloadAccountMessages,
  getAllChats,
} from "../../redux/slice/emailInboxSlice";
import { getAllThreadsMessages } from "../../redux/slice/emailInboxThreadMessage";
import { SectionTitle } from "../../styles/layout.styled";
import {
  Popover,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import {
  fetchEmailAccount,
  EmailAccount,
} from "../../redux/slice/emailAccountSlice";
import {
  EmailInboxMessagesBox,
  NoMailboxMessage,
} from "./EmailInboxArea/EmailInboxArea.styled";
import { ReloadIcon } from "./EmailInboxList/EmailInboxList.styled";

interface Message {
  id: string;
  threadId: string;
  messageId: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  subject: string;
  body: string;
  date: string;
}

export default function EmailInboxs() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [accountSelectorAnchor, setAccountSelectorAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);
  const loading = useSelector((state: RootState) => state.emailInbox.loading);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loadingMailboxes, setLoadingMailboxes] = useState<boolean>(true);
  const threadMessages = useSelector(
    (state: RootState) => state.threadMessage.threadMessages
  );
  const threadMessageLoading = useSelector(
    (state: RootState) => state.threadMessage.loading
  );
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
  const selectedAccount = accounts.find(
    (account) => account._id === selectedAccountId
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <= 600px

  useEffect(() => {
    if (user?.orgId) {
      loadEmailAccounts();
    }
  }, [dispatch, user?.orgId, selectedAccountId]);

  const loadEmailAccounts = async () => {
    try {
      const data = await dispatch(
        fetchEmailAccount({ orgId: user?.orgId || "" })
      ).unwrap();
      if (data.length > 0) {
        setEmailAccounts(data);
        if (!selectedAccountId) {
          const firstAccountId = data[0]._id as string;
          dispatch(setSelectedAccount(firstAccountId));
          await dispatch(getAllEmailThreads({ accountId: firstAccountId }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch email accounts:", error);
    }
  };

  useEffect(() => {
    const fetchMailboxes = async () => {
      if (!selectedAccountId) return;
      setLoadingMailboxes(true);
      setSelectedMessage(null);
      setOpenDialog(false);

      try {
        const res = await dispatch(getAllMailBox(selectedAccountId)).unwrap();
        const unique = res.filter(
          (
            mailbox: { _id: string; name: string },
            index: number,
            self: { _id: string; name: string }[]
          ) => index === self.findIndex((m) => m.name === mailbox.name)
        );
        if (unique.length > 0 && !selectedMailboxId) {
          const firstMailbox = unique[0];
          dispatch(setSelectedMailbox(firstMailbox._id));
          await dispatch(getAllEmailThreads({ accountId: selectedAccountId }));
          setLoadingMailboxes(false);
        }
      } catch (err) {
        setLoadingMailboxes(false);
        console.error("Failed to fetch mailboxes:", err);
      }
    };

    fetchMailboxes();
  }, [selectedAccountId, dispatch, selectedMailboxId]);

  useEffect(() => {
    dispatch(getAllChats({ orgId: user?.orgId || "" }));
  }, [dispatch, user?.orgId]);

  const handleAccountSelectorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountSelectorAnchor(event.currentTarget);
  };

  const handleAccountSelectorClose = () => {
    setAccountSelectorAnchor(null);
  };

  const handleMessageSelect = useCallback((message: string) => {
    if (message) {
      setSelectedMessage(message);
      setOpenDialog(true);
    }
  }, []);

  const open = Boolean(accountSelectorAnchor);

  useEffect(() => {
    if (!selectedMessage || !selectedAccountId) return;
    dispatch(
      getAllThreadsMessages({
        accountId: selectedAccountId,
        threadId: selectedMessage,
      })
    );
  }, [selectedMessage, selectedAccountId, dispatch]);

  const handleReload = async () => {
    if (!accounts || accounts.length === 0 || !selectedAccountId) return;
    try {
      setRefreshLoading(true);
      const res = await dispatch(
        reloadAccountMailboxes({ accountId: selectedAccountId || "" })
      ).unwrap();
      if (res) {
        await dispatch(reloadAccountMessages({ accountId: selectedAccountId || "" }));
        await dispatch(getAllEmailThreads({ accountId: selectedAccountId || "" }));
        if (selectedMessage) {
          await dispatch(
            getAllThreadsMessages({
              accountId: selectedAccountId || "",
              threadId: selectedMessage,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error while reloading account mailboxes:", error);
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "85vh",
        border: "1px solid var(--border-grey)",
        borderRadius: "10px",
        background: "white",
      }}
    >
      <EmailInbox>
        <EmailInboxHeader>
          <SectionTitle>Email Inbox</SectionTitle>
          <AccountSelectorContainer>
            <ReloadIcon
              style={{ color: "var(--text-secondary)" }}
              onClick={handleReload}
              loading={refreshLoading}
            />
            <AccountSelectorButton onClick={handleAccountSelectorClick}>
              <AccountAvatar>
                {selectedAccount?.name?.[0]?.toUpperCase() || <Person />}
              </AccountAvatar>
            </AccountSelectorButton>
          </AccountSelectorContainer>
        </EmailInboxHeader>

        <EmailInboxContainer>
          {loadingMailboxes || loading ? (
            <EmailInboxMessagesBox>
              <CircularProgress />
            </EmailInboxMessagesBox>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                height: "100%",
                width: "100%",
              }}
            >
              {/* Inbox list (hide on mobile when dialog is open) */}
              {(!isMobile || !selectedMessage) && (
                <div
                  style={{
                    flex: isMobile ? "1" : "0 0 50%",
                    overflowY: "auto",
                    height: "100%",
                  }}
                >
                  <EmailInboxArea
                    onMessageSelect={(messageId) =>
                      handleMessageSelect(messageId)
                    }
                    selectedMessage={selectedMessage}
                  />
                </div>
              )}

              {/* Dialog (hide on mobile until a message is selected) */}
              {(!isMobile || (isMobile && selectedMessage)) && (
                <div
                  style={{
                    flex: isMobile ? "1" : "0 0 50%",
                    overflowY: "auto",
                    padding: "10px",
                  }}
                >
                  {selectedMessage && openDialog ? (
                    !threadMessageLoading ? (
                      <>
                        <EmailInboxAreaDialog
                          onClose={() => {
                            setOpenDialog(false);
                            setSelectedMessage(null);
                          }}
                          messages={threadMessages as unknown as Message[]}
                          selectedAccountId={selectedAccount?._id || ""}
                        />
                      </>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: "50%",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )
                  ) : (
                    !isMobile && (
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
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </EmailInboxContainer>
      </EmailInbox>

      {/* Account selector popover */}
      <Popover
        open={open}
        anchorEl={accountSelectorAnchor}
        onClose={handleAccountSelectorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: PopupPaper,
        }}
      >
        <PopupContainer>
          <EmailInboxList
            onAccountSelect={handleAccountSelectorClose}
            accounts={emailAccounts}
          />
        </PopupContainer>
      </Popover>
    </Box>
    // </Box>
  );
}
