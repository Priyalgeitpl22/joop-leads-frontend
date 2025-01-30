import { HomeIcon, Settings,  Bot } from 'lucide-react';
import { SidebarContainer, Logo, NavItem } from '../styles/layout.styled';
import { useLocation } from 'react-router-dom';

const sidebarAnimation = {
  initial: { x: -260 },
  animate: { x: 0 },
  transition: { type: "spring", stiffness: 100 }
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer
      initial={sidebarAnimation.initial}
      animate={sidebarAnimation.animate}
      transition={sidebarAnimation.transition}
    >
      <Logo>
        <Bot size={24} />
        ChatDash
      </Logo>
      <nav>
        <NavItem 
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          <HomeIcon size={20} />
          Home
        </NavItem>
        <NavItem
          to="/settings"
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          <Settings size={20} />
          Settings
        </NavItem>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;