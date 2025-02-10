import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVertical,
  Paperclip,
  Plus,
  Send,
  SmilePlus,
} from 'lucide-react';
import { motion } from 'framer-motion';

import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  Message,
  ReassignmentNote,
  ChatInputContainer,
} from './chatArea.styled';

interface ChatData {
  id: number;
  type: 'message' | 'note';
  sender?: string;
  timestamp?: string;
  isBot?: boolean;
  content: string;
}

const chatData: ChatData[] = [
  {
    id: 1,
    type: 'message',
    sender: 'GOA1',
    timestamp: '7:05 PM',
    isBot: true,
    content: 'What is a good email address to contact you with?',
  },
  {
    id: 2,
    type: 'message',
    sender: 'Priyal',
    timestamp: '7:05 PM',
    isBot: false,
    content: 'priyal@goldeneagle.ai',
  },
  {
    id: 3,
    type: 'message',
    sender: 'GOA1',
    timestamp: '7:05 PM',
    isBot: true,
    content:
      'Would you like to? Sent quick reply options: Connect me with agent, Book Meeting',
  },
  {
    id: 4,
    type: 'note',
    content: 'GOA1 reassigned this thread on 7 Feb 2023 7:05 PM',
  },
  {
    id: 5,
    type: 'message',
    sender: 'GOA1',
    timestamp: '7:05 PM',
    isBot: true,
    content:
      "Thanks. We've passed along this information. A member of our team will be in touch soon.",
  },
];

// Motion variants for message content.
const motionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ChatArea(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderChatItem = (item: ChatData) => {
    if (item.type === 'note') {
      return (
        <ReassignmentNote key={item.id}>
          {item.content}
        </ReassignmentNote>
      );
    }
    return (
      <Message key={item.id} isbot={item.isBot}>
        <Avatar sx={{ bgcolor: item.isBot ? '#2196f3' : undefined, width: 32, height: 32 }}>
          {item.sender ? item.sender[0] : ''}
        </Avatar>
        <Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {item.sender} • {item.timestamp}
          </Typography>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={motionVariants}
            className="message-content"
          >
            <Typography>{item.content}</Typography>
          </motion.div>
        </Box>
      </Message>
    );
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>P</Avatar>
          <Box>
            <Typography variant="subtitle1">Priyal</Typography>
          </Box>
        </Box>
        <IconButton onClick={handleMenuClick}>
          <MoreVertical />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Block User</MenuItem>
        </Menu>
      </ChatHeader>

      <ChatMessages>
        {chatData.map((item) => renderChatItem(item))}
      </ChatMessages>

      <ChatInputContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write a message."
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <Box display="flex" gap={1}>
                <IconButton>
                  <Paperclip size={20} />
                </IconButton>
                <IconButton>
                  <SmilePlus size={20} />
                </IconButton>
                <IconButton>
                  <Plus size={20} />
                </IconButton>
                <IconButton color="primary">
                  <Send size={20} />
                </IconButton>
              </Box>
            ),
          }}
        />
      </ChatInputContainer>
    </ChatContainer>
  );
}
