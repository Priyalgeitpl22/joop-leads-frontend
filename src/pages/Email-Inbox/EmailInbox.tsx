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
  getAllThreadsMessages,
  reloadAccountMailboxes,
  reloadAccountMessages,
  getAllChats,
} from "../../redux/slice/emailInboxSlice";
import { SectionTitle } from "../../styles/layout.styled";
import { Popover, CircularProgress } from "@mui/material";
import { Person } from "@mui/icons-material";
import {
  fetchEmailAccount,
  EmailAccount,
} from "../../redux/slice/emailAccountSlice";
import { EmailInboxMessagesBox, NoMailboxMessage } from "./EmailInboxArea/EmailInboxArea.styled";
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
  const [accountSelectorAnchor, setAccountSelectorAnchor] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const selectedAccountId = useSelector((state: RootState) => state.emailInbox.selectedAccountId);
  const selectedMailboxId = useSelector((state: RootState) => state.emailInbox.selectedMailboxId);
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);
  const loading = useSelector((state: RootState) => state.emailInbox.loading);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loadingMailboxes, setLoadingMailboxes] = useState<boolean>(true);
  const threadMessages = useSelector((state: RootState) => state.emailInbox.threadMessages);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);

  const selectedAccount = accounts.find((account) => account._id === selectedAccountId);

  // Load email accounts
  useEffect(() => {
    const loadEmailAccounts = async () => {
      try {
        const data = await dispatch(fetchEmailAccount({ orgId: user?.orgId || "" })).unwrap();
        setEmailAccounts(data);
        if(selectedAccountId)
        {
          await dispatch(
            getAllEmailThreads({
              accountId: selectedAccountId,
            })
          );
        }

        if (data.length > 0 && !selectedAccountId) {
          const firstAccountId = data[0]._id;
          dispatch(setSelectedAccount(firstAccountId));
        }
      } catch (error) {
        console.error("Failed to fetch email accounts:", error);
      }
    };

    if (user?.orgId) {
      loadEmailAccounts();
    }
  }, [dispatch, user?.orgId, selectedAccountId]);

  // Fetch Mailboxes when account is selected
  useEffect(() => {
    const fetchMailboxes = async () => {
      if (!selectedAccountId) return;
      setLoadingMailboxes(true);
      setSelectedMessage(null);
      setOpenDialog(false);

      try {
        const res = await dispatch(getAllMailBox(selectedAccountId)).unwrap();
        const unique = res.filter(
          (mailbox: any, index: number, self: any[]) =>
            index === self.findIndex((m) => m.name === mailbox.name)
        );
        if (unique.length > 0 && !selectedMailboxId) {
          const firstMailbox = unique[0];
          dispatch(setSelectedMailbox(firstMailbox._id));
          await dispatch(
            getAllEmailThreads({
              accountId: selectedAccountId,
            })
          );
        }
      } catch (err) {
        console.error("Failed to fetch mailboxes:", err);
      }

      setLoadingMailboxes(false);
    };

    fetchMailboxes();
  }, [selectedAccountId, dispatch, selectedMailboxId]);

  // Initial chats fetch (1 sec delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats({ orgId: user?.orgId || "" }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user?.orgId]);

  const handleAccountSelectorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountSelectorAnchor(event.currentTarget);
  };

  const handleAccountSelectorClose = () => {
    setAccountSelectorAnchor(null);
  };

  const handleMessageSelect = useCallback((message: string) => {
    setSelectedMessage((prev) => (prev === message ? prev : message));
    setOpenDialog(true);
  }, []);

  const open = Boolean(accountSelectorAnchor);

  useEffect(() => {
    if (!selectedMessage || !selectedAccountId) return;
    dispatch(getAllThreadsMessages({ accountId: selectedAccountId, threadId: selectedMessage }));
  }, [selectedMessage, selectedAccountId, dispatch]);

  const handleReload = async () => {
    if (!accounts || accounts.length === 0 || !selectedAccountId) return;

    try {
      setRefreshLoading(true);
      const res = await dispatch(reloadAccountMailboxes({ accountId: selectedAccountId })).unwrap();
      if (res) {
        await dispatch(reloadAccountMessages({ accountId: selectedAccountId }));
        await dispatch(getAllEmailThreads({ accountId: selectedAccountId }));
        if (selectedMessage) {
          await dispatch(
            getAllThreadsMessages({ accountId: selectedAccountId, threadId: selectedMessage })
          );
        }
      }
    } catch (error) {
      console.error("❌ Error while reloading account mailboxes:", error);
    } finally {
      setRefreshLoading(false);
    }
  };

  console.log("Rerender 000000")

  return (
    <>
      <EmailInbox>
        <EmailInboxHeader>
          <SectionTitle>Email Inbox</SectionTitle>
          <AccountSelectorContainer>
            <ReloadIcon onClick={handleReload} loading={refreshLoading} />
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
            <div style={{ display: "flex", flexDirection: "row", height: "100%", width: "100%" }}>
              <div style={{ flex: "0 0 50%", overflowY: "auto" }}>
                <EmailInboxArea onMessageSelect={handleMessageSelect} selectedMessage={selectedMessage} />
              </div>
              <div style={{ flex: "0 0 50%", overflowY: "auto", padding: "10px" }}>
                {selectedMessage && openDialog ? (
                  <EmailInboxAreaDialog
                    onClose={() => {
                      setOpenDialog(false);
                      setSelectedMessage(null);
                    }}
                    messages={threadMessages as unknown as Message[]}
                  />
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
              </div>
            </div>
          )}
        </EmailInboxContainer>
      </EmailInbox>
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
          <EmailInboxList onAccountSelect={handleAccountSelectorClose} accounts={emailAccounts} />
        </PopupContainer>
      </Popover>
    </>
  );
}