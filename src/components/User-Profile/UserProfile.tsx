import React, { useState } from "react";
import { Menu, Typography, Box} from "@mui/material";
import { ProfileIcon, StyledMenuItem } from "./UserProfile.styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice"; 
import { AppDispatch, RootState } from "../../redux/store/store";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.user);
  

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.setItem("logout", Date.now().toString()); 
    handleClose();
    navigate("/login");
  };
  

  return (
    <Box>
      <ProfileIcon onClick={handleClick}>
        {
          user?.profilePicture ?(
            <img src={user?.profilePicture} alt="Profile" style={{ width: "40px", height: "40px", cursor: "pointer", objectFit: "cover" }} />
          ):(
            <AccountCircleIcon sx={{ color: "#64748b", width: "30px", height: "30px", cursor: "pointer", objectFit: "cover" }} />
          )
        }
      </ProfileIcon>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "200px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <StyledMenuItem onClick={handleClose}>
          <Typography variant="body2" color="textSecondary">
            Profile
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <Link to="/change-password" style={{ textDecoration: "none", color: "inherit" }}>
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
    </Box>
  );
};

export default UserProfileMenu;
