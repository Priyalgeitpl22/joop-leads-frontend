import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

export const SidebarContainer = styled(motion.aside)`
  width: 220px;
  padding: 20px;
  height: 100vh !important;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
`;

export const HeaderContainer = styled.header`
  height: 64px;
  gap: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
  background: var(--white-fade-gradient);
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  margin-bottom: 0.5rem;
  background-color: transparent;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: var(--theme-color);
    color: #1e293b;
    border:none;
  }

  &.active {
    background-color: var(--theme-color) ;
    color: #1e293b;
  }
`;

export const SettingsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width:210px;
`;
export const SubmenuWrapper = styled(motion.div)`
  position: absolute;
  bottom: 75px; 
  left: 0;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 0.5rem;
  z-index: 10;
  background-color: transparent;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const SubNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #1e293b;
  text-decoration: none;
  font-size: 14px;
  border-radius: 5px;
  transition: background 0.3s ease;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: var(--theme-color);
    color: #1e293b;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Take full viewport height */
  width: 100vw;
  background: #ffffff; /* Change from red to a neutral background */
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1; /* Take available space */
  width: 100%;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 250px; /* Fixed sidebar width */
  background-color: #fff;
  border-right: 1px solid #ddd;
`;

export const ContentArea = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 5px 10px;
  background-color: white;
`;