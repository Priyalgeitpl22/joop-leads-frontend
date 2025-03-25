import React, { useState } from "react";
import { Menu, Typography } from "@mui/material";
import {
  ProfileIcon,
  ProfileNameContainer,
  StyledMenuItem,
  UserProfileContainer,
} from "./UserProfile.styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileDetail from "./Profile-Details/ProfileDetail";
export interface User {
  type: string;
  createdAt: any;
  phone: any;
  id: string;
  email: string;
  fullName: string;
  role: string;
  orgId: string;
  aiOrgId: number;
  profilePicture: string;
}

const UserProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: () => void) => {
    handleMenuClose();
    action();
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.setItem("logout", Date.now().toString());
    handleMenuClose();
    window.location.assign("/login");
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <UserProfileContainer>
      <ProfileNameContainer>
        <p>{user?.fullName || "Unknown User"}</p>
        <p>{user?.role || "N/A"}</p>
      </ProfileNameContainer>

      <ProfileIcon onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{ width: "35px", height: "35px", borderRadius: "20%" }}
          />
        ) : (
          <AccountCircleIcon style={{ width: "35px", height: "35px" }} />
        )}
      </ProfileIcon>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "200px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <StyledMenuItem
          onClick={() => handleMenuItemClick(() => setIsProfileOpen(true))}
        >
          <Typography variant="body2" color="textSecondary">
            Profile
          </Typography>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleMenuClose}>
          <Link
            to="/change-password"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body2" color="textSecondary">
              Change Password
            </Typography>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleLogout}>
          <Typography variant="body2" color="textSecondary">
            Logout
          </Typography>
        </StyledMenuItem>
      </Menu>

      <ProfileDetail
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user}
      />
    </UserProfileContainer>
  );
};

export default UserProfileMenu;
