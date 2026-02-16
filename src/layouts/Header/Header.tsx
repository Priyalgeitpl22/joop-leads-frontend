import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, LogOut, User } from 'lucide-react';
import { useTheme } from '../../context';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleSidebarCollapsed } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import {
  HeaderContainer,
  HeaderContent,
  LeftSection,
  MenuButton,
  PageInfo,
  PageTitle,
  PageSubtitle,
  RightSection,
  ActionButtons,
  IconButton,
  UserAvatarContainer,
  UserAvatar,
  UserDropdown,
  DropdownHeader,
  DropdownAvatar,
  DropdownUserInfo,
  DropdownUserName,
  DropdownUserEmail,
  // DropdownSection,
  // DropdownSectionTitle,
  // CreditItem,
  // CreditLabel,
  // CreditBar,
  // CreditProgress,
  DropdownMenu,
  DropdownMenuItem,
} from './Header.styled';

interface PageConfig {
  title: string;
  subtitle: string;
}

const getPageConfig = (pathname: string): PageConfig => {
  if (pathname === '/') {
    return { title: 'Dashboard', subtitle: 'Overview of your performance' };
  }
  if (pathname.startsWith('/campaigns')) {
    return { title: 'Email Campaigns', subtitle: 'Manage and analyze campaigns' };
  }
  if (pathname.startsWith('/accounts')) {
    return { title: 'Email Accounts', subtitle: 'Manage your email connections' };
  }
  if (pathname.startsWith('/leads')) {
    return { title: 'All Leads', subtitle: 'Track and manage leads' };
  }
  if (pathname.startsWith('/inbox')) {
    return { title: 'Master Inbox', subtitle: 'All your inbox messages' };
  }
  if (pathname.startsWith('/users')) {
    return { title: 'Users', subtitle: 'Manage team members' };
  }
  if (pathname.startsWith('/settings')) {
    return { title: 'Settings & Profile', subtitle: 'Manage your preferences' };
  }
  if (pathname.startsWith('/subscription')) {
    return { title: 'Subscription', subtitle: 'Manage your plan' };
  }
  if (pathname.startsWith('/profile')) {
    return { title: 'My Profile', subtitle: 'Manage your account' };
  }
  return { title: 'Jooper Leads', subtitle: '' };
};

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const { currentUser, isFetchingCurrentUser } = useAppSelector((state) => state.user);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { title, subtitle } = getPageConfig(location.pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    dispatch(toggleSidebarCollapsed());
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await dispatch(logout());
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock credit usage data - replace with actual data from API
  // const creditUsage = {
  //   activeLeads: { current: 0, max: 1250 },
  //   emailCredits: { current: 0, max: 2500 },
  // };

  // const getPercentage = (current: number, max: number) => 
  //   max > 0 ? (current / max) * 100 : 0;

  if (isFetchingCurrentUser && !currentUser) {
    return null;
  }

  return (
    <HeaderContainer $sidebarCollapsed={sidebarCollapsed}>
      <HeaderContent>
        <LeftSection>
          <MenuButton onClick={handleMenuToggle} aria-label="Toggle menu">
            <Menu size={20} />
          </MenuButton>
          <PageInfo>
            <PageTitle>{title}</PageTitle>
            {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
          </PageInfo>
        </LeftSection>

        <RightSection>

          <ActionButtons>
            <IconButton onClick={toggleDarkMode} aria-label="Toggle theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
            
            {/* <IconButton aria-label="Notifications">
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </IconButton> */}

            <UserAvatarContainer ref={dropdownRef}>
              <UserAvatar 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                {currentUser?.profilePicture ? (
                  <img src={currentUser.profilePicture} alt={currentUser.fullName} />
                ) : (
                  <span>{getInitials(currentUser?.fullName)}</span>
                )}
              </UserAvatar>

              <UserDropdown $isOpen={isDropdownOpen}>
                <DropdownHeader>
                  <DropdownAvatar>
                    {currentUser?.profilePicture ? (
                      <img src={currentUser.profilePicture} alt={currentUser.fullName} />
                    ) : (
                      <span>{getInitials(currentUser?.fullName)}</span>
                    )}
                  </DropdownAvatar>
                  <DropdownUserInfo>
                    <DropdownUserName>{currentUser?.fullName || 'User'}</DropdownUserName>
                    <DropdownUserEmail>{currentUser?.email || 'user@email.com'}</DropdownUserEmail>
                  </DropdownUserInfo>
                </DropdownHeader>

                {/* <DropdownSection>
                  <DropdownSectionTitle>Your credit usage detail</DropdownSectionTitle>
                  <CreditItem>
                    <CreditLabel>
                      Active Leads: {creditUsage.activeLeads.current}/{creditUsage.activeLeads.max.toLocaleString()}
                    </CreditLabel>
                    <CreditBar>
                      <CreditProgress 
                        $percentage={getPercentage(creditUsage.activeLeads.current, creditUsage.activeLeads.max)} 
                      />
                    </CreditBar>
                  </CreditItem>
                  <CreditItem>
                    <CreditLabel>
                      Email Credits: {creditUsage.emailCredits.current}/{creditUsage.emailCredits.max.toLocaleString()}
                    </CreditLabel>
                    <CreditBar>
                      <CreditProgress 
                        $percentage={getPercentage(creditUsage.emailCredits.current, creditUsage.emailCredits.max)} 
                      />
                    </CreditBar>
                  </CreditItem>
                </DropdownSection> */}

                <DropdownMenu>
                  <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
                    <User size={20} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={20} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenu>
              </UserDropdown>
            </UserAvatarContainer>
          </ActionButtons>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
