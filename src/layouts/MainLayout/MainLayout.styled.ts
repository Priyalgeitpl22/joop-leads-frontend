import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 72;
const HEADER_HEIGHT = 72;
export const BANNER_HEIGHT = 44;
const TOTAL_TOP = HEADER_HEIGHT + BANNER_HEIGHT;

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const TrialExpiredBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${BANNER_HEIGHT}px;
  background: ${({ theme }) => theme.colors.warning?.main ?? '#ffcf7e'};
  color: ${({ theme }) => theme.colors.text?.primary ?? '#966504'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm ?? '14px'};
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const TrialExpiredBannerCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm ?? 8}px;
`;

export const TrialExpiredText = styled.span`
  color: inherit;
`;

export const TrialExpiredDismiss = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`;

export const TrialExpiredLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary?.main ?? '#6366f1'};
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary?.dark ?? '#4f46e5'};
  }
`;

export const MainContent = styled.main<{ $sidebarCollapsed: boolean; $hasBanner?: boolean }>`
  margin-left: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px;
  margin-top: ${({ $hasBanner }) => ($hasBanner ? TOTAL_TOP : HEADER_HEIGHT)}px;
  height: calc(100vh - ${({ $hasBanner }) => ($hasBanner ? TOTAL_TOP : HEADER_HEIGHT)}px);
  min-height: calc(100vh - ${({ $hasBanner }) => ($hasBanner ? TOTAL_TOP : HEADER_HEIGHT)}px);
  display: flex;
  flex-direction: column;
  transition: margin-left ${({ theme }) => theme.transitions.normal};
`;

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1600px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

