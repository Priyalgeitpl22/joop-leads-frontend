import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from "@mui/material";
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
  BookCheck,
  ListTodo,
  ChevronDown,
  CheckCircle,
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
  ParentRow,
  ArrowIcon,
  ChildNavList,
  NavWrapper,
} from './Sidebar.styled';

interface NavItemConfig {
  title: string;
  icon: React.ReactNode;
  path?: string | undefined;
  children?: NavItemConfig[];
}

const mainNavItems: NavItemConfig[] = [
  { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { title: 'Email Campaigns', icon: <MailSearch size={20} />, path: '/campaigns' },
  { title: 'Email Accounts', icon: <Mail size={20} />, path: '/accounts' },
  {
    title: 'Email Verification',
    icon: <BookCheck size={20} />,
    children: [
      {
        title: 'Verify Email',
        path: '/email-verification/verify-email',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Task & Results',
        path: '/email-verification/task-and-results',
        icon: <ListTodo size={18} />,
      },
    ],
  },
  { title: 'All Leads', icon: <Users size={20} />, path: '/leads' },
  { title: 'Master Inbox', icon: <Inbox size={20} />, path: '/inbox' },
  // { title: 'Subscription', icon: <CreditCard size={20} />, path: '/subscription' },
];

const bottomNavItems: NavItemConfig[] = [
  { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  { title: 'Users', icon: <UserCog size={20} />, path: '/users' },
];

interface SidebarProps {
  topOffset?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ topOffset = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const withTooltip = (title: string, children: React.ReactElement) => {
    if (!sidebarCollapsed) return children;

    return (
      <Tooltip title={title} placement="right" arrow>
        {children}
      </Tooltip>
    );
  };

  React.useEffect(() => {
    mainNavItems.forEach((item) => {
      if (item.children?.some((child) => isActive(child.path!))) {
        setOpenMenu(item.title);
      }
    });
  }, [location.pathname]);

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
    <SidebarContainer $collapsed={sidebarCollapsed} $topOffset={topOffset}>
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
          {mainNavItems.map((item) => {
            const hasChildren = !!item.children;
            const isParentActive =
              hasChildren &&
              item.children!.some((child) => isActive(child.path!));

            return (
              <NavItem key={item.title}>
                {withTooltip(
                  item.title,
                  <NavLink
                    onClick={() => {
                      if (hasChildren) {
                      setOpenMenu(openMenu === item.title ? null : item.title);
                      } else if (item.path) {
                        handleNavigation(item.path);
                      }
                    }}
                    $active={item.path ? isActive(item.path) : isParentActive}
                    $collapsed={sidebarCollapsed}
                  >
                    <ParentRow>
                      <NavWrapper>
                        <NavIcon
                          $hasChildren={hasChildren && sidebarCollapsed}
                          $active={
                            item.path ? isActive(item.path) : isParentActive
                          }
                        >
                          {item.icon}
                        </NavIcon>
                        {!sidebarCollapsed && <NavText>{item.title}</NavText>}
                      </NavWrapper>
                      {hasChildren && (
                        <ArrowIcon $open={openMenu === item.title}>
                          <ChevronDown size={16} />
                        </ArrowIcon>
                      )}
                    </ParentRow>
                  </NavLink>
                )}

                {hasChildren && openMenu === item.title && (
                  <ChildNavList>
                    {item.children!.map((child) =>
                      withTooltip(
                        child.title,
                        <NavLink
                          key={child.path}
                          onClick={() => handleNavigation(child.path!)}
                          $active={isActive(child.path!)}
                          $collapsed={sidebarCollapsed}
                        >
                          <NavIcon $active={isActive(child.path!)}>
                            {child.icon}
                          </NavIcon>
                          {!sidebarCollapsed && (
                            <NavText>{child.title}</NavText>
                          )}
                        </NavLink>
                      ))}
                  </ChildNavList>
                )}
              </NavItem>
            );
          })}
        </NavList>
      </NavSection>

      <NavDivider />

      <BottomNav>
        <NavList>
          {bottomNavItems.map((item) => (
            <NavItem key={item.title}>
              {withTooltip(
                item.title,
                <NavLink
                  onClick={() => {
                    if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                  $active={item.path ? isActive(item.path) : false}
                  $collapsed={sidebarCollapsed}
                >
                  <NavIcon $active={item.path ? isActive(item.path) : false}>
                    {item.icon}
                  </NavIcon>
                  {!sidebarCollapsed && <NavText>{item.title}</NavText>}
                </NavLink>
              )}
            </NavItem>
          ))}
          <NavItem>
            {withTooltip(
              'Logout',
              <NavLink onClick={handleLogout} $collapsed={sidebarCollapsed}>
                <NavIcon>
                  <LogOut size={20} />
                </NavIcon>
                {!sidebarCollapsed && <NavText>Logout</NavText>}
              </NavLink>
            )}
          </NavItem>
        </NavList>
      </BottomNav>
    </SidebarContainer>
  );
};

export default Sidebar;

