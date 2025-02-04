import { Bell, Search } from 'lucide-react';
import { HeaderContainer } from '../../styles/layout.styled';
import  {SearchBar, NotificationBell} from '../Header/header.styled';
import UserProfileMenu from '../User-Profile/UserProfile';



const Header = () => {
  return (
    <HeaderContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <NotificationBell>
        <Bell size={20} />
      </NotificationBell>
      <UserProfileMenu />
    </HeaderContainer>
  );
};

export default Header;