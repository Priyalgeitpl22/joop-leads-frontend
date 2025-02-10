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

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  path: string;
  isNew?: boolean;
}

export default function ChatList(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Priyal',
      message: "Thanks. We've passed along this inf...",
      time: 'Now',
      path: '/chat/1',
      isNew: true,
    },
    {
      id: 2,
      name: 'Unknown Visitor',
      message: "Thanks. We've passed along this inf...",
      time: '2 Jan',
      path: '/chat/2',
    },
    {
      id: 3,
      name: 'Unknown Visitor',
      message: "Thanks. We've passed along this inf...",
      time: '2 Jan',
      path: '/chat/3',
    },
    {
      id: 4,
      name: 'Maria Johnson',
      message: 'You connected chat. Any new chats on...',
      time: '2 Jan',
      path: '/chat/4',
    },
  ];

  return (
    <ChatListContainer>
      <ChatListHeader>
        <Typography variant="h6" sx={{fontFamily: 'cursive', fontWeight: 600}}>Inbox</Typography>
      </ChatListHeader>
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <AnimatePresence>
          <List disablePadding>
            {chats.map((chat, index) => {
              const isActive = location.pathname === chat.path;
              return (
                <ChatListItem
                  key={chat.id}
                  active={isActive}
                  onClick={() => navigate(chat.path)}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: chat.isNew ? '#7ed8d6' : '#9e9e9e',
                        width: 32,
                        height: 32,
                      }}
                    >
                      {chat.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={<MessagePreview>{chat.message}</MessagePreview>}
                    primaryTypographyProps={{
                      variant: 'body1',
                      fontSize: '0.9rem',
                    }}
                  />
                  <TimeStamp>{chat.time}</TimeStamp>
                </ChatListItem>
              );
            })}
          </List>
        </AnimatePresence>
      </Box>
    </ChatListContainer>
  );
}
