import { Search } from "lucide-react";
import { HeaderContainer } from "../../styles/layout.styled";
import {
  AppTitle,
  LogoContainer,
  SearchBar,
  TitleContainer,
} from "../Header/header.styled";
import UserProfileMenu from "../User-Profile/UserProfile";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { HeaderOptions } from "../../pages/Home/home.styled";
import { Menu } from "lucide-react";
interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <HeaderContainer>
      <LogoContainer>
        <CampaignIcon
          style={{
            width: "50px",
            height: "50px",
            color: "var(--theme-color-light)",
          }}
        />
        <TitleContainer>
          <AppTitle>Jooper.ai</AppTitle>
        </TitleContainer>
      </LogoContainer>
      <SearchBar>
        <Search size={20} />
        <input placeholder="Search conversations..." />
      </SearchBar>
      <button
        onClick={toggleSidebar}
        style={{ background: "transparent", border: "none" }}
      >
        <Menu size={24} />
      </button>
      <HeaderOptions>
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UserProfileMenu />
          </div>
        )}
      </HeaderOptions>
    </HeaderContainer>
  );
};

export default Header;
