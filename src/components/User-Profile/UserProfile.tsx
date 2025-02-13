// src/components/UserProfile/UserProfileMenu.tsx
import React, { useState } from "react";
import { Menu, Typography, Box } from "@mui/material";
import { ProfileIcon, StyledMenuItem } from "./UserProfile.styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileDetail from "./Profile-Details/ProfileDetail";

// Define a User interface if not already defined
export interface User {
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
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  // Open the MUI Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the MUI Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Helper to close the menu, then perform an action
  const handleMenuItemClick = (action: () => void) => {
    handleMenuClose();
    action();
  };

  // Logout logic
  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.setItem("logout", Date.now().toString());
    handleMenuClose();
    navigate("/login");
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box>
      {/* Profile icon or fallback icon */}
      <ProfileIcon onClick={handleMenuOpen}>
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <AccountCircleIcon
            sx={{
              color: "#64748b",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              objectFit: "cover",
            }}
          />
        )}
      </ProfileIcon>

      {/* MUI Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
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

      {/* Profile Detail Dialog */}
      <ProfileDetail
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user as User | null}
      />
    </Box>
  );
};

export default UserProfileMenu;
