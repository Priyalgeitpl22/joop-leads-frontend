import { useState, useEffect } from "react";
import { Avatar, Box, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { getchats, addchat } from "../../../redux/slice/chatSlice";
import { useSocket } from "../../../context/SocketContext";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatInputContainer,
  PlaceholderContainer,
  BotMessage,
  BotMessageBubble,
  UserMessage,
  UserMessageBubble,
} from "./chatArea.styled";

interface ChatData {
  id: string;
  sender: string;
  threadId: string;
  content: string;
  createdAt: string;
}

interface ChatAreaProps {
  selectedThreadId: string | null;
}

const motionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ChatArea({ selectedThreadId }: ChatAreaProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSocket();
  const { chats, loading } = useSelector((state: RootState) => state.chats);
  const [inputMessage, setInputMessage] = useState("");

  // Ensure the loader shows for at least 1 second.
  const [delayedLoading, setDelayedLoading] = useState(loading);
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setDelayedLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(true);
    }
  }, [loading]);

  const formatTimestamp = (createdAt: string): string => {
    const messageTime = new Date(createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    if (messageTime >= today) {
      return messageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    } else if (messageTime >= yesterday && messageTime < today) {
      return "Yesterday";
    } else {
      return messageTime.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
    }
  };

  useEffect(() => {
    if (selectedThreadId) {
      dispatch(getchats(selectedThreadId));
    }
  }, [dispatch, selectedThreadId]);

  useEffect(() => {
    if (!socket || !selectedThreadId) return;

    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.sender === "Bot" && newMessage.threadId === selectedThreadId) {
        const messageData: ChatData = {
          id: Date.now().toString(),
          threadId: newMessage.threadId,
          sender: "Bot",
          content: newMessage.answer,
          createdAt: new Date().toISOString(),
        };
        dispatch(addchat(messageData));
      }
    });

    socket.on("updateDashboard", (data) => {
      if (data.sender === "User" && data.threadId === selectedThreadId) {
        dispatch(addchat(data));
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateDashboard");
    };
  }, [socket, selectedThreadId, dispatch]);

  const sendMessage = () => {
    if (!socket || !selectedThreadId || !inputMessage.trim()) return;
    const messageData: ChatData = {
      id: Date.now().toString(),
      threadId: selectedThreadId,
      sender: "Bot",
      content: inputMessage,
      createdAt: new Date().toISOString(),
    };
    socket.emit("updateDashboard", {
      sender: "Bot",
      content: messageData.content,
      threadId: selectedThreadId,
    });
    dispatch(addchat(messageData));
    setInputMessage("");
  };

  return (
    <ChatContainer>
      {!selectedThreadId ? (
        <PlaceholderContainer>
          <img
            src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg"
            alt="No conversation selected"
            width="300"
          />
          <Typography sx={{ color: "#000000" }}>Select a conversation to start chatting</Typography>
        </PlaceholderContainer>
      ) : (
        <>
          <ChatHeader>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar>U</Avatar>
              <Typography variant="subtitle1">Unknown Visitor</Typography>
            </Box>
          </ChatHeader>

          <ChatMessages>
            {delayedLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : chats.length > 0 ? (
              chats.map((chat) => {
                const isBot = chat.sender === "Bot";
                return isBot ? (
                  <BotMessage key={chat.id}>  
                  <Box sx={{display:'flex', gap:'8px'}}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {chat.sender} • {formatTimestamp(chat.createdAt)}
                    </Typography>
                  <Avatar sx={{ bgcolor: "#7ed8d6", width: 32, height: 32 }}>
                    {chat.sender.charAt(0).toUpperCase()}
                  </Avatar>
                  </Box>
                  <motion.div initial="hidden" animate="visible" variants={motionVariants}>
                      <BotMessageBubble>{chat.content}</BotMessageBubble>
                    </motion.div>
                </BotMessage>
                ) : (
                  <UserMessage key={chat.id}>
                  <Avatar sx={{ bgcolor: "#bdbdbd", width: 32, height: 32 }}>
                    {chat.sender.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {chat.sender} • {formatTimestamp(chat.createdAt)}
                    </Typography>
                    <motion.div initial="hidden" animate="visible" variants={motionVariants}>
                      <UserMessageBubble>{chat.content}</UserMessageBubble>
                    </motion.div>
                  </Box>
                </UserMessage>
                );
              })
            ) : (
              <Typography>No messages yet.</Typography>
            )}
          </ChatMessages>

          <ChatInputContainer>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a message..."
              multiline
              maxRows={4}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton color="primary" onClick={sendMessage}>
                    <Send size={20} />
                  </IconButton>
                ),
              }}
            />
          </ChatInputContainer>
        </>
      )}
    </ChatContainer>
  );
}
