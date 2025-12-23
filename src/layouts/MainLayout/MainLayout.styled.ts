import styled from 'styled-components';

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 72;
const HEADER_HEIGHT = 72;

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const MainContent = styled.main<{ $sidebarCollapsed: boolean }>`
  margin-left: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px;
  margin-top: ${HEADER_HEIGHT}px;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  transition: margin-left ${({ theme }) => theme.transitions.normal};
`;

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1600px;
  
  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

