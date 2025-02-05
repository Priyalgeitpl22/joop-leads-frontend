import React, { useState } from "react";
import { Menu, Typography, Box } from "@mui/material";
import { ProfileIcon, StyledMenuItem } from "./UserProfile.styled";
import { Link } from "react-router-dom";

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const userImage = "https://i.pravatar.cc/300"; 

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ProfileIcon onClick={handleClick}>
        <img src={userImage} alt="User Profile" />
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
        <StyledMenuItem onClick={handleClose}>
          <Typography variant="body2" color="textSecondary">
            Logout
          </Typography>
        </StyledMenuItem>
      </Menu>
    </Box>
  );
};



export default UserProfileMenu;
