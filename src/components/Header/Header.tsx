import { Bell, Search } from "lucide-react";
import { HeaderContainer } from "../../styles/layout.styled";
import { SearchBar, NotificationBell } from "../Header/header.styled";
import UserProfileMenu from "../User-Profile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/slice/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!user && token) {
      dispatch(getUserDetails())
        .catch(() => {
          navigate("/login");
        });
    } else if (!token) {
      navigate("/login");
    } else {
      console.log("User already logged in:", user);
    }
  }, [user, dispatch, navigate]);

  return (
    <HeaderContainer>
      <SearchBar>
        <Search size={20} color="#64748b" />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <NotificationBell>
        <Bell size={20} />
      </NotificationBell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
      {user && <p>{user.fullName}</p>}
      <UserProfileMenu />
      </div>
    </HeaderContainer>
  );
};

export default Header;
