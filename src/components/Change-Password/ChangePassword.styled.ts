import { Box, Card, TextField, Button } from "@mui/material";
import styled  from "@emotion/styled";

export const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const ChangePasswordCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 80%;
  max-width: 800px;
  padding: 16px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const IllustrationSection = styled(Box)`
  flex: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormSection = styled(Box)`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
  font-weight: bold;
  text-transform: none;
  transition: all 0.3s ease-in-out;
  background: #0d899b;
  color: white;
  width: 100%;

  &:hover {
    background: #4ca4a5;
  }
`;
