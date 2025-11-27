import styled from '@emotion/styled';
import { Box, Button, TextField, IconButton } from '@mui/material';

export const PageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterCard = styled(Box)`
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border-dark);
  width: 100%;
  max-width: 900px;
  display: flex;
  overflow: auto;
  margin-top: 50px;
`;

export const IllustrationSection = styled(Box)`
  flex: 1;
  background: #f8fbff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const FormSection = styled(Box)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const PreviewContainer = styled(Box)`
text-align: center;
  margin-bottom: 10px;
`;

export const PreviewImage = styled('img')`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--border-dark);
  margin-bottom: 8px;
`;


export const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
  .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
  }


  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border: 1px solid var(--border-dark);
  }
  .MuiOutlinedInput-input {
    padding: 12px 10px !important; 
  }
`;

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
  font-weight: bold;
  text-transform: none;
  transition: all 0.3s ease-in-out;
  background: var(--primary-dark);
  color: white;

  &:hover {
    background: #2563eb;
    opacity: 0.9;
  }
  .MuiOutlinedInput-input {
    padding: 12px 10px !important;
  }
`;

export const SocialButtonsContainer = styled(Box)`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const SocialButton = styled(IconButton)`
  border: 1px solid var(--border-dark);
  padding: 12px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: var(--background-light);
    transform: scale(1.1);
  }
`;

export const LinkText = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #004a99;
    text-decoration: underline;
  }
`;
export const SignupLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #004a99;
    text-decoration: underline;
  }
`;
