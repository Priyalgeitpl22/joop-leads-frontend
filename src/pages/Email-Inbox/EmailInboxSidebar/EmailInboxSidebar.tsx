import {
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  Users,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import {
  SidebarContainer,
  Count,
  EmailInboxList,
  SidebarItem,
} from "./EmailInboxSidebar.styled";
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

interface EmailInboxSideBarProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const EmailInboxSideBar = ({ selectedType, onSelectType }: EmailInboxSideBarProps) => {
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
    {
      text: "Inbox",
      icon: <Users size={20} />,
      count: threadCounts["inbox"] || 0,
      threadType: "inbox",
    },
    {
      text: "Unread Replies",
      icon: <Users size={20} />,
      count: threadCounts["unread"] || 0,
      threadType: "unread",
    },
    {
      text: "Assigned to me",
      icon: <UserCheck size={20} />,
      count: threadCounts["assigned"] || 0,
      threadType: "assigned",
    },
    {
      text: "Sent",
      icon: <Users size={20} />,
      count: threadCounts["sent"] || 0,
      threadType: "sent",
    },
    {
      text: "Important",
      icon: <Users size={20} />,
      count: threadCounts["important"] || 0,
      threadType: "important",
    },
    {
      text: "All open",
      icon: <MessageSquare size={20} />,
      count: threadCounts["open"] || 0,
      threadType: "open",
    },
  ];

  return (
    <>
      {threads && threads.threads?.length > 0 ? (
        <SidebarContainer>
          <Box
            sx={{ padding: "10px", borderRadius: "8px" }}
            display="flex"
            alignItems="center"
            flexDirection={"column"}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "cursive", fontWeight: 600 }}
            >
              Inbox
            </Typography>
          </Box>
          <Divider />
          <EmailInboxList>
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
                  {typeof item.count === "number" && (
                    <Count variant="body2">{item.count}</Count>
                  )}
                </MotionSidebarItem>
              );
            })}
          </EmailInboxList>
        </SidebarContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="body1">No EmailInboxs available</Typography>
        </Box>
      )}
    </>
  );
};

export default EmailInboxSideBar;
