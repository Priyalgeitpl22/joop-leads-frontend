import React, { useState, useEffect } from "react";
import {
  Badge,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSocket } from "../../context/SocketContext";
import { NotificationContainer } from "./notification.styled";

const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const playNotificationSound = () => {
      const audio = new Audio("/sounds/notification.mp3");
      audio
        .play()
        .catch((err) => console.error("🔊 Error playing sound:", err));
    };

    const handleNotification = (data: { message: string }) => {
      console.log("📩 Notification received:", data.message);
      setNotifications((prev) => [...prev, data.message]);
      playNotificationSound();
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon sx={{ fontSize: 25, color: 'var(--theme-color-dark)' }} />
        </Badge>
        <Typography variant="subtitle2" sx={{ fontSize: 10, color: '#696969' }}>
          Notifications
        </Typography>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <NotificationContainer>
          <Typography variant="h6" sx={{ px: 2, py: 1 }}>
            Notifications
          </Typography>
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={notification} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ px: 2, py: 1 }}>
                No new notifications
              </Typography>
            )}
          </List>
        </NotificationContainer>
      </Menu>
    </>
  );
};

export default NotificationComponent;
