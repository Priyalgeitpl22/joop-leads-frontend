import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { useAppSelector } from '../../store';
import {
  LayoutContainer,
  MainContent,
  ContentWrapper,
} from './MainLayout.styled';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const { isFetchingCurrentUser, isAuthenticated, isInitialized } = useAppSelector((state) => state.user);

  // Only redirect after the initial fetch has been attempted
  useEffect(() => {
    if (isInitialized && !isFetchingCurrentUser && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, isFetchingCurrentUser, isInitialized]);

  // Show nothing while checking authentication
  if (!isInitialized || isFetchingCurrentUser) {
    return null; // Or return a loading spinner
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <Header />
      <MainContent $sidebarCollapsed={sidebarCollapsed}>
        <ContentWrapper>
          {children || <Outlet />}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;

