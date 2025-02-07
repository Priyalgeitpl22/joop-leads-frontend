import { Box, MenuItem, styled } from "@mui/material";

export const ProfileIcon = styled(Box)`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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