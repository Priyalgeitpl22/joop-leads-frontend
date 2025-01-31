import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const SidebarContainer = styled(motion.aside)`
  width: 210px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 1.5rem;
  position: fixed;
  z-index: 40;
  height: 100vh;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 260px;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 30;
  width: calc(100% - 300px);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const MainContainer = styled.main` 
  position:relative;
  padding: 2rem;
  margin-left: 260px;
  margin-top: 64px;
  width: fit-content;
  height: fit-content;
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

  &:hover {
    background-color: #e5f5f7;
    color: #1e293b;
  }

  &.active {
    background-color: #7ed8d6 ;
    color: #1e293b;
  }
`;
