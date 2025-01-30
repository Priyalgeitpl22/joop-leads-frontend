import { Bell, Search } from 'lucide-react';
import { HeaderContainer } from '../../styles/layout.styled';
import  {SearchBar, NotificationBell, ProfileIcon} from '../Header/header.styled';



const Header = () => {
    const userImage = 'https://i.pravatar.cc/300';
  return (
    <HeaderContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <NotificationBell>
        <Bell size={20} />
      </NotificationBell>
      <ProfileIcon>
      <img src={userImage} alt="User Profile" />
        </ProfileIcon>
    </HeaderContainer>
  );
};

export default Header;