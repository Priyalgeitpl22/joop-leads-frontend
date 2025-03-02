import React, { useEffect } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  EmailInboxListContainer,
  EmailInboxListHeader,
  EmailInboxListItem,
  ThreadList,
  TimeStamp,
  MessagePreview,
} from "./EmailInboxList.styled";
import { useSocket } from "../../../context/SocketContext";
import { useDispatch } from "react-redux";
import { getAllThreads, Thread } from "../../../redux/slice/threadSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { AppDispatch } from "../../../redux/store/store";
import { formatTimestamp } from "../../../utils/utils";
import { SearchBar } from "../../../components/Header/header.styled";
import ReplayIcon from "@mui/icons-material/Replay";
import { Search } from "lucide-react";

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface EmailInboxListProps {
  threads: Thread[];
  onSelectThread: (threadId: string) => void;
  type: string;
  selectedThreadId: string | null;
}

const MotionEmailInboxListItem = motion(EmailInboxListItem);

const EmailInboxList: React.FC<EmailInboxListProps> = ({
  threads,
  onSelectThread,
  type,
  selectedThreadId,
}) => {
  const { socket } = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!socket) return;

    const handleEmailInboxStarted = (data: { threadId: string }) => {
      console.log("New thread started with ID:", data.threadId);
      dispatch(getAllThreads());
      onSelectThread(data.threadId);
    };

    socket.on("EmailInboxStarted", handleEmailInboxStarted);
    return () => {
      socket.off("EmailInboxStarted", handleEmailInboxStarted);
    };
  }, [socket, dispatch, onSelectThread, type]);

  return (
    <EmailInboxListContainer>
      <EmailInboxListHeader>
        <Box sx={{display: "flex"}}>
          <SearchBar style={{ width: "100%", marginRight: "10%"}}>
            <Search size={20} />
            <input placeholder="Search leads..." />
          </SearchBar>
          <SortOutlinedIcon />
        </Box>
        <Box sx={{display: "flex", gap: "150px" }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "cursive", fontWeight: 600 }}
          >
            Threads
          </Typography>
          <Box>
            <ReplayIcon/>
            <FilterAltOutlinedIcon/>
          </Box>
        </Box>
      </EmailInboxListHeader>
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        {threads && threads.length > 0 ? (
          <AnimatePresence>
            <ThreadList>
              {threads.map((thread, index) => {
                const isActive = thread.id === selectedThreadId;

                return (
                  <MotionEmailInboxListItem
                    key={thread.id}
                    active={isActive}
                    onClick={() => onSelectThread(thread.id)}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "var(--theme-color)",
                          width: 32,
                          height: 32,
                        }}
                      >
                        {thread.type[0]?.toUpperCase() || "?"}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Unknown Visitor"
                      secondary={
                        <MessagePreview>Click to view messages</MessagePreview>
                      }
                      primaryTypographyProps={{
                        variant: "body1",
                        fontSize: "0.9rem",
                      }}
                    />
                    <TimeStamp>{formatTimestamp(thread.createdAt)}</TimeStamp>
                  </MotionEmailInboxListItem>
                );
              })}
            </ThreadList>
          </AnimatePresence>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1">No threads available</Typography>
          </Box>
        )}
      </Box>
    </EmailInboxListContainer>
  );
};

export default EmailInboxList;
