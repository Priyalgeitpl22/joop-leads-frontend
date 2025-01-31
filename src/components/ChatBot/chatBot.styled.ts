import styled from '@emotion/styled';
import { Box, TextField, IconButton } from '@mui/material';

export const ChatContainer = styled(Box)`
  max-width: 350px;
  margin: 10px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
`;

export const Header = styled(Box)<{ bgcolor: string }>`
  background-color: ${({ bgcolor }) => bgcolor || "#343a40"};
  color: white;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Logo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export const ChatBody = styled(Box)`
  padding: 15px;
  height: 350px;
  overflow-y: auto;
`;

export const Message = styled(Box)`
  background-color: #e9ecef;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 80%;
  margin-bottom: 12px;
  color: #495057;
`;

export const InputContainer = styled(Box)`
  padding: 10px;
  background: white;
  position: relative;
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 20px;
    background-color: #f8f9fa;
  }
`;

export const OpenButton = styled(IconButton)<{ bgcolor: string }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ bgcolor }) => bgcolor || "#343a40"};
  color: white;
  z-index:10;
  &:hover {
    background-color: ${({ bgcolor }) => bgcolor ? `${bgcolor}aa` : "#5a6268"};
  }
`;

export const EmojiPickerContainer = styled(Box)`
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 10;
`;

export const DropdownIconButton = styled(IconButton)`
  align-self: flex-end;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;