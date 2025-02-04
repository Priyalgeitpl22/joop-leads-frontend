import styled from "@emotion/styled";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";

export const PageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const VerifyCard = styled(Box)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmailSection = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  .MuiTypography-root {
    flex: 1;
    text-align: left;
  }

  .MuiIconButton-root {
    color: #1976d2;
  }
`;

export const OtpFieldsContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const OtpField = styled(TextField)`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 8px;

  .MuiOutlinedInput-root {
    border-radius: 8px;
    font-weight: bold;
  }

  .MuiOutlinedInput-input {
    padding: 10px;
    text-align: center;
  }
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

export const TimerText = styled(Typography)`
  color: #f44336;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

