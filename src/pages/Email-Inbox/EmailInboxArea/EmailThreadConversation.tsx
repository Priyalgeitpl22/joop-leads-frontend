import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  EmailInboxMessagesContainer,
  EmailInboxMessagesBox,
  NoMailboxMessage,
  EmailInboxListHeader,
  StyledDivider,
} from "./EmailInboxArea.styled";
import { 
  Avatar, 
  Box, 
  Button, 
  CircularProgress, 
  Divider, 
  IconButton, 
  Paper, 
  Typography 
} from "@mui/material";
import { ArrowLeft, Reply, ReplyAll, Trash2 } from "lucide-react";
import { setSelectedThread, setViewMode } from "../../../redux/slice/emailInboxSlice";
import styled from "styled-components";
import { getAccountThreads } from "../../../redux/slice/emailInboxSlice";

const ThreadHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 0',
}));

const MessagePaper = styled(Paper)(({ theme }) => ({
  padding: '16px',
  marginBottom: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

const MessageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '12px',
}));

const MessageSender = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const MessageBody = styled(Box)(({ theme }) => ({
  marginTop: '16px',
  fontSize: '14px',
  lineHeight: '1.5',
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginRight: '8px',
  textTransform: 'none',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '13px',
}));

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const EmailThreadConversation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const threadMessages = useSelector(
    (state: RootState) => state.emailInbox.threadMessages
  );
  const selectedThreadId = useSelector(
    (state: RootState) => state.emailInbox.selectedThreadId
  );
  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );
  const loading = useSelector(
    (state: RootState) => state.emailInbox.threadMessagesLoading
  );

  const handleBackToThreads = () => {
    dispatch(setSelectedThread(null));
    dispatch(setViewMode('threads'));
    
    // Reload threads for the mailbox when going back
    if (selectedAccountId && selectedMailboxId) {
      dispatch(
        getAccountThreads({
          accountId: selectedAccountId,
          mailboxId: selectedMailboxId,
          page: 1,
          limit: 10
        })
      );
    }
  };

  if (!selectedThreadId) {
    return (
      <NoMailboxMessage>
        No thread selected.
      </NoMailboxMessage>
    );
  }

  return (
    <EmailInboxMessagesContainer>
      {loading ? (
        <EmailInboxMessagesBox>
          <CircularProgress />
        </EmailInboxMessagesBox>
      ) : threadMessages.length === 0 ? (
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
          No messages found in this thread.
        </NoMailboxMessage>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <EmailInboxListHeader>
            <ThreadHeader>
              <IconButton onClick={handleBackToThreads}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="h6">
                {threadMessages[0]?.subject || "Thread Conversation"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({threadMessages.length} messages)
              </Typography>
            </ThreadHeader>
          </EmailInboxListHeader>

          <StyledDivider />

          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {threadMessages.map((message: any, index: number) => (
              <MessagePaper key={message._id} elevation={1}>
                <MessageHeader>
                  <MessageSender>
                    <Avatar 
                      src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {message.from?.[0]?.name || message.from?.[0]?.address || "Unknown Sender"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        to{" "}
                        {message.to?.map((recipient: any) => recipient.name || recipient.address).join(", ") ||
                          "No recipient"}
                      </Typography>
                    </Box>
                  </MessageSender>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(message.date)}
                    </Typography>
                  </Box>
                </MessageHeader>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <ActionButton 
                    variant="outlined" 
                    startIcon={<Reply size={16} />} 
                    size="small"
                  >
                    Reply
                  </ActionButton>
                  <ActionButton 
                    variant="outlined" 
                    startIcon={<ReplyAll size={16} />} 
                    size="small"
                  >
                    Reply All
                  </ActionButton>
                  <ActionButton 
                    variant="outlined" 
                    startIcon={<Trash2 size={16} />} 
                    size="small"
                    color="error"
                  >
                    Delete
                  </ActionButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <MessageBody>
                  {message.html ? (
                    <div dangerouslySetInnerHTML={{ __html: message.html }} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: message.body }} />
                  )}
                </MessageBody>
              </MessagePaper>
            ))}
          </Box>
        </div>
      )}
    </EmailInboxMessagesContainer>
  );
};

export default EmailThreadConversation; 