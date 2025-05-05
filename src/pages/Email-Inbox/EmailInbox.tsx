import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import EmailInboxArea from "./EmailInboxArea/EmailInboxArea";
import EmailInboxList from "./EmailInboxList/EmailInboxList";
import EmailInboxSideBar from "./EmailInboxSidebar/EmailInboxSidebar";
import EmailThreadList from "./EmailInboxArea/EmailThreadList";
import EmailThreadConversation from "./EmailInboxArea/EmailThreadConversation";
import { EmailInboxContainer, EmailInboxHeader, EmailInbox } from "./EmailInboxSidebar/EmailInboxSidebar.styled";
import { getAllChats, getAccountThreads } from "../../redux/slice/emailInboxSlice";
import { SectionTitle } from "../../styles/layout.styled";

export default function EmailInboxs() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const viewMode = useSelector((state: RootState) => state.emailInbox.viewMode);
  const selectedAccountId = useSelector((state: RootState) => state.emailInbox.selectedAccountId);
  const selectedMailboxId = useSelector((state: RootState) => state.emailInbox.selectedMailboxId);
  const selectedThreadId = useSelector((state: RootState) => state.emailInbox.selectedThreadId);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats({ orgId: user?.orgId || "" }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user?.orgId]);

  // Load threads when an account and mailbox are selected and the view mode is threads
  useEffect(() => {
    if (selectedAccountId && selectedMailboxId && viewMode === 'threads' && !selectedThreadId) {
      dispatch(getAccountThreads({
        accountId: selectedAccountId,
        mailboxId: selectedMailboxId,
        page: 1,
        limit: 10
      }));
    }
  }, [selectedAccountId, selectedMailboxId, viewMode, selectedThreadId, dispatch]);

  // Render the appropriate component based on viewMode and thread selection
  const renderContent = () => {
    if (viewMode === 'threads') {
      if (selectedThreadId) {
        return <EmailThreadConversation />;
      }
      return <EmailThreadList />;
    }
    return <EmailInboxArea />;
  };

  return (
    <>
      <EmailInbox>
        <EmailInboxHeader>
          <SectionTitle>Email Inbox</SectionTitle>
        </EmailInboxHeader>
        <EmailInboxContainer>
          <EmailInboxList />
          <EmailInboxSideBar />
          {renderContent()}
        </EmailInboxContainer>
      </EmailInbox>
    </>
  );
}
