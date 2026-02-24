import styled, { css } from 'styled-components';

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export const SidebarContainer = styled.aside<{ $collapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $collapsed }) => ($collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  background: ${({ theme }) => theme.colors.sidebar.background};
  display: flex;
  flex-direction: column;
  transition: width ${({ theme }) => theme.transitions.normal};
  z-index: 1000;
  overflow: hidden;
`;

export const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 72px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LogoIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main} 0%, 
    ${({ theme }) => theme.colors.primary.dark} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  letter-spacing: 0.5px;
`;

export const ToggleButton = styled.button<{ $centered?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  cursor: pointer;
  
  ${({ $centered }) => $centered && css`
    margin: 0 auto;
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export const NavSection = styled.nav`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const NavItem = styled.li``;

export const NavLink = styled.button<{ $active?: boolean; $collapsed?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main + '20' : 'transparent'};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.7)')};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: left;
  
  ${({ $collapsed }) => $collapsed && css`
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.sm};
  `}

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary.main + '30' : 'rgba(255, 255, 255, 0.1)'};
    color: white;
  }
`;

export const NavIcon = styled.span<{ $active?: boolean, $hasChildren?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  flex-shrink: 0;

  ${({ $hasChildren }) => $hasChildren && css`
    margin-left: ${({ theme }) => theme.spacing.md};
  `}
`;

export const NavText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
`;

export const NavDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const BottomNav = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ParentRow = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const ArrowIcon = styled.div<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const ChildNavList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-left: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const NavWrapper = styled.div`
  display: flex;
  align-item: center;
  gap: ${({theme}) => theme.spacing.md}
`;
