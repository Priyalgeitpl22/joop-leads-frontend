import { Search } from "lucide-react";
import { HeaderContainer } from "../../styles/layout.styled";
import {
  AppSubtitle,
  AppTitle,
  LogoContainer,
  SearchBar,
  TitleContainer,
} from "../Header/header.styled";
import UserProfileMenu from "../User-Profile/UserProfile";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useState, useCallback, useEffect } from "react";
import { StatusIndicator } from "../Chats/ChatSideBar/chatSidebar.styled";
import { Switch, Typography } from "@mui/material";
import { useSocket } from "../../context/SocketContext";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import NotificationComponent from "../Notification/NotificationComponent";
import { HeaderOptions } from "../../pages/Home/home.styled";
import { Menu } from "lucide-react";
interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { socket } = useSocket();
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
    [socket, user?.id, isOnline]
  );

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!user && token) {
      dispatch(getUserDetails(token)).catch(() => navigate("/login"));
    } else if (!token) {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (!socket || !user?.id) return;

    setIsOnline(user.online);

    if (user.online) {
      socket.emit("agentOnline", {
        id: user.id,
        online: isOnline,
        name: user.fullName,
      });
    }

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
  }, [socket, user?.id, isOnline]);

  return (
    <HeaderContainer>
      <button
        onClick={toggleSidebar}
        style={{ background: "transparent", border: "none" }}
      >
        <Menu size={24} />
      </button>
      <LogoContainer>
        <CampaignIcon
          style={{
            width: "50px",
            height: "50px",
          }}
        />
        {/* <img src={logo} alt="Logo" style={{ width: "75px", height: "75px" }} /> */}
        <TitleContainer>
          <AppTitle>Joop Leads</AppTitle>
          <AppSubtitle>Automate, Assist, Accelerate</AppSubtitle>
        </TitleContainer>
      </LogoContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>

      <HeaderOptions>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "0px 8px",
          }}
        >
          <Switch
            size="small"
            checked={isOnline}
            onChange={handleStatusChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 10, color: "#696969" }}
            >
              {isOnline ? "Online" : "Offline"}
            </Typography>
            <StatusIndicator online={isOnline} />
          </div>
        </div>
        <NotificationComponent />
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UserProfileMenu />
          </div>
        )}
      </HeaderOptions>
    </HeaderContainer>
  );
};

export default Header;
