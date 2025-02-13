import { Bell, Search } from "lucide-react";
import { HeaderContainer } from "../../styles/layout.styled";
import { SearchBar, NotificationBell } from "../Header/header.styled";
import UserProfileMenu from "../User-Profile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/slice/userSlice";
import { StatusIndicator } from "../Chats/ChatSideBar/chatSidebar.styled";
import { Switch, Typography } from "@mui/material";
import { useSocket } from "../../context/SocketContext";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { socket } = useSocket();
  const [isOnline, setIsOnline] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});

  // Handle status change toggle
  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const online = event.target.checked;
      setIsOnline(online);
      if (socket && user?.id) {
        socket.emit("agentOnline", {
          id: user.id,
          online: online,
          name: user.fullName,
        });
      }
    },
    [socket, user?.id]
  );

  // Fetch user details if not available
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!user && token) {
      dispatch(getUserDetails()).catch(() => navigate("/login"));
    } else if (!token) {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  // Handle socket connection for online status tracking
  useEffect(() => {
    if (!socket || !user?.id) return;

    socket.emit("agentOnline", {
      id: user.id,
      online: isOnline,
      name: user.fullName,
    });

    const handleAgentStatusUpdate = ({
      userId,
      online,
    }: {
      userId: string;
      online: boolean;
    }) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: online }));
    };

    socket.on("agentStatusUpdate", handleAgentStatusUpdate);

    return () => {
      socket.off("agentStatusUpdate", handleAgentStatusUpdate);
    };
  }, [socket, user?.id]);

  return (
    <HeaderContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <StatusIndicator online={isOnline} />
        <Typography variant="subtitle2">
          {isOnline ? "You're available" : "You're offline"}
        </Typography>
        <Switch
          checked={isOnline}
          onChange={handleStatusChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <NotificationBell>
        <Bell size={20} />
      </NotificationBell>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {user && <p>{user.fullName}</p>}
        <UserProfileMenu />
      </div>
    </HeaderContainer>
  );
};

export default Header;
