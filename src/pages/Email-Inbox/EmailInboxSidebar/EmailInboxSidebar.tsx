import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllAccountMailBox,
  getAllChats,
  getAccountThreads,
  setSelectedMailbox,
  setSelectedThread,
  setViewMode,
} from "../../../redux/slice/emailInboxSlice";
import {
  SidebarContainer,
  SidebarHeader,
  StyledDivider,
  StyledList,
  StyledListItem,
  NoMailboxMessage,
  EmailInboxListHeader,
} from "./EmailInboxSidebar.styled";
import CircularLoader from "../../../assets/Custom/circularProgress";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { MessageSquare, MessagesSquare } from "lucide-react";
import styled from "styled-components";

const ViewTabs = styled(Tabs)({
  marginBottom: '10px',
  '& .MuiTabs-indicator': {
    backgroundColor: 'var(--theme-color)',
  },
});

const ViewTab = styled(Tab)({
  minWidth: '50%',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  '&.Mui-selected': {
    color: 'var(--theme-color)',
  },
});

const EmailInboxSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const viewMode = useSelector(
    (state: RootState) => state.emailInbox.viewMode
  );

  const mailboxes = useSelector(
    (state: RootState) => state.emailInbox.mailboxes
  );

  const uniqueMailboxes = mailboxes.filter(
    (mailbox, index, self) =>
      index === self.findIndex((m) => m.name === mailbox.name)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats({ orgId: user?.orgId || "" }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user?.orgId]);

  useEffect(() => {
    const fetchInitialMailbox = async () => {
      setLoading(true);
      if (uniqueMailboxes.length > 0 && selectedAccountId && !selectedMailboxId) {
        const firstMailbox = uniqueMailboxes[0];
        dispatch(setSelectedMailbox(firstMailbox._id));
        await dispatch(
          getAllAccountMailBox({
            accountId: selectedAccountId,
            mailBoxId: firstMailbox._id,
          })
        );
      }
      setLoading(false);
    };

    fetchInitialMailbox();
  }, [uniqueMailboxes, selectedMailboxId, selectedAccountId, dispatch]);

  const handleMailboxClick = async (mailbox: { _id: string }) => {
    if (!selectedAccountId) return;
    setLoading(true);
    dispatch(setSelectedMailbox(mailbox._id));
    
    if (viewMode === 'messages') {
      await dispatch(
        getAllAccountMailBox({
          accountId: selectedAccountId,
          mailBoxId: mailbox._id,
          page: 1,
          limit: 10,
        })
      );
    } else {
      // In thread view, load threads for the selected mailbox
      dispatch(setSelectedThread(null));
      await dispatch(
        getAccountThreads({
          accountId: selectedAccountId,
          mailboxId: mailbox._id,
          page: 1,
          limit: 10,
        })
      );
    }
    
    setLoading(false);
  };

  const handleViewChange = (_event: React.SyntheticEvent, newValue: 'messages' | 'threads') => {
    dispatch(setViewMode(newValue));
    
    if (selectedAccountId && selectedMailboxId) {
      if (newValue === 'threads') {
        dispatch(setSelectedThread(null));
        dispatch(
          getAccountThreads({
            accountId: selectedAccountId,
            mailboxId: selectedMailboxId,
            page: 1,
            limit: 10,
          })
        );
      } else {
        dispatch(
          getAllAccountMailBox({
            accountId: selectedAccountId,
            mailBoxId: selectedMailboxId,
            page: 1,
            limit: 10,
          })
        );
      }
    }
  };

  return (
    <SidebarContainer>
      <EmailInboxListHeader>
        <SidebarHeader>Mailbox</SidebarHeader>
      </EmailInboxListHeader>
      <StyledDivider />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mx: 1, mt: 2 }}>
        <ViewTabs 
          value={viewMode} 
          onChange={handleViewChange as any}
          variant="fullWidth"
        >
          <ViewTab 
            value="messages" 
            label="Messages" 
            icon={<MessageSquare size={16} />} 
            iconPosition="start"
          />
          <ViewTab 
            value="threads" 
            label="Threads" 
            icon={<MessagesSquare size={16} />} 
            iconPosition="start"
          />
        </ViewTabs>
      </Box>
      
      <StyledList>
        {loading ? (
          <CircularLoader />
        ) : uniqueMailboxes.length > 0 ? (
          uniqueMailboxes.map((mailbox) => (
            <StyledListItem
              key={mailbox._id}
              onClick={() => handleMailboxClick(mailbox)}
              active={selectedMailboxId === mailbox._id}
            >
              {mailbox.name}
            </StyledListItem>
          ))
        ) : (
          <NoMailboxMessage>No mailboxes available</NoMailboxMessage>
        )}
      </StyledList>
    </SidebarContainer>
  );
};

export default EmailInboxSideBar;
