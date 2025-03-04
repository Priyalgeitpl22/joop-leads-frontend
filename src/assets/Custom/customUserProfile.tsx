import React, { useState } from "react";
import { Menu, Typography, IconButton, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileDetail from "../../components/User-Profile/Profile-Details/ProfileDetail";
import { ProfileNameContainer, StyledMenuItem, UserName, UserProfileContainer, UserRole } from "./styled";

const UserProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.setItem("logout", Date.now().toString());
    handleMenuClose();
    window.location.assign("/login");
  };

  return (
    <>
      <UserProfileContainer>
      <ProfileNameContainer>
        <UserName>
          {user?.fullName || "Unknown User"}
        </UserName>
        <UserRole>
          {user?.role || "N/A"}
        </UserRole>
      </ProfileNameContainer>
      <IconButton onClick={handleMenuOpen} sx={{ cursor: "pointer" }}>
        {user?.profilePicture ? (
          <Avatar
            src={user.profilePicture}
            alt="Profile"
            sx={{ width: 35, height: 35 }}
          />
        ) : (
          <AccountCircleIcon sx={{ width: 35, height: 35 }} />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "200px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Profile */}

        <StyledMenuItem
          onClick={() => {
            handleMenuClose();
            setIsProfileOpen(true);
          }}
        >
          Profile
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => window.location.assign("/change-password")}
        >
          Change Password
        </StyledMenuItem>

        {/* Logout */}
        <StyledMenuItem
          onClick={handleLogout}
        >
          Logout
        </StyledMenuItem>
      </Menu>

      <ProfileDetail
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user}
      />
      </UserProfileContainer>
    </>
  );
};

export default UserProfileMenu;
