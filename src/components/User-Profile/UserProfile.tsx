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
import { useTheme } from "../../context/ThemeContext";
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

  const { isDarkMode } = useTheme();

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
      {/* <ProfileNameContainer>
        <p style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{user?.fullName || "Unknown User"}</p>
        <p style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{user?.role || "N/A"}</p>
      </ProfileNameContainer> */}

      <ProfileIcon onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{ width: "35px", height: "35px", borderRadius: "20%" }}
          />
        ) : (
          <AccountCircleIcon style={{ width: "35px", height: "35px", color: "var(--primary-dark)" }} />
        )}
      </ProfileIcon>

      {/* <Menu
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
      </Menu> */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "230px",
            borderRadius: "12px",
            padding: "6px 0",
            backgroundColor: isDarkMode ? "#1e1e2e" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
            boxShadow: isDarkMode
              ? "0 8px 20px rgba(0,0,0,0.5)"
              : "0 8px 20px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* Header Section */}
        <div
          style={{
            padding: "14px 16px",
            borderBottom: isDarkMode
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div>
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: isDarkMode ? "#ffffff" : "#111827",
              }}
            >
              {user?.fullName}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: isDarkMode ? "#cbd5e1" : "#6b7280",
              }}
            >
              {user?.email}
            </Typography>
          </div>
        </div>

        {/* Menu Items */}
        <StyledMenuItem
          onClick={() => handleMenuItemClick(() => setIsProfileOpen(true))}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#f3f4f6",
            },
          }}
        >
          <AccountCircleIcon fontSize="small" />
          <Typography variant="body2">View Profile</Typography>
        </StyledMenuItem>

        <StyledMenuItem
          onClick={handleMenuClose}
          sx={{
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#f3f4f6",
            },
          }}
        >
          <Link
            to="/change-password"
            style={{ textDecoration: "none", color: "inherit", display: "flex", gap: "10px", alignItems: "center" }}
          >
            <span>🔒</span>
            <Typography variant="body2">Change Password</Typography>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem
          onClick={handleLogout}
          sx={{
            padding: "10px 16px",
            color: "#ef4444",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(255,0,0,0.08)" : "#fee2e2",
            },
          }}
        >
          <span>🚪</span>
          <Typography variant="body2">Logout</Typography>
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
