import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  MailSearch,
  Users,
  Inbox,
  UserCog,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Zap,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleSidebarCollapsed } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import {
  SidebarContainer,
  SidebarHeader,
  Logo,
  LogoIcon,
  LogoText,
  ToggleButton,
  NavSection,
  NavList,
  NavItem,
  NavLink,
  NavIcon,
  NavText,
  NavDivider,
  BottomNav,
} from './Sidebar.styled';

interface NavItemConfig {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const mainNavItems: NavItemConfig[] = [
  { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { title: 'Email Campaigns', icon: <MailSearch size={20} />, path: '/campaigns' },
  { title: 'Email Accounts', icon: <Mail size={20} />, path: '/accounts' },
  { title: 'All Leads', icon: <Users size={20} />, path: '/leads' },
  { title: 'Master Inbox', icon: <Inbox size={20} />, path: '/inbox' },
  // { title: 'Subscription', icon: <CreditCard size={20} />, path: '/subscription' },
];

const bottomNavItems: NavItemConfig[] = [
  { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  { title: 'Users', icon: <UserCog size={20} />, path: '/users' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const handleToggle = () => {
    dispatch(toggleSidebarCollapsed());
  };

  return (
    <SidebarContainer $collapsed={sidebarCollapsed}>
      <SidebarHeader $collapsed={sidebarCollapsed}>
        {!sidebarCollapsed ? (
          <>
            <Logo>
              <LogoIcon>
                <Zap size={22} />
              </LogoIcon>
              <LogoText>Jooper Leads</LogoText>
            </Logo>
            <ToggleButton onClick={handleToggle} aria-label="Collapse sidebar">
              <ChevronLeft size={20} />
            </ToggleButton>
          </>
        ) : (
          <ToggleButton onClick={handleToggle} aria-label="Expand sidebar" $centered>
            <Menu size={20} />
          </ToggleButton>
        )}
      </SidebarHeader>

      <NavSection>
        <NavList>
          {mainNavItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink
                onClick={() => handleNavigation(item.path)}
                $active={isActive(item.path)}
                $collapsed={sidebarCollapsed}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <NavIcon $active={isActive(item.path)}>{item.icon}</NavIcon>
                {!sidebarCollapsed && <NavText>{item.title}</NavText>}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavSection>

      <NavDivider />

      <BottomNav>
        <NavList>
          {bottomNavItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink
                onClick={() => handleNavigation(item.path)}
                $active={isActive(item.path)}
                $collapsed={sidebarCollapsed}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <NavIcon $active={isActive(item.path)}>{item.icon}</NavIcon>
                {!sidebarCollapsed && <NavText>{item.title}</NavText>}
              </NavLink>
            </NavItem>
          ))}
          <NavItem>
            <NavLink
              onClick={handleLogout}
              $collapsed={sidebarCollapsed}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <NavIcon>
                <LogOut size={20} />
              </NavIcon>
              {!sidebarCollapsed && <NavText>Logout</NavText>}
            </NavLink>
          </NavItem>
        </NavList>
      </BottomNav>
    </SidebarContainer>
  );
};

export default Sidebar;

