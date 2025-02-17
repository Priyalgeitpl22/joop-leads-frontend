import { ListItemText, ListItemIcon, Typography, Box, Divider } from "@mui/material";
import { MessageCircle, Users, Bot, UserCheck, MessageSquare } from "lucide-react";
import { SidebarContainer, Count, ChatList, SidebarItem } from "./chatSidebar.styled";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreads } from "../../../redux/slice/threadSlice";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  count?: number;
  threadType: string;
}

const MotionSidebarItem = motion.create(SidebarItem);

interface ChatSideBarProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ChatSideBar = ({ selectedType, onSelectType }: ChatSideBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const threads = useSelector((state: RootState) => state.thread);
  const [threadCounts, setThreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await dispatch(getAllThreads()).unwrap();

      if (response) {
        const groupedCounts = response.reduce(
          (acc: Record<string, number>, thread: { type: string }) => {
            acc[thread.type] = (acc[thread.type] || 0) + 1;
            return acc;
          },
          {}
        );
        setThreadCounts(groupedCounts);
      }
    };

    fetchThreads();
  }, [dispatch]);

  const menuItems: MenuItem[] = [
    { text: "Unassigned", icon: <Users size={20} />, count: threadCounts["unassigned"] || 0, threadType: "unassigned" },
    { text: "Assigned to me", icon: <UserCheck size={20} />, count: threadCounts["assigned"] || 0, threadType: "assigned" },
    { text: "All open", icon: <MessageSquare size={20} />, count: threadCounts["open"] || 0, threadType: "open" },
    { text: "Chat", icon: <MessageCircle size={20} />, count: threadCounts["chat"] || 0, threadType: "chat" },
    { text: "Bots", icon: <Bot size={20} />, count: threadCounts["bots"] || 0, threadType: "bots" },
  ];

  return (
    <>
      {(threads && threads.threads?.length > 0) ? (
        <SidebarContainer>
          <Box sx={{ padding: "10px" , borderRadius: '8px'}} display="flex" alignItems="center" flexDirection={"column"}>
            <Typography variant="h6" sx={{ fontFamily: "cursive", fontWeight: 600 }}>
              Inbox
            </Typography>
          </Box>
          <Divider />
          <ChatList>
            {menuItems.map((item) => {
              const isActive = selectedType === item.threadType;
              return (
                <MotionSidebarItem
                  key={item.text}
                  active={isActive}
                  onClick={() => onSelectType(item.threadType)}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {typeof item.count === "number" && <Count variant="body2">{item.count}</Count>}
                </MotionSidebarItem>
              );
            })}
          </ChatList>
        </SidebarContainer>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography variant="body1">No chats available</Typography>
        </Box>
      )}
    </>
  );
};

export default ChatSideBar;
