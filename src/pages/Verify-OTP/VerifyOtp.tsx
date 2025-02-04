import { useState, useEffect } from "react";
import { Typography, Box, IconButton, Button } from "@mui/material";
import { Edit } from "lucide-react";
import {
  PageContainer,
  VerifyCard,
  EmailSection,
  OtpFieldsContainer,
  OtpField,
  StyledButton,
  TimerText,
} from "./VerifyOtp.styled"; 
import { Link as RouterLink } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = useState("user@example.com");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }
  };

  const handleEditEmail = () => {
    // Navigate to Forgot Password (use RouterLink or history.push depending on your router)
    window.location.href = "/forgot-password";
  };

  const handleVerifyOtp = () => {
    // Handle OTP verification logic
    console.log("Verifying OTP: ", otp.join(""));
  };

  const handleResendOtp = () => {
    setTimer(60);  // Reset timer
    setIsTimerRunning(true);
    // Logic to resend OTP
    console.log("Resending OTP...");
  };

  return (
    <PageContainer>
      <VerifyCard>
        <EmailSection>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {email}
          </Typography>
          <IconButton onClick={handleEditEmail}>
            <Edit />
          </IconButton>
        </EmailSection>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Enter the OTP sent to your email
        </Typography>

        <OtpFieldsContainer>
          {otp.map((digit, index) => (
            <OtpField
              key={index}
              value={digit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(e, index)}
              inputProps={{ maxLength: 1 }} 
            />
          ))}
        </OtpFieldsContainer>

        <StyledButton variant="contained" onClick={handleVerifyOtp}>
          VERIFY OTP
        </StyledButton>

        <Box sx={{ marginTop: 2 }}>
          {isTimerRunning ? (
            <TimerText>Time remaining: {timer}s</TimerText>
          ) : (
            <StyledButton onClick={handleResendOtp}>Resend OTP</StyledButton>
          )}
        </Box>
      </VerifyCard>
    </PageContainer>
  );
};

export default VerifyOtp;
