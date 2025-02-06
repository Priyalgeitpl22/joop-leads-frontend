import { Bell, Search } from 'lucide-react';
import { HeaderContainer } from '../../styles/layout.styled';
import  {SearchBar, NotificationBell} from '../Header/header.styled';
import UserProfileMenu from '../User-Profile/UserProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state:RootState) => state.user);

  useEffect(() => {
    if(!user) {
      console.log("No user found");
      navigate('/login');
    }
  })
  return (
    <HeaderContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <NotificationBell>
        <Bell size={20} />
      </NotificationBell>
      {user && <p>{user.fullName}</p>}
      <UserProfileMenu />
    </HeaderContainer>
  );
};

export default Header;