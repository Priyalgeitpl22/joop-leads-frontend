import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Box, TextField as MuiTextField } from "@mui/material";
import { InputLabel as MuiInputLabel } from "@mui/material";

interface ButtonProps {
  color: string
  background: string
}

export const SidebarContainer = styled(motion.aside)`
  background-color: var(--background-color);
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  height: 100%;
  gap: 10px;
  width: 350px;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const HeaderContainer = styled.header`
  height: 100px;
  gap: 20px;
  display: flex;
  align-items: center;
  background: var(--theme-color);
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--background-light);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 20px 12px;
  color: var(--theme-color);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: var(--theme-color);
    color: var(--background-light);
    border:none;
  }

  &.active {
    background-color: var(--theme-color) ;
    color: var(--background-light);
  }
`;

export const SettingsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width: auto;  
`;

export const SubmenuWrapper = styled(motion.div)`
  position: absolute;
  bottom: 75px; 
  left: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 0.5rem;
  z-index: 10;
  border: 1px solid var(--border-dark);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const SubNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--background-light);
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
    color: var(--background-light);
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(theme-color-light);
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: var(--background-light);
  border-right: 1px solid #ddd;
`;

export const ContentArea = styled.div`
  background-color: var(--theme-color-light);
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`;

export const Button2 = styled("button", {
  shouldForwardProp: (prop) => prop !== "online",
})<ButtonProps>(
  ({ color, background }) => `
    width: 100%;
    height: 100%;
    border-radius: 5px;
    white-space: nowrap;  
    padding: 12px;
    color: ${color};
    background-color: ${background};
    border: none;
    font-weight: 500;
    font-size: 16px;
`
);

export const TextField = styled(MuiTextField)`
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px #bebebe;

  & .MuiInputBase-root {
    max-height: 45px;
  }

  &:hover {
    marginTop: 2px;
  }
`;

export const InputLabel = styled(MuiInputLabel)`
  color: black;
`;

export const TableItem = styled(Box)(`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`)

export const TableIcons = styled(Box)(`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`)