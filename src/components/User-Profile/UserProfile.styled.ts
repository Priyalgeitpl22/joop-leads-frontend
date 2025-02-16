import { Box, MenuItem, styled } from "@mui/material";

export const ProfileIcon = styled(Box)`
  cursor: pointer;
  border-radius: 20%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const UserProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
`

export const ProfileNameContainer = styled(Box)`
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: left;
  min-width: 100px;
`