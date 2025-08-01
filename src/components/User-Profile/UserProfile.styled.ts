import { Box, MenuItem, styled } from "@mui/material";

export const ProfileIcon = styled(Box)`
  cursor: pointer;
  border-radius: 20%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:50%;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &:hover {
  background-color: var(--background-color)
  }
`;

export const UserProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
`

export const ProfileNameContainer = styled(Box)`
  flex-direction: column;
  display: flex;
  align-items: flex-end;  // Align text to the right
  justify-content: center;
  text-align: right;
  white-space: nowrap; // Prevents text from breaking into two lines
  overflow: hidden;
  text-overflow: ellipsis; // Adds "..." if text overflows
  margin-right: 10px;

    p:first-of-type {
    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary, #000); // fallback to black if variable is missing
    margin: 0;
  }

  p:last-of-type {
    font-weight: 400;
    font-size: 13px;
    color: var(--text-secondary, #666); // fallback to gray
    margin: 0;
  }
`;




