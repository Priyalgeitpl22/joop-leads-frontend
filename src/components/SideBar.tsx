import { useState } from "react";
import {
  HomeIcon,
  Settings,
  ChevronDown,
  ChevronUp,
  Sliders,
  Users,
} from "lucide-react";
import {
  SidebarContainer,
  NavItem,
  SubNavItem,
  SubmenuWrapper,
  SettingsWrapper,
} from "../styles/layout.styled";
import { useLocation } from "react-router-dom";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
const sidebarAnimation = {
  initial: { x: -260 },
  animate: { x: 0 },
  transition: { type: "spring", stiffness: 100 },
};

const Sidebar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <SidebarContainer
      initial={sidebarAnimation.initial}
      animate={sidebarAnimation.animate}
      transition={sidebarAnimation.transition}
    >
      <nav>
        <NavItem to="/" className={location.pathname === "/" ? "active" : ""}>
          <HomeIcon size={20} />
          Home
        </NavItem>
        <NavItem to="/email-campaign" className={location.pathname === "/email-campaign" ? "active" : ""}>
          <HomeIcon size={20} />
          Email Campaign
        </NavItem>
        <NavItem to="/">
          <HomeIcon size={20} />
          Master Inbox
        </NavItem>
        <NavItem
          to="/settings/agents"
          className={location.pathname === "/settings/agents" ? "active" : ""}
        >
          <Users size={18} />
          Agents
        </NavItem>
        <NavItem
          to="/email-account"
          className={location.pathname === "/email-account" ? "active" : ""}
        >
          <MailOutlineSharpIcon />
          Email Account
        </NavItem>
        <NavItem
          to="/leads"
          className={location.pathname === "/leads" ? "active" : ""}
        >
          <HomeIcon size={20} />
          All Leads
        </NavItem>
        <SettingsWrapper>
          <div onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <NavItem
              to="#"
              className={
                location.pathname.includes("/settings") ? "active" : ""
              }
            >
              <Settings />
              Settings
              {isSettingsOpen ? (
                <ChevronUp style={{ marginLeft: "auto" }} />
              ) : (
                <ChevronDown style={{ marginLeft: "auto" }} />
              )}
            </NavItem>
          </div>

          {isSettingsOpen && (
            <SubmenuWrapper>
              <SubNavItem
                to="/settings/configuration"
                className={
                  location.pathname === "/settings/configuration"
                    ? "active"
                    : ""
                }
              >
                <Sliders size={18} />
                Configuration
              </SubNavItem>
              <SubNavItem
                to="/settings/agents"
                className={
                  location.pathname === "/settings/agents" ? "active" : ""
                }
              >
                <Users size={18} />
                Agents
              </SubNavItem>
            </SubmenuWrapper>
          )}
        </SettingsWrapper>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
