import{ useState, useEffect } from "react";
import { Avatar, Box, Typography, TextField, IconButton } from "@mui/material";
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
  Message,
  ChatInputContainer,
  PlaceholderContainer,
} from "./chatArea.styled";

interface ChatData {
  id: string;
  sender: string;
  threadId: string;
  content: string;
  timestamp: string;
}

interface ChatAreaProps {
  selectedThreadId: string | null;
}

const motionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ChatArea({
  selectedThreadId,
}: ChatAreaProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSocket();
  const { chats, loading } = useSelector((state: RootState) => state.chats);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (selectedThreadId) {
      dispatch(getchats(selectedThreadId));
    }
  }, [dispatch, selectedThreadId]);

  useEffect(() => {
    if (!socket || !selectedThreadId) return;
  
    console.log("Listening for messages...");
  
    socket.on("receiveMessage", (newMessage) => {
      console.log("Received message:", newMessage);
  
      const messageData: ChatData = {
        id: Date.now().toString(),
        threadId: newMessage.threadId,
        sender: "Bot",
        content: newMessage.answer,
        timestamp: new Date().toISOString(),
      };
  
      dispatch(addchat(messageData));
    });
  
    socket.on("updateDashboard", (data) => {
      if(data.sender === 'User') {
        console.log("Dashboard received:", data);
        dispatch(addchat(data));
      }
    });
  
    return () => {
      console.log("Cleaning up socket listeners...");
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
      timestamp: new Date().toISOString(),
    };
    socket.emit("updateDashboard", { sender: "Bot", content: messageData.content, threadId: selectedThreadId });
    dispatch(addchat(messageData));
    setInputMessage("");
  };

  return (
    <ChatContainer>{!selectedThreadId?(
      <PlaceholderContainer>
          <img src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg?t=st=1739357006~exp=1739360606~hmac=e1fcb2b59ef4d4a633ffe4346f7f80fd2e9ae62c5066c1ae5e90bf119b508b6f&w=1060" alt="No conversation selected" width="300" />
          <Typography  sx={{color:'#000000'}}>
            Select a conversation to start chatting
          </Typography>
        </PlaceholderContainer>
    ):(
      <>
      <ChatHeader>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>U</Avatar>
          <Box>
            <Typography variant="subtitle1">
              Unknown Visitor
            </Typography>
          </Box>
        </Box>
      </ChatHeader>

      <ChatMessages>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <Message key={chat.id} isbot={chat.sender === "Bot"}>
              <Avatar
                sx={{
                  bgcolor: chat.sender === "Bot" ? "#2196f3" : undefined,
                  width: 32,
                  height: 32,
                }}
              >
                {chat?.sender ? chat.sender.charAt(0).toUpperCase() : "U"}
              </Avatar>
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {chat.sender} •{" "}
                  {new Date(chat.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={motionVariants}
                >
                  <Typography>{chat.content}</Typography>
                </motion.div>
              </Box>
            </Message>
          ))
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
    )
  }
    </ChatContainer>
  );
}
