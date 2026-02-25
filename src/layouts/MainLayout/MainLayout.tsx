import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Info, X } from "lucide-react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { useAppSelector } from "../../store";
import {
  LayoutContainer,
  MainContent,
  ContentWrapper,
  TrialExpiredBanner,
  TrialExpiredBannerCenter,
  TrialExpiredText,
  TrialExpiredLink,
  TrialExpiredDismiss,
  BANNER_HEIGHT,
} from "./MainLayout.styled";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const { isFetchingCurrentUser, isAuthenticated, isInitialized } =
    useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (isInitialized && !isFetchingCurrentUser && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isInitialized, isFetchingCurrentUser, isAuthenticated]);

  const trialExpired =
    !!currentUser?.planDetails?.endsAt &&
    new Date(currentUser.planDetails.endsAt) < new Date();
  const showBanner = trialExpired && !bannerDismissed;

  // Show nothing while checking authentication
  if (!isInitialized || isFetchingCurrentUser) {
    return null; // Or return a loading spinner
  }

  return (
    <LayoutContainer>
      {showBanner && (
        <TrialExpiredBanner>
          <TrialExpiredBannerCenter>
            <Info size={18} aria-hidden />
            <TrialExpiredText>Your trial period is expired.</TrialExpiredText>
            <TrialExpiredLink to="/subscription">Subscribe now</TrialExpiredLink>
          </TrialExpiredBannerCenter>
          <TrialExpiredDismiss
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss banner"
          >
            <X size={18} aria-hidden />
          </TrialExpiredDismiss>
        </TrialExpiredBanner>
      )}
      <Sidebar topOffset={showBanner ? BANNER_HEIGHT : 0} />
      <Header topOffset={showBanner ? BANNER_HEIGHT : 0} />
      <MainContent $sidebarCollapsed={sidebarCollapsed} $hasBanner={showBanner}>
        <ContentWrapper>{children || <Outlet />}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};
export default MainLayout;
