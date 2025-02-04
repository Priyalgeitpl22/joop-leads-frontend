import { Box, MenuItem, styled } from "@mui/material";

export const ProfileIcon = styled(Box)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;

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