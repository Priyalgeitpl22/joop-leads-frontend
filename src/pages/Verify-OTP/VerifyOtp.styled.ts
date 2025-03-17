import styled from "@emotion/styled";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";

export const PageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position:relative;
   backgroundColor: "#f4f6f8",
`;

export const VerifyCard = styled(Box)`
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border-dark);
  width: 100%;
  max-width: 800px;
  display: flex;
  overflow: auto;
`;

export const EmailSection = styled(Box)`
  display: flex;
  align-items: center;
  justify-content:center  ;
  width: 100%;
  margin-bottom: 20px;
  textAlign: "center",
  fontSize: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0px 0px 5px rgba(25, 118, 210, 0.5)",
  },
  .MuiTypography-root {
    flex: 1;
    text-align: left;
  }

  .MuiIconButton-root {
    color: var(--theme-color-dark);
  }
`;

export const OtpFieldsContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  margin-left:-1px;
`;

export const OtpField = styled(TextField)`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 25px;
  border-radius: 8px;
   margin: 0 8px,

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
  background:  var(--theme-color);
  color: white;
  width: 8px
  max-width: 30px;
  padding10px;
  &:hover {
    background: var(--theme-color);
    opacity: 0.9;
  }
`;

export const TimerText = styled(Typography)`
  color: grey;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
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
  padding: 23px;
  display: flex;
  align-items:center;
  flex-direction: column;
  justify-content: center;
`;  

export const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 10,
  right: 10,
});

export const StyledCard = styled(Card)({
  padding: "2rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  maxWidth: "400px",
  textAlign: "center",
  position: "relative",
});
