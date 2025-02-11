import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ChatListContainer,
  ChatListHeader,
  ChatListItem,
  TimeStamp,
  MessagePreview,
} from './chatList.styled';
import { useSocket } from '../../../context/SocketContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { getAllThreads } from '../../../redux/slice/threadSlice';

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface ChatListProps {
  threads: any[];
  onSelectThread: (threadId: string) => void;
}

export default function ChatList({ threads, onSelectThread }: ChatListProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>(); 
  const { socket } = useSocket();
  
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllThreads());
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chatStarted", (data) => {
      console.log("Thread started with ID:", data.threadId);
      setThreadId(data.threadId);
    });

    return () => {
      socket.off("chatStarted");
    };
  }, [socket]);

  return (
    <ChatListContainer>
      <ChatListHeader>
        <Typography variant="h6" sx={{ fontFamily: 'cursive', fontWeight: 600 }}>
          Inbox
        </Typography>
      </ChatListHeader>

      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <AnimatePresence>
          <List disablePadding>
            {threads.map((thread, index) => {
              const isActive = location.pathname === `/chat/${thread.id}`;
              return (
                <ChatListItem
                  key={thread.id}
                  active={isActive}
                  onClick={() => navigate(`/chat/${thread.id}`)}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#9e9e9e', width: 32, height: 32 }}>
                      {thread.type[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Unknown Visitor`}
                    secondary={<MessagePreview>Click to view messages</MessagePreview>}
                    primaryTypographyProps={{
                      variant: 'body1',
                      fontSize: '0.9rem',
                    }}
                  />
                  <TimeStamp>{new Date(thread.createdAt).toLocaleDateString()}</TimeStamp>
                </ChatListItem>
              );
            })}
          </List>
        </AnimatePresence>
      </Box>
    </ChatListContainer>
  );
}
