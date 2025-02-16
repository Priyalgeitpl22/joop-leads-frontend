import React, { useEffect } from 'react';
import { List, ListItemAvatar, Avatar, ListItemText, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChatListContainer,
  ChatListHeader,
  ChatListItem,
  TimeStamp,
  MessagePreview,
} from './chatList.styled';
import { useSocket } from '../../../context/SocketContext';
import { useDispatch } from 'react-redux';
import { getAllThreads, Thread } from '../../../redux/slice/threadSlice';
import { AppDispatch } from '../../../redux/store/store';

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface ChatListProps {
  threads: Thread[];
  onSelectThread: (threadId: string) => void;
  type: string;
}

const MotionChatListItem = motion(ChatListItem);

const ChatList: React.FC<ChatListProps> = ({ threads, onSelectThread, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();
  const dispatch = useDispatch<AppDispatch>();
  const formatTimestamp = (createdAt: string): string => {
  const messageTime = new Date(createdAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  if (messageTime >= today) {
    return messageTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  } else if (messageTime >= yesterday && messageTime < today) {
    return "Yesterday";
  } else {
    return messageTime.toLocaleDateString([], { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }
};


  useEffect(() => {
    if (!socket) return;
    
    const handleChatStarted = (data: { threadId: string }) => {
      console.log("New thread started with ID:", data.threadId);
      dispatch(getAllThreads());
      onSelectThread(data.threadId);
      navigate(`/chats/${type}/${data.threadId}`);
    };

    socket.on("chatStarted", handleChatStarted);
    return () => {
      socket.off("chatStarted", handleChatStarted);
    };
  }, [socket, dispatch, onSelectThread, navigate, type]);

  return (
    <ChatListContainer>
      <ChatListHeader>
        <Typography variant="h6" sx={{ fontFamily: 'cursive', fontWeight: 600 }}>
          Threads  
        </Typography>
      </ChatListHeader>
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        {threads && threads.length > 0 ? (
          <AnimatePresence>
            <List disablePadding>
              {threads.map((thread, index) => {
                const { id, type: threadType, createdAt } = thread;
                const threadUrl = `/chats/${type}?/${id}`;
                const isActive = location.pathname === threadUrl;
                return (
                  <MotionChatListItem
                    key={id}
                    active={isActive}
                    onClick={() => {
                      onSelectThread(id);
                      navigate(threadUrl);
                    }}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'var(--theme-color)', width: 32, height: 32 }}>
                        {threadType[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Unknown Visitor"
                      secondary={<MessagePreview>Click to view messages</MessagePreview>}
                      primaryTypographyProps={{ variant: 'body1', fontSize: '0.9rem' }}
                    />
                    <TimeStamp>{formatTimestamp(createdAt)}</TimeStamp>
                  </MotionChatListItem>
                );
              })}
            </List>
          </AnimatePresence>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography variant="body1">No threads available</Typography>
          </Box>
        )}
      </Box>
    </ChatListContainer>
  );
};
export default ChatList;
