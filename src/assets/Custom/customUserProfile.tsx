import React, { useState } from "react";
import { Menu, Typography, IconButton, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileDetail from "../../components/User-Profile/Profile-Details/ProfileDetail";

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
      {/* Profile Button */}
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

      {/* Profile Menu */}
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

        <Typography
          onClick={() => {
            handleMenuClose();
            setIsProfileOpen(true);
          }}
          variant="body2"
          sx={{ p: 2 }}
        >
          Profile
        </Typography>

        <Typography
          onClick={() => window.location.assign("/change-password")}
          variant="body2"
          sx={{ p: 2 }}
        >
          Change Password
        </Typography>

        {/* Logout */}
        <Typography
          variant="body2"
          sx={{ p: 2, cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </Typography>
      </Menu>

      {/* Profile Detail Modal */}
      <ProfileDetail
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user}
      />
    </>
  );
};

export default UserProfileMenu;
